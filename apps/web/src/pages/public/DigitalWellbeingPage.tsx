import { Activity, Clock3, Trophy, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';

const items = [
  {
    icon: Activity,
    title: 'Wellbeing analyzer',
    body: 'Interactive sliders for social use, sleep, exercise, and breaks with a transparent experimental score.',
    to: '/app/wellbeing',
  },
  {
    icon: Clock3,
    title: 'Screen-time insights',
    body: 'Demo charts for patterns and goals. Native measurement requires the mobile app and permissions.',
    to: '/app/screen-time',
  },
  {
    icon: Wind,
    title: 'Mindful breaks',
    body: 'Breathing sessions and reflection prompts inspired by intentional pause design.',
    to: '/app/mindful',
  },
  {
    icon: Trophy,
    title: 'Daily challenges',
    body: 'Supportive habit challenges for sleep, focus, offline time, and social reduction.',
    to: '/app/challenges',
  },
];

export default function DigitalWellbeingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B7A6FF]">Digital wellbeing</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white">
        Tools that help you notice, pause, and improve
      </h1>
      <p className="mt-4 max-w-2xl text-[#A1A1AA]">
        Safe Scroll combines reflection analytics, mindful interruptions, and habit challenges.
        Scores are experimental and educational — not medical diagnoses.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="rounded-3xl border border-white/10 bg-[#192334] p-6 transition hover:border-[#8B7CF6]/40"
          >
            <item.icon className="h-6 w-6 text-[#8B7CF6]" />
            <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-[#A1A1AA]">{item.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
