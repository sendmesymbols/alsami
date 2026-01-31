$files = Get-ChildItem -File -Include *.jpg, *.jpeg, *.png, *.gif, *.webp |
         Sort-Object LastWriteTime

$counter = 1

foreach ($file in $files) {
    $extension = $file.Extension.ToLower()
    $tempName  = "_tmp_$([guid]::NewGuid())$extension"
    $finalName = "$counter$extension"

    Rename-Item $file.FullName $tempName
    Rename-Item $tempName $finalName

    $counter++
}
