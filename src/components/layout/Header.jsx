import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import logo from '../../assets/brand/logo-horizontal.png';
import { navLinks, siteConfig } from '../../data/siteConfig';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useScrolled } from '../../hooks/useScrolled';
import { cn } from '../../utils/cn';
import { phoneHref } from '../../utils/contact';
import { getWhatsAppLink } from '../../utils/whatsapp';
import Button from '../ui/Button';
import Container from '../ui/Container';
import WhatsAppIcon from '../ui/WhatsAppIcon';

export default function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const { pathname } = useLocation();
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useLockBodyScroll(open);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Esc closes the menu; focus moves into the panel on open and back to the toggle on close.
  useEffect(() => {
    if (!open) return undefined;
    menuRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled || open
            ? 'border-b border-navy-100/70 bg-white/90 shadow-[0_6px_24px_-18px_rgba(12,40,70,0.35)] backdrop-blur-md'
            : 'border-b border-transparent bg-white/0',
        )}
      >
        <Container className="flex h-[68px] items-center justify-between gap-4 lg:h-[78px]">
          <Link to="/" className="shrink-0 rounded-lg" aria-label={`${siteConfig.name} – home`}>
            <img src={logo} alt={siteConfig.name} width="320" height="60" className="h-8 w-auto sm:h-9 lg:h-10" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'relative rounded-full px-4 py-2 text-[15px] font-semibold transition-colors',
                        isActive ? 'text-navy-800' : 'text-navy-900/65 hover:text-navy-800',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-dot"
                            className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold-400"
                            aria-hidden="true"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-navy-800 transition-colors hover:text-teal-700 xl:inline-flex"
            >
              <Phone className="h-4 w-4 text-teal-600" aria-hidden="true" />
              {siteConfig.contact.phoneDisplay}
            </a>
            <Button href={getWhatsAppLink()} variant="primary" size="sm" className="hidden sm:inline-flex">
              <WhatsAppIcon className="h-4 w-4" />
              Book a Home Visit
            </Button>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-800 transition-colors hover:bg-mist-100 lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap this fixed panel inside it. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 top-[68px] z-[45] overflow-y-auto border-t border-navy-100 bg-white lg:hidden"
          >
            <Container className="flex min-h-full flex-col py-6">
              <nav aria-label="Mobile">
                <ul className="divide-y divide-navy-100/70">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.to}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                    >
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center justify-between py-4 text-2xl font-bold tracking-tight',
                            isActive ? 'text-teal-600' : 'text-navy-900',
                          )
                        }
                      >
                        {link.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto space-y-3 pt-8">
                <Button href={getWhatsAppLink()} variant="whatsapp" size="lg" className="w-full">
                  <WhatsAppIcon />
                  Book on WhatsApp
                </Button>
                <Button href={phoneHref} variant="outline" size="lg" className="w-full">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Call {siteConfig.contact.phoneDisplay}
                </Button>
                <p className="pt-2 text-center text-sm text-navy-900/55">{siteConfig.tagline}</p>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
