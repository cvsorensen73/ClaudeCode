# Google Calendar to Outlook Sync Script

This PowerShell script synchronizes your Google Calendar events to your Outlook calendar as "Busy" placeholders, protecting your privacy while showing availability.

## Features

- ✅ Syncs Google Calendar events to Outlook
- ✅ Creates "Busy" placeholders without revealing event details
- ✅ Handles all-day events and timed events
- ✅ Tracks synced events to avoid duplicates
- ✅ Updates changed events
- ✅ Removes deleted events (optional)
- ✅ Configurable sync period (default: 30 days)
- ✅ Detailed logging

## Prerequisites

- Windows operating system
- Microsoft Outlook installed and configured
- PowerShell 5.1 or later
- Google account with Calendar access
- Internet connection

## Setup Instructions

### Step 1: Enable Google Calendar API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Click "Enable APIs and Services"
   - Search for "Google Calendar API"
   - Click "Enable"

### Step 2: Create OAuth 2.0 Credentials

1. In Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - Choose "External" user type
   - Fill in app name (e.g., "Calendar Sync")
   - Add your email as developer contact
   - Click "Save and Continue"
   - Add scope: `https://www.googleapis.com/auth/calendar.readonly`
   - Add yourself as a test user
4. Create OAuth client ID:
   - Application type: "Desktop app"
   - Name: "Calendar Sync Script"
   - Click "Create"
5. Download the JSON file or copy the Client ID and Client Secret

### Step 3: Get Refresh Token

You'll need to obtain a refresh token. Here's a PowerShell script to help:

```powershell
# Replace these values with your actual credentials
$clientId = "YOUR_CLIENT_ID"
$clientSecret = "YOUR_CLIENT_SECRET"

# Authorization URL
$scope = "https://www.googleapis.com/auth/calendar.readonly"
$redirectUri = "http://localhost"

$authUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=$clientId&redirect_uri=$redirectUri&response_type=code&scope=$scope&access_type=offline&prompt=consent"

Write-Host "Open this URL in your browser:"
Write-Host $authUrl
Write-Host ""
Write-Host "After authorizing, you'll be redirected to localhost. Copy the 'code' parameter from the URL."
$authCode = Read-Host "Paste the authorization code here"

# Exchange code for tokens
$tokenUrl = "https://oauth2.googleapis.com/token"
$body = @{
    code          = $authCode
    client_id     = $clientId
    client_secret = $clientSecret
    redirect_uri  = $redirectUri
    grant_type    = "authorization_code"
}

$response = Invoke-RestMethod -Uri $tokenUrl -Method Post -Body $body
Write-Host "`nYour Refresh Token:"
Write-Host $response.refresh_token -ForegroundColor Green
```

### Step 4: Configure the Script

1. Copy `config.template.json` to `config.json`:
   ```powershell
   Copy-Item config.template.json config.json
   ```

2. Edit `config.json` with your credentials:
   ```json
   {
     "google": {
       "client_id": "your-client-id.apps.googleusercontent.com",
       "client_secret": "your-client-secret",
       "refresh_token": "your-refresh-token",
       "calendar_id": "primary"
     },
     "outlook": {
       "placeholder_text": "Busy",
       "remove_deleted_events": true
     }
   }
   ```

### Configuration Options

- **google.client_id**: Your Google OAuth client ID
- **google.client_secret**: Your Google OAuth client secret
- **google.refresh_token**: Your OAuth refresh token
- **google.calendar_id**: Google calendar to sync (`primary` for your main calendar, or a specific calendar ID)
- **outlook.placeholder_text**: Text to display in Outlook (default: "Busy")
- **outlook.remove_deleted_events**: Whether to remove events from Outlook when deleted from Google Calendar (default: true)

## Usage

### Run Manually

```powershell
.\Sync-GoogleCalendarToOutlook.ps1
```

### Run with Custom Settings

```powershell
# Sync 60 days instead of default 30
.\Sync-GoogleCalendarToOutlook.ps1 -DaysToSync 60

