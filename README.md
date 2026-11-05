# SAFE SCROLL

**Understand Your Digital Habits. Take Control of Your Digital Life.**

Premium digital wellbeing, online safety, and EU public-policy awareness platform.

## What's included

- Premium responsive web app (`apps/web`)
- Expo mobile foundation (`apps/mobile`)
- Shared packages for types, wellbeing engine, validation, policy content, and API client
- Mock backend services (works with zero credentials)
- Supabase schema + migrations ready for later credentials
- Mindful breaks, challenges, analytics, AI assistant UI, family UI, admin UI

## Quick start — web

```powershell
cd C:\Users\ACER\Downloads\safescroll-eu-main\safescroll-eu-main
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

Demo sign-in: `demo@safescroll.com` / `SafeScroll123`

## Quick start — mobile

```powershell
npm install
npm run dev:mobile
```

Or:

```powershell
npm run start -w @safescroll/mobile
```

## Environment

Copy `.env.example` values into `apps/web/.env.local` when you have Supabase credentials:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_USE_MOCK=true
```

Leave empty / mock=true for full local demo mode.

## Important honesty labels

- Demo charts are **not** measured phone usage
- Age checker is an **illustrative** threshold simulation
- Wellbeing score is **experimental**, not medical
- Web cannot intercept native app launches
- Mock admin UI is not real privilege

## Legacy entry

The original monolithic `app.jsx` remains in the repository for reference. The supported application entry is now `apps/web`.
