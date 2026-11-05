import type {
  Challenge,
  CountryPolicy,
  HealthImpactItem,
  PolicyTimelineItem,
  PreventionChecklist,
  QuizQuestion,
  ReferenceItem,
} from '@safescroll/shared-types';

export const countries: CountryPolicy[] = [
  {
    code: 'FR',
    name: 'France',
    defaultGdprAge: 15,
    under15Status:
      'Passed a law requiring parental consent for anyone under 15 on social media.',
    legalStatus: 'in_force',
    sourceUrl: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047799447',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'DE',
    name: 'Germany',
    defaultGdprAge: 16,
    under15Status: 'Requires age verification under youth protection laws. Age 16 standard.',
    legalStatus: 'in_force',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'IT',
    name: 'Italy',
    defaultGdprAge: 14,
    under15Status: 'Testing official digital ID checks for users under 14-15.',
    legalStatus: 'pilot',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'ES',
    name: 'Spain',
    defaultGdprAge: 14,
    under15Status: 'Proposed raising the social media age to 16 with secure digital checks.',
    legalStatus: 'proposed',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'NL',
    name: 'Netherlands',
    defaultGdprAge: 16,
    under15Status: 'Banned phones in classrooms in 2024; studying social media limits.',
    legalStatus: 'guidance',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'BE',
    name: 'Belgium',
    defaultGdprAge: 13,
    under15Status: 'Allows access from age 13; currently testing new EU age wallets.',
    legalStatus: 'pilot',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'IE',
    name: 'Ireland',
    defaultGdprAge: 16,
    under15Status: 'Enacted a new Online Safety Code in 2024 to protect teens.',
    legalStatus: 'in_force',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'DK',
    name: 'Denmark',
    defaultGdprAge: 13,
    under15Status: 'Proposed raising the minimum age to 15 with stricter verification.',
    legalStatus: 'proposed',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'SE',
    name: 'Sweden',
    defaultGdprAge: 13,
    under15Status: 'Recommends capping daily teen screen time at 2 to 3 hours.',
    legalStatus: 'guidance',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'AT',
    name: 'Austria',
    defaultGdprAge: 14,
    under15Status: 'Default age is 14; supports a common EU verification standard.',
    legalStatus: 'in_force',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'PL',
    name: 'Poland',
    defaultGdprAge: 16,
    under15Status: 'Evaluating school phone bans and age verification.',
    legalStatus: 'proposed',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'PT',
    name: 'Portugal',
    defaultGdprAge: 13,
    under15Status: 'Testing EU digital ID credentials for online safety.',
    legalStatus: 'pilot',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'GR',
    name: 'Greece',
    defaultGdprAge: 15,
    under15Status: 'Banned mobile phones in schools during class in 2024.',
    legalStatus: 'in_force',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'EU_OTHER',
    name: 'Other EU Member State',
    defaultGdprAge: 15,
    under15Status: 'Follows EU Digital Services Act and GDPR youth privacy rules.',
    legalStatus: 'guidance',
    lastReviewed: '2026-01-15',
  },
  {
    code: 'NON_EU',
    name: 'International / Non-EU',
    defaultGdprAge: 13,
    under15Status: 'Compared against the European safety benchmark.',
    legalStatus: 'guidance',
    lastReviewed: '2026-01-15',
  },
];

