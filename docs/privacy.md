# Privacy notes

- Prefer minimizing children’s personal data. Date-of-birth used in the age checker remains client-side in demo mode.
- Family features require explicit consent UI and must not implement covert surveillance.
- Local demo auth stores passwords in browser storage for demonstration only — replace with Supabase Auth before production.
- Never ship service-role keys to web or mobile clients.
- Export/delete interfaces in settings prepare users for data-subject rights once backend is connected.
