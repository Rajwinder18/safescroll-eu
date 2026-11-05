import { AppLayout } from '@/components/layout/AppLayout';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { PageSkeleton } from '@/components/transitions/PageSkeleton';
import { AuthLayout } from '@/pages/auth/AuthLayout';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ProfileSetupPage } from '@/pages/auth/ProfileSetupPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import { SignInPage } from '@/pages/auth/SignInPage';
import { SignUpPage } from '@/pages/auth/SignUpPage';
import { VerifyEmailPage } from '@/pages/auth/VerifyEmailPage';
import DashboardPage from '@/pages/app/DashboardPage';
import { LandingPage } from '@/pages/public/LandingPage';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const AboutPage = lazy(() => import('@/pages/public/AboutPage'));
const DigitalWellbeingPage = lazy(() => import('@/pages/public/DigitalWellbeingPage'));
const PoliciesPublicPage = lazy(() => import('@/pages/public/PoliciesPublicPage'));
const ResourcesPublicPage = lazy(() => import('@/pages/public/ResourcesPublicPage'));

const WellbeingAnalyzerPage = lazy(() => import('@/pages/app/WellbeingAnalyzerPage'));
const ScreenTimePage = lazy(() => import('@/pages/app/ScreenTimePage'));
const MindfulPage = lazy(() => import('@/pages/app/MindfulPage'));
const ChallengesPage = lazy(() => import('@/pages/app/ChallengesPage'));
const ProgressPage = lazy(() => import('@/pages/app/ProgressPage'));
const DigitalSafetyPage = lazy(() => import('@/pages/app/DigitalSafetyPage'));
const AgeCheckerPage = lazy(() => import('@/pages/app/AgeCheckerPage'));
const PoliciesPage = lazy(() => import('@/pages/app/PoliciesPage'));
const HealthImpactPage = lazy(() => import('@/pages/app/HealthImpactPage'));
const QuizPage = lazy(() => import('@/pages/app/QuizPage'));
const ResearchLibraryPage = lazy(() => import('@/pages/app/ResearchLibraryPage'));
const AnalyticsPage = lazy(() => import('@/pages/app/AnalyticsPage'));
const AssistantPage = lazy(() => import('@/pages/app/AssistantPage'));
const FamilyPage = lazy(() => import('@/pages/app/FamilyPage'));
const ParentResourcesPage = lazy(() => import('@/pages/app/ParentResourcesPage'));
const EducationResourcesPage = lazy(() => import('@/pages/app/EducationResourcesPage'));
const SettingsPage = lazy(() => import('@/pages/app/SettingsPage'));
const AdminPage = lazy(() => import('@/pages/app/AdminPage'));

/** Public-route fallback keeps the dark marketing shell feel. */
function PublicFallback() {
  return (
    <div className="min-h-[50vh] bg-[#111827] px-4 py-16">
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-xl bg-white/10" />
        <div className="h-40 w-full animate-pulse rounded-3xl bg-white/10" />
      </div>
    </div>
  );
}

