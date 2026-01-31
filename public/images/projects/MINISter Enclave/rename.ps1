$files = Get-ChildItem -File -Include *.jpg, *.jpeg, *.png, *.gif, *.webp | Sort-Object Name

$counter = 1

foreach ($file in $files) {
    $extension = $file.Extension.ToLower()
    $newName = "$counter$extension"
    Rename-Item $file.FullName $newName
    $counter++
}
