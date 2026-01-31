# Get all files in the current directory (exclude folders)
$files = Get-ChildItem -File | Sort-Object Name

$counter = 1

foreach ($file in $files) {
    $newName = "$counter$($file.Extension)"
    Rename-Item -Path $file.FullName -NewName $newName
    $counter++
}
