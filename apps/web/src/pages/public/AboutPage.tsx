import { BookOpen, LineChart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const pillars = [
  {
    icon: BookOpen,
    title: 'Educate',
    body: 'Public policy, digital safety, and awareness — with clear labels for laws, proposals, and guidance.',
  },
  {
    icon: Sparkles,
    title: 'Improve',
    body: 'Habit development, mindful interruptions, and supportive challenges without shame-based mechanics.',
  },
  {
    icon: LineChart,
    title: 'Measure',
    body: 'Transparent wellbeing scoring and progress views using entered or demonstration data — never fake device tracking.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#111827]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B7A6FF]">About Safe Scroll</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Safe Scroll
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#A1A1AA]">
          Scroll Less. Live More.
        </p>
        <p className="mt-6 max-w-3xl text-[#A1A1AA]">
          Safe Scroll is a digital wellbeing platform that helps people learn about online
          safety and EU youth-protection policy, reflect on screen habits, and practice
          healthier technology routines — with honesty about what the web can and cannot measure.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.title} className="rounded-3xl border border-white/10 bg-[#192334] p-5">
              <p.icon className="h-6 w-6 text-[#8B7CF6]" />
              <h2 className="mt-4 text-xl font-semibold text-white">{p.title}</h2>
              <p className="mt-2 text-sm text-[#A1A1AA]">{p.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/auth/sign-up"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#111827]"
          >
            Start Your Journey
          </Link>
          <Link
            to="/policies"
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Explore Policies
          </Link>
        </div>
      </div>
    </div>
  );
}
