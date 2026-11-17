import { Quote } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatReviewDate } from '../../utils/reviewsApi';
import { StarDisplay } from '../ui/StarRating';

/** One published review. `clamp` shortens long reviews (homepage); `action` adds e.g. a delete button. */
export default function ReviewCard({ review, clamp = false, action, as: Tag = 'article' }) {
  return (
    <Tag className="flex h-full flex-col rounded-3xl border border-navy-100 bg-white p-6 shadow-soft sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <StarDisplay rating={review.rating} />
        <Quote className="h-7 w-7 shrink-0 text-teal-100" aria-hidden="true" />
      </div>
      <blockquote className="mt-4 flex-1 text-navy-900/80">
        <p className={cn('whitespace-pre-line break-words', clamp && 'line-clamp-6')}>{review.comment}</p>
      </blockquote>
      <footer className="mt-5 flex items-end justify-between gap-3 border-t border-navy-100 pt-4 text-sm">
        <span className="min-w-0">
          <span className="block truncate font-bold text-navy-900">{review.name}</span>
          <span className="block text-navy-900/55">
            {[review.service, formatReviewDate(review.created_at)].filter(Boolean).join(' · ')}
          </span>
        </span>
        {action}
      </footer>
    </Tag>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="rounded-3xl border border-navy-100 bg-white p-7" aria-hidden="true">
      <div className="skeleton h-4 w-24 rounded" />
      <div className="mt-5 space-y-2.5">
        <div className="skeleton h-3.5 w-full rounded" />
        <div className="skeleton h-3.5 w-11/12 rounded" />
        <div className="skeleton h-3.5 w-2/3 rounded" />
      </div>
      <div className="skeleton mt-7 h-4 w-32 rounded" />
    </div>
  );
}
