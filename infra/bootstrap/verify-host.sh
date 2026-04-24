#!/usr/bin/env bash
set -euo pipefail

echo "Docker path: $(command -v docker || true)"
echo "Docker service: $(systemctl is-active docker || true)"
echo "Docker compose: $(docker compose version || true)"
echo "Containers:"
docker ps --format '{{.Names}}|{{.Image}}|{{.Status}}'
