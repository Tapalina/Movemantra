import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Info, Phone } from 'lucide-react';
import Seo from '../components/seo/Seo';
import CtaBanner from '../components/sections/CtaBanner';
import HowItWorks from '../components/sections/HowItWorks';
import PageHero from '../components/sections/PageHero';
import Button from '../components/ui/Button';
import CheckList from '../components/ui/CheckList';
import Container from '../components/ui/Container';
import Icon from '../components/ui/Icon';
import Reveal from '../components/ui/Reveal';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { images } from '../data/images';
import { cityLabel, siteConfig } from '../data/siteConfig';
import { getServiceBySlug, services } from '../data/services';
import { phoneHref } from '../utils/contact';
import { getServiceWhatsAppLink } from '../utils/whatsapp';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <NotFound />;

  const others = services.filter((s) => s.slug !== service.slug);
  const whatsappLink = getServiceWhatsAppLink(service.title);

  return (
    <>
      <Seo
        title={service.seo.title}
        description={service.seo.description}
        image={images[service.image].src}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'MedicalTherapy',
          name: service.title,
          description: service.seo.description,
          provider: { '@type': 'MedicalBusiness', name: siteConfig.name, url: siteConfig.siteUrl },
        }}
      />

      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: service.title }]}
        eyebrow="Home physiotherapy service"
        title={service.title}
        lead={service.summary}
        image={images[service.image]}
      >
        <Button href={whatsappLink} variant="primary" size="lg">
          <WhatsAppIcon />
          Book a Home Visit
        </Button>
        <Button href={phoneHref} variant="outline" size="lg">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {siteConfig.contact.phoneDisplay}
        </Button>
      </PageHero>

      <section className="bg-white py-16 lg:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_340px] lg:gap-16">
          <article>
            <Reveal className="prose-mm text-base text-navy-900/75 sm:text-lg">
              <h2 className="mb-5 text-3xl sm:text-4xl">Overview</h2>
              {service.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <Reveal className="rounded-3xl border border-navy-100 bg-mist-50 p-7">
                <h2 className="text-xl">Who it may help</h2>
                <p className="mt-1.5 text-sm text-navy-900/60">Common reasons people choose this service:</p>
                <CheckList items={service.helpsWith} className="mt-5" />
              </Reveal>
              <Reveal delay={0.08} className="rounded-3xl border border-navy-100 bg-white p-7 shadow-soft">
                <h2 className="text-xl">What sessions may include</h2>
                <p className="mt-1.5 text-sm text-navy-900/60">Tailored to you after your assessment:</p>
                <CheckList items={service.sessionIncludes} className="mt-5" />
              </Reveal>
            </div>

            <Reveal className="mt-8 flex gap-3 rounded-2xl border border-gold-200 bg-gold-50 p-5 text-sm text-navy-900/75">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
              <p>
                Every person is different. Your physiotherapist will discuss what to expect after assessing you. If you
                have recently had surgery or have a medical condition, please share any reports or instructions from
                your doctor.
              </p>
            </Reveal>
          </article>

          <aside aria-label="Booking and other services" className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-navy-800 p-7 text-white shadow-lift">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-teal-200">
                <Icon name={service.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-xl text-white">Book {service.title.toLowerCase()} at home</h2>
              <p className="mt-2 text-sm text-navy-100/80">
                Home visits across {cityLabel}. Message us and we will confirm a time that suits you.
              </p>
              <Button href={whatsappLink} variant="whatsapp" className="mt-6 w-full">
                <WhatsAppIcon />
                Book on WhatsApp
              </Button>
              <a
                href={phoneHref}
                className="mt-3 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-white/90 hover:text-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>

            <nav aria-label="Other services" className="mt-6 rounded-3xl border border-navy-100 p-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-900/50">Other services</h2>
              <ul className="mt-4 space-y-1">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold text-navy-800 transition-colors hover:bg-mist-100"
                    >
                      {s.title}
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-teal-600 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </Container>
      </section>

      <HowItWorks className="bg-mist-50" title="How it works at home" />
      <CtaBanner
        whatsappMessage={`Hello MoveMantra, I would like to enquire about ${service.title} at home. Please share the details.`}
      />
    </>
  );
}