# Use custom config file
.\Sync-GoogleCalendarToOutlook.ps1 -ConfigPath "C:\MyConfig\config.json"
```

## Schedule Daily Sync

### Option 1: Using Task Scheduler GUI

1. Open Task Scheduler (search "Task Scheduler" in Start menu)
2. Click "Create Basic Task"
3. Name: "Google Calendar Sync"
4. Trigger: "Daily"
5. Set time (e.g., 6:00 AM)
6. Action: "Start a program"
7. Program/script: `powershell.exe`
8. Add arguments:
   ```
   -ExecutionPolicy Bypass -File "C:\Path\To\Sync-GoogleCalendarToOutlook.ps1"
   ```
   (Replace with actual path to the script)
9. Start in: `C:\Path\To\` (directory containing the script)
10. Finish and test

### Option 2: Using PowerShell

```powershell
$action = New-ScheduledTaskAction -Execute "powershell.exe" `
    -Argument "-ExecutionPolicy Bypass -File `"C:\Path\To\Sync-GoogleCalendarToOutlook.ps1`""

$trigger = New-ScheduledTaskTrigger -Daily -At 6:00AM

$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" `
    -LogonType S4U

$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd

Register-ScheduledTask -TaskName "Google Calendar Sync" `
    -Action $action `
    -Trigger $trigger `
    -Principal $principal `
    -Settings $settings `
    -Description "Syncs Google Calendar to Outlook as busy placeholders"
```

### Option 3: Multiple Times Per Day

To sync multiple times daily (e.g., every 6 hours):

```powershell
$action = New-ScheduledTaskAction -Execute "powershell.exe" `
    -Argument "-ExecutionPolicy Bypass -File `"C:\Path\To\Sync-GoogleCalendarToOutlook.ps1`""

# Create multiple triggers
$trigger1 = New-ScheduledTaskTrigger -Daily -At 6:00AM
$trigger2 = New-ScheduledTaskTrigger -Daily -At 12:00PM
$trigger3 = New-ScheduledTaskTrigger -Daily -At 6:00PM

$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" `
    -LogonType S4U

$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd

Register-ScheduledTask -TaskName "Google Calendar Sync" `
    -Action $action `
    -Trigger @($trigger1, $trigger2, $trigger3) `
    -Principal $principal `
    -Settings $settings `
    -Description "Syncs Google Calendar to Outlook as busy placeholders"
```

## Logs

The script creates logs in the same directory:

- **sync-log.txt**: Detailed execution log
- **synced-events.json**: Database of synced events (do not manually edit)

## Troubleshooting

### "Failed to initialize Outlook COM object"
- Ensure Microsoft Outlook is installed
- Try running the script as administrator
- Check if Outlook can be opened manually

### "Failed to obtain Google access token"
- Verify your client ID and client secret are correct
- Check that your refresh token is valid
- Ensure the Google Calendar API is enabled

### "Configuration file not found"
- Make sure `config.json` exists in the same directory as the script
- Check the file path if using `-ConfigPath` parameter

### Events not syncing
- Check `sync-log.txt` for detailed error messages
- Verify your Google Calendar has events in the sync period
- Ensure Outlook is not in offline mode

### Duplicate events
- The script tracks synced events in `synced-events.json`
- If you see duplicates, delete `synced-events.json` and the synced events in Outlook, then run the script again

## Security Notes

- Keep your `config.json` file secure (contains sensitive credentials)
- Add `config.json` to `.gitignore` if using version control
- The refresh token has read-only access to your calendar
- No event details are stored locally except start/end times for tracking

## Privacy

This script only creates "Busy" placeholders in Outlook without revealing:
- Event titles
- Event descriptions
- Event locations
- Attendees
- Any other event details

Your Google Calendar events remain private while showing availability in Outlook.

## License

This script is provided as-is for personal use.
