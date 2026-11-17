import Seo from '../components/seo/Seo';
import CtaBanner from '../components/sections/CtaBanner';
import HowItWorks from '../components/sections/HowItWorks';
import PageHero from '../components/sections/PageHero';
import ServicesGrid from '../components/sections/ServicesGrid';
import Container from '../components/ui/Container';
import { cityLabel } from '../data/siteConfig';
import { services } from '../data/services';

export default function Services() {
  return (
    <>
      <Seo
        title="Home Physiotherapy Services"
        description={`Explore MoveMantra’s home physiotherapy services across ${cityLabel}: orthopaedic, sports injury rehabilitation, neurological, post-operative, geriatric physiotherapy and pain management.`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title })),
        }}
      />

      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        eyebrow="Our services"
        title={
          <>
            Physiotherapy services, <span className="accent text-teal-600">delivered at home</span>
          </>
        }
        lead="Every service begins with a one-to-one assessment in your home. From there, we build a programme around your condition, your goals and your everyday life."
      />

      <section aria-label="All services" className="bg-white pb-20 pt-4 lg:pb-28">
        <Container>
          <ServicesGrid headingAs="h2" />
        </Container>
      </section>

      <HowItWorks className="bg-mist-50" />
      <CtaBanner />
    </>
  );
}
