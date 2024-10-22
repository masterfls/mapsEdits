#!/usr/bin/env bash
echo "Iniciando script de preconstrucción..."

# Instalar dependencias
npm install

# Construir el frontend y copiar a webDir
npm run build:all

echo "Script de preconstrucción completado."
