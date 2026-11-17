import Seo, { getBusinessJsonLd } from '../components/seo/Seo';
import AreasServed from '../components/sections/AreasServed';
import CtaBanner from '../components/sections/CtaBanner';
import FaqSection, { getFaqJsonLd } from '../components/sections/FaqSection';
import HomeBenefits from '../components/sections/HomeBenefits';
import HomeHero from '../components/sections/HomeHero';
import HowItWorks from '../components/sections/HowItWorks';
import IntroSplit from '../components/sections/IntroSplit';
import ServicesGrid from '../components/sections/ServicesGrid';
import Testimonials from '../components/sections/Testimonials';
import WhyChoose from '../components/sections/WhyChoose';
import Container from '../components/ui/Container';
import SectionHeading from '../components/ui/SectionHeading';
import { cityLabel } from '../data/siteConfig';

export default function Home() {
  return (
    <>
      <Seo
        description={`Physiotherapy at home across ${cityLabel}. MoveMantra’s home visit physiotherapists provide personalised rehabilitation for pain, sports injuries, post-operative recovery and neurological conditions.`}
        jsonLd={[getBusinessJsonLd(), getFaqJsonLd()]}
      />

      <HomeHero />
      <IntroSplit />

      <section aria-labelledby="services-title" className="bg-mist-50 py-20 lg:py-28">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="services-title"
              eyebrow="Our services"
              title={
                <>
                  Physiotherapy and rehabilitation, <span className="accent text-teal-600">tailored to you</span>
                </>
              }
              lead="From sports injury rehabilitation to gentle care for older adults – every programme starts with a thorough assessment at home."
            />
          </div>
          <div className="mt-12 lg:mt-14">
            <ServicesGrid />
          </div>
        </Container>
      </section>

      <WhyChoose />
      <HowItWorks />
      <HomeBenefits />
      <AreasServed />
      <Testimonials className="bg-white pt-0 lg:pt-0" />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
