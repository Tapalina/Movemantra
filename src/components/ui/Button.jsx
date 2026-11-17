import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98] select-none';

const variants = {
  primary: 'bg-navy-700 text-white shadow-soft hover:bg-navy-800 hover:shadow-lift focus-visible:ring-navy-500',
  teal: 'bg-teal-600 text-white shadow-soft hover:bg-teal-700 hover:shadow-glow focus-visible:ring-teal-500',
  outline:
    'border border-navy-200 bg-white/70 text-navy-800 backdrop-blur hover:border-navy-300 hover:bg-white focus-visible:ring-navy-400',
  whatsapp:
    'bg-whatsapp text-whatsapp-ink shadow-soft hover:bg-[#2fe072] hover:shadow-lift focus-visible:ring-whatsapp-dark',
  light:
    'bg-white text-navy-800 shadow-soft hover:bg-mist-100 focus-visible:ring-white focus-visible:ring-offset-navy-800',
  ghostLight:
    'border border-white/30 text-white hover:border-white/60 hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-navy-800',
};

const sizes = {
  sm: 'min-h-[40px] px-4 text-sm',
  md: 'min-h-[48px] px-6 text-[15px]',
  lg: 'min-h-[54px] px-7 text-base',
};

/**
 * One button for internal routes (`to`), external/tel/mailto links (`href`) and actions.
 * External http(s) links open in a new tab safely.
 */
export default function Button({ to, href, variant = 'primary', size = 'md', className, children, ...props }) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a href={href} className={classes} {...(external && { target: '_blank', rel: 'noopener noreferrer' })} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
