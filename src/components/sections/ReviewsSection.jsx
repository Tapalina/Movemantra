import { ArrowRight, LoaderCircle, MessageSquareHeart, RotateCw, Star } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { StarDisplay } from '../ui/StarRating';
import ReviewCard, { ReviewCardSkeleton } from './ReviewCard';

const { googleReviewUrl } = siteConfig.feedback;

function GoogleReviewButton() {
  if (!googleReviewUrl) return null;
  return (
    <Button href={googleReviewUrl} variant="outline">
      <Star className="h-4 w-4 fill-gold-400 text-gold-400" aria-hidden="true" />
      Review us on Google
    </Button>
  );
}

function RatingSummary({ average, count }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-mist-100 px-5 py-3">
      <span className="text-3xl font-bold text-navy-900">{average?.toFixed(1)}</span>
      <span>
        <StarDisplay rating={average} />
        <span className="block text-xs text-navy-900/60">
          from {count} patient {count === 1 ? 'review' : 'reviews'}
        </span>
      </span>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div role="status" className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <span className="sr-only">Loading reviews…</span>
      <ReviewCardSkeleton />
      <ReviewCardSkeleton />
      <ReviewCardSkeleton />
    </div>
  );
}

/** Homepage invitation shown while there are no reviews yet (or reviews can't be loaded). */
function FeedbackInvite({ className }) {
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
                Had a session with us? <span className="accent text-teal-600">We’d love your review.</span>
              </h2>
              <p className="mt-2 max-w-xl text-navy-900/65">
                Rate your experience and tell others what to expect. It only takes a minute.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
            <Button to="/feedback" variant="teal">
              <Star className="h-4 w-4" aria-hidden="true" />
              Write a review
            </Button>
            <GoogleReviewButton />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Published patient reviews, loaded from the reviews API.
 * variant "home": latest few, falls back to an invitation when empty or unavailable.
 * variant "page": the full list with "Load more", for the Feedback page.
 * `reviews` is the object returned by useReviews().
 */
export default function ReviewsSection({ reviews, variant = 'home', className = 'bg-white' }) {
  const isHome = variant === 'home';
  const { status, count, average } = reviews;

  if (isHome && (status === 'error' || (status === 'ready' && count === 0))) {
    return <FeedbackInvite className={className} />;
  }

  return (
    <section id="reviews" aria-labelledby="reviews-title" className={`scroll-mt-24 py-20 lg:py-28 ${className}`}>
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="reviews-title"
            eyebrow="Patient reviews"
            title={
              isHome ? (
                <>
                  What our patients <span className="accent text-teal-600">say</span>
                </>
              ) : (
                'Reviews from our patients'
              )
            }
          />
          {status === 'ready' && count > 0 && <RatingSummary average={average} count={count} />}
        </div>

        {status === 'loading' && <SkeletonGrid />}

        {status === 'error' && (
          <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-navy-100 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-navy-900/70">{reviews.error}</p>
            <Button onClick={reviews.reload} variant="outline" size="sm">
              <RotateCw className="h-4 w-4" aria-hidden="true" />
              Try again
            </Button>
          </div>
        )}

        {status === 'ready' && count === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-white p-8 text-center text-navy-900/65">
            No reviews yet – be the first to share your experience.
          </p>
        )}

        {status === 'ready' && count > 0 && (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.reviews.map((review) => (
              <li key={review.id}>
                <ReviewCard review={review} clamp={isHome} />
              </li>
            ))}
          </ul>
        )}

        {!isHome && status === 'ready' && reviews.hasMore && (
          <div className="mt-10 text-center">
            <Button onClick={reviews.loadMore} variant="outline" disabled={reviews.loadingMore}>
              {reviews.loadingMore ? (
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <ArrowRight className="h-4 w-4 rotate-90" aria-hidden="true" />
              )}
              {reviews.loadingMore ? 'Loading…' : 'Load more reviews'}
            </Button>
            {reviews.moreError && <p className="mt-3 text-sm text-red-600">{reviews.moreError}</p>}
          </div>
        )}

        {isHome && status === 'ready' && count > 0 && (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/feedback" variant="teal">
              <Star className="h-4 w-4" aria-hidden="true" />
              Write a review
            </Button>
            {count > reviews.reviews.length && (
              <Button to="/feedback#reviews" variant="outline">
                Read all {count} reviews
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Button>
            )}
            <GoogleReviewButton />
          </div>
        )}
      </Container>
    </section>
  );
}
