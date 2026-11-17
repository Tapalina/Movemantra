import { ArrowRight } from 'lucide-react';
import { images } from '../../data/images';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import SmartImage from '../ui/SmartImage';

const pillars = [
  { k: 'Assess', v: 'Understand you, not just your symptoms.' },
  { k: 'Personalise', v: 'A plan built around your goals and home.' },
  { k: 'Progress', v: 'Reviewed and adjusted as you improve.' },
];

/** Short brand introduction on the homepage. */
export default function IntroSplit() {
  return (
    <section aria-labelledby="intro-title" className="bg-white py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="relative">
          <div className="grid grid-cols-5 gap-4">
            <SmartImage
              image={images.manualTherapy}
              sizes="(min-width: 1024px) 300px, 55vw"
              className="col-span-3 aspect-[3/4] rounded-[1.75rem] shadow-soft"
            />
            <div className="col-span-2 flex flex-col gap-4 pt-10">
              <SmartImage
                image={images.stretching}
                sizes="(min-width: 1024px) 200px, 38vw"
                className="aspect-square rounded-[1.5rem] shadow-soft"
              />
              <div className="flex flex-1 flex-col justify-end rounded-[1.5rem] bg-teal-50 p-4 sm:p-5">
                <p className="font-serif text-lg italic leading-snug text-teal-700 sm:text-xl">
                  “Your movement, our mantra.”
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            id="intro-title"
            eyebrow="About MoveMantra"
            title={
              <>
                Physiotherapy that comes to you – <span className="accent text-teal-600">and stays with you</span>
              </>
            }
          />
          <Reveal delay={0.08} className="prose-mm mt-5 text-base text-navy-900/70 sm:text-lg">
            <p>
              MoveMantra is a home physiotherapy service built on a simple idea: good rehabilitation should fit into
              real life. We bring assessment, hands-on care and guided exercise to your home, so you can focus on
              getting better rather than getting to appointments.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {pillars.map((p, i) => (
                <div key={p.k} className="rounded-2xl border border-navy-100 p-4">
                  <dt className="flex items-center gap-2 text-sm font-bold text-navy-900">
                    <span className="text-xs font-bold text-gold-600">0{i + 1}</span>
                    {p.k}
                  </dt>
                  <dd className="mt-1.5 text-sm text-navy-900/65">{p.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.16} className="mt-8">
            <Button to="/about" variant="outline">
              Our approach
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
