import { useAuth } from '@/context/AuthContext';
import { countries } from '@safescroll/policy-content';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSetupSchema, type ProfileSetupInput } from '@safescroll/validation';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const PROFILE_COUNTRY_CODES = ['FR', 'DE', 'IT', 'ES', 'IE', 'NL'] as const;

const ROLE_OPTIONS: { value: ProfileSetupInput['roleIntent']; label: string; hint: string }[] = [
  { value: 'member', label: 'Member', hint: 'Personal digital wellbeing' },
  { value: 'parent', label: 'Parent / carer', hint: 'Family conversations & guidance' },
  { value: 'educator', label: 'Educator', hint: 'Classroom and policy resources' },
];

export function ProfileSetupPage() {
  const { user, loading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const countryOptions = useMemo(
    () =>
      PROFILE_COUNTRY_CODES.map((code) => {
        const match = countries.find((c) => c.code === code);
        return { code, name: match?.name ?? code };
      }),
    []
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSetupInput>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      displayName: '',
      countryCode: 'FR',
      roleIntent: 'member',
    },
  });

  useEffect(() => {
    if (!user) return;
    reset({
      displayName: user.displayName,
      countryCode: PROFILE_COUNTRY_CODES.includes(
        user.countryCode as (typeof PROFILE_COUNTRY_CODES)[number]
      )
        ? user.countryCode
        : 'FR',
      roleIntent:
        user.role === 'parent' || user.role === 'educator' ? user.role : 'member',
    });
  }, [user, reset]);

  if (loading) {
    return (
      <div className="ss-card flex items-center justify-center py-16 text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        <span className="sr-only">Loading profile</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const error = await updateProfile({
      displayName: values.displayName.trim(),
      countryCode: values.countryCode,
      role: values.roleIntent,
      avatarInitials: values.displayName
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || '')
        .join('') || 'SS',
    });
    if (error) {
      setFormError(error);
      return;
    }
    navigate('/app');
  });

  return (
    <div className="ss-card space-y-6">
      <div>
        <p className="ss-kicker">Almost there</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Finish your profile
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tell Safe Scroll how you plan to use the app. You can change this later.
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="displayName" className="ss-label">
            Display name
          </label>
          <input
            id="displayName"
            type="text"
            autoComplete="nickname"
            className="ss-input"
            disabled={isSubmitting}
            {...register('displayName')}
          />
          {errors.displayName ? (
            <p className="mt-1.5 text-xs text-rose-600">{errors.displayName.message}</p>
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

        <fieldset className="space-y-2">
          <legend className="ss-label">I am joining as</legend>
          <div className="grid gap-2">
            {ROLE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm transition hover:border-brand-electric/40 dark:border-white/10"
              >
                <input
                  type="radio"
                  value={option.value}
                  className="mt-1 text-brand-electric focus:ring-brand-electric"
                  disabled={isSubmitting}
                  {...register('roleIntent')}
                />
                <span>
                  <span className="block font-medium text-slate-800 dark:text-slate-100">
                    {option.label}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {option.hint}
                  </span>
                </span>
              </label>
            ))}
          </div>
          {errors.roleIntent ? (
            <p className="mt-1.5 text-xs text-rose-600">{errors.roleIntent.message}</p>
          ) : null}
        </fieldset>

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
          {isSubmitting ? 'Saving…' : 'Save and open app'}
        </button>
      </form>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        Profile updates in demo mode stay in local mock storage only.{' '}
        <Link to="/app" className="font-medium text-brand-electric hover:underline">
          Skip for now
        </Link>
      </p>
    </div>
  );
}
