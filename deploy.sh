#!/usr/bin/env bash
set -euo pipefail   # New: detenerse ante cualquier error o variable no definida

# Declara nuevas variables en inglés
DEPLOY_DIR="$(pwd)"

# New: traer y forzar la última versión del repositorio
echo "Obteniendo últimos cambios de Git..."
git fetch origin
git reset --hard origin/main

if [ -f docker-compose.yml ]; then
    echo "Usando docker-compose para el despliegue..."
    docker-compose pull            # New: bajar última imagen si la usas
    docker-compose down
    docker-compose up -d --build
else
    echo "Construyendo la imagen Docker..."
    docker build --pull -t la-lonja:latest .   # New: forzar pull de la imagen base

    echo "Build exitoso, reiniciando contenedor..."
    docker stop la-lonja || true
    docker rm la-lonja   || true

    echo "Ejecutando el contenedor..."
    docker run -d \
        --name la-lonja \
        -p 9104:9104 \
        --restart unless-stopped \
        la-lonja:latest
fi

echo "Despliegue completado."
