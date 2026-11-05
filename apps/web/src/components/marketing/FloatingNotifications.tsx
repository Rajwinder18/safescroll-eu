import { Bell, Pause, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const tiles = [
  {
    id: 1,
    icon: Bell,
    title: 'Pause before you open',
    body: 'A calm moment before the feed.',
    className: 'left-0 top-[8%] sm:-left-6 lg:-left-10',
    delay: 0,
  },
  {
    id: 2,
    icon: Pause,
    title: 'Mindful break ready',
    body: 'Breathe · Reflect · Choose',
    className: 'right-0 top-[22%] sm:-right-4 lg:-right-8',
    delay: 0.35,
  },
  {
    id: 3,
    icon: Sparkles,
    title: 'Intentional progress',
    body: '3 mindful sessions today',
    className: 'bottom-[12%] left-[4%] sm:left-2',
    delay: 0.7,
  },
];

export function FloatingNotifications() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {tiles.map((tile) => (
        <motion.div
          key={tile.id}
          className={`absolute max-w-[210px] rounded-2xl border border-white/15 bg-[#B7A6FF]/15 px-3.5 py-3 shadow-[0_18px_50px_rgba(139,124,246,0.22)] backdrop-blur-xl ${tile.className}`}
          initial={{ opacity: 0, y: 18 }}
          animate={
            reduce
              ? { opacity: 1, y: 0 }
              : {
                  opacity: 1,
                  y: [0, -10, 0],
                }
          }
          transition={
            reduce
              ? { duration: 0.4, delay: tile.delay }
              : {
                  opacity: { duration: 0.6, delay: tile.delay },
                  y: {
                    duration: 5.5 + tile.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: tile.delay,
                  },
                }
          }
        >
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-white">
              <tile.icon className="h-4 w-4" />
            </span>
            <div>
              <div className="text-xs font-semibold text-white">{tile.title}</div>
              <div className="mt-0.5 text-[11px] leading-snug text-white/70">{tile.body}</div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-2/3 rounded-full bg-[#78E6C1]" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
