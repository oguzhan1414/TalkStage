#!/usr/bin/env bash
# One-time server preparation for a fresh Ubuntu/Debian VPS. Run as root:  bash setup-server.sh
# It does NOT touch SSH settings (so you cannot lock yourself out); see README_DEPLOY.md for that step.
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
  echo "Run as root (sudo bash setup-server.sh)"; exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y
apt-get install -y ca-certificates curl git ufw fail2ban unattended-upgrades

# Firewall: only SSH + web
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 443/udp
ufw --force enable

# Brute-force protection for SSH, automatic security updates
systemctl enable --now fail2ban
dpkg-reconfigure -f noninteractive unattended-upgrades || true

# Docker (official convenience script)
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi
systemctl enable --now docker

# Non-root user that runs the app
if ! id deploy >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" deploy
fi
usermod -aG docker deploy
if [ -f /root/.ssh/authorized_keys ]; then
  mkdir -p /home/deploy/.ssh
  cp /root/.ssh/authorized_keys /home/deploy/.ssh/authorized_keys
  chown -R deploy:deploy /home/deploy/.ssh
  chmod 700 /home/deploy/.ssh && chmod 600 /home/deploy/.ssh/authorized_keys
fi

# deploy has no password (key-only login), so give it passwordless sudo to be able to administer the box
echo 'deploy ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/90-deploy
chmod 440 /etc/sudoers.d/90-deploy
visudo -c -f /etc/sudoers.d/90-deploy

mkdir -p /opt/spekvia && chown deploy:deploy /opt/spekvia

echo
echo "Done. Next: README_DEPLOY.md step 4 (SSH key login), then log in as 'deploy'."
docker --version
