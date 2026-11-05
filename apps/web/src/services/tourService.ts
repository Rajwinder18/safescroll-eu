export const TOUR_VERSION = 1;
const STORAGE_KEY = 'safescroll_tours_v1';

export type TourId =
  | 'welcome'
  | 'dashboard'
  | 'wellbeing'
  | 'screen-time'
  | 'mindful'
  | 'challenges'
  | 'progress'
  | 'age'
  | 'health'
  | 'policies'
  | 'safety'
  | 'quiz'
  | 'research'
  | 'assistant'
  | 'family'
  | 'settings'
  | 'analytics';

export interface TourStep {
  id: string;
  selector: string;
  title: string;
  body: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
}

export interface TourDefinition {
  id: TourId;
  title: string;
  steps: TourStep[];
}

export interface TourPersistence {
  version: number;
  onboardingCompleted: boolean;
  onboardingSkipped: boolean;
  completed: Partial<Record<TourId, boolean>>;
  skipped: Partial<Record<TourId, boolean>>;
  lastStep: Partial<Record<TourId, number>>;
}

const defaultState = (): TourPersistence => ({
  version: TOUR_VERSION,
  onboardingCompleted: false,
  onboardingSkipped: false,
  completed: {},
  skipped: {},
  lastStep: {},
});

export function loadTourState(): TourPersistence {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as TourPersistence;
    if (parsed.version !== TOUR_VERSION) return defaultState();
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

export function saveTourState(state: TourPersistence) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota or disabled localStorage exceptions
  }
}

export function markTourCompleted(id: TourId) {
  const state = loadTourState();
  state.completed[id] = true;
  state.skipped[id] = false;
  if (id === 'welcome' || id === 'dashboard') {
    state.onboardingCompleted = true;
  }
  saveTourState(state);
  return state;
}

export function markTourSkipped(id: TourId) {
  const state = loadTourState();
  state.skipped[id] = true;
  if (id === 'welcome') state.onboardingSkipped = true;
  saveTourState(state);
  return state;
}

export function shouldAutoOfferFeatureTour(id: TourId) {
  const state = loadTourState();
  if (id === 'welcome' || id === 'dashboard') return false;
  return !state.completed[id] && !state.skipped[id];
}

export function shouldShowWelcome() {
  const state = loadTourState();
  return !state.onboardingCompleted && !state.onboardingSkipped;
}

