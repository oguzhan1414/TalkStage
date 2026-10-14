#!/usr/bin/env bash
# Pull the latest code and restart the API (run on the server as 'deploy', from anywhere):  bash /opt/spekvia/TalkStage/backend/deploy/update.sh
set -euo pipefail
cd "$(dirname "$0")/.."
git pull --ff-only
cd deploy
docker compose up -d --build
docker image prune -f >/dev/null
sleep 5
docker compose ps
curl -fsS http://127.0.0.1:8000/health 2>/dev/null || docker compose exec -T api python -c "import urllib.request;print(urllib.request.urlopen('http://127.0.0.1:8000/health').read().decode())"
echo
