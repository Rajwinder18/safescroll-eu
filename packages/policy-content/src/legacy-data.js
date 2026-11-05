// safe-scroll-data.js
// Simplified, clear, human-friendly content on the EU's plans for youth online safety.

window.SAFE_SCROLL_DATA = {
  // European countries and their rules
  countries: [
    { code: 'FR', name: 'France', defaultGdprAge: 15, under15Status: 'Passed a law requiring parental consent for anyone under 15 on social media.' },
    { code: 'DE', name: 'Germany', defaultGdprAge: 16, under15Status: 'Requires age verification under youth protection laws. Age 16 standard.' },
    { code: 'IT', name: 'Italy', defaultGdprAge: 14, under15Status: 'Testing official digital ID checks for users under 14-15.' },
    { code: 'ES', name: 'Spain', defaultGdprAge: 14, under15Status: 'Proposed raising the social media age to 16 with secure digital checks.' },
    { code: 'NL', name: 'Netherlands', defaultGdprAge: 16, under15Status: 'Banned phones in classrooms in 2024; studying social media limits.' },
    { code: 'BE', name: 'Belgium', defaultGdprAge: 13, under15Status: 'Allows access from age 13; currently testing new EU age wallets.' },
    { code: 'IE', name: 'Ireland', defaultGdprAge: 16, under15Status: 'Enacted a new Online Safety Code in 2024 to protect teens.' },
    { code: 'DK', name: 'Denmark', defaultGdprAge: 13, under15Status: 'Proposed raising the minimum age to 15 with stricter verification.' },
    { code: 'SE', name: 'Sweden', defaultGdprAge: 13, under15Status: 'Recommends capping daily teen screen time at 2 to 3 hours.' },
    { code: 'AT', name: 'Austria', defaultGdprAge: 14, under15Status: 'Default age is 14; supports a common EU verification standard.' },
    { code: 'PL', name: 'Poland', defaultGdprAge: 16, under15Status: 'Evaluating school phone bans and age verification.' },
    { code: 'PT', name: 'Portugal', defaultGdprAge: 13, under15Status: 'Testing EU digital ID credentials for online safety.' },
    { code: 'GR', name: 'Greece', defaultGdprAge: 15, under15Status: 'Banned mobile phones in schools during class in 2024.' },
    { code: 'EU_OTHER', name: 'Other EU Member State', defaultGdprAge: 15, under15Status: 'Follows EU Digital Services Act and GDPR youth privacy rules.' },
    { code: 'NON_EU', name: 'International / Non-EU', defaultGdprAge: 13, under15Status: 'Compared against the European safety benchmark.' }
  ],

  // Clear timeline of what is actually happening
  policyTimeline: [
    {
      year: '2018',
      month: 'May',
      type: 'law',
      typeLabel: 'Current Law',
      title: 'GDPR Privacy Rules',
      badge: 'Active Law',
      badgeColor: 'blue',
      description: 'Set digital consent between ages 13 and 16 across Europe. Required parents to approve data collection for younger kids.',
      impact: 'Most platforms just added a simple "Are you over 13?" checkbox that kids could easily bypass.'
    },
    {
      year: '2022',
      month: 'May',
      type: 'initiative',
      typeLabel: 'EU Strategy',
      title: 'Better Internet for Kids (BIK+)',
      badge: 'Official Plan',
      badgeColor: 'purple',
      description: 'The European Commission launched an action plan to fight cyberbullying and fund child safety hotlines across all 27 EU countries.',
      impact: 'Started the development of privacy-friendly age checks.'
    },
    {
      year: '2023',
      month: 'June',
      type: 'national',
      typeLabel: 'French Law',
      title: 'France Sets Age 15 Rule',
      badge: 'Passed in France',
      badgeColor: 'purple',
      description: 'France passed a law stating that social networks must verify parental consent before kids under 15 can open an account.',
      impact: 'Started the Europe-wide conversation on setting an EU-wide under-15 standard.'
    },
    {
      year: '2024',
      month: 'February',
      type: 'law',
      typeLabel: 'Current Law',
      title: 'EU Digital Services Act (DSA)',
      badge: 'Active Law',
      badgeColor: 'blue',
      description: 'Officially bans platforms (like TikTok, Instagram, YouTube) from targeting ads to minors based on their personal data or browsing behavior.',
      impact: 'Major platforms face heavy fines if they target kids with manipulative advertising.'
    },
    {
      year: '2024',
      month: 'May',
      type: 'guidelines',
      typeLabel: 'EU Action',
      title: 'Investigation into Addictive Features',
      badge: 'Enforcement',
      badgeColor: 'blue',
      description: 'The EU opened formal investigations into infinite scroll, automatic video autoplay, and streak rewards that keep children hooked.',
      impact: 'Pressures tech companies to redesign apps so they are less addictive for young people.'
    },
    {
      year: '2025-2026',
      month: 'Active Debate',
      type: 'proposal',
      typeLabel: 'Proposed & Testing',
      title: 'EU Under-15 Discussion & Digital ID',
      badge: 'Under Discussion',
      badgeColor: 'pink',
      description: 'European leaders are testing private age verification tools in the EU Digital Wallet. A single EU-wide ban under 15 is being debated, but is not yet a universal law.',
      impact: 'Clarification: An EU-wide total ban is currently being discussed and tested, but each country still sets its own laws.'
    }
  ],

  // 10 clear, easy-to-read quiz questions
  quizQuestions: [
    {
      id: 1,
      category: 'EU Rules',
      question: 'What does the EU Digital Services Act strictly ban for underage users?',
      options: [
        'Ads for school books and supplies',
        'Targeted ads based on tracking personal behavior',
        'Public health announcements',
        'Colorful illustrations in apps'
      ],
      correctIndex: 1,
      explanation: 'Under EU law, social media apps cannot track children or show them personalized ads based on their online activity.'
    },
    {
      id: 2,
      category: 'EU Law Status',
      question: 'Is there already a universal EU-wide total ban on social media for everyone under 15?',
      options: [
        'Yes, it took effect in all countries years ago',
        'No, it is currently a law in France and an active proposal being debated across the EU',
        'Yes, but only for computers, not phones',
        'No, the EU does not care about child safety'
      ],
      correctIndex: 1,
      explanation: 'France passed an under-15 parental consent law, and EU leaders are discussing making it standard, but it is not yet a single universal law for all 27 nations.'
    },
    {
      id: 3,
      category: 'Age Verification',
      question: 'Why are simple "Click here if you are 13" checkboxes being replaced?',
      options: [
        'Checkboxes use too much internet battery',
        'Kids easily type a fake birth year to bypass them',
        'Websites do not have enough server space for checks',
        'Parents asked to receive paper forms by post'
      ],
      correctIndex: 1,
      explanation: 'Checkboxes do not verify real age. The EU is testing privacy-friendly digital verification that confirms age without sharing private personal identity.'
    },
    {
      id: 4,
      category: 'Sleep Health',
      question: 'Why does looking at your phone right before bed make it harder to sleep?',
      options: [
        'Screen blue light tricks the brain and lowers melatonin',
        'Phone volume cools down your body temperature',
        'Screen glass absorbs oxygen from the room',
        'Wi-Fi signals erase nighttime dreams'
      ],
      correctIndex: 0,
      explanation: 'Blue light from phone screens tells your brain it is daytime, delaying the natural sleep hormone melatonin.'
    },
    {
      id: 5,
      category: 'Addictive Features',
      question: 'What is considered an "addictive feature" that the EU is investigating?',
      options: [
        'Infinite scroll, endless autoplay, and snap streaks',
        'Clear logout and exit buttons',
        'A screen showing total minutes spent',
        'Password security checks'
      ],
      correctIndex: 0,
      explanation: 'Features like infinite scroll and streak counters are designed to keep children in continuous reward loops.'
    },
    {
      id: 6,
      category: 'Online Safety',
      question: 'What should a teen do immediately if they experience cyberbullying online?',
      options: [
        'Insult the bully back in public comments',
        'Save screenshots, block the person, report the account, and tell a trusted adult',
        'Throw the phone away without saving evidence',
        'Pay money to people threatening them'
      ],
      correctIndex: 1,
      explanation: 'Keeping evidence lets parents, schools, or helplines (like 116 111 in Europe) take action and stop the harasser.'
    },
    {
      id: 7,
      category: 'Privacy Defaults',
      question: 'What does "Privacy by Default" mean when a teenager opens a new account?',
      options: [
        'The account is public for anyone to see',
        'The account is private by default, with stranger messages and location off',
        'The app broadcasts the school location to strangers',
        'The phone contacts list is posted online'
      ],
      correctIndex: 1,
      explanation: 'Apps must start with maximum privacy turned on automatically, rather than expecting a teenager to find deep hidden settings.'
    },
    {
      id: 8,
      category: 'Eye Comfort',
      question: 'What is the simple "20-20-20 rule" to stop screen eye strain?',
      options: [
        'Spend 20 minutes on each social media app',
        'Every 20 minutes, look at something 20 feet away for 20 seconds',
        'Keep phone brightness at 20% for 20 days',
        'Scroll through 20 videos every 20 minutes'
      ],
      correctIndex: 1,
      explanation: 'Looking at distant objects relaxes the eye muscles and prevents dry eyes and headaches.'
    },
    {
      id: 9,
      category: 'Healthy Routines',
      question: 'What is a proven, healthy habit for better sleep and wellbeing?',
      options: [
        'Leaving the phone on your pillow with notifications buzzing',
        'Charging the phone outside the bedroom and keeping bed screen-free',
        'Watching bright videos until you pass out',
        'Setting 10 different alarms on your screen'
      ],
      correctIndex: 1,
      explanation: 'Charging devices outside the bedroom prevents late-night scrolling and helps you wake up rested.'
    },
    {
      id: 10,
      category: 'Parent Guidance',
      question: 'What is the most effective approach for parents regarding teen phone use?',
      options: [
        'Secretly reading every message with no discussion',
        'Agreeing on clear boundaries, screen-free meals, and open talk',
        'Giving unlimited screen time with zero rules',
        'Banning all devices forever'
      ],
      correctIndex: 1,
      explanation: 'Open communication and clear family agreements help children develop self-control and confidence online.'
    }
  ],

  // Credible research & references in plain English
  references: [
    {
      org: 'European Commission',
      title: 'Digital Services Act (DSA)',
      type: 'EU Law',
      date: 'Feb 2024',
      badge: 'Active Law',
      summary: 'Rules holding large social media platforms accountable, banning minor profiling, and requiring safer youth defaults.',
      url: 'https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package'
    },
    {
      org: 'European Commission',
      title: 'Better Internet for Kids (BIK+)',
      type: 'EU Strategy',
      date: 'May 2022',
      badge: 'Action Plan',
      summary: 'EU-wide plan providing anti-bullying helplines, digital literacy in schools, and safer design standards.',
      url: 'https://digital-strategy.ec.europa.eu/en/policies/better-internet-kids'
    },
    {
      org: 'World Health Organization (WHO)',
      title: 'Screen Time and Sleep Guidelines for Youth',
      type: 'Health Guidance',
      date: 'Official Guide',
      badge: 'Health Standard',
      summary: 'Recommends 8 to 10 hours of sleep for teens, regular outdoor exercise, and sensible screen limits.',
      url: 'https://www.who.int/publications/i/item/9789240015128'
    },
    {
      org: 'UNICEF Innocenti',
      title: 'Children in a Digital World',
      type: 'Research Report',
      date: 'Global Study',
      badge: 'Research',
      summary: 'Studies how social platforms affect young people, highlighting the balance between learning and avoiding online harm.',
      url: 'https://www.unicef.org/reports/state-worlds-children-2017'
    },
    {
      org: 'EU Kids Online',
      title: 'European Children Online Risks & Opportunities',
      type: 'Study of 25,000+ Youth',
      date: 'Research Study',
      badge: 'Survey',
      summary: 'Direct survey data from European families showing how cyberbullying, screen hours, and family habits interact.',
      url: 'https://www.lse.ac.uk/media-and-communications/research/research-projects/eu-kids-online'
    },
    {
      org: 'French Parliament',
      title: 'Law No. 2023-566 on Digital Majority',
      type: 'National Law (France)',
      date: 'July 2023',
      badge: 'French Law',
      summary: 'First national law in Europe to set age 15 as the digital majority, requiring parental approval for social media.',
      url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047799447'
    }
  ],

  // Interactive Checklists
  preventionChecklists: [
    {
      category: 'parents',
      title: 'For Parents & Guardians',
      items: [
        { id: 'p1', text: 'Set a phone-free dinner table and screen-free bedrooms after 9 PM.' },
        { id: 'p2', text: 'Turn on built-in screen time limits on Apple or Android devices together.' },
        { id: 'p3', text: 'Let your child know they can tell you about online bullying without losing their phone.' },
        { id: 'p4', text: 'Check that location-sharing is turned off on all social apps.' },
        { id: 'p5', text: 'Plan regular family walks, sports, or outdoor activities without screens.' }
      ]
    },
    {
      category: 'children',
      title: 'For Children & Teens',
      items: [
        { id: 'c1', text: 'Turn off notification badges for social apps to avoid constant interruptions.' },
        { id: 'c2', text: 'Use the 20-20-20 rule: look 20 feet away every 20 minutes to rest your eyes.' },
        { id: 'c3', text: 'Set an app timer (like 45 minutes) on video apps to help you pause.' },
        { id: 'c4', text: 'Never accept friend requests from people you do not know in real life.' },
        { id: 'c5', text: 'Charge your phone in the hallway or kitchen overnight, not right next to your pillow.' }
      ]
    },
    {
      category: 'schools',
      title: 'For Schools & Teachers',
      items: [
        { id: 's1', text: 'Keep classrooms phone-free during lessons and lunch.' },
        { id: 's2', text: 'Teach digital privacy and how algorithms work in regular classes.' },
        { id: 's3', text: 'Provide a safe, confidential way for students to report cyberbullying.' },
        { id: 's4', text: 'Hold workshops for parents on how to set up healthy screen limits at home.' }
      ]
    },
    {
      category: 'platforms',
      title: 'For Social Media Platforms',
      items: [
        { id: 't1', text: 'Use privacy-friendly age checks that do not store children\'s ID cards.' },
        { id: 't2', text: 'Make teen accounts private automatically with stranger direct messages blocked.' },
        { id: 't3', text: 'Turn off infinite scroll and autoplay for users under 18.' },
        { id: 't4', text: 'Provide clear, one-click reporting tools for bullying and harmful content.' }
      ]
    }
  ]
};
