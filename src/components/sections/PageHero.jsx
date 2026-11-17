import { motion } from 'framer-motion';
import Breadcrumbs from '../ui/Breadcrumbs';
import Container from '../ui/Container';
import SmartImage from '../ui/SmartImage';
import Swoosh from '../ui/Swoosh';

const ease = [0.22, 1, 0.36, 1];

/** Hero for inner pages. Holds the page's single H1. */
export default function PageHero({ eyebrow, title, lead, breadcrumbs, image, children }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist-100 to-white">
      <div
        className="bg-dotgrid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_5%,transparent_55%)]"
        aria-hidden="true"
      />
      <Swoosh className="absolute -right-48 -top-6 w-[640px] opacity-70" />

      <Container
        className={`relative grid gap-10 pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-36 ${image ? 'items-center lg:grid-cols-[1.1fr_1fr] lg:gap-14' : ''}`}
      >
        <div className="max-w-3xl">
          {breadcrumbs && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Breadcrumbs items={breadcrumbs} />
            </motion.div>
          )}
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="eyebrow mt-6"
            >
              <span className="h-px w-6 bg-teal-500" aria-hidden="true" />
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.06, ease }}
            className="mt-4 text-[2.25rem] leading-[1.06] tracking-[-0.03em] sm:text-display-sm lg:text-display"
          >
            {title}
          </motion.h1>
          {lead && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease }}
              className="mt-5 max-w-2xl text-base text-navy-900/70 sm:text-lg"
            >
              {lead}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              {children}
            </motion.div>
          )}
        </div>

        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="relative"
          >
            <div
              className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gold-300/60 blur-2xl"
              aria-hidden="true"
            />
            <SmartImage
              image={image}
              priority
              sizes="(min-width: 1024px) 560px, 92vw"
              className="aspect-[4/3] rounded-[2rem] shadow-lift ring-1 ring-navy-900/5"
            />
          </motion.div>
        )}
      </Container>
    </section>
  );
}
