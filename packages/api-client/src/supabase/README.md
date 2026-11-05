# Supabase adapters

When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are provided, implement adapters here that satisfy the same method signatures as the mock services exported from `../services/*`.

Recommended order:

1. `authService` → Supabase Auth
2. `policyService` → `policies` table + realtime
3. `quizService` / `wellbeingService` / `mindfulService` → user-scoped tables with RLS
4. `aiService` → Edge Function proxy (never expose provider keys)

Keep returning `ApiResult<T>` so the UI does not need rebuilds.