/** Preload route chunks into browser cache to eliminate lazy loading delays & flashes */
export function preloadRoute(path: string) {
  switch (path) {
    case '/app/wellbeing':
      void import('@/pages/app/WellbeingAnalyzerPage');
      break;
    case '/app/screen-time':
      void import('@/pages/app/ScreenTimePage');
      break;
    case '/app/mindful':
      void import('@/pages/app/MindfulPage');
      break;
    case '/app/challenges':
      void import('@/pages/app/ChallengesPage');
      break;
    case '/app/progress':
      void import('@/pages/app/ProgressPage');
      break;
    case '/app/learn/safety':
      void import('@/pages/app/DigitalSafetyPage');
      break;
    case '/app/learn/age':
      void import('@/pages/app/AgeCheckerPage');
      break;
    case '/app/learn/policies':
      void import('@/pages/app/PoliciesPage');
      break;
    case '/app/learn/health':
      void import('@/pages/app/HealthImpactPage');
      break;
    case '/app/learn/quiz':
      void import('@/pages/app/QuizPage');
      break;
    case '/app/learn/research':
      void import('@/pages/app/ResearchLibraryPage');
      break;
    case '/app/analytics':
      void import('@/pages/app/AnalyticsPage');
      break;
    case '/app/assistant':
      void import('@/pages/app/AssistantPage');
      break;
    case '/app/family':
      void import('@/pages/app/FamilyPage');
      break;
    case '/app/settings':
      void import('@/pages/app/SettingsPage');
      break;
    case '/app/admin':
      void import('@/pages/app/AdminPage');
      break;
    default:
      break;
  }
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route
          path="about"
          element={
            <Suspense fallback={<PublicFallback />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="digital-wellbeing"
          element={
            <Suspense fallback={<PublicFallback />}>
              <DigitalWellbeingPage />
            </Suspense>
          }
        />
        <Route
          path="features"
          element={<Navigate to="/digital-wellbeing" replace />}
        />
        <Route
          path="how-it-works"
          element={<Navigate to="/#how-it-works" replace />}
        />
        <Route
          path="research"
          element={
            <Suspense fallback={<PublicFallback />}>
              <ResourcesPublicPage />
            </Suspense>
          }
        />
        <Route
          path="policies"
          element={
            <Suspense fallback={<PublicFallback />}>
              <PoliciesPublicPage />
            </Suspense>
          }
        />
        <Route
          path="resources"
          element={
            <Suspense fallback={<PublicFallback />}>
              <ResourcesPublicPage />
            </Suspense>
          }
        />
      </Route>

      <Route path="login" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="signup" element={<Navigate to="/auth/sign-up" replace />} />

      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="profile-setup" element={<ProfileSetupPage />} />
      </Route>

      {/* App shell stays mounted; only page content suspends / transitions */}
      <Route path="app" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<Navigate to="/app" replace />} />
        <Route
          path="wellbeing"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <WellbeingAnalyzerPage />
            </Suspense>
          }
        />
        <Route
          path="screen-time"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <ScreenTimePage />
            </Suspense>
          }
        />
        <Route
          path="mindful"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <MindfulPage />
            </Suspense>
          }
        />
        <Route
          path="challenges"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <ChallengesPage />
            </Suspense>
          }
        />
        <Route
          path="progress"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <ProgressPage />
            </Suspense>
          }
        />
        <Route
          path="learn"
          element={<Navigate to="/app/learn/safety" replace />}
        />
        <Route
          path="learn/safety"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <DigitalSafetyPage />
            </Suspense>
          }
        />
        <Route
          path="learn/age"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <AgeCheckerPage />
            </Suspense>
          }
        />
        <Route
          path="learn/policies"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <PoliciesPage />
            </Suspense>
          }
        />
        <Route path="policies" element={<Navigate to="/app/learn/policies" replace />} />
        <Route
          path="learn/health"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <HealthImpactPage />
            </Suspense>
          }
        />
        <Route
          path="learn/quiz"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <QuizPage />
            </Suspense>
          }
        />
        <Route path="quiz" element={<Navigate to="/app/learn/quiz" replace />} />
        <Route
          path="learn/research"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <ResearchLibraryPage />
            </Suspense>
          }
        />
        <Route
          path="analytics"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <AnalyticsPage />
            </Suspense>
          }
        />
        <Route
          path="assistant"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <AssistantPage />
            </Suspense>
          }
        />
        <Route
          path="family"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <FamilyPage />
            </Suspense>
          }
        />
        <Route
          path="family/parents"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <ParentResourcesPage />
            </Suspense>
          }
        />
        <Route
          path="family/education"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <EducationResourcesPage />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <SettingsPage />
            </Suspense>
          }
        />
        <Route
          path="settings/:section"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <SettingsPage />
            </Suspense>
          }
        />
        <Route
          path="admin"
          element={
            <Suspense fallback={<PageSkeleton />}>
              <AdminPage />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
