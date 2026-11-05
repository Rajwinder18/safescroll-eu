import { useAuth } from '@/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, type SignInInput } from '@safescroll/validation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const DEMO_EMAIL = 'demo@safescroll.com';
const DEMO_PASSWORD = 'SafeScroll123';

export function SignInPage() {
  const { signIn, enterDemo } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [demoLoading, setDemoLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const error = await signIn(values.email, values.password, values.rememberMe ?? true);
    if (error) {
      setFormError(error);
      return;
    }
    navigate('/app');
  });

  const onDemoSignIn = async () => {
    setFormError(null);
    setDemoLoading(true);
    try {
      await enterDemo();
      navigate('/app');
    } catch {
      setFormError('Could not start demonstration session.');
    } finally {
      setDemoLoading(false);
    }
  };

  const busy = isSubmitting || demoLoading;

  return (
    <div className="ss-card space-y-6">
      <div>
        <p className="ss-kicker">Welcome back</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Sign in
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Continue to your Safe Scroll wellbeing workspace.
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
            disabled={busy}
            {...register('email')}
          />
          {errors.email ? (
            <p className="mt-1.5 text-xs text-rose-600">{errors.email.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="password" className="ss-label">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              className="ss-input pr-11"
              placeholder="Your password"
              disabled={busy}
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

        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-brand-electric focus:ring-brand-electric"
              disabled={busy}
              {...register('rememberMe')}
            />
            Remember me
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-sm font-medium text-brand-electric hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {formError ? (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200"
          >
            {formError}
          </div>
        ) : null}

        <button type="submit" className="ss-btn-primary w-full" disabled={busy}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-slate-200 dark:border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wide">
          <span className="bg-white px-2 text-slate-400 dark:bg-slate-900/80">or</span>
        </div>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          className="ss-btn-secondary w-full"
          onClick={onDemoSignIn}
          disabled={busy}
        >
          {demoLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          Demo sign-in
        </button>
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Demonstration-only credentials:{' '}
          <span className="font-medium text-slate-700 dark:text-slate-200">{DEMO_EMAIL}</span> /{' '}
          <span className="font-medium text-slate-700 dark:text-slate-200">{DEMO_PASSWORD}</span>
        </p>
      </div>

      <p className="text-center text-sm text-slate-600 dark:text-slate-300">
        New here?{' '}
        <Link to="/auth/sign-up" className="font-semibold text-brand-electric hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
