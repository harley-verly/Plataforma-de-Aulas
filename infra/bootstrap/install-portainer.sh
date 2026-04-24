#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Este script precisa ser executado como root."
  exit 1
fi

docker volume inspect portainer_data >/dev/null 2>&1 || docker volume create portainer_data

docker ps -a --format '{{.Names}}' | grep -q '^portainer$' && docker rm -f portainer >/dev/null 2>&1 || true

docker run -d \
  --name portainer \
  --restart unless-stopped \
  -p 8000:8000 \
  -p 9443:9443 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:lts \
  --http-disabled

echo "Portainer CE iniciado em https://<ip>:9443"
