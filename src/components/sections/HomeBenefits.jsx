import { ArrowRight } from 'lucide-react';
import { homeBenefits } from '../../data/content';
import { images } from '../../data/images';
import Button from '../ui/Button';
import CheckList from '../ui/CheckList';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import SmartImage from '../ui/SmartImage';

/** Split section: layered photos + patient-focused benefits of care at home. */
export default function HomeBenefits({ showLink = true }) {
  return (
    <section aria-labelledby="benefits-title" className="overflow-hidden bg-mist-50 py-20 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-2 pb-10 pr-6 sm:pr-16 lg:order-1">
          <SmartImage
            image={images.homeVisit}
            sizes="(min-width: 1024px) 520px, 88vw"
            className="aspect-[5/4] rounded-[2rem] shadow-lift"
          />
          <SmartImage
            image={images.care}
            sizes="(min-width: 1024px) 240px, 45vw"
            className="absolute bottom-0 right-0 aspect-square w-[42%] rounded-[1.5rem] border-[6px] border-mist-50 shadow-lift"
          />
          <div
            className="absolute -left-4 -top-4 h-20 w-20 rounded-full border-[10px] border-gold-300/70"
            aria-hidden="true"
          />
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            id="benefits-title"
            eyebrow="Benefits for patients"
            title={
              <>
                Recovery feels different <span className="accent text-teal-600">at home</span>
              </>
            }
            lead="Familiar surroundings, no travel and your physiotherapist’s full attention. Home physiotherapy services make it easier to stay consistent – which is often what progress depends on."
          />
          <Reveal delay={0.1} className="mt-8">
            <CheckList items={homeBenefits} />
          </Reveal>
          {showLink && (
            <Reveal delay={0.15} className="mt-9">
              <Button to="/home-visits" variant="teal">
                How home visits work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Button>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
