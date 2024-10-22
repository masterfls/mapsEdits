#!/usr/bin/env bash
echo "Iniciando script de postconstrucción..."

# Sincronizar Capacitor con iOS
npx cap sync ios

echo "Script de postconstrucción completado."
