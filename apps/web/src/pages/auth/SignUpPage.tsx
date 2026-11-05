import { useAuth } from '@/context/AuthContext';
import { countries } from '@safescroll/policy-content';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpInput } from '@safescroll/validation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const SIGNUP_COUNTRY_CODES = ['FR', 'DE', 'IT', 'ES', 'IE', 'NL'] as const;

export function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const countryOptions = useMemo(
    () =>
      SIGNUP_COUNTRY_CODES.map((code) => {
        const match = countries.find((c) => c.code === code);
        return { code, name: match?.name ?? code };
      }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      countryCode: 'FR',
      acceptTerms: undefined,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const error = await signUp({
      email: values.email,
      password: values.password,
      displayName: values.displayName,
      countryCode: values.countryCode,
    });
    if (error) {
      setFormError(error);
      return;
    }
    navigate('/auth/profile-setup');
  });

  return (
    <div className="ss-card space-y-6">
      <div>
        <p className="ss-kicker">Get started</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Join Safe Scroll to explore digital wellbeing tools. Demo accounts stay on
          this device only.
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="displayName" className="ss-label">
            Full name
          </label>
          <input
            id="displayName"
            type="text"
            autoComplete="name"
            className="ss-input"
            placeholder="Alex Martin"
            disabled={isSubmitting}
            {...register('displayName')}
          />
          {errors.displayName ? (
            <p className="mt-1.5 text-xs text-rose-600">{errors.displayName.message}</p>
          ) : null}
        </div>

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

        <div>
          <label htmlFor="password" className="ss-label">
            Password
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

        <div>
          <label htmlFor="countryCode" className="ss-label">
            Country
          </label>
          <select
            id="countryCode"
            className="ss-input"
            disabled={isSubmitting}
            {...register('countryCode')}
          >
            {countryOptions.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.countryCode ? (
            <p className="mt-1.5 text-xs text-rose-600">{errors.countryCode.message}</p>
          ) : null}
        </div>

        <div>
          <label className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-electric focus:ring-brand-electric"
              disabled={isSubmitting}
              {...register('acceptTerms')}
            />
            <span>
              I accept the{' '}
              <Link to="/about" className="font-medium text-brand-electric hover:underline">
                terms
              </Link>{' '}
              and understand this demo stores account data locally only.
            </span>
          </label>
          {errors.acceptTerms ? (
            <p className="mt-1.5 text-xs text-rose-600">{errors.acceptTerms.message}</p>
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
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-600 dark:text-slate-300">
        Already have an account?{' '}
        <Link to="/auth/sign-in" className="font-semibold text-brand-electric hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