export const policyTimeline: PolicyTimelineItem[] = [
  {
    id: 'gdpr-2018',
    year: '2018',
    month: 'May',
    type: 'law',
    typeLabel: 'Current Law',
    title: 'GDPR Privacy Rules (Article 8)',
    badge: 'In force',
    badgeColor: 'blue',
    description:
      'Set digital consent between ages 13 and 16 across Europe. Required parents to approve data collection for younger kids.',
    impact:
      'Most platforms historically relied on self-declared age checkboxes that were easy to bypass.',
    legalStatus: 'in_force',
    officialReference: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj',
    lastReviewed: '2026-01-15',
  },
  {
    id: 'bik-2022',
    year: '2022',
    month: 'May',
    type: 'initiative',
    typeLabel: 'EU Strategy',
    title: 'Better Internet for Kids (BIK+)',
    badge: 'Guidance',
    badgeColor: 'purple',
    description:
      'The European Commission launched an action plan to fight cyberbullying and fund child safety hotlines across all 27 EU countries.',
    impact: 'Started the development of privacy-friendly age checks.',
    legalStatus: 'guidance',
    officialReference:
      'https://digital-strategy.ec.europa.eu/en/policies/better-internet-kids',
    lastReviewed: '2026-01-15',
  },
  {
    id: 'fr-2023',
    year: '2023',
    month: 'June',
    type: 'national',
    typeLabel: 'French Law',
    title: 'France Sets Age 15 Rule',
    badge: 'In force',
    badgeColor: 'purple',
    description:
      'France passed a law stating that social networks must verify parental consent before kids under 15 can open an account.',
    impact: 'Started the Europe-wide conversation on setting an EU-wide under-15 standard.',
    legalStatus: 'in_force',
    officialReference: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047799447',
    lastReviewed: '2026-01-15',
  },
  {
    id: 'dsa-2024',
    year: '2024',
    month: 'February',
    type: 'law',
    typeLabel: 'Current Law',
    title: 'EU Digital Services Act (Articles 28 & 34)',
    badge: 'In force',
    badgeColor: 'blue',
    description:
      'Requires high standards of privacy, safety and security for minors, and risk assessments for systemic platforms — including bans on profiling minors for ads based on personal data.',
    impact: 'Major platforms face heavy fines if they target kids with manipulative advertising.',
    legalStatus: 'in_force',
    officialReference:
      'https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package',
    lastReviewed: '2026-01-15',
  },
  {
    id: 'addictive-2024',
    year: '2024',
    month: 'May',
    type: 'guidelines',
    typeLabel: 'EU Action',
    title: 'Investigation into Addictive Features',
    badge: 'Guidance / Enforcement',
    badgeColor: 'blue',
    description:
      'The EU opened formal investigations into infinite scroll, automatic video autoplay, and streak rewards that keep children hooked.',
    impact: 'Pressures tech companies to redesign apps so they are less addictive for young people.',
    legalStatus: 'guidance',
    lastReviewed: '2026-01-15',
  },
  {
    id: 'eid-2025',
    year: '2025-2026',
    month: 'Active Debate',
    type: 'proposal',
    typeLabel: 'Proposed & Testing',
    title: 'EU Under-15 Discussion & Digital ID',
    badge: 'Proposed / Pilot',
    badgeColor: 'pink',
    description:
      'European leaders are testing private age verification tools in the EU Digital Wallet. A single EU-wide ban under 15 is being debated, but is not yet a universal law.',
    impact:
      'Clarification: An EU-wide total ban is currently being discussed and tested, but each country still sets its own laws.',
    legalStatus: 'proposed',
    lastReviewed: '2026-01-15',
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: 'EU Rules',
    question: 'What does the EU Digital Services Act strictly ban for underage users?',
    options: [
      'Ads for school books and supplies',
      'Targeted ads based on tracking personal behavior',
      'Public health announcements',
      'Colorful illustrations in apps',
    ],
    correctIndex: 1,
    explanation:
      'Under EU law, social media apps cannot track children or show them personalized ads based on their online activity.',
  },
  {
    id: 2,
    category: 'EU Law Status',
    question: 'Is there already a universal EU-wide total ban on social media for everyone under 15?',
    options: [
      'Yes, it took effect in all countries years ago',
      'No, it is currently a law in France and an active proposal being debated across the EU',
      'Yes, but only for computers, not phones',
      'No, the EU does not care about child safety',
    ],
    correctIndex: 1,
    explanation:
      'France passed an under-15 parental consent law, and EU leaders are discussing making it standard, but it is not yet a single universal law for all 27 nations.',
  },
  {
    id: 3,
    category: 'Age Verification',
    question: 'Why are simple "Click here if you are 13" checkboxes being replaced?',
    options: [
      'Checkboxes use too much internet battery',
      'Kids easily type a fake birth year to bypass them',
      'Websites do not have enough server space for checks',
      'Parents asked to receive paper forms by post',
    ],
    correctIndex: 1,
    explanation:
      'Checkboxes do not verify real age. The EU is testing privacy-friendly digital verification that confirms age without sharing private personal identity.',
  },
  {
    id: 4,
    category: 'Sleep Health',
    question: 'Why does looking at your phone right before bed make it harder to sleep?',
    options: [
      'Screen blue light tricks the brain and lowers melatonin',
      'Phone volume cools down your body temperature',
      'Screen glass absorbs oxygen from the room',
      'Wi-Fi signals erase nighttime dreams',
    ],
    correctIndex: 0,
    explanation:
      'Blue light from phone screens tells your brain it is daytime, delaying the natural sleep hormone melatonin.',
  },
  {
    id: 5,
    category: 'Addictive Features',
    question: 'What is considered an "addictive feature" that the EU is investigating?',
    options: [
      'Infinite scroll, endless autoplay, and snap streaks',
      'Clear logout and exit buttons',
      'A screen showing total minutes spent',
      'Password security checks',
    ],
    correctIndex: 0,
    explanation:
      'Features like infinite scroll and streak counters are designed to keep children in continuous reward loops.',
  },
  {
    id: 6,
    category: 'Online Safety',
    question: 'What should a teen do immediately if they experience cyberbullying online?',
    options: [
      'Insult the bully back in public comments',
      'Save screenshots, block the person, report the account, and tell a trusted adult',
      'Throw the phone away without saving evidence',
      'Pay money to people threatening them',
    ],
    correctIndex: 1,
    explanation:
      'Keeping evidence lets parents, schools, or helplines (like 116 111 in Europe) take action and stop the harasser.',
  },
  {
    id: 7,
    category: 'Privacy Defaults',
    question: 'What does "Privacy by Default" mean when a teenager opens a new account?',
    options: [
      'The account is public for anyone to see',
      'The account is private by default, with stranger messages and location off',
      'The app broadcasts the school location to strangers',
      'The phone contacts list is posted online',
    ],
    correctIndex: 1,
    explanation:
      'Apps must start with maximum privacy turned on automatically, rather than expecting a teenager to find deep hidden settings.',
  },
  {
    id: 8,
    category: 'Eye Comfort',
    question: 'What is the simple "20-20-20 rule" to stop screen eye strain?',
    options: [
      'Spend 20 minutes on each social media app',
      'Every 20 minutes, look at something 20 feet away for 20 seconds',
      'Keep phone brightness at 20% for 20 days',
      'Scroll through 20 videos every 20 minutes',
    ],
    correctIndex: 1,
    explanation:
      'Looking at distant objects relaxes the eye muscles and prevents dry eyes and headaches.',
  },
  {
    id: 9,
    category: 'Healthy Routines',
    question: 'What is a proven, healthy habit for better sleep and wellbeing?',
    options: [
      'Leaving the phone on your pillow with notifications buzzing',
      'Charging the phone outside the bedroom and keeping bed screen-free',
      'Watching bright videos until you pass out',
      'Setting 10 different alarms on your screen',
    ],
    correctIndex: 1,
    explanation:
      'Charging devices outside the bedroom prevents late-night scrolling and helps you wake up rested.',
  },
  {
    id: 10,
    category: 'Parent Guidance',
    question: 'What is the most effective approach for parents regarding teen phone use?',
    options: [
      'Secretly reading every message with no discussion',
      'Agreeing on clear boundaries, screen-free meals, and open talk',
      'Giving unlimited screen time with zero rules',
      'Banning all devices forever',
    ],
    correctIndex: 1,
    explanation:
      'Open communication and clear family agreements help children develop self-control and confidence online.',
  },
];

