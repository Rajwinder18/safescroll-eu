# API / service contracts

All services return `ApiResult<T>`:

```ts
{ data: T | null; error: string | null; meta?: { source: 'mock' | 'supabase' | 'local'; demo?: boolean } }
```

## Auth

- `getSession`, `signIn`, `signUp`, `signOut`, `requestPasswordReset`, `resetPassword`, `updateProfile`
- Demo credentials: `demo@safescroll.com` / `SafeScroll123`

## Wellbeing

- `analyze(input)` → score, exposure totals, breakdown, disclaimer
- `history()` → local demo history
- `getHealthMatrix()` → educational impact items

## Mindful

- `record(event)` / `listEvents()`
- `getNativeIntegrationStatuses()` — readiness only; not active on web

## AI

- Mock conversational adapter with sourced policy replies for common prompts
- Future: Edge Function proxy; never expose provider keys in clients
