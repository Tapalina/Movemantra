import { HeartHandshake, Phone, Star, TrendingUp } from 'lucide-react';
import Seo from '../components/seo/Seo';
import FeedbackForm from '../components/sections/FeedbackForm';
import PageHero from '../components/sections/PageHero';
import Testimonials from '../components/sections/Testimonials';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import { cityLabel, siteConfig } from '../data/siteConfig';
import { phoneHref } from '../utils/contact';

const promises = [
  { icon: HeartHandshake, text: 'Every response is read by our team.' },
  { icon: TrendingUp, text: 'We use it to improve how we care for patients.' },
  { icon: Star, text: 'Nothing is published without your permission.' },
];

export default function Feedback() {
  const { googleReviewUrl } = siteConfig.feedback;

  return (
    <>
      <Seo
        title="Patient Feedback"
        description={`Share your experience of MoveMantra’s home physiotherapy in ${cityLabel}. Rate your sessions and tell us how we can improve.`}
      />

      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Feedback' }]}
        eyebrow="Patient feedback"
        title={
          <>
            How was your <span className="accent text-teal-600">experience?</span>
          </>
        }
        lead="Your feedback helps us keep improving – and helps other families decide whether home physiotherapy is right for them."
      />

      <section aria-labelledby="feedback-form-title" className="bg-white pb-20 lg:pb-28">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <Reveal className="rounded-[2rem] border border-navy-100 bg-white p-6 shadow-soft sm:p-10">
            <h2 id="feedback-form-title" className="text-2xl sm:text-3xl">
              Rate your sessions
            </h2>
            <p className="mb-8 mt-2 text-navy-900/65">
              It takes about a minute. Only the rating and comments are required.
            </p>
            <FeedbackForm />
          </Reveal>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start" aria-label="About your feedback">
            <Reveal delay={0.06} className="rounded-3xl bg-mist-50 p-7">
              <h2 className="text-lg">What happens to your feedback</h2>
              <ul className="mt-5 space-y-4">
                {promises.map((p) => (
                  <li key={p.text} className="flex items-start gap-3 text-navy-900/75">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-teal-600 shadow-soft">
                      <p.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="pt-1.5">{p.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {googleReviewUrl && (
              <Reveal delay={0.1} className="rounded-3xl bg-navy-800 p-7 text-white shadow-lift">
                <h2 className="text-lg text-white">Prefer Google?</h2>
                <p className="mt-2 text-sm text-navy-100/80">
                  A Google review helps other families in {cityLabel} find trusted care at home.
                </p>
                <Button href={googleReviewUrl} variant="light" className="mt-5 w-full">
                  <Star className="h-4 w-4 fill-gold-400 text-gold-400" aria-hidden="true" />
                  Review us on Google
                </Button>
              </Reveal>
            )}

            <Reveal delay={0.14} className="rounded-3xl border border-gold-200 bg-gold-50 p-7">
              <h2 className="text-lg">Something not right?</h2>
              <p className="mt-2 text-sm text-navy-900/70">
                If you have a concern about your care, please talk to us directly – we want to put it right.
              </p>
              <a
                href={phoneHref}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-navy-800 hover:text-teal-700"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.contact.phoneDisplay}
              </a>
            </Reveal>
          </aside>
        </Container>
      </section>

      <Testimonials className="bg-mist-50" showCta={false} />
    </>
  );
}