export const references: ReferenceItem[] = [
  {
    org: 'European Commission',
    title: 'Digital Services Act (DSA)',
    type: 'EU Law',
    date: 'Feb 2024',
    badge: 'In force',
    summary:
      'Rules holding large social media platforms accountable, banning minor profiling, and requiring safer youth defaults.',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package',
  },
  {
    org: 'European Commission',
    title: 'Better Internet for Kids (BIK+)',
    type: 'EU Strategy',
    date: 'May 2022',
    badge: 'Guidance',
    summary:
      'EU-wide plan providing anti-bullying helplines, digital literacy in schools, and safer design standards.',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/better-internet-kids',
  },
  {
    org: 'World Health Organization (WHO)',
    title: 'Screen Time and Sleep Guidelines for Youth',
    type: 'Health Guidance',
    date: 'Official Guide',
    badge: 'Health Standard',
    summary:
      'Recommends 8 to 10 hours of sleep for teens, regular outdoor exercise, and sensible screen limits.',
    url: 'https://www.who.int/publications/i/item/9789240015128',
  },
  {
    org: 'UNICEF Innocenti',
    title: 'Children in a Digital World',
    type: 'Research Report',
    date: 'Global Study',
    badge: 'Research',
    summary:
      'Studies how social platforms affect young people, highlighting the balance between learning and avoiding online harm.',
    url: 'https://www.unicef.org/reports/state-worlds-children-2017',
  },
  {
    org: 'EU Kids Online',
    title: 'European Children Online Risks & Opportunities',
    type: 'Study of 25,000+ Youth',
    date: 'Research Study',
    badge: 'Survey',
    summary:
      'Direct survey data from European families showing how cyberbullying, screen hours, and family habits interact.',
    url: 'https://www.lse.ac.uk/media-and-communications/research/research-projects/eu-kids-online',
  },
  {
    org: 'French Parliament',
    title: 'Law No. 2023-566 on Digital Majority',
    type: 'National Law (France)',
    date: 'July 2023',
    badge: 'In force',
    summary:
      'First national law in Europe to set age 15 as the digital majority, requiring parental approval for social media.',
    url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047799447',
  },
];

