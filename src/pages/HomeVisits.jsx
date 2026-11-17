import { ArrowRight, ClipboardList, Phone } from 'lucide-react';
import Seo from '../components/seo/Seo';
import AreasServed from '../components/sections/AreasServed';
import CtaBanner from '../components/sections/CtaBanner';
import FaqSection, { getFaqJsonLd } from '../components/sections/FaqSection';
import HomeBenefits from '../components/sections/HomeBenefits';
import HowItWorks from '../components/sections/HowItWorks';
import PageHero from '../components/sections/PageHero';
import Button from '../components/ui/Button';
import CheckList from '../components/ui/CheckList';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { faqs, prepChecklist, visitExpectations } from '../data/content';
import { images } from '../data/images';
import { cityLabel, siteConfig } from '../data/siteConfig';
import { phoneHref } from '../utils/contact';
import { getWhatsAppLink } from '../utils/whatsapp';

const visitFaqs = faqs.filter((f) => /home|equipment|session|referral|areas/i.test(f.q));

export default function HomeVisits() {
  const bookingOptions = [
    {
      icon: WhatsAppIcon,
      title: 'WhatsApp',
      badge: 'Fastest',
      text: 'Send us a message with your concern and location. We usually reply with available slots.',
      action: (
        <Button href={getWhatsAppLink()} variant="whatsapp" className="w-full">
          <WhatsAppIcon />
          Book on WhatsApp
        </Button>
      ),
    },
    {
      icon: Phone,
      title: 'Phone',
      text: 'Prefer to talk? Call us and we will answer your questions and arrange a visit.',
      action: (
        <Button href={phoneHref} variant="outline" className="w-full">
          <Phone className="h-4 w-4" aria-hidden="true" />
          {siteConfig.contact.phoneDisplay}
        </Button>
      ),
    },
    {
      icon: ClipboardList,
      title: 'Enquiry form',
      text: 'Fill in a short form with your details, and we will get back to you.',
      action: (
        <Button to="/contact#enquiry" variant="outline" className="w-full">
          Send an enquiry
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Button>
      ),
    },
  ];

  return (
    <>
      <Seo
        title="Home Visit Physiotherapist – Physiotherapy at Home"
        description={`Book a home visit physiotherapist across ${cityLabel}. Learn how MoveMantra’s home physiotherapy works, what to expect during a visit and how to request an appointment on WhatsApp.`}
        jsonLd={getFaqJsonLd(visitFaqs)}
      />

      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Home Visits' }]}
        eyebrow="Home visits"
        title={
          <>
            Expert physiotherapy, <span className="accent text-teal-600">right at your doorstep</span>
          </>
        }
        lead={`No travel, no waiting rooms. A qualified physiotherapist visits you at home across ${cityLabel} to assess, treat and guide your recovery – one-to-one.`}
        image={images.guidedExercise}
      >
        <Button href={getWhatsAppLink()} variant="whatsapp" size="lg">
          <WhatsAppIcon />
          Book a Home Visit on WhatsApp
        </Button>
        <Button href={phoneHref} variant="outline" size="lg">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {siteConfig.contact.phoneDisplay}
        </Button>
      </PageHero>

      <HowItWorks title="How home physiotherapy works" eyebrow="The process" />
      <HomeBenefits showLink={false} />

      {/* What to expect */}
      <section aria-labelledby="expect-title" className="bg-white py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <SectionHeading
              id="expect-title"
              eyebrow="Your first visit"
              title={
                <>
                  What to expect <span className="accent text-teal-600">during a visit</span>
                </>
              }
              lead="Knowing what happens next makes the first session easier. Here is how a typical first visit unfolds."
            />
            <ol className="mt-10 space-y-0">
              {visitExpectations.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 0.05} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < visitExpectations.length - 1 && (
                    <span
                      className="absolute left-[19px] top-11 h-[calc(100%-2.75rem)] w-px bg-navy-100"
                      aria-hidden="true"
                    />
                  )}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-teal-500 bg-white text-sm font-bold text-teal-700">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-lg">{step.title}</h3>
                    <p className="mt-1.5 text-navy-900/65">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-gradient-to-br from-teal-50 to-mist-100 p-7 sm:p-8">
              <h3 className="text-xl">Preparing for your visit</h3>
              <p className="mt-2 text-sm text-navy-900/65">
                A few simple things help us make the most of your session:
              </p>
              <CheckList items={prepChecklist} className="mt-6" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How to request */}
      <section aria-labelledby="request-title" className="bg-mist-50 py-20 lg:py-28">
        <Container>
          <SectionHeading
            id="request-title"
            eyebrow="Request an appointment"
            title="Three easy ways to book"
            lead="Choose whatever is most convenient. Share your concern and location, and we will take care of the rest."
            align="center"
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {bookingOptions.map((opt, i) => (
              <Reveal
                as="li"
                key={opt.title}
                delay={i * 0.07}
                className={`relative flex flex-col rounded-3xl bg-white p-7 shadow-soft ${i === 0 ? 'ring-2 ring-whatsapp' : 'border border-navy-100'}`}
              >
                {opt.badge && (
                  <span className="absolute right-6 top-6 rounded-full bg-whatsapp/15 px-3 py-1 text-xs font-bold text-whatsapp-ink">
                    {opt.badge}
                  </span>
                )}
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist-100 text-navy-700">
                  <opt.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl">{opt.title}</h3>
                <p className="mb-7 mt-2 flex-1 text-navy-900/65">{opt.text}</p>
                {opt.action}
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <AreasServed />
      <FaqSection items={visitFaqs} />
      <CtaBanner title="Book your home visit today" />
    </>
  );
}
