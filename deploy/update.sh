#!/bin/bash
# ============================================================
# NRI Desk — Deploy update script
# Usage: bash /var/www/nri-desk/deploy/update.sh
# ============================================================
set -e

APP_DIR="/var/www/nri-desk"

echo "==> Pulling latest code..."
cd "$APP_DIR"
git pull origin main

echo "==> Installing dependencies..."
npm ci

echo "==> Building Vite app..."
NODE_OPTIONS="--max-old-space-size=1024" npm run build

echo "==> Restarting PM2..."
pm2 restart nri-desk

echo ""
echo "Deploy complete! Site: https://nridesk.untangleai.tech"
pm2 status nri-desk
