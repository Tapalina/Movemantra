import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

export const ratingLabels = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

/**
 * Star rating input built on native radio buttons, so it works with the keyboard
 * (Tab to the group, arrow keys to change) and screen readers out of the box.
 */
export function StarRatingInput({ name, value, onChange, legend, required, error, errorId }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <fieldset aria-describedby={error ? errorId : undefined} aria-invalid={error ? true : undefined}>
      <legend className="text-sm font-semibold text-navy-900">
        {legend}
        {required && (
          <span className="text-red-600" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </legend>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {ratingLabels.map((label, i) => {
            const star = i + 1;
            return (
              <label key={label} className="cursor-pointer" onMouseEnter={() => setHover(star)}>
                <input
                  type="radio"
                  name={name}
                  value={star}
                  checked={value === star}
                  onChange={() => onChange(star)}
                  className="peer sr-only"
                />
                <span className="sr-only">
                  {star} {star === 1 ? 'star' : 'stars'} – {label}
                </span>
                <Star
                  aria-hidden="true"
                  className={cn(
                    'h-10 w-10 rounded-lg p-0.5 transition-all duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500 sm:h-11 sm:w-11',
                    star <= shown ? 'scale-105 fill-gold-400 text-gold-400' : 'fill-transparent text-navy-200',
                  )}
                  strokeWidth={1.6}
                />
              </label>
            );
          })}
        </div>
        <span className="min-w-[5.5rem] text-sm font-semibold text-navy-700" aria-hidden="true">
          {shown ? ratingLabels[shown - 1] : 'Tap a star'}
        </span>
      </div>
    </fieldset>
  );
}

/** Read-only star display. */
export function StarDisplay({ rating, className = 'h-4 w-4' }) {
  const rounded = Math.round(rating);
  return (
    <span role="img" aria-label={`Rated ${rating} out of 5`} className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          aria-hidden="true"
          className={cn(className, star <= rounded ? 'fill-gold-400 text-gold-400' : 'fill-transparent text-navy-200')}
        />
      ))}
    </span>
  );
}
