#!/bin/bash

# 🚂 ZebraOps Railway Environment Restorer Script
# Run this to restore critical env vars to your n8n Primary service
# Replace SERVICE_ID with your actual Railway service ID or use `railway link`

echo "Restoring Railway environment variables to n8n Primary..."

# Example SERVICE ID override (optional)
# export RAILWAY_SERVICE_ID=your-service-id-here

# Postgres connection
railway variables:set DB_TYPE=postgresdb
railway variables:set DB_POSTGRESDB_HOST=$PGHOST
railway variables:set DB_POSTGRESDB_PORT=$PGPORT
railway variables:set DB_POSTGRESDB_DATABASE=$PGDATABASE
railway variables:set DB_POSTGRESDB_USER=$PGUSER
railway variables:set DB_POSTGRESDB_PASSWORD=$PGPASSWORD

# Redis (optional)
railway variables:set QUEUE_MODE=redis
railway variables:set REDIS_HOST=$REDIS_HOST
railway variables:set REDIS_PORT=$REDIS_PORT

# Required n8n fields
railway variables:set N8N_HOST=n8n.zebraindustries.net
railway variables:set N8N_PORT=5678
railway variables:set N8N_PROTOCOL=https
railway variables:set WEBHOOK_URL=https://n8n.zebraindustries.net/
railway variables:set N8N_EDITOR_BASE_URL=https://n8n.zebraindustries.net
railway variables:set N8N_API_URL=https://n8n.zebraindustries.net/

# Auth
railway variables:set N8N_BASIC_AUTH_ACTIVE=true
railway variables:set N8N_BASIC_AUTH_USER=zebraops
railway variables:set N8N_BASIC_AUTH_PASSWORD=securezebrapass

# Misc
railway variables:set GENERIC_TIMEZONE=America/Chicago
railway variables:set N8N_ENCRYPTION_KEY=changeme-supersecret-zebra-key
railway variables:set N8N_DISABLE_PRODUCTION_MAIN_MENU=true
railway variables:set N8N_DIAGNOSTICS_ENABLED=false
railway variables:set N8N_PERSONALIZATION_ENABLED=false

echo "✅ Environment variables restored. You can now redeploy your service."