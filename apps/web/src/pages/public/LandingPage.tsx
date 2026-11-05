import { DashboardPreview } from '@/components/marketing/DashboardPreview';
import { FloatingNotifications } from '@/components/marketing/FloatingNotifications';
import { HeroPhone } from '@/components/marketing/HeroPhone';
import { MindfulDemo } from '@/components/marketing/MindfulDemo';
import { faqItems, references } from '@safescroll/policy-content';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Brain,
  ChevronDown,
  Eye,
  HeartHandshake,
  Lock,
  PauseCircle,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const testimonials = [
  {
    quote:
      'Safe Scroll helped our family talk about screen time without blame. The policy explainers made EU rules feel approachable.',
    name: 'Maya R.',
    role: 'Parent · Sample placeholder',
  },
  {
    quote:
      'The mindful breaks are simple enough to stick with. I finally understand why infinite scroll feels so hard to leave.',
    name: 'Leo K.',
    role: 'Student · Sample placeholder',
  },
  {
    quote:
      'As a teacher, the educational modules and quiz are ready conversation starters for digital citizenship lessons.',
    name: 'Sofia N.',
    role: 'Educator · Sample placeholder',
  },
];

export function LandingPage() {
  const reduce = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="overflow-x-hidden bg-[#111827]">
      {/* HERO */}
      <section className="relative isolate min-h-[min(100vh,920px)] overflow-hidden bg-[radial-gradient(circle_at_78%_28%,rgba(139,124,246,0.28),transparent_34%),radial-gradient(circle_at_12%_18%,rgba(183,166,255,0.12),transparent_30%),linear-gradient(180deg,#111827_0%,#192334_55%,#111827_100%)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(rgba(255,255,255,0.55)_0.6px,transparent_0.6px)] [background-size:18px_18px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28 lg:pt-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B7A6FF]">
              Scroll Less. Live More.
            </p>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              Take Back Control of Your Digital Life.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Break mindless scrolling habits, build healthier digital routines and make every
              moment count.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/auth/sign-up"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#B7A6FF]"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Explore Safe Scroll
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#A1A1AA]">
              <span className="inline-flex items-center gap-1.5">
                <PauseCircle className="h-3.5 w-3.5 text-[#78E6C1]" /> Mindful habits
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-[#B7A6FF]" /> Personal insights
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#8B7CF6]" /> Privacy-conscious design
              </span>
            </div>
          </motion.div>

          <div className="relative mx-auto w-full max-w-[420px] pb-8 pt-6 lg:max-w-none lg:pb-0 lg:pt-0">
            <FloatingNotifications />
            <div className="relative z-10 flex justify-center lg:justify-end lg:pr-6">
              <HeroPhone />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-t border-white/5 bg-[#111827] px-4 py-24 sm:px-6">
        <motion.div {...fade} className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B7A6FF]">The problem</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.12]">
            Your attention is being pulled in a thousand directions.
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {[
              {
                title: 'Mindless scrolling',
                body: 'Feeds are designed for continuous engagement. Minutes disappear before intention catches up.',
              },
              {
                title: 'Unconscious app opening',
                body: 'Muscle memory opens social apps without a reason — then the algorithm supplies one.',
              },
              {
                title: 'Lost concentration',
                body: 'Notifications and loops fragment deep work, rest, and real-world presence.',
              },
              {
                title: 'Unbalanced routines',
                body: 'Late-night scrolling, tired mornings, and goals that never quite stick.',
              },
            ].map((item) => (
              <article key={item.title} className="border-l border-[#8B7CF6]/40 pl-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{item.body}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-[#192334] px-4 py-24 sm:px-6">
        <motion.div {...fade} className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78E6C1]">How Safe Scroll works</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            Awareness. Pause. Better habits.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Become Aware',
                body: 'Understand your digital habits with transparent reflection tools and clear sample insights.',
                icon: Eye,
              },
              {
                step: '02',
                title: 'Pause Before You Scroll',
                body: 'Introduce mindful moments — breathing and reflection — before continuing into distraction.',
                icon: PauseCircle,
              },
              {
                step: '03',
                title: 'Build Better Habits',
                body: 'Create healthier routines with supportive challenges, goals, and progress you can actually use.',
                icon: Target,
              },
            ].map((item, i) => (
              <motion.article
                key={item.step}
                {...fade}
                transition={{ ...fade.transition, delay: i * 0.08 }}
                className="relative rounded-[1.75rem] border border-white/10 bg-[#111827]/55 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#B7A6FF]">{item.step}</span>
                  <item.icon className="h-5 w-5 text-[#78E6C1]" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* MINDFUL DEMO */}
      <section id="features" className="px-4 py-24 sm:px-6">
        <motion.div {...fade} className="mx-auto max-w-6xl">
          <MindfulDemo />
        </motion.div>
      </section>

      {/* HABITS DASHBOARD PREVIEW */}
      <section className="bg-[#192334] px-4 py-24 sm:px-6">
        <motion.div {...fade} className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B7A6FF]">
              Know your digital habits
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              See where your time really goes.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#A1A1AA]">
              Weekly screen-time views, category breakdowns, mindful sessions, goals, and wellbeing
              progress — clearly labelled as sample data on the web until native permissions are
              connected.
            </p>
            <Link
              to="/app/analytics"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#B7A6FF]"
            >
              Open analytics preview <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <DashboardPreview />
        </motion.div>
      </section>

      {/* ROUTINES */}
      <section className="px-4 py-24 sm:px-6">
        <motion.div {...fade} className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78E6C1]">
            Build healthier routines
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            Supportive challenges — never shame-based streaks.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              { title: 'Daily challenges', body: 'Small, achievable actions for today.' },
              { title: 'Focus sessions', body: 'Protect attention with quiet windows.' },
              { title: 'Mindful breaks', body: 'Breathing pauses you can restart anytime.' },
              { title: 'Sleep protection', body: 'Charge outside the bedroom tonight.' },
              { title: 'Achievements', body: 'Celebrate progress without pressure.' },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5"
              >
                <Sparkles className="h-5 w-5 text-[#B7A6FF]" />
                <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-[#A1A1AA]">{item.body}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* LEARN */}
      <section className="bg-[#192334] px-4 py-24 sm:px-6">
        <motion.div {...fade} className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B7A6FF]">
              Learn and understand
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Digital safety starts with awareness.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            {[
              { icon: Scale, title: 'Age eligibility', to: '/app/learn/age', span: 'lg:col-span-2' },
              { icon: BookOpen, title: 'EU policy hub', to: '/app/learn/policies', span: 'lg:col-span-3' },
              { icon: ShieldCheck, title: 'Online safety', to: '/app/learn/safety', span: 'lg:col-span-3' },
              { icon: Brain, title: 'Health impact matrix', to: '/app/learn/health', span: 'lg:col-span-2' },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className={`group rounded-[1.75rem] border border-white/10 bg-[#111827]/60 p-6 transition hover:border-[#8B7CF6]/50 hover:bg-[#111827] ${item.span}`}
              >
                <item.icon className="h-6 w-6 text-[#78E6C1]" />
                <h3 className="mt-5 text-xl font-semibold text-white group-hover:text-[#B7A6FF]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#A1A1AA]">Open the educational module →</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TRUST */}
      <section className="px-4 py-24 sm:px-6">
        <motion.div {...fade} className="mx-auto max-w-4xl text-center">
          <HeartHandshake className="mx-auto h-8 w-8 text-[#B7A6FF]" />
          <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
            Your digital wellbeing belongs to you.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#A1A1AA]">
            User-controlled preferences, transparent demo labelling, privacy settings, and a
            service architecture prepared for secure Supabase Auth — without shipping secrets in
            the frontend. We only claim what the product actually implements.
          </p>
        </motion.div>
      </section>

      {/* RESEARCH */}
      <section className="bg-[#192334] px-4 py-24 sm:px-6">
        <motion.div {...fade} className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78E6C1]">Research</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Official sources & research</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {references.slice(0, 4).map((ref) => (
              <a
                key={ref.url}
                href={ref.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-[#111827]/50 p-5 transition hover:border-[#8B7CF6]/40"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-[#B7A6FF]">
                  {ref.org}
                </div>
                <h3 className="mt-2 font-semibold text-white">{ref.title}</h3>
                <p className="mt-2 text-sm text-[#A1A1AA]">{ref.summary}</p>
              </a>
            ))}
          </div>
          <Link to="/resources" className="mt-6 inline-flex text-sm font-semibold text-white hover:text-[#B7A6FF]">
            View all resources →
          </Link>
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 py-24 sm:px-6">
        <motion.div {...fade} className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B7A6FF]">
            Sample voices
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">What people hope Safe Scroll becomes</h2>
          <p className="mt-2 text-sm text-[#A1A1AA]">Placeholder testimonials until real reviews are collected.</p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-sm leading-relaxed text-white/90">“{t.quote}”</p>
                <footer className="mt-5 text-xs text-[#A1A1AA]">
                  <div className="font-semibold text-white">{t.name}</div>
                  {t.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="bg-[#192334] px-4 py-20 sm:px-6">
        <motion.div {...fade} className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold text-white">Questions</h2>
          <div className="mt-8 space-y-3">
            {faqItems.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q} className="overflow-hidden rounded-2xl border border-white/10">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                  >
                    {item.q}
                    <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
                  </button>
                  {open ? (
                    <p className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-[#A1A1AA]">
                      {item.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden px-4 py-28 sm:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,124,246,0.28),transparent_45%)]" />
        <motion.div {...fade} className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Make your next scroll a conscious choice.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#A1A1AA]">
            Start with a mindful demo today. Bring your real routines when you are ready.
          </p>
          <Link
            to="/auth/sign-up"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#111827] transition hover:bg-[#B7A6FF]"
          >
            Start Your Journey
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
