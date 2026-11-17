import { reasons } from '../../data/content';
import Container from '../ui/Container';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import Swoosh from '../ui/Swoosh';

export default function WhyChoose({ headingAs = 'h2' }) {
  const ItemHeading = headingAs === 'h2' ? 'h3' : 'h4';
  return (
    <section aria-labelledby="why-title" className="relative overflow-hidden bg-navy-900 py-20 lg:py-28">
      <Swoosh tone="light" className="absolute -left-32 bottom-0 w-[620px]" />
      <div className="absolute -right-24 top-16 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl" aria-hidden="true" />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <SectionHeading
            id="why-title"
            as={headingAs}
            tone="light"
            eyebrow="The MoveMantra difference"
            title={
              <>
                Why choose <span className="accent text-teal-300">MoveMantra</span>
              </>
            }
          />
          <Reveal as="p" className="max-w-xl text-navy-100/80 lg:justify-self-end lg:text-lg">
            Clinical expertise matters – but so does how care feels. We combine both: thoughtful assessment,
            evidence-informed treatment and the kind of attention that is easier to give one-to-one, at home.
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal
              as="li"
              key={r.title}
              delay={(i % 3) * 0.06}
              className="group bg-navy-900 p-7 transition-colors duration-300 hover:bg-navy-800 sm:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-300 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-navy-900">
                <Icon name={r.icon} className="h-6 w-6" />
              </span>
              <ItemHeading className="mt-5 text-lg text-white">{r.title}</ItemHeading>
              <p className="mt-2 text-navy-100/70">{r.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