export const TOURS: Record<TourId, TourDefinition> = {
  welcome: {
    id: 'welcome',
    title: 'Welcome',
    steps: [],
  },
  dashboard: {
    id: 'dashboard',
    title: 'Dashboard tour',
    steps: [
      {
        id: 'sidebar',
        selector: '[data-tour="app-sidebar"]',
        title: 'Your workspace',
        body: 'Access all digital wellbeing tools, policy explainers, and daily habits from your sidebar navigation.',
        placement: 'right',
      },
      {
        id: 'date-filters',
        selector: '[data-tour="date-filters"]',
        title: 'Time range filter',
        body: 'Switch between 7-day, 14-day, and 30-day analytics to spot patterns in your digital routines.',
        placement: 'bottom',
      },
      {
        id: 'wellbeing-index',
        selector: '[data-tour="wellbeing-index"]',
        title: 'Digital Wellbeing Index',
        body: 'Track your holistic index score (0–100) combining social use, total screen time, sleep, and physical breaks.',
        placement: 'bottom',
      },
      {
        id: 'screen-time',
        selector: '[data-tour="screen-time-card"]',
        title: 'Today’s screen time',
        body: 'Quick glance at daily screen duration and estimated social media proportion.',
        placement: 'bottom',
      },
      {
        id: 'screen-charts',
        selector: '[data-tour="screen-charts"]',
        title: 'Trend visualizer',
        body: 'Dynamic Chart.js trends show your wellbeing index trajectory across days.',
        placement: 'top',
      },
      {
        id: 'mindful',
        selector: '[data-tour="mindful-card"]',
        title: 'Mindful breaks',
        body: 'Pause before endless scrolling with scientifically grounded breathing exercises and reflections.',
        placement: 'top',
      },
      {
        id: 'challenges',
        selector: '[data-tour="challenges-card"]',
        title: 'Daily challenges',
        body: 'Build healthier habits through small, achievable goals without punitive streaks.',
        placement: 'top',
      },
      {
        id: 'learn',
        selector: '[data-tour="nav-learn"]',
        title: 'EU policies & safety',
        body: 'Explore GDPR Article 8, the Digital Services Act, and country-by-country under-15 access regulations.',
        placement: 'right',
      },
      {
        id: 'settings',
        selector: '[data-tour="nav-settings"]',
        title: 'Settings & privacy',
        body: 'Manage your profile, theme preferences, and data persistence controls anytime.',
        placement: 'right',
      },
    ],
  },
  wellbeing: {
    id: 'wellbeing',
    title: 'Wellbeing Analyzer',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Digital Wellbeing Analyzer',
        body: 'Simulate how your daily routine influences your experimental wellbeing index score (clamped between 20 and 98).',
        placement: 'bottom',
      },
      {
        id: 'sliders',
        selector: '[data-tour="wellbeing-inputs"]',
        title: 'Interactive inputs',
        body: 'Adjust sliders for social media hours, total phone use, sleep, exercise, and offline breaks.',
        placement: 'right',
      },
      {
        id: 'score',
        selector: '[data-tour="wellbeing-score"]',
        title: 'Real-time score',
        body: 'See your immediate wellbeing score along with an encouraging category rating.',
        placement: 'left',
      },
      {
        id: 'exposure',
        selector: '[data-tour="exposure-stats"]',
        title: 'Annual exposure metrics',
        body: 'Gain perspective on projected weekly, monthly, and yearly hours spent on social platforms.',
        placement: 'left',
      },
      {
        id: 'breakdown',
        selector: '[data-tour="wellbeing-breakdown"]',
        title: 'Transparent score formula',
        body: 'Review exact penalties and bonuses for sleep, exercise, and mindful breaks.',
        placement: 'top',
      },
      {
        id: 'suggestions',
        selector: '[data-tour="wellbeing-suggestions"]',
        title: 'Personalized suggestions',
        body: 'Non-stigmatizing recommendations tailored to improve your digital balance.',
        placement: 'top',
      },
    ],
  },
  'screen-time': {
    id: 'screen-time',
    title: 'Screen Time Overview',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Screen time analysis',
        body: 'Detailed breakdown of your digital exposure across apps and categories.',
        placement: 'bottom',
      },
      {
        id: 'filters',
        selector: '[data-tour="date-filters"]',
        title: 'Date ranges',
        body: 'Switch between 7-day, 14-day, and 30-day views to analyze long-term trends.',
        placement: 'bottom',
      },
      {
        id: 'stats',
        selector: '[data-tour="summary-stats"]',
        title: 'Usage snapshot',
        body: 'Quick totals comparing social screen time against total device duration.',
        placement: 'bottom',
      },
      {
        id: 'charts',
        selector: '[data-tour="screen-charts"]',
        title: 'Daily usage trend',
        body: 'Side-by-side bar chart visualizing daily social media vs. total screen time.',
        placement: 'top',
      },
      {
        id: 'doughnut',
        selector: '[data-tour="doughnut-chart"]',
        title: '24-hour time allocation',
        body: 'Doughnut chart displaying how your typical 24 hours are divided between screen, sleep, exercise, and offline living.',
        placement: 'left',
      },
    ],
  },
  mindful: {
    id: 'mindful',
    title: 'Mindful Breaks',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Pause before you scroll',
        body: 'Create space between unconscious scrolling impulses and intentional choices.',
        placement: 'bottom',
      },
      {
        id: 'session',
        selector: '[data-tour="mindful-session"]',
        title: 'Interactive exercise',
        body: 'Engage with guided breath pacing or reflective micro-prompts designed to reset dopamine loops.',
        placement: 'bottom',
      },
      {
        id: 'history',
        selector: '[data-tour="mindful-history"]',
        title: 'Break log',
        body: 'Review your completed mindful breaks and decisions to continue or put the screen away.',
        placement: 'left',
      },
      {
        id: 'native',
        selector: '[data-tour="native-status"]',
        title: 'Mobile integration note',
        body: 'Notice: OS-level app interception is prepared for our mobile app and cannot run inside browser sandboxes.',
        placement: 'top',
      },
    ],
  },
  challenges: {
    id: 'challenges',
    title: 'Daily Challenges',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Habit challenges',
        body: 'Positive habit development with achievable milestones — no streak anxiety.',
        placement: 'bottom',
      },
      {
        id: 'list',
        selector: '[data-tour="challenge-list"]',
        title: 'Available challenges',
        body: 'Explore morning screen delays, screen-free meals, bedtime wind-downs, and mindful notifications.',
        placement: 'top',
      },
      {
        id: 'progress',
        selector: '[data-tour="challenge-progress-bar"]',
        title: 'Milestone tracking',
        body: 'Track progress bars and earn points as you practice healthier digital choices.',
        placement: 'top',
      },
      {
        id: 'action',
        selector: '[data-tour="challenge-action"]',
        title: 'Log your progress',
        body: 'Click to record completion of each challenge session with instant local persistence.',
        placement: 'top',
      },
    ],
  },
  progress: {
    id: 'progress',
    title: 'Progress & Achievements',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Your milestones',
        body: 'Comprehensive overview of your digital wellbeing journey and earned badges.',
        placement: 'bottom',
      },
      {
        id: 'stats',
        selector: '[data-tour="progress-stats"]',
        title: 'Activity summary',
        body: 'Total challenges completed, mindful sessions taken, and your best safety quiz score.',
        placement: 'bottom',
      },
      {
        id: 'achievements',
        selector: '[data-tour="achievements-grid"]',
        title: 'Achievement badges',
        body: 'Celebrate positive habits with badges like First Step, Consistency, and Digital Scholar.',
        placement: 'top',
      },
    ],
  },
  age: {
    id: 'age',
    title: 'Age Eligibility Checker',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Age Eligibility simulation',
        body: 'Simulate how varying EU age thresholds affect social media access for minors.',
        placement: 'bottom',
      },
      {
        id: 'inputs',
        selector: '[data-tour="age-inputs"]',
        title: 'Date of birth & country',
        body: 'Select date of birth and select an EU member state context. DOB stays strictly private in your browser session.',
        placement: 'right',
      },
      {
        id: 'thresholds',
        selector: '[data-tour="threshold-selector"]',
        title: 'Regulatory thresholds',
        body: 'Simulate under 13 (COPPA baseline), under 15 (French law / EU proposal), under 16 (GDPR standard), or custom ages.',
        placement: 'right',
      },
      {
        id: 'calculate',
        selector: '[data-tour="calculate-btn"]',
        title: 'Calculate eligibility',
        body: 'Calculates exact age with leap years and triggers celebratory confetti when reaching majority.',
        placement: 'top',
      },
      {
        id: 'comparison',
        selector: '[data-tour="country-comparison"]',
        title: 'EU member state rules',
        body: 'Compare GDPR Article 8 digital consent ages across EU countries from 13 to 16.',
        placement: 'top',
      },
    ],
  },
  health: {
    id: 'health',
    title: 'Health Impact Matrix',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Health Impact Matrix',
        body: 'Explore documented physiological and psychological associations with prolonged digital exposure.',
        placement: 'bottom',
      },
      {
        id: 'duration',
        selector: '[data-tour="duration-slider"]',
        title: 'Daily duration slider',
        body: 'Slide from 1 to 10 hours to see how duration impacts bodily stress, blue-light disruption, and attention.',
        placement: 'bottom',
      },
      {
        id: 'categories',
        selector: '[data-tour="category-filters"]',
        title: 'Impact categories',
        body: 'Filter between Physical (eye fatigue, posture), Mental & Emotional (social comparison), and Cognitive factors.',
        placement: 'bottom',
      },
      {
        id: 'cards',
        selector: '[data-tour="impact-cards"]',
        title: 'Evidence-based insights',
        body: 'Review each impact mechanism, intensity levels, and citations from peer-reviewed research.',
        placement: 'top',
      },
    ],
  },
  policies: {
    id: 'policies',
    title: 'EU Policy Explainer',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Policy explainer hub',
        body: 'Learn how European regulations protect adolescent data privacy, mental health, and safety online.',
        placement: 'bottom',
      },
      {
        id: 'search',
        selector: '[data-tour="policy-search"]',
        title: 'Policy search',
        body: 'Instantly search across GDPR, DSA, eIDAS 2.0 wallet pilots, and national age-assurance statutes.',
        placement: 'bottom',
      },
      {
        id: 'timeline',
        selector: '[data-tour="policy-timeline"]',
        title: 'Interactive timeline',
        body: 'Chronological timeline clearly distinguishing active binding law from pending proposals and regulatory guidelines.',
        placement: 'top',
      },
      {
        id: 'countries',
        selector: '[data-tour="country-comparison"]',
        title: 'Member state breakdown',
        body: 'Inspect each country’s active consent age, under-15 access policy, and legal status.',
        placement: 'top',
      },
    ],
  },
  safety: {
    id: 'safety',
    title: 'Digital Safety Action Plan',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Action checklists',
        body: 'Multi-stakeholder preventative guidance for safer, healthier digital environments.',
        placement: 'bottom',
      },
      {
        id: 'checklists',
        selector: '[data-tour="safety-checklists"]',
        title: 'Tailored checklists',
        body: 'Distinct action checklists tailored for Parents, Children & Teens, Schools, and Platform Engineers.',
        placement: 'top',
      },
      {
        id: 'items',
        selector: '[data-tour="safety-items"]',
        title: 'Interactive checklist items',
        body: 'Check off actions as you implement them. Checkbox states persist automatically in your browser.',
        placement: 'top',
      },
    ],
  },
  quiz: {
    id: 'quiz',
    title: 'Digital Safety Quiz',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Test your knowledge',
        body: 'Engaging 10-question quiz covering EU youth safety regulations, algorithm mechanics, and sleep health.',
        placement: 'bottom',
      },
      {
        id: 'categories',
        selector: '[data-tour="quiz-categories"]',
        title: 'Topic coverage',
        body: 'Questions span GDPR, Digital Services Act, circadian rhythms, and privacy defaults.',
        placement: 'bottom',
      },
      {
        id: 'start',
        selector: '[data-tour="quiz-start-card"]',
        title: 'Begin the quiz',
        body: 'Click Start Quiz to answer questions with instant validation and detailed explanations.',
        placement: 'top',
      },
    ],
  },
  research: {
    id: 'research',
    title: 'Research Library',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Research library',
        body: 'Verified repository of peer-reviewed studies and official European Commission publications.',
        placement: 'bottom',
      },
      {
        id: 'cards',
        selector: '[data-tour="research-cards"]',
        title: 'Verified source cards',
        body: 'Examine research summaries from WHO, UNICEF, EU Kids Online, and academic journals.',
        placement: 'top',
      },
    ],
  },
  assistant: {
    id: 'assistant',
    title: 'AI Wellbeing Assistant',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'AI wellbeing assistant',
        body: 'Ask questions about digital habits, sleep hygiene, and EU youth safety policies.',
        placement: 'bottom',
      },
      {
        id: 'suggestions',
        selector: '[data-tour="assistant-suggestions"]',
        title: 'Quick prompt suggestions',
        body: 'Click any suggested prompt to quickly explore policy summaries or gentle detox tips.',
        placement: 'bottom',
      },
      {
        id: 'chat',
        selector: '[data-tour="assistant-chat"]',
        title: 'Interactive conversation',
        body: 'Educational conversational replies grounded in official policy and health guidance.',
        placement: 'top',
      },
      {
        id: 'input',
        selector: '[data-tour="assistant-input"]',
        title: 'Ask anything',
        body: 'Type your question here. Safe Scroll will never diagnose medical or mental health conditions.',
        placement: 'top',
      },
    ],
  },
  family: {
    id: 'family',
    title: 'Family Wellbeing',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Family digital wellbeing',
        body: 'Collaborative family tools built on trust and mutual consent — never hidden surveillance.',
        placement: 'bottom',
      },
      {
        id: 'consent',
        selector: '[data-tour="family-consent"]',
        title: 'Privacy & consent',
        body: 'Toggle shared household wellbeing summaries only when all members agree.',
        placement: 'bottom',
      },
      {
        id: 'members',
        selector: '[data-tour="family-members"]',
        title: 'Household members',
        body: 'View anonymized wellbeing index scores for participating family members.',
        placement: 'top',
      },
      {
        id: 'guidelines',
        selector: '[data-tour="family-guidelines"]',
        title: 'Family agreements',
        body: 'Access constructive tips for screen-free dinner zones and healthy device boundaries.',
        placement: 'top',
      },
    ],
  },
  settings: {
    id: 'settings',
    title: 'Settings & Privacy',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Settings overview',
        body: 'Manage your profile, theme, privacy settings, and demo environment.',
        placement: 'bottom',
      },
      {
        id: 'tabs',
        selector: '[data-tour="settings-tabs"]',
        title: 'Settings sections',
        body: 'Easily navigate between Profile, Preferences, Privacy, Notifications, and Account.',
        placement: 'bottom',
      },
      {
        id: 'theme',
        selector: '[data-tour="preferences-theme"]',
        title: 'Theme & appearance',
        body: 'Switch between Light, Dark, or System theme with zero screen flicker.',
        placement: 'top',
      },
    ],
  },
  analytics: {
    id: 'analytics',
    title: 'Analytics & Export',
    steps: [
      {
        id: 'intro',
        selector: '[data-tour="page-root"]',
        title: 'Visual analytics',
        body: 'Deep dive into your wellbeing index patterns and social media duration over time.',
        placement: 'bottom',
      },
      {
        id: 'filters',
        selector: '[data-tour="analytics-filters"]',
        title: 'Time range',
        body: 'Switch between 7-day, 14-day, and 30-day analytic projections.',
        placement: 'bottom',
      },
      {
        id: 'chart',
        selector: '[data-tour="analytics-chart"]',
        title: 'Dual-axis trends',
        body: 'Visualize the inverse correlation between heavy social media use and wellbeing index scores.',
        placement: 'top',
      },
      {
        id: 'export',
        selector: '[data-tour="export-button"]',
        title: 'Data export',
        body: 'Download your analytics data as a clean JSON file for complete data ownership.',
        placement: 'left',
      },
    ],
  },
};

export function tourIdForPath(pathname: string): TourId | null {
  if (pathname === '/app' || pathname === '/app/') return 'dashboard';
  if (pathname.startsWith('/app/wellbeing')) return 'wellbeing';
  if (pathname.startsWith('/app/screen-time')) return 'screen-time';
  if (pathname.startsWith('/app/mindful')) return 'mindful';
  if (pathname.startsWith('/app/challenges')) return 'challenges';
  if (pathname.startsWith('/app/progress')) return 'progress';
  if (pathname.startsWith('/app/learn/age')) return 'age';
  if (pathname.startsWith('/app/learn/health')) return 'health';
  if (pathname.startsWith('/app/learn/policies')) return 'policies';
  if (pathname.startsWith('/app/learn/safety')) return 'safety';
  if (pathname.startsWith('/app/learn/quiz')) return 'quiz';
  if (pathname.startsWith('/app/learn/research')) return 'research';
  if (pathname.startsWith('/app/assistant')) return 'assistant';
  if (pathname.startsWith('/app/family')) return 'family';
  if (pathname.startsWith('/app/settings')) return 'settings';
  if (pathname.startsWith('/app/analytics')) return 'analytics';
  return null;
}
