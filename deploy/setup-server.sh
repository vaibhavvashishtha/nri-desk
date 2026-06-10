#!/bin/bash
# ============================================================
# NRI Desk — One-time server setup script
# Run on the Digital Ocean droplet as root (or with sudo).
# Designed to coexist with panchtattawa on the same droplet:
# nri-desk runs on port 3100 (panchtattawa uses 3000).
# Usage: bash setup-server.sh
# ============================================================
set -e

APP_DIR="/var/www/nri-desk"
REPO_URL="${REPO_URL:-https://github.com/vaibhavvashishtha/nri-desk.git}"
DOMAIN="nridesk.untangleai.tech"

echo "==> Updating system packages..."
apt-get update -y && apt-get upgrade -y

echo "==> Ensuring swap (skipped if already present)..."
if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> Installing prerequisites (idempotent)..."
apt-get install -y build-essential python3 git nginx
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

echo "==> Node: $(node -v) | npm: $(npm -v)"

echo "==> Cloning / updating repo..."
mkdir -p /var/www
if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR" && git pull
else
  git clone "$REPO_URL" "$APP_DIR"
fi

echo "==> Installing dependencies..."
cd "$APP_DIR"
npm ci

echo "==> Generating .env (if missing)..."
if [ ! -f "$APP_DIR/.env" ]; then
  cp "$APP_DIR/.env.example" "$APP_DIR/.env"
  cat >> "$APP_DIR/.env" <<'EOT'

# Server-only — never exposed in the browser bundle.
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-4-6
EOT
  echo ""
  echo "==> .env created. Edit it now and set ANTHROPIC_API_KEY:"
  echo "    nano $APP_DIR/.env"
  read -p "Press ENTER once .env is filled in..."
fi

echo "==> Building Vite app..."
NODE_OPTIONS="--max-old-space-size=1024" npm run build

echo "==> Starting with PM2..."
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u root --hp /root | tail -1 | bash || true

echo "==> Configuring Nginx..."
cp "$APP_DIR/deploy/nginx.conf" "/etc/nginx/sites-available/$DOMAIN"
ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
nginx -t && systemctl reload nginx

echo ""
echo "============================================"
echo " Setup complete!"
echo " Site: http://$DOMAIN"
echo ""
echo " Next: enable HTTPS via Certbot —"
echo "   apt-get install -y certbot python3-certbot-nginx"
echo "   certbot --nginx -d $DOMAIN"
echo ""
echo " Useful:"
echo "   pm2 status"
echo "   pm2 logs nri-desk"
echo "   bash $APP_DIR/deploy/update.sh"
echo "============================================"
