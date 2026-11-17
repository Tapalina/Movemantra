import { motion } from 'framer-motion';

/**
 * Subtle fade-and-rise when an element scrolls into view.
 * Motion is disabled automatically for users who prefer reduced motion (see MotionConfig in App).
 */
export default function Reveal({ as = 'div', delay = 0, y = 18, className, children, ...props }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}
