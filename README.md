# Fearless Logic AI

Fearless Logic AI is an all-in-one AI-powered platform that lets entrepreneurs build websites, apps, and funnels without coding.

## Getting Started

### 1. Environment Setup

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

You will need:
- **Supabase**: URL and service role key for database access.
- **NextAuth**: Secret and provider credentials (Google/GitHub).
- **Stripe**: API keys and Price IDs for billing.
- **OpenAI**: API key for the blueprint generation engine.

### 2. Database Migrations

Apply the database migrations to your Supabase instance:

```bash
# Using Supabase CLI
supabase db push
```

Alternatively, run the SQL in `/supabase/migrations` manually in the Supabase SQL Editor.

### 3. Development Server

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL (Supabase)
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **AI**: OpenAI GPT-4
- **Styling**: Tailwind CSS v4

## Deployment

This project is optimized for deployment on **Vercel**.

1. Connect your repository to Vercel.
2. Add all environment variables from `.env.example`.
3. Deploy!
