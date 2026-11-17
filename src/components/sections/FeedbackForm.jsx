import { useEffect, useId, useRef, useState } from 'react';
import { ArrowDown, CircleCheck, LoaderCircle, RotateCcw, Star, TriangleAlert } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { services } from '../../data/services';
import { submitReview } from '../../utils/reviewsApi';
import Button from '../ui/Button';
import FieldError, { inputClassName } from '../ui/FieldError';
import { StarRatingInput } from '../ui/StarRating';

const COMMENT_MAX = 1000;
const initial = { rating: 0, name: '', service: '', comment: '', website: '' };
const { googleReviewUrl } = siteConfig.feedback;

// Mirrors the server rules in server/reviews.js so most mistakes are caught before sending.
function validate(values) {
  const errors = {};
  if (!values.rating) errors.rating = 'Please choose a star rating.';
  const name = values.name.trim();
  if (name.length < 2) errors.name = 'Please enter your name (it is shown with your review).';
  else if (name.length > 50) errors.name = 'Please keep your name under 50 characters.';
  if (values.comment.trim().length < 10) errors.comment = 'Please tell us a little more about your experience.';
  return errors;
}

/**
 * Review form with a star rating. Submissions are published on the website immediately
 * through the reviews API; `onCreated(review)` lets the page show the new review straight away.
 */
export default function FeedbackForm({ onCreated }) {
  const id = useId();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | sent | error
  const [serverError, setServerError] = useState('');
  const thanksRef = useRef(null);

  // The thank-you panel is shorter than the form, so bring it into view once it replaces the form.
  useEffect(() => {
    if (status === 'sent') thanksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [status]);

  const set = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const field = (name) => ({
    id: `${id}-${name}`,
    name,
    value: values[name],
    onChange: (e) => set(name, e.target.value),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setServerError('');
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document
        .querySelector(first === 'rating' ? `input[name="${id}-rating"]` : `#${CSS.escape(`${id}-${first}`)}`)
        ?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const { review } = await submitReview(values);
      if (review) onCreated?.(review);
      setStatus('sent');
    } catch (err) {
      setServerError(err.message);
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setServerError('');
    setStatus('idle');
  };

  if (status === 'sent') {
    const firstName = values.name.trim().split(' ')[0];
    return (
      <div ref={thanksRef} role="status" className="py-6 text-center sm:py-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600">
          <CircleCheck className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-2xl">Thank you, {firstName}!</h3>
        <p className="mx-auto mt-2 max-w-md text-navy-900/65">
          Your review is now live on our website. We read every review and use it to improve our care.
        </p>
        <a
          href="#reviews"
          className="mx-auto mt-4 flex w-fit items-center gap-1.5 text-sm font-bold text-teal-700 underline-offset-4 hover:underline"
        >
          See your review
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </a>

        {values.rating >= 4 && googleReviewUrl && (
          <div className="mx-auto mt-8 max-w-md rounded-2xl bg-gold-50 p-5">
            <p className="font-semibold text-navy-900">Glad we could help!</p>
            <p className="mt-1 text-sm text-navy-900/65">
              Would you also share it on Google? It helps other families in {siteConfig.location.areaLabel} find us.
            </p>
            <Button href={googleReviewUrl} variant="primary" size="sm" className="mt-4">
              <Star className="h-4 w-4 fill-gold-400 text-gold-400" aria-hidden="true" />
              Review us on Google
            </Button>
          </div>
        )}

        <button
          type="button"
          onClick={reset}
          className="mx-auto mt-8 flex w-fit items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-teal-700"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Write another review
        </button>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const submitting = status === 'submitting';

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6" aria-describedby={`${id}-note`}>
      <div aria-live="polite">
        {errorCount > 0 && (
          <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
            Please check the highlighted {errorCount === 1 ? 'field' : 'fields'}.
          </p>
        )}
        {status === 'error' && (
          <p className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {serverError}
          </p>
        )}
      </div>

      <div>
        <StarRatingInput
          name={`${id}-rating`}
          legend="How would you rate your experience?"
          required
          value={values.rating}
          onChange={(rating) => set('rating', rating)}
          error={errors.rating}
          errorId={`${id}-rating-error`}
        />
        <FieldError id={`${id}-rating-error`} message={errors.rating} />
      </div>

      <div>
        <label htmlFor={`${id}-comment`} className="text-sm font-semibold text-navy-900">
          Your review{' '}
          <span className="text-red-600" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          rows={5}
          required
          maxLength={COMMENT_MAX}
          className={inputClassName(errors.comment)}
          placeholder="How was your experience? What helped you most?"
          {...field('comment')}
        />
        <div className="flex items-start justify-between gap-3">
          <FieldError id={`${id}-comment-error`} message={errors.comment} />
          <span className="ml-auto mt-1.5 shrink-0 text-xs text-navy-900/45" aria-hidden="true">
            {values.comment.length}/{COMMENT_MAX}
          </span>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-semibold text-navy-900">
            Your name{' '}
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
          </label>
          <input
            type="text"
            autoComplete="name"
            required
            maxLength={50}
            className={inputClassName(errors.name)}
            placeholder="e.g. Ananya S."
            {...field('name')}
          />
          <FieldError id={`${id}-name-error`} message={errors.name} />
        </div>
        <div>
          <label htmlFor={`${id}-service`} className="text-sm font-semibold text-navy-900">
            Service you received <span className="font-normal text-navy-900/50">(optional)</span>
          </label>
          <select className={inputClassName(false)} {...field('service')}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot: hidden from people, often filled in by spam bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input type="text" tabIndex={-1} autoComplete="off" {...field('website')} />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            Publishing…
          </>
        ) : (
          <>
            <Star className="h-5 w-5" aria-hidden="true" />
            Publish my review
          </>
        )}
      </Button>
      <p id={`${id}-note`} className="text-xs text-navy-900/55">
        Your name, rating and review will be shown publicly on this website. Please don’t include medical details or
        phone numbers. If something went wrong during your care, call us on {siteConfig.contact.phoneDisplay} so we can
        put it right.
      </p>
    </form>
  );
}
