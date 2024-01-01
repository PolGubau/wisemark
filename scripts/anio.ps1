param(
    [int]$Anio,  # Año para el cual hacer los commits
    [string]$MensajeBase = "Version bump",  # Mensaje base para los commits
    [string]$ArchivoContador = "contador.txt",  # Archivo donde podemos guardar el contador si lo necesitas
    [string[]]$Archivos = @("archivo.txt"),  # Archivos a modificar
    [string]$Hora = "08:00:00"  # Hora del commit
)

# Función para obtener todas las fechas de un año específico
function ObtenerFechasDelAño {
    param([int]$anio)
    $fechas = @()
    
    $fechaInicial = Get-Date -Year $anio -Month 1 -Day 1
    $fechaFinal = Get-Date -Year $anio -Month 12 -Day 31
    $fechaActual = $fechaInicial

    while ($fechaActual -le $fechaFinal) {
        $fechas += $fechaActual
        $fechaActual = $fechaActual.AddDays(1)
    }

    return $fechas
}

# Obtener todas las fechas del año proporcionado
$fechas = ObtenerFechasDelAño -anio $Anio

# Verifica si git está instalado
$gitPath = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitPath) {
    Write-Host "Git no está instalado. Por favor, instálalo primero."
    exit 1
}

# Cambio a la rama 'main' si es necesario
$branch = git rev-parse --abbrev-ref HEAD
if ($branch -ne "main") {
    Write-Host "Te encuentras en la rama '$branch', cambiando a 'main'..."
    git checkout main
}

# Verifica si el archivo de contador existe
if (-not (Test-Path $ArchivoContador)) {
    Set-Content -Path $ArchivoContador -Value "0"
}

# Lee el contador actual
$contador = Get-Content -Path $ArchivoContador | Out-String
$contador = [int]$contador.Trim()

# Recorre cada fecha y realiza el commit
foreach ($fecha in $fechas) {
    # Convertir la fecha al formato adecuado para git (YYYY-MM-DDT12:00:00)
    $fechaFormateada = $fecha.ToString("yyyy-MM-dd")
    $env:GIT_AUTHOR_DATE = $fechaFormateada + "T" + $Hora
    $env:GIT_COMMITTER_DATE = $fechaFormateada + "T" + $Hora


    # Mensaje de commit
    $mensajeCommit = "$MensajeBase $fechaFormateada"

    # Realiza el cambio en el archivo (puedes añadir más archivos aquí si es necesario)
    $contador++
    Set-Content -Path $ArchivoContador -Value $contador
    git add .

    # Realiza el commit
    git commit -m "$mensajeCommit"

    # Añade el archivo modificado al staging antes del siguiente commit
    git add .
}

# Empuja los commits
git push

Write-Host "Se han realizado los commits para cada día del año $Anio y se han subido correctamente."