export const preventionChecklists: PreventionChecklist[] = [
  {
    category: 'parents',
    title: 'For Parents & Guardians',
    items: [
      { id: 'p1', text: 'Set a phone-free dinner table and screen-free bedrooms after 9 PM.' },
      { id: 'p2', text: 'Turn on built-in screen time limits on Apple or Android devices together.' },
      { id: 'p3', text: 'Let your child know they can tell you about online bullying without losing their phone.' },
      { id: 'p4', text: 'Check that location-sharing is turned off on all social apps.' },
      { id: 'p5', text: 'Plan regular family walks, sports, or outdoor activities without screens.' },
    ],
  },
  {
    category: 'children',
    title: 'For Children & Teens',
    items: [
      { id: 'c1', text: 'Turn off notification badges for social apps to avoid constant interruptions.' },
      { id: 'c2', text: 'Use the 20-20-20 rule: look 20 feet away every 20 minutes to rest your eyes.' },
      { id: 'c3', text: 'Set an app timer (like 45 minutes) on video apps to help you pause.' },
      { id: 'c4', text: 'Never accept friend requests from people you do not know in real life.' },
      { id: 'c5', text: 'Charge your phone in the hallway or kitchen overnight, not right next to your pillow.' },
    ],
  },
  {
    category: 'schools',
    title: 'For Schools & Teachers',
    items: [
      { id: 's1', text: 'Keep classrooms phone-free during lessons and lunch.' },
      { id: 's2', text: 'Teach digital privacy and how algorithms work in regular classes.' },
      { id: 's3', text: 'Provide a safe, confidential way for students to report cyberbullying.' },
      { id: 's4', text: 'Hold workshops for parents on how to set up healthy screen limits at home.' },
    ],
  },
  {
    category: 'platforms',
    title: 'For Social Media Platforms',
    items: [
      { id: 't1', text: "Use privacy-friendly age checks that do not store children's ID cards." },
      { id: 't2', text: 'Make teen accounts private automatically with stranger direct messages blocked.' },
      { id: 't3', text: 'Turn off infinite scroll and autoplay for users under 18.' },
      { id: 't4', text: 'Provide clear, one-click reporting tools for bullying and harmful content.' },
    ],
  },
];

function intensityFromHours(
  hours: number,
  lowMax: number,
  moderateMax: number
): 'low' | 'moderate' | 'high' {
  if (hours <= lowMax) return 'low';
  if (hours <= moderateMax) return 'moderate';
  return 'high';
}

export const healthImpactItems: HealthImpactItem[] = [
  {
    id: 'eye-strain',
    category: 'physical',
    title: 'Eye strain',
    summary: 'Extended near-focus can contribute to dryness and visual fatigue.',
    detail:
      'Educational guidance often recommends the 20-20-20 rule and regular breaks. Individual symptoms vary and are not a diagnosis.',
    citation: 'WHO screen-time and youth health guidance (verify latest edition).',
    intensityAtHours: (h) => intensityFromHours(h, 2, 4),
  },
  {
    id: 'posture',
    category: 'physical',
    title: 'Posture',
    summary: 'Looking down at devices for long periods can strain neck and shoulders.',
    detail:
      'Ergonomic breaks, sitting upright, and alternating activities may help comfort. Not medical advice.',
    intensityAtHours: (h) => intensityFromHours(h, 2, 5),
  },
  {
    id: 'sleep',
    category: 'physical',
    title: 'Sleep disruption',
    summary: 'Late-night screen use is associated with delayed bedtime for some people.',
    detail:
      'Blue-enriched light and stimulating content can make winding down harder. Associations are not guaranteed causation for every individual.',
    citation: 'WHO sleep recommendations for adolescents.',
    intensityAtHours: (h) => intensityFromHours(h, 2, 4),
  },
  {
    id: 'comparison',
    category: 'mental',
    title: 'Social comparison',
    summary: 'Curated feeds can encourage unfair comparisons with others.',
    detail:
      'Curating follows, muting triggers, and time limits are common supportive strategies.',
    intensityAtHours: (h) => intensityFromHours(h, 1.5, 3.5),
  },
  {
    id: 'stress',
    category: 'mental',
    title: 'Stress',
    summary: 'Constant notifications can keep attention in a reactive state.',
    detail:
      'Batching notifications and scheduled offline windows can reduce perceived pressure.',
    intensityAtHours: (h) => intensityFromHours(h, 2, 4),
  },
  {
    id: 'emotional',
    category: 'mental',
    title: 'Emotional wellbeing',
    summary: 'Mood can shift with content type, social feedback, and fatigue.',
    detail:
      'Safe Scroll encourages reflection, not clinical assessment. Seek professional help for distress.',
    intensityAtHours: (h) => intensityFromHours(h, 2, 4),
  },
  {
    id: 'attention',
    category: 'cognitive',
    title: 'Attention',
    summary: 'Frequent context switching may make deep focus feel harder.',
    detail:
      'Focus sessions and single-task windows are practical experiments, not clinical treatment.',
    intensityAtHours: (h) => intensityFromHours(h, 2, 4),
  },
  {
    id: 'habits',
    category: 'cognitive',
    title: 'Habit formation',
    summary: 'Reward loops in apps can reinforce automatic checking behaviours.',
    detail:
      'Mindful pauses and friction (like breathing before opening an app) support intentional use.',
    intensityAtHours: (h) => intensityFromHours(h, 2, 3.5),
  },
  {
    id: 'distraction',
    category: 'cognitive',
    title: 'Distraction',
    summary: 'Alerts interrupt learning, conversations, and rest.',
    detail:
      'Do Not Disturb schedules and app timers are practical, reversible controls.',
    intensityAtHours: (h) => intensityFromHours(h, 1.5, 3),
  },
];

