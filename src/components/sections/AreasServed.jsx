import { MapPin } from 'lucide-react';
import { cityLabel, siteConfig } from '../../data/siteConfig';
import { getWhatsAppLink } from '../../utils/whatsapp';
import Container from '../ui/Container';
import MapEmbed from '../ui/MapEmbed';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const { serviceAreas } = siteConfig.location;

export function AreaChips({ className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {serviceAreas.map((area) => (
        <li
          key={area}
          className="inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-white px-4 py-2 text-sm font-semibold text-navy-800 shadow-sm"
        >
          <MapPin className="h-3.5 w-3.5 text-teal-500" aria-hidden="true" />
          {area}
        </li>
      ))}
    </ul>
  );
}

export default function AreasServed({ withMap = true, headingAs = 'h2', className = 'bg-white' }) {
  return (
    <section aria-labelledby="areas-title" className={`py-20 lg:py-28 ${className}`}>
      <Container className={withMap ? 'grid items-center gap-12 lg:grid-cols-2 lg:gap-16' : ''}>
        <div>
          <SectionHeading
            id="areas-title"
            as={headingAs}
            eyebrow="Areas we serve"
            title={
              <>
                Physiotherapy at home, <span className="accent text-teal-600">across {cityLabel}</span>
              </>
            }
            lead="Our home visit physiotherapists travel to you. If your locality is not listed, message us – we may still be able to help or recommend someone nearby."
          />
          <Reveal delay={0.1}>
            <AreaChips className="mt-8" />
            <a
              href={getWhatsAppLink(
                'Hello MoveMantra, could you confirm whether you provide home physiotherapy in my area? My location is: ',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 underline-offset-4 hover:underline"
            >
              Check availability for your area →
            </a>
          </Reveal>
        </div>
        {withMap && (
          <Reveal delay={0.1}>
            <MapEmbed className="h-[340px] sm:aspect-[4/3] sm:h-auto" />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
