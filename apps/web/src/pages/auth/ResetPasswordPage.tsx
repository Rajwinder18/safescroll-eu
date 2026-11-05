import { api } from '@safescroll/api-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@safescroll/validation';
import { CheckCircle2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? 'demo-reset-token';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const result = await api.auth.resetPassword(token, values.password);
    if (result.error || !result.data) {
      setFormError(result.error || 'Could not reset password.');
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
            Password updated
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{successMessage}</p>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Demonstration success only — mock auth is not production-secure.
          </p>
        </div>
        <Link to="/auth/sign-in" className="ss-btn-primary inline-flex">
          Return to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="ss-card space-y-6">
      <div>
        <p className="ss-kicker">Account recovery</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Reset password
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Choose a new password for this demonstration account.
          {searchParams.get('token')
            ? ' Reset token detected from the link.'
            : ' No token in the URL — using a demo token.'}
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="password" className="ss-label">
            New password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="ss-input pr-11"
              placeholder="At least 8 characters"
              disabled={isSubmitting}
              {...register('password')}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password ? (
            <p className="mt-1.5 text-xs text-rose-600">{errors.password.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="ss-label">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              className="ss-input pr-11"
              placeholder="Repeat password"
              disabled={isSubmitting}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword ? (
            <p className="mt-1.5 text-xs text-rose-600">{errors.confirmPassword.message}</p>
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
          {isSubmitting ? 'Updating…' : 'Update password'}
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
