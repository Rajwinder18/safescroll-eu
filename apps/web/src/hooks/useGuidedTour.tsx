import {
  markTourCompleted,
  markTourSkipped,
  shouldAutoOfferFeatureTour,
  shouldShowWelcome,
  TOURS,
  type TourId,
  tourIdForPath,
} from '@/services/tourService';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router-dom';

interface GuidedTourContextValue {
  activeTourId: TourId | null;
  stepIndex: number;
  showWelcome: boolean;
  offerFeatureTourId: TourId | null;
  startTour: (id: TourId) => void;
  next: () => void;
  prev: () => void;
  skip: () => void;
  close: () => void;
  dismissWelcome: (skipped: boolean) => void;
  dismissFeatureOffer: (start: boolean) => void;
  replayCurrent: () => void;
}

const GuidedTourContext = createContext<GuidedTourContextValue | null>(null);

export function GuidedTourProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [activeTourId, setActiveTourId] = useState<TourId | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [offerFeatureTourId, setOfferFeatureTourId] = useState<TourId | null>(null);
  const [offeredThisSession, setOfferedThisSession] = useState<Set<TourId>>(new Set());

  useEffect(() => {
    if (!location.pathname.startsWith('/app')) {
      setShowWelcome(false);
      setOfferFeatureTourId(null);
      return;
    }
    if (shouldShowWelcome()) {
      setShowWelcome(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!location.pathname.startsWith('/app')) return;
    if (activeTourId || showWelcome) return;
    const id = tourIdForPath(location.pathname);
    if (!id || id === 'dashboard') return;
    if (offeredThisSession.has(id)) return;
    if (shouldAutoOfferFeatureTour(id)) {
      setOfferFeatureTourId(id);
      setOfferedThisSession((prev) => new Set(prev).add(id));
    }
  }, [location.pathname, activeTourId, showWelcome, offeredThisSession]);

  const startTour = useCallback((id: TourId) => {
    const tour = TOURS[id];
    if (!tour || tour.steps.length === 0) {
      if (id === 'welcome') {
        setShowWelcome(false);
        setActiveTourId('dashboard');
        setStepIndex(0);
        return;
      }
      return;
    }
    setShowWelcome(false);
    setOfferFeatureTourId(null);
    setActiveTourId(id);
    setStepIndex(0);
    // Allow layout paint before measuring targets
    requestAnimationFrame(() => {
      const el = document.querySelector(tour.steps[0]?.selector || '');
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  }, []);

  const close = useCallback(() => {
    setActiveTourId(null);
    setStepIndex(0);
  }, []);

  const next = useCallback(() => {
    if (!activeTourId) return;
    const tour = TOURS[activeTourId];
    if (stepIndex >= tour.steps.length - 1) {
      markTourCompleted(activeTourId);
      setActiveTourId(null);
      setStepIndex(0);
      return;
    }
    const nextIndex = stepIndex + 1;
    setStepIndex(nextIndex);
    const el = document.querySelector(tour.steps[nextIndex]?.selector || '');
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [activeTourId, stepIndex]);

  const prev = useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1));
  }, []);

  const skip = useCallback(() => {
    if (activeTourId) markTourSkipped(activeTourId);
    setActiveTourId(null);
    setStepIndex(0);
  }, [activeTourId]);

  const dismissWelcome = useCallback(
    (skipped: boolean) => {
      if (skipped) {
        markTourSkipped('welcome');
        setShowWelcome(false);
        return;
      }
      startTour('dashboard');
    },
    [startTour]
  );

  const dismissFeatureOffer = useCallback(
    (start: boolean) => {
      const id = offerFeatureTourId;
      setOfferFeatureTourId(null);
      if (!id) return;
      if (start) startTour(id);
      else markTourSkipped(id);
    },
    [offerFeatureTourId, startTour]
  );

  const replayCurrent = useCallback(() => {
    const id = tourIdForPath(location.pathname) || 'dashboard';
    startTour(id);
  }, [location.pathname, startTour]);

  const value = useMemo(
    () => ({
      activeTourId,
      stepIndex,
      showWelcome,
      offerFeatureTourId,
      startTour,
      next,
      prev,
      skip,
      close,
      dismissWelcome,
      dismissFeatureOffer,
      replayCurrent,
    }),
    [
      activeTourId,
      stepIndex,
      showWelcome,
      offerFeatureTourId,
      startTour,
      next,
      prev,
      skip,
      close,
      dismissWelcome,
      dismissFeatureOffer,
      replayCurrent,
    ]
  );

  return <GuidedTourContext.Provider value={value}>{children}</GuidedTourContext.Provider>;
}

export function useGuidedTour() {
  const ctx = useContext(GuidedTourContext);
  if (!ctx) throw new Error('useGuidedTour must be used within GuidedTourProvider');
  return ctx;
}
