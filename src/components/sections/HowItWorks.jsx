import { processSteps } from '../../data/content';
import Container from '../ui/Container';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/** Four-step process: vertical timeline on mobile, connected row on desktop. */
export default function HowItWorks({
  eyebrow = 'How home physiotherapy works',
  title = 'From first message to feeling stronger',
  lead = 'Getting started is simple. No referrals to chase, no clinic queues – just four clear steps.',
  className = 'bg-white',
}) {
  return (
    <section aria-labelledby="how-title" className={`py-20 lg:py-28 ${className}`}>
      <Container>
        <SectionHeading id="how-title" eyebrow={eyebrow} title={title} lead={lead} align="center" />

        <ol className="relative mt-14 grid gap-10 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line */}
          <span
            className="absolute left-7 top-2 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-teal-300 via-navy-200 to-transparent lg:left-[12.5%] lg:right-[12.5%] lg:top-7 lg:h-px lg:w-auto lg:bg-gradient-to-r lg:from-teal-300 lg:via-navy-200 lg:to-gold-300"
            aria-hidden="true"
          />

          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.08}
              className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center"
            >
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-navy-100 bg-white text-teal-600 shadow-soft">
                <Icon name={step.icon} className="h-6 w-6" />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-navy-700 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
              </span>
              <div className="pt-1 lg:pt-3">
                <h3 className="text-lg">{step.title}</h3>
                <p className="mt-1.5 text-navy-900/65 lg:mx-auto lg:max-w-[16rem]">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
