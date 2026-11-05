import { CheckCircle2, Mail } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="ss-card space-y-5 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
        <CheckCircle2 className="h-6 w-6" aria-hidden />
      </div>

      <div>
        <p className="ss-kicker">Email verification</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Email verified
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {email
            ? `Demonstration success for ${email}.`
            : 'Demonstration verification succeeded.'}{' '}
          In production this step would confirm ownership of your inbox before
          unlocking sensitive actions.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-left text-sm text-slate-600 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300">
        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-electric" aria-hidden />
        <p>
          No real confirmation email was sent. Mock authentication is for
          product demos only and is not production-secure.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link to="/auth/profile-setup" className="ss-btn-primary">
          Continue profile setup
        </Link>
        <Link to="/auth/sign-in" className="ss-btn-secondary">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
