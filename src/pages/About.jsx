import { Compass, Ear, Repeat, Scale, Sparkles, Users } from 'lucide-react';
import Seo from '../components/seo/Seo';
import CtaBanner from '../components/sections/CtaBanner';
import PageHero from '../components/sections/PageHero';
import CheckList from '../components/ui/CheckList';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import SmartImage from '../components/ui/SmartImage';
import { images } from '../data/images';
import { cityLabel, siteConfig } from '../data/siteConfig';

const approach = [
  {
    icon: Ear,
    title: 'Listen',
    text: 'We start with your story – what happened, what hurts, and what matters most to you.',
  },
  {
    icon: Compass,
    title: 'Assess',
    text: 'A careful look at how you move, so treatment targets the cause and not only the symptoms.',
  },
  {
    icon: Sparkles,
    title: 'Personalise',
    text: 'A plan shaped around your goals, your home and the time you realistically have.',
  },
  {
    icon: Repeat,
    title: 'Progress',
    text: 'Regular reviews to adjust your programme as you get stronger and more confident.',
  },
];

const patientFirst = [
  'Unhurried, one-to-one sessions',
  'Plain-language explanations of your condition and plan',
  'Shared decisions – you are part of every step',
  'Respect for your home, privacy and routine',
  'Family and carers welcomed into the process',
  'Honest advice, including when to see another specialist',
];

const values = [
  {
    icon: Scale,
    title: 'Evidence-informed',
    text: 'Treatment choices guided by current physiotherapy research and clinical reasoning.',
  },
  {
    icon: Users,
    title: 'Collaborative',
    text: 'We work alongside your doctors and surgeons, and with the people who support you at home.',
  },
  {
    icon: Sparkles,
    title: 'Individual',
    text: 'No two people recover the same way – so no two programmes look the same.',
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us – Personalised Physiotherapy and Rehabilitation"
        description={`Learn about MoveMantra’s patient-first approach to physiotherapy and rehabilitation at home across ${cityLabel}: listen, assess, personalise and progress.`}
      />

      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        eyebrow="About MoveMantra"
        title={
          <>
            Better movement, <span className="accent text-teal-600">better life.</span>
          </>
        }
        lead="MoveMantra is a home physiotherapy service that brings personalised rehabilitation to where you live – combining clinical expertise with genuine, unhurried care."
        image={images.stretching}
      />

      {/* Story */}
      <section aria-labelledby="story-title" className="bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <SectionHeading
            id="story-title"
            eyebrow="Who we are"
            title={
              <>
                Rehabilitation that <span className="accent text-teal-600">fits into real life</span>
              </>
            }
          />
          <Reveal delay={0.08} className="prose-mm text-base text-navy-900/75 sm:text-lg">
            <p>
              Travelling to a clinic is not always easy – especially when you are in pain, recovering from surgery,
              caring for family or managing a long-term condition. MoveMantra was created to remove that barrier.
            </p>
            <p>
              Our physiotherapists visit you at home to assess, treat and guide your recovery. Working in your own space
              means your programme is built around the stairs you climb, the chair you sit in and the activities you
              want to return to.
            </p>
            <p>
              Our name reflects our belief: movement is central to wellbeing. <em>{siteConfig.tagline}</em>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Philosophy / approach */}
      <section aria-labelledby="approach-title" className="bg-mist-50 py-20 lg:py-28">
        <Container>
          <SectionHeading
            id="approach-title"
            eyebrow="Our philosophy & approach"
            title="Four principles behind every session"
            lead="Whatever brings you to us, your care follows the same thoughtful process."
            align="center"
          />
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a, i) => (
              <Reveal
                as="li"
                key={a.title}
                delay={i * 0.07}
                className="relative rounded-3xl border border-navy-100 bg-white p-7 shadow-soft"
              >
                <span className="absolute right-6 top-6 font-serif text-4xl italic text-navy-100" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                  <a.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl">{a.title}</h3>
                <p className="mt-2 text-navy-900/65">{a.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Patient-first care */}
      <section aria-labelledby="patient-first-title" className="bg-white py-20 lg:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <SmartImage
              image={images.elderCare}
              sizes="(min-width: 1024px) 560px, 92vw"
              className="aspect-[5/4] rounded-[2rem] shadow-lift"
            />
            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl bg-navy-800 p-5 text-white shadow-lift sm:left-auto sm:right-8 sm:max-w-xs">
              <p className="font-serif text-lg italic leading-snug">“We treat people, not just conditions.”</p>
            </div>
          </Reveal>
          <div className="pt-6 lg:pt-0">
            <SectionHeading
              id="patient-first-title"
              eyebrow="Patient-first care"
              title={
                <>
                  You are at the centre of <span className="accent text-teal-600">every decision</span>
                </>
              }
              lead="Good physiotherapy is a partnership. We take time to understand you and make sure you always know what we are doing and why."
            />
            <Reveal delay={0.1} className="mt-8">
              <CheckList items={patientFirst} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Commitment */}
      <section aria-labelledby="commitment-title" className="bg-mist-50 py-20 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <SectionHeading
              id="commitment-title"
              eyebrow="Our commitment"
              title={
                <>
                  Personalised rehabilitation, <span className="accent text-teal-600">done properly</span>
                </>
              }
              lead="We will never hand you a generic exercise sheet. Your programme is designed for you, explained clearly and updated as you progress."
            />
            <ul className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {values.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 0.07} className="rounded-3xl bg-white p-6 shadow-soft">
                  <v.icon className="h-6 w-6 text-gold-500" aria-hidden="true" />
                  <h3 className="mt-4 text-lg">{v.title}</h3>
                  <p className="mt-2 text-[15px] text-navy-900/65">{v.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaBanner title="Let’s start with a conversation" />
    </>
  );
}
