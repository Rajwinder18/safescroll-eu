import { motion, useReducedMotion } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';

/**
 * High-performance smooth page transition without mode="wait" empty voids.
 * Preserves background continuity and eliminates white/blank flashes.
 */
export function PageTransition() {
  const location = useLocation();
  const outlet = useOutlet();
  const reduce = useReducedMotion();

  return (
    <motion.div
      key={location.pathname}
      initial={reduce ? false : { opacity: 0.35, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-[50vh] will-change-[opacity,transform]"
    >
      {outlet}
    </motion.div>
  );
}