export const challenges: Challenge[] = [
  {
    id: 'morning-detox',
    title: 'Morning digital detox',
    description: 'Keep social apps closed for the first 30 minutes after waking.',
    category: 'morning_detox',
    cadence: 'daily',
    targetCount: 1,
    points: 10,
  },
  {
    id: 'focus-25',
    title: 'Focus session',
    description: 'Complete one 25-minute focus block with notifications silenced.',
    category: 'focus',
    cadence: 'daily',
    targetCount: 1,
    points: 10,
  },
  {
    id: 'mindful-break',
    title: 'Mindful break',
    description: 'Take three short breathing pauses during the day.',
    category: 'mindful_breaks',
    cadence: 'daily',
    targetCount: 3,
    points: 15,
  },
  {
    id: 'sleep-protect',
    title: 'Sleep protection',
    description: 'Charge your phone outside the bedroom tonight.',
    category: 'sleep',
    cadence: 'daily',
    targetCount: 1,
    points: 15,
  },
  {
    id: 'offline-hour',
    title: 'Offline hour',
    description: 'Spend 60 minutes on an offline activity you enjoy.',
    category: 'offline',
    cadence: 'daily',
    targetCount: 1,
    points: 12,
  },
  {
    id: 'social-cut',
    title: 'Social media reduction',
    description: 'Stay under your personal social-media goal for the day.',
    category: 'social_reduction',
    cadence: 'daily',
    targetCount: 1,
    points: 12,
  },
  {
    id: 'weekly-walks',
    title: 'Weekly outdoor walks',
    description: 'Complete four screen-free outdoor walks this week.',
    category: 'offline',
    cadence: 'weekly',
    targetCount: 4,
    points: 40,
  },
];

export const faqItems = [
  {
    q: 'Is Safe Scroll measuring my real phone usage?',
    a: 'Not on the web demo. Charts and scores use values you enter or realistic demonstration data. Native device integrations are prepared for the mobile app and require platform permissions.',
  },
  {
    q: 'Is the wellbeing score a medical diagnosis?',
    a: 'No. It is an experimental, transparent reflection tool with an explained formula. It does not diagnose medical or mental health conditions.',
  },
  {
    q: 'Does the age checker give legal advice?',
    a: 'No. It is an educational threshold simulator. Always check official sources and platform policies for real eligibility rules.',
  },
  {
    q: 'Can the website block Instagram or TikTok?',
    a: 'No. Browsers cannot intercept arbitrary native app launches. Mindful interruptions on device require authorized native integrations.',
  },
  {
    q: 'Is authentication real in development mode?',
    a: 'Development mode uses a clearly labelled mock authentication adapter with local persistence. Supabase Auth connects when credentials are provided.',
  },
];

export const legalStatusLabels: Record<string, string> = {
  in_force: 'In force',
  adopted_not_applicable: 'Adopted but not yet applicable',
  proposed: 'Proposed',
  guidance: 'Guidance',
  pilot: 'Pilot',
  active: 'In force',
  initiative: 'Guidance',
};
