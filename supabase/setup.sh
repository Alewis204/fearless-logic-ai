#!/bin/bash

# setup.sh - Database setup guide for Fearless Logic AI

echo "🚀 Starting Fearless Logic AI Database Setup..."

# Load environment variables if available
if [ -f ../.env.local ]; then
  source ../.env.local
elif [ -f ../.env ]; then
  source ../.env
fi

echo ""
echo "Step 1: Applying Database Migrations..."
if command -v supabase &> /dev/null
then
    echo "Using Supabase CLI to apply migrations..."
    supabase db reset
    echo "✅ Migrations applied."
else
    echo "⚠️ Supabase CLI not found. Skipping automatic migration."
    echo "Manual action: Apply scripts in 'supabase/migrations/' to your database."
fi

echo ""
echo "Step 2: Seeding Initial Data..."
# If we have a DATABASE_URL, we can use psql to seed
if command -v psql &> /dev/null && [ ! -z "$DATABASE_URL" ]
then
    echo "Seeding database using psql..."
    psql "$DATABASE_URL" -f seed.sql
    echo "✅ Database seeded successfully."
else
    echo "⚠️ psql not found or DATABASE_URL not set in .env."
    echo "Manual action: Run the 'supabase/seed.sql' script against your database."
fi

echo ""
echo "Step 3: Storage Configuration..."
echo "Ensure the following buckets are created in your Supabase project with PUBLIC access:"
echo "  - 'project-thumbnails'"
echo "  - 'user-assets'"

echo ""
echo "Step 4: Auth & Redirects..."
echo "In your Supabase Auth settings, configure:"
echo "  - Site URL: http://localhost:3000 (or your production URL)"
echo "  - Redirect URLs: http://localhost:3000/api/auth/callback/*"

echo ""
echo "🎉 Setup guide complete!"
