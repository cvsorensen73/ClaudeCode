<#
.SYNOPSIS
    Synchronizes Google Calendar events to Outlook calendar as "Busy" placeholders.

.DESCRIPTION
    This script retrieves events from Google Calendar and creates corresponding
    "Busy" placeholders in Outlook calendar without revealing event details.
    It tracks synced events to avoid duplicates and can be scheduled to run daily.

.PARAMETER ConfigPath
    Path to the configuration JSON file. Defaults to config.json in script directory.

.PARAMETER DaysToSync
    Number of days to sync forward from today. Defaults to 30.

.EXAMPLE
    .\Sync-GoogleCalendarToOutlook.ps1

.EXAMPLE
    .\Sync-GoogleCalendarToOutlook.ps1 -ConfigPath "C:\Scripts\config.json" -DaysToSync 60
#>

param(
    [string]$ConfigPath = (Join-Path $PSScriptRoot "config.json"),
    [int]$DaysToSync = 30
)

# Error handling
$ErrorActionPreference = "Stop"

# Log function
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] [$Level] $Message"
    Write-Host $logMessage

    $logPath = Join-Path $PSScriptRoot "sync-log.txt"
    Add-Content -Path $logPath -Value $logMessage
}

# Load configuration
function Get-Configuration {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        throw "Configuration file not found: $Path. Please create config.json based on config.template.json"
    }

    try {
        $config = Get-Content $Path -Raw | ConvertFrom-Json
        return $config
    }
    catch {
        throw "Failed to parse configuration file: $_"
    }
}

# Get Google Calendar OAuth token
function Get-GoogleAccessToken {
    param(
        [string]$ClientId,
        [string]$ClientSecret,
        [string]$RefreshToken
    )

    $tokenEndpoint = "https://oauth2.googleapis.com/token"

    $body = @{
        client_id     = $ClientId
        client_secret = $ClientSecret
        refresh_token = $RefreshToken
        grant_type    = "refresh_token"
    }

    try {
        $response = Invoke-RestMethod -Uri $tokenEndpoint -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"
        return $response.access_token
    }
    catch {
        throw "Failed to obtain Google access token: $_"
    }
}

# Get Google Calendar events
function Get-GoogleCalendarEvents {
    param(
        [string]$AccessToken,
        [string]$CalendarId,
        [datetime]$StartDate,
        [datetime]$EndDate
    )

    $timeMin = $StartDate.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    $timeMax = $EndDate.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

    $uri = "https://www.googleapis.com/calendar/v3/calendars/$CalendarId/events"
    $uri += "?timeMin=$timeMin&timeMax=$timeMax&singleEvents=true&orderBy=startTime"

    $headers = @{
        Authorization = "Bearer $AccessToken"
    }

    try {
        $response = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers
        return $response.items
    }
    catch {
        throw "Failed to retrieve Google Calendar events: $_"
    }
}

# Initialize Outlook application
function Get-OutlookApplication {
    try {
        $outlook = New-Object -ComObject Outlook.Application
        return $outlook
    }
    catch {
        throw "Failed to initialize Outlook COM object. Ensure Outlook is installed: $_"
    }
}

# Get or create tracking file
function Get-SyncedEventsDatabase {
    $dbPath = Join-Path $PSScriptRoot "synced-events.json"

    if (Test-Path $dbPath) {
        $content = Get-Content $dbPath -Raw | ConvertFrom-Json
        return [hashtable]$content
    }
    else {
        return @{}
    }
}

# Save tracking file
function Save-SyncedEventsDatabase {
    param([hashtable]$Database)

    $dbPath = Join-Path $PSScriptRoot "synced-events.json"
    $Database | ConvertTo-Json | Set-Content $dbPath
}

# Create or update Outlook appointment
function Sync-OutlookAppointment {
    param(
        [object]$OutlookCalendar,
        [object]$GoogleEvent,
        [hashtable]$SyncDatabase,
        [string]$PlaceholderText
    )

    # Parse event times
    $startTime = if ($GoogleEvent.start.dateTime) {
        [datetime]$GoogleEvent.start.dateTime
    }
    else {
        # All-day event
        [datetime]$GoogleEvent.start.date
    }

    $endTime = if ($GoogleEvent.end.dateTime) {
        [datetime]$GoogleEvent.end.dateTime
    }
    else {
        # All-day event
        [datetime]$GoogleEvent.end.date
    }

    $isAllDay = $null -eq $GoogleEvent.start.dateTime

    # Check if already synced
    $googleEventId = $GoogleEvent.id

    if ($SyncDatabase.ContainsKey($googleEventId)) {
        # Event already synced, check if it needs updating
        $syncedData = $SyncDatabase[$googleEventId]

        # Check if times have changed
        if ($syncedData.StartTime -eq $startTime.ToString() -and $syncedData.EndTime -eq $endTime.ToString()) {
            Write-Log "Event already synced and up-to-date: $googleEventId" "DEBUG"
            return $false
        }

        # Find and update existing appointment
        try {
            $filter = "[Subject] = '$PlaceholderText' AND [Start] = '$($syncedData.StartTime)'"
            $existingAppointment = $OutlookCalendar.Items | Where-Object {
                $_.Subject -eq $PlaceholderText -and
                $_.Start.ToString() -eq $syncedData.StartTime
            } | Select-Object -First 1

            if ($existingAppointment) {
                $existingAppointment.Start = $startTime
                $existingAppointment.End = $endTime
                $existingAppointment.AllDayEvent = $isAllDay
                $existingAppointment.Save()
                Write-Log "Updated existing appointment for event: $googleEventId"
            }
        }
        catch {
            Write-Log "Failed to update existing appointment: $_" "WARNING"
        }
    }
    else {
        # Create new appointment
        try {
            $appointment = $OutlookCalendar.Items.Add(1) # olAppointmentItem = 1
            $appointment.Subject = $PlaceholderText
            $appointment.Start = $startTime
            $appointment.End = $endTime
            $appointment.AllDayEvent = $isAllDay
            $appointment.BusyStatus = 2 # olBusy = 2
            $appointment.ReminderSet = $false
            $appointment.Save()

            Write-Log "Created new appointment for event: $googleEventId"
        }
        catch {
            Write-Log "Failed to create appointment: $_" "ERROR"
            return $false
        }
    }

    # Update sync database
    $SyncDatabase[$googleEventId] = @{
        StartTime = $startTime.ToString()
        EndTime   = $endTime.ToString()
        SyncedAt  = (Get-Date).ToString()
    }

    return $true
}

