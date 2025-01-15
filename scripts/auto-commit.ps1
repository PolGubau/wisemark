param(
    [string]$Fecha,
    [string]$Mensaje = "version bump",
    [int]$CantidadCommits = 1,  # Número de commits a hacer
    [string]$ArchivoContador = "contador.txt"  # Archivo donde modificaremos el contador
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

# Asegura que estamos en la rama correcta (puedes ajustar esto si usas una rama distinta de 'main')
$branch = git rev-parse --abbrev-ref HEAD
if ($branch -ne "main") {
    Write-Host "Te encuentras en la rama '$branch', cambiando a 'main'..."
    git checkout main
}

# Verifica si el archivo de contador existe
if (-not (Test-Path $ArchivoContador)) {
    # Si no existe el archivo, creamos uno
    Write-Host "El archivo '$ArchivoContador' no existe, creándolo..."
    Set-Content -Path $ArchivoContador -Value "0"
}

# Lee el contador actual
$contador = Get-Content -Path $ArchivoContador | Out-String
$contador = [int]$contador.Trim()

# Incrementa el contador
$contador++

# Escribe el nuevo valor del contador en el archivo
Set-Content -Path $ArchivoContador -Value $contador

# Añade todos los cambios al staging
git add .

# Bucle para hacer múltiples commits en la misma fecha
for ($i = 0; $i -lt $CantidadCommits; $i++) {
    # Realiza el commit con la fecha proporcionada y el mensaje
    $env:GIT_AUTHOR_DATE = "$($Fecha)T08:15:24"
    $env:GIT_COMMITTER_DATE = "$($Fecha)T08:15:24"

    git commit -m "$Mensaje $($i + 1)"

    # Añade un cambio (por ejemplo, incrementando el contador en el archivo) para asegurarse de que haya una modificación
    $contador++
    Set-Content -Path $ArchivoContador -Value $contador

    # Añade el archivo modificado al staging antes del siguiente commit
    git add .
}

# Empuja el commit con la fecha modificada
git push --force

# Restablece la fecha global para que los siguientes commits sean normales
git config --global user.date "default"

Write-Host "$CantidadCommits commits realizados con fecha $Fecha y subidos correctamente."
