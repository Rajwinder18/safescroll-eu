# SAFE SCROLL 🛡️
### Understanding the EU's Plan to Keep Children Under 15 Off Social Media
**Project Type:** Educational + Public Policy Awareness + Interactive Digital Wellbeing Web Application

**Repository:** https://github.com/Rajwinder18/safescroll-eu

---

## 🌟 Overview & Highlights
**Safe Scroll** is a modern, responsive web application designed with Apple/Fintech-inspired UI standards (soft purples, electric blues, mint greens, dark navy mode, and glassmorphism). It details how the European Union and member states are approaching adolescent social media access, algorithmic protections, age assurance technologies, and digital health safeguards.

### 🔑 Key Features
1. **Interactive Authentication System**:
   - Seamless sign-in & registration with form validation and password visibility toggle.
   - Built-in one-click demo credentials (`demo@safescroll.com` / `SafeScroll123`).
   - Session persistence and profile customization.
2. **Dynamic Age Eligibility Checker**:
   - Exact age calculation handling leap years, months, and days dynamically against current time.
   - Adjustable threshold simulation: Under 13, Under 15 (default scenario), Under 16, or Custom.
   - Country-by-country EU regulatory breakdown (France, Germany, Italy, Spain, etc.).
   - Interactive celebratory confetti feedback on reaching eligibility thresholds.
3. **Digital Wellbeing & Screen Time Analyzer**:
   - Interactive sliders for social media hours, total smartphone use, sleep hours, and physical exercise.
   - Computes daily, weekly, monthly, and annual digital exposure.
   - Digital Wellbeing Index score (0–100) with personalized health recommendations without stigmatizing diagnostic labels.
4. **Health Impact Matrix**:
   - Interactive duration slider showing physiological responses (sleep architecture, ocular asthenopia, cervical "text neck", dopamine loops, social comparison).
   - Filterable categories: Physical, Mental & Emotional, Cognitive & Behavioral.
5. **Multi-Stakeholder Prevention Action Plan**:
   - Interactive checklists for Parents, Children/Teens, Schools, and Platform Engineers.
   - Checkbox states persist automatically in `localStorage`.
6. **EU Policy Explainer & Chronological Timeline**:
   - Clarifies differences between active binding law (GDPR Art. 8, DSA Articles 28 & 34) and active under-15 legislative proposals (e.g., France's Loi 2023-566 and EU Digital Identity eIDAS 2.0 wallet pilots).
7. **10-Question Interactive Digital Safety Quiz**:
   - Full question bank with instant validation, scoring, progress tracking, and detailed policy explanations.
8. **Interactive Visual Analytics**:
   - Dynamic Chart.js charts: 24-Hour Time Allocation Doughnut, Weekly Social Exposure Trends, and Member State Digital Majority Age Comparisons.
9. **Research & Policy References**:
   - Verified citations and direct source links to the European Commission, European Parliament, WHO, UNICEF, and EU Kids Online.

---

## 🚀 How to Run the Application

Because all vendor libraries (React, ReactDOM, Babel Standalone, Tailwind CSS, Lucide Icons, Chart.js, and Canvas Confetti) are bundled locally in the `vendor/` directory, the project can run in any modern web browser or via a local static server:

### Option 1: Direct Browser Launch
Open `index.html` located at:
`C:\Users\Dell\.gemini\antigravity\scratch\safescroll\index.html`
in Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option 2: Local Python Server (Recommended for live demonstrations)
Open a terminal in the folder:
```powershell
cd C:\Users\Dell\.gemini\antigravity\scratch\safescroll
python -m http.server 8080
```
Then navigate to `http://localhost:8080` in your browser.

---

## 🧪 Preset Demo Login Credentials
- **Email:** `demo@safescroll.com`
- **Password:** `SafeScroll123`
- *(Alternatively, use the **One-Click Demo Sign In** button directly on the login card.)*

## 🛠️ Vite and Supabase development

Install dependencies and run the Vite development server:

```powershell
npm install
npm run dev
```

To enable secure authentication, policy administration, and realtime policy/progress updates:

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local`.
4. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Mark trusted administrators with `role = 'admin'` in `public.profiles`.

Without Supabase variables, the educational demo mode and local browser persistence continue to work.

## 🚀 Netlify continuous deployment

Connect the repository to Netlify and use the build settings already defined in [`netlify.toml`](./netlify.toml):

- Build command: `npm run build`
- Publish directory: `dist`

Add the same `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` values as Netlify environment variables before deploying.