# Clean up old synced events
function Remove-OldSyncedEvents {
    param(
        [object]$OutlookCalendar,
        [hashtable]$SyncDatabase,
        [array]$CurrentGoogleEvents,
        [string]$PlaceholderText
    )

    $currentEventIds = $CurrentGoogleEvents | ForEach-Object { $_.id }
    $removedCount = 0

    # Find events in database that no longer exist in Google Calendar
    $syncedEventIds = @($SyncDatabase.Keys)
    foreach ($syncedId in $syncedEventIds) {
        if ($syncedId -notin $currentEventIds) {
            $syncedData = $SyncDatabase[$syncedId]

            # Try to find and delete the Outlook appointment
            try {
                $startTime = [datetime]$syncedData.StartTime
                $existingAppointment = $OutlookCalendar.Items | Where-Object {
                    $_.Subject -eq $PlaceholderText -and
                    $_.Start.ToString() -eq $syncedData.StartTime
                } | Select-Object -First 1

                if ($existingAppointment) {
                    $existingAppointment.Delete()
                    Write-Log "Deleted appointment for removed event: $syncedId"
                    $removedCount++
                }
            }
            catch {
                Write-Log "Failed to delete appointment: $_" "WARNING"
            }

            # Remove from database
            $SyncDatabase.Remove($syncedId)
        }
    }

    if ($removedCount -gt 0) {
        Write-Log "Removed $removedCount old appointments"
    }
}

# Main execution
try {
    Write-Log "=== Starting Google Calendar to Outlook sync ==="

    # Load configuration
    Write-Log "Loading configuration from: $ConfigPath"
    $config = Get-Configuration -Path $ConfigPath

    # Get Google access token
    Write-Log "Obtaining Google access token..."
    $accessToken = Get-GoogleAccessToken `
        -ClientId $config.google.client_id `
        -ClientSecret $config.google.client_secret `
        -RefreshToken $config.google.refresh_token

    # Get Google Calendar events
    $startDate = Get-Date
    $endDate = $startDate.AddDays($DaysToSync)
    Write-Log "Fetching Google Calendar events from $($startDate.ToString('yyyy-MM-dd')) to $($endDate.ToString('yyyy-MM-dd'))..."

    $googleEvents = Get-GoogleCalendarEvents `
        -AccessToken $accessToken `
        -CalendarId $config.google.calendar_id `
        -StartDate $startDate `
        -EndDate $endDate

    Write-Log "Retrieved $($googleEvents.Count) events from Google Calendar"

    # Initialize Outlook
    Write-Log "Connecting to Outlook..."
    $outlook = Get-OutlookApplication
    $namespace = $outlook.GetNamespace("MAPI")
    $calendar = $namespace.GetDefaultFolder(9) # olFolderCalendar = 9

    # Load sync database
    $syncDatabase = Get-SyncedEventsDatabase
    Write-Log "Loaded sync database with $($syncDatabase.Count) tracked events"

    # Sync events
    $placeholderText = if ($config.outlook.placeholder_text) {
        $config.outlook.placeholder_text
    }
    else {
        "Busy"
    }

    $syncedCount = 0
    foreach ($event in $googleEvents) {
        # Skip declined events
        if ($event.status -eq "cancelled") {
            continue
        }

        $synced = Sync-OutlookAppointment `
            -OutlookCalendar $calendar `
            -GoogleEvent $event `
            -SyncDatabase $syncDatabase `
            -PlaceholderText $placeholderText

        if ($synced) {
            $syncedCount++
        }
    }

    Write-Log "Synced $syncedCount events to Outlook"

    # Clean up old events
    if ($config.outlook.remove_deleted_events -eq $true) {
        Write-Log "Cleaning up deleted events..."
        Remove-OldSyncedEvents `
            -OutlookCalendar $calendar `
            -SyncDatabase $syncDatabase `
            -CurrentGoogleEvents $googleEvents `
            -PlaceholderText $placeholderText
    }

    # Save sync database
    Save-SyncedEventsDatabase -Database $syncDatabase
    Write-Log "Saved sync database"

    Write-Log "=== Sync completed successfully ==="
}
catch {
    Write-Log "ERROR: $_" "ERROR"
    Write-Log $_.ScriptStackTrace "ERROR"
    exit 1
}
finally {
    # Clean up COM objects
    if ($calendar) { [System.Runtime.Interopservices.Marshal]::ReleaseComObject($calendar) | Out-Null }
    if ($namespace) { [System.Runtime.Interopservices.Marshal]::ReleaseComObject($namespace) | Out-Null }
    if ($outlook) { [System.Runtime.Interopservices.Marshal]::ReleaseComObject($outlook) | Out-Null }
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}
