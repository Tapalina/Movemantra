import { MessageSquareHeart, Quote, Star } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { testimonials } from '../../data/testimonials';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { StarDisplay } from '../ui/StarRating';

const { googleReviewUrl } = siteConfig.feedback;

function GoogleReviewButton({ variant = 'outline' }) {
  if (!googleReviewUrl) return null;
  return (
    <Button href={googleReviewUrl} variant={variant}>
      <Star className="h-4 w-4 fill-gold-400 text-gold-400" aria-hidden="true" />
      Review us on Google
    </Button>
  );
}

/**
 * Patient reviews from src/data/testimonials.js.
 * While that list is empty, renders a compact invitation to leave feedback instead.
 * `showCta` adds the "Share your feedback" button (hide it on the Feedback page itself).
 */
export default function Testimonials({ className = 'bg-white', showCta = true }) {
  if (!testimonials.length) {
    if (!showCta) return null;
    return (
      <section aria-labelledby="feedback-invite-title" className={`py-16 lg:py-20 ${className}`}>
        <Container>
          <Reveal className="flex flex-col items-start gap-6 rounded-[2rem] border border-teal-100 bg-gradient-to-br from-teal-50 to-mist-50 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-5">
              <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-teal-600 shadow-soft sm:flex">
                <MessageSquareHeart className="h-7 w-7" aria-hidden="true" />
              </span>
              <div>
                <h2 id="feedback-invite-title" className="text-2xl sm:text-3xl">
                  Had a session with us? <span className="accent text-teal-600">We’d love your feedback.</span>
                </h2>
                <p className="mt-2 max-w-xl text-navy-900/65">
                  Rate your experience and tell us what went well – or what we can do better. It only takes a minute.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
              <Button to="/feedback" variant="teal">
                <Star className="h-4 w-4" aria-hidden="true" />
                Share your feedback
              </Button>
              <GoogleReviewButton />
            </div>
          </Reveal>
        </Container>
      </section>
    );
  }

  const average = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <section aria-labelledby="reviews-title" className={`py-20 lg:py-28 ${className}`}>
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="reviews-title"
            eyebrow="Patient feedback"
            title={
              <>
                What our patients <span className="accent text-teal-600">say</span>
              </>
            }
          />
          <Reveal className="flex items-center gap-3 rounded-2xl bg-mist-100 px-5 py-3">
            <span className="text-3xl font-bold text-navy-900">{average.toFixed(1)}</span>
            <span>
              <StarDisplay rating={average} />
              <span className="block text-xs text-navy-900/60">
                from {testimonials.length} patient {testimonials.length === 1 ? 'review' : 'reviews'}
              </span>
            </span>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              as="li"
              key={`${t.name}-${i}`}
              delay={(i % 3) * 0.06}
              className="flex flex-col rounded-3xl border border-navy-100 bg-white p-7 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <StarDisplay rating={t.rating} />
                <Quote className="h-7 w-7 text-teal-100" aria-hidden="true" />
              </div>
              <blockquote className="mt-4 flex-1 text-navy-900/80">
                <p>“{t.text}”</p>
              </blockquote>
              <p className="mt-5 border-t border-navy-100 pt-4 text-sm">
                <span className="font-bold text-navy-900">{t.name}</span>
                {(t.area || t.service) && (
                  <span className="block text-navy-900/55">{[t.service, t.area].filter(Boolean).join(' · ')}</span>
                )}
              </p>
            </Reveal>
          ))}
        </ul>

        {showCta && (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/feedback" variant="teal">
              <Star className="h-4 w-4" aria-hidden="true" />
              Share your feedback
            </Button>
            <GoogleReviewButton />
          </div>
        )}
      </Container>
    </section>
  );
}
