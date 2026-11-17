import { cn } from '../../utils/cn';

/** Decorative arcs echoing the sweep of the MoveMantra logo. Purely visual. */
export default function Swoosh({ className, tone = 'brand' }) {
  const light = tone === 'light';
  return (
    <svg viewBox="0 0 600 400" fill="none" aria-hidden="true" className={cn('pointer-events-none', className)}>
      <path
        d="M20 330C140 140 330 40 580 30"
        stroke={light ? '#FFFFFF' : '#0F9598'}
        strokeOpacity={light ? 0.12 : 0.16}
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        d="M110 380C220 230 380 150 560 130"
        stroke="#FAB114"
        strokeOpacity={light ? 0.4 : 0.32}
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
