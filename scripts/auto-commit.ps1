param(
    [string]$Fecha,
    [string]$Mensaje = "Commit para llenar el verde de GitHub"
)
# Verifica que se haya proporcionado la fecha
if (-not $Fecha) {
    Write-Host "Debes proporcionar la fecha en formato 'YYYY-MM-DD'."
    exit 1
}

# Verifica si git está instalado
$gitPath = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitPath) {
    Write-Host "Git no está instalado. Por favor, instálalo primero."
    exit 1
}


# Añade todos los cambios al staging
git add .

# Realiza el commit
git commit -m $Mensaje

# Modifica la fecha del commit para que coincida con el día indicado
$env:GIT_AUTHOR_DATE = "$Fecha 09:00:00"
$env:GIT_COMMITTER_DATE = "$Fecha 09:00:00"

# Modifica el último commit
git commit --amend --no-edit

# Empuja el commit con la fecha modificada
git push --force

# Restablece la fecha global para que los siguientes commits sean normales
git config --global user.date "default"

Write-Host "Commit realizado con fecha $Fecha y subido correctamente."
