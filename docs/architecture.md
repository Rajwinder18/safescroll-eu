# Safe Scroll Architecture

## Monorepo layout

- `apps/web` — React + Vite + TypeScript premium web application
- `apps/mobile` — Expo Router React Native foundation
- `packages/shared-types` — shared domain types
- `packages/wellbeing-engine` — age eligibility + wellbeing index calculations
- `packages/validation` — Zod schemas
- `packages/policy-content` — educational policy/quiz/checklist content
- `packages/api-client` — mock services + future Supabase-ready surface
- `supabase/` — schema, migrations, seed SQL

## Runtime modes

- **Development / demo**: no credentials required. `api-client` uses localStorage mock adapters and clearly labelled demonstration data.
- **Production (future)**: set `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` (web) or Expo public equivalents. UI remains unchanged; services swap behind `api`.

## Service surface

`auth`, `policy`, `quiz`, `checklist`, `wellbeing`, `analytics`, `challenges`, `mindful`, `preferences`, `family`, `ai`, `admin`.

## Honest capability boundaries

- Web cannot intercept native app launches.
- Screen-time charts in demo mode are not device measurements.
- Age checker is an educational threshold simulator, not a legal determination.
- Wellbeing index is experimental and non-diagnostic.
- Mock admin UI does not grant real privileges; RLS will enforce roles on Supabase.
