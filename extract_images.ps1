$url = "https://kaufmann.com.pk/"
$content = (New-Object System.Net.WebClient).DownloadString($url)
$regex = '<img[^>]+alt=["'']([^"'']+)["''][^>]+src=["'']([^"'']+)["'']'
$matches = [regex]::Matches($content, $regex)
foreach ($match in $matches) {
    Write-Host "Alt: $($match.Groups[1].Value) - Src: $($match.Groups[2].Value)"
}
