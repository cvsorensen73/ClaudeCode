<#
.SYNOPSIS
    Helper script to obtain Google Calendar API refresh token.

.DESCRIPTION
    This script guides you through the OAuth 2.0 flow to obtain a refresh token
    for accessing Google Calendar API. The refresh token is required for the
    sync script to work.

.EXAMPLE
    .\Get-GoogleRefreshToken.ps1
#>

Write-Host "=== Google Calendar API - Refresh Token Generator ===" -ForegroundColor Cyan
Write-Host ""

# Prompt for credentials
Write-Host "You'll need your Google OAuth 2.0 credentials." -ForegroundColor Yellow
Write-Host "Get them from: https://console.cloud.google.com/apis/credentials" -ForegroundColor Yellow
Write-Host ""

$clientId = Read-Host "Enter your Client ID"
$clientSecret = Read-Host "Enter your Client Secret" -AsSecureString
$clientSecretPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($clientSecret)
)

Write-Host ""
Write-Host "Step 1: Authorization" -ForegroundColor Green
Write-Host "----------------------------------------"

# Build authorization URL
$scope = "https://www.googleapis.com/auth/calendar.readonly"
$redirectUri = "http://localhost"

$authUrl = "https://accounts.google.com/o/oauth2/v2/auth?"
$authUrl += "client_id=$clientId"
$authUrl += "&redirect_uri=$([uri]::EscapeDataString($redirectUri))"
$authUrl += "&response_type=code"
$authUrl += "&scope=$([uri]::EscapeDataString($scope))"
$authUrl += "&access_type=offline"
$authUrl += "&prompt=consent"

Write-Host "Opening your browser to authorize the application..."
Write-Host ""
Write-Host "Authorization URL:" -ForegroundColor Cyan
Write-Host $authUrl
Write-Host ""

# Try to open browser
try {
    Start-Process $authUrl
    Write-Host "Browser opened successfully." -ForegroundColor Green
}
catch {
    Write-Host "Could not open browser automatically. Please copy the URL above and open it manually." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "After authorizing:" -ForegroundColor Yellow
Write-Host "1. You'll be redirected to a localhost URL (may show 'can't reach this page' - that's OK)"
Write-Host "2. Look at the URL in your browser's address bar"
Write-Host "3. Copy the value of the 'code' parameter"
Write-Host ""
Write-Host "Example URL: http://localhost/?code=4/0AbC123...&scope=https://..."
Write-Host "Copy only the part after 'code=' and before '&scope'" -ForegroundColor Cyan
Write-Host ""

$authCode = Read-Host "Paste the authorization code here"

Write-Host ""
Write-Host "Step 2: Exchanging code for tokens..." -ForegroundColor Green
Write-Host "----------------------------------------"

# Exchange authorization code for tokens
$tokenUrl = "https://oauth2.googleapis.com/token"
$body = @{
    code          = $authCode
    client_id     = $clientId
    client_secret = $clientSecretPlain
    redirect_uri  = $redirectUri
    grant_type    = "authorization_code"
}

try {
    $response = Invoke-RestMethod -Uri $tokenUrl -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"

    Write-Host ""
    Write-Host "SUCCESS! Tokens received." -ForegroundColor Green
    Write-Host ""
    Write-Host "Your Refresh Token:" -ForegroundColor Cyan
    Write-Host "----------------------------------------"
    Write-Host $response.refresh_token -ForegroundColor Yellow
    Write-Host "----------------------------------------"
    Write-Host ""
    Write-Host "IMPORTANT: Save this refresh token securely!" -ForegroundColor Red
    Write-Host "You'll need to add it to your config.json file." -ForegroundColor Yellow
    Write-Host ""

    # Offer to create config.json
    $createConfig = Read-Host "Would you like to create config.json now? (Y/N)"

    if ($createConfig -eq "Y" -or $createConfig -eq "y") {
        $calendarId = Read-Host "Enter your Google Calendar ID (press Enter for 'primary')"
        if ([string]::IsNullOrWhiteSpace($calendarId)) {
            $calendarId = "primary"
        }

        $placeholderText = Read-Host "Enter placeholder text for Outlook (press Enter for 'Busy')"
        if ([string]::IsNullOrWhiteSpace($placeholderText)) {
            $placeholderText = "Busy"
        }

        $config = @{
            google  = @{
                client_id     = $clientId
                client_secret = $clientSecretPlain
                refresh_token = $response.refresh_token
                calendar_id   = $calendarId
            }
            outlook = @{
                placeholder_text      = $placeholderText
                remove_deleted_events = $true
            }
        }

        $configPath = Join-Path $PSScriptRoot "config.json"
        $config | ConvertTo-Json -Depth 10 | Set-Content $configPath

        Write-Host ""
        Write-Host "Configuration saved to: $configPath" -ForegroundColor Green
        Write-Host ""
        Write-Host "You can now run the sync script:" -ForegroundColor Cyan
        Write-Host ".\Sync-GoogleCalendarToOutlook.ps1" -ForegroundColor Yellow
    }
    else {
        Write-Host ""
        Write-Host "Remember to add the refresh token to your config.json file!" -ForegroundColor Yellow
    }
}
catch {
    Write-Host ""
    Write-Host "ERROR: Failed to exchange authorization code for tokens." -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "- Make sure you copied the entire authorization code"
    Write-Host "- Verify your Client ID and Client Secret are correct"
    Write-Host "- Check that you haven't used this authorization code before (they can only be used once)"
    Write-Host ""
    exit 1
}
