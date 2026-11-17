import { Phone } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { phoneHref } from '../../utils/contact';
import { getWhatsAppLink } from '../../utils/whatsapp';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import Swoosh from '../ui/Swoosh';
import WhatsAppIcon from '../ui/WhatsAppIcon';

export default function CtaBanner({
  title = 'Ready to move better?',
  text = 'Book a home visit physiotherapist in a few messages. Tell us what is going on, and we will take it from there.',
  whatsappMessage,
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-16 lg:py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-800 via-navy-700 to-teal-600 px-6 py-12 text-white shadow-lift sm:px-12 sm:py-16 lg:px-16">
          <Swoosh tone="light" className="absolute -right-20 -top-10 w-[520px]" />
          <div
            className="absolute -bottom-16 right-10 hidden h-56 w-56 rounded-full bg-gold-400/90 shadow-[0_0_80px_10px_rgba(250,177,20,0.35)] lg:block"
            aria-hidden="true"
          />

          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-100">{siteConfig.tagline}</p>
            <h2 id="cta-title" className="mt-4 text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-base text-navy-50/85 sm:text-lg">{text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={getWhatsAppLink(whatsappMessage)} variant="whatsapp" size="lg">
                <WhatsAppIcon />
                Book on WhatsApp
              </Button>
              <Button href={phoneHref} variant="ghostLight" size="lg">
                <Phone className="h-5 w-5" aria-hidden="true" />
                {siteConfig.contact.phoneDisplay}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
