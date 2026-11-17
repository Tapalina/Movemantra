import { ArrowRight, Phone } from 'lucide-react';
import { services } from '../../data/services';
import { phoneHref } from '../../utils/contact';
import { getWhatsAppLink } from '../../utils/whatsapp';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import ServiceCard from './ServiceCard';

/**
 * All services in a responsive grid, finished with a "not sure?" help tile
 * so the last row is never left with an orphan card on desktop.
 */
export default function ServicesGrid({ headingAs = 'h3', showHelpTile = true }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
      {services.map((service, i) => (
        <Reveal key={service.slug} delay={(i % 3) * 0.06} className="h-full">
          <ServiceCard service={service} headingAs={headingAs} />
        </Reveal>
      ))}

      {showHelpTile && (
        <Reveal delay={0.12} className="h-full lg:col-span-2">
          <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-navy-700 via-navy-700 to-teal-600 p-7 text-white shadow-lift sm:p-9">
            <div
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/90 blur-[2px]"
              aria-hidden="true"
            />
            <div className="relative max-w-md">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-100">Not sure where to start?</p>
              <p className="mt-3 text-2xl font-bold leading-snug tracking-tight sm:text-[1.75rem]">
                Tell us what you are experiencing – we will guide you to the right care.
              </p>
            </div>
            <div className="relative flex flex-col gap-3 lg:flex-row">
              <Button href={getWhatsAppLink()} variant="whatsapp">
                <WhatsAppIcon />
                Chat on WhatsApp
              </Button>
              <Button href={phoneHref} variant="ghostLight">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
