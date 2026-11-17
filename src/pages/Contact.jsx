import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Seo, { getBusinessJsonLd } from '../components/seo/Seo';
import { AreaChips } from '../components/sections/AreasServed';
import EnquiryForm from '../components/sections/EnquiryForm';
import PageHero from '../components/sections/PageHero';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import MapEmbed from '../components/ui/MapEmbed';
import Reveal from '../components/ui/Reveal';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { cityLabel, siteConfig } from '../data/siteConfig';
import { emailHref, getMapLink, phoneHref } from '../utils/contact';
import { getWhatsAppLink } from '../utils/whatsapp';

const { contact, location } = siteConfig;

const channels = [
  {
    icon: Phone,
    label: 'Call us',
    value: contact.phoneDisplay,
    href: phoneHref,
    hint: 'Talk to our team',
  },
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp booking',
    value: siteConfig.whatsapp.display,
    href: getWhatsAppLink(),
    hint: 'Quickest way to book',
    highlight: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: contact.email,
    href: emailHref,
    hint: 'For detailed enquiries',
  },
];

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us – Book Physiotherapy at Home"
        description={`Contact MoveMantra to book home physiotherapy services across ${cityLabel}. Call ${contact.phoneDisplay}, WhatsApp ${siteConfig.whatsapp.display}, or send us an enquiry.`}
        jsonLd={getBusinessJsonLd()}
      />

      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        eyebrow="Contact us"
        title={
          <>
            Let’s get you <span className="accent text-teal-600">moving again</span>
          </>
        }
        lead="Have a question or ready to book a home visit? Reach out the way that suits you – we are happy to help."
      >
        <Button href={getWhatsAppLink()} variant="whatsapp" size="lg">
          <WhatsAppIcon />
          Book on WhatsApp
        </Button>
      </PageHero>

      {/* Contact channels */}
      <section aria-labelledby="channels-title" className="bg-white pb-6">
        <Container>
          <h2 id="channels-title" className="sr-only">
            Ways to reach us
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 0.06}>
                <a
                  href={c.href}
                  {...(c.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  className={`group flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                    c.highlight ? 'bg-navy-800 text-white shadow-lift' : 'border border-navy-100 bg-white shadow-soft'
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      c.highlight ? 'bg-whatsapp text-whatsapp-ink' : 'bg-teal-50 text-teal-600'
                    }`}
                  >
                    <c.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className={`mt-5 text-sm font-semibold ${c.highlight ? 'text-teal-200' : 'text-navy-900/55'}`}>
                    {c.label}
                  </span>
                  <span className={`mt-1 break-all text-lg font-bold ${c.highlight ? 'text-white' : 'text-navy-900'}`}>
                    {c.value}
                  </span>
                  <span className={`mt-auto pt-3 text-sm ${c.highlight ? 'text-navy-100/75' : 'text-navy-900/55'}`}>
                    {c.hint}
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal as="li" delay={0.18} className="flex flex-col rounded-3xl border border-navy-100 bg-mist-50 p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                <Clock className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="mt-5 text-sm font-semibold text-navy-900/55">Visiting hours</span>
              <dl className="mt-1 space-y-1.5">
                {contact.hours.map((h) => (
                  <div key={h.days}>
                    <dt className="text-sm font-bold text-navy-900">{h.days}</dt>
                    <dd className="text-sm text-navy-900/65">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </ul>
        </Container>
      </section>

      {/* Enquiry + map */}
      <section aria-labelledby="enquiry-title" className="bg-white py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal
            id="enquiry"
            className="scroll-mt-28 rounded-[2rem] border border-navy-100 bg-white p-6 shadow-soft sm:p-10"
          >
            <p className="eyebrow">
              <span className="h-px w-6 bg-teal-500" aria-hidden="true" />
              Enquiry
            </p>
            <h2 id="enquiry-title" className="mt-3 text-3xl sm:text-4xl">
              Request a home visit
            </h2>
            <p className="mb-8 mt-3 text-navy-900/65">
              Share a few details and we will get back to you to confirm availability and timings.
            </p>
            <EnquiryForm />
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.08}>
              <MapEmbed className="h-[340px] sm:aspect-[4/3] sm:h-auto" />
            </Reveal>
            <Reveal delay={0.12} className="rounded-3xl bg-mist-50 p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl">
                <MapPin className="h-5 w-5 text-teal-600" aria-hidden="true" />
                Service coverage
              </h2>
              <address className="mt-3 not-italic text-navy-900/70">
                {location.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-4 text-sm text-navy-900/65">We currently offer home physiotherapy in these areas:</p>
              <AreaChips className="mt-4" />
              <a
                href={getMapLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex text-sm font-bold text-teal-700 underline-offset-4 hover:underline"
              >
                Open in Google Maps →
              </a>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
