import { api } from '@safescroll/api-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@safescroll/validation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    setSuccessMessage(null);
    const result = await api.auth.requestPasswordReset(values.email);
    if (result.error || !result.data) {
      setFormError(result.error || 'Could not request a password reset.');
      return;
    }
    setSuccessMessage(result.data.message);
  });

  if (successMessage) {
    return (
      <div className="ss-card space-y-5 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Check your inbox
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{successMessage}</p>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Demonstration only — no real email was sent. Mock auth is not
            production-secure.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link to="/auth/reset-password" className="ss-btn-primary">
            Continue to reset
          </Link>
          <Link to="/auth/sign-in" className="ss-btn-secondary">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ss-card space-y-6">
      <div>
        <p className="ss-kicker">Account recovery</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Forgot password
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Enter your email and we will simulate a reset link for this demo.
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="email" className="ss-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="ss-input"
            placeholder="you@example.com"
            disabled={isSubmitting}
            {...register('email')}
          />
          {errors.email ? (
            <p className="mt-1.5 text-xs text-rose-600">{errors.email.message}</p>
          ) : null}
        </div>

        {formError ? (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200"
          >
            {formError}
          </div>
        ) : null}

        <button type="submit" className="ss-btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {isSubmitting ? 'Sending…' : 'Send reset link'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-600 dark:text-slate-300">
        <Link to="/auth/sign-in" className="font-semibold text-brand-electric hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
