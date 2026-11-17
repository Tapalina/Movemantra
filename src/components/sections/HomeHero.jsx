import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, HeartHandshake, Target, UserCheck } from 'lucide-react';
import { images } from '../../data/images';
import { cityLabel } from '../../data/siteConfig';
import { getWhatsAppLink } from '../../utils/whatsapp';
import Button from '../ui/Button';
import Container from '../ui/Container';
import SmartImage from '../ui/SmartImage';
import Swoosh from '../ui/Swoosh';
import WhatsAppIcon from '../ui/WhatsAppIcon';

const trust = [
  { icon: UserCheck, label: 'Qualified physiotherapists' },
  { icon: Target, label: 'Personalised plans' },
  { icon: HeartHandshake, label: 'Care at your doorstep' },
];

const ease = [0.22, 1, 0.36, 1];
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export default function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-mist-100 via-mist-50 to-white"
    >
      <div
        className="bg-dotgrid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_60%)]"
        aria-hidden="true"
      />
      <Swoosh className="absolute -left-40 bottom-0 w-[720px] opacity-80 lg:-left-24" />

      <Container className="relative grid items-center gap-12 pb-16 pt-28 sm:pt-32 lg:grid-cols-[1.08fr_1fr] lg:gap-10 lg:pb-24 lg:pt-36">
        <div>
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal-700 shadow-soft backdrop-blur sm:text-[13px]"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
            </span>
            Physiotherapy at home
          </motion.p>

          <motion.h1
            id="hero-title"
            {...fadeUp(0.08)}
            className="mt-6 text-[2.6rem] leading-[1.04] tracking-[-0.03em] sm:text-display lg:text-display-lg"
          >
            Move with confidence.{' '}
            <span className="accent block text-teal-600">
              Live without limits<span className="text-gold-400">.</span>
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl text-base text-navy-900/70 sm:text-lg">
            At MoveMantra, we believe better movement leads to a better life. Our personalised physiotherapy and
            rehabilitation programmes help you manage pain, recover from injuries, rebuild strength, and return to the
            activities you love.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={getWhatsAppLink()} size="lg" variant="primary">
              <WhatsAppIcon />
              Book a Home Visit
            </Button>
            <Button to="/services" size="lg" variant="outline">
              Explore Our Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.ul {...fadeUp(0.32)} className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {trust.map(({ icon: TrustIcon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm font-semibold text-navy-800">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-teal-600 shadow-soft">
                  <TrustIcon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visual: arched photo (echoing the logo's rising figure), sun accent and floating info cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="relative mx-auto w-full max-w-[460px] lg:max-w-none"
        >
          <div
            className="absolute -right-3 -top-3 h-20 w-20 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 shadow-[0_12px_40px_-8px_rgba(243,156,31,0.6)] sm:-right-5 sm:-top-5 sm:h-24 sm:w-24"
            aria-hidden="true"
          />
          <div className="relative rounded-b-[2.5rem] rounded-t-[999px] bg-gradient-to-b from-teal-500 to-navy-600 p-2 shadow-lift">
            <SmartImage
              image={images.hero}
              priority
              sizes="(min-width: 1024px) 520px, 90vw"
              className="aspect-[4/5] rounded-b-[2.1rem] rounded-t-[999px]"
              imgClassName="object-[60%_center]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
            className="absolute -left-2 bottom-10 flex max-w-[250px] items-center gap-3 rounded-2xl bg-white/95 p-3.5 pr-5 shadow-lift backdrop-blur sm:-left-10"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-bold text-navy-900">Home visits</span>
              <span className="block text-xs text-navy-900/60">across {cityLabel}, at a time that suits you</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease }}
            className="absolute -right-2 top-1/3 hidden rounded-2xl bg-navy-800 px-4 py-3 text-white shadow-lift sm:block lg:-right-8"
          >
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-200">
              One-to-one
            </span>
            <span className="block font-serif text-lg italic">care, at home</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
