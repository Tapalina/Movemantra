import { useEffect, useId, useRef, useState } from 'react';
import { CircleCheck, LoaderCircle, RotateCcw, Star, TriangleAlert } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { services } from '../../data/services';
import { getWhatsAppLink } from '../../utils/whatsapp';
import Button from '../ui/Button';
import FieldError, { inputClassName } from '../ui/FieldError';
import { ratingLabels, StarRatingInput } from '../ui/StarRating';
import WhatsAppIcon from '../ui/WhatsAppIcon';

const initial = { rating: 0, name: '', service: '', comment: '', consent: false, botcheck: '' };
const { web3formsAccessKey, googleReviewUrl } = siteConfig.feedback;

function validate(values) {
  const errors = {};
  if (!values.rating) errors.rating = 'Please choose a star rating.';
  if (values.comment.trim().length < 10) errors.comment = 'Please tell us a little about your experience.';
  return errors;
}

function buildMessage(v) {
  return [
    'Hello MoveMantra, here is my feedback.',
    '',
    `Rating: ${'★'.repeat(v.rating)}${'☆'.repeat(5 - v.rating)} (${v.rating}/5 – ${ratingLabels[v.rating - 1]})`,
    v.name.trim() && `Name: ${v.name.trim()}`,
    v.service && `Service: ${v.service}`,
    `Feedback: ${v.comment.trim()}`,
    `Happy for it to be shared on the website: ${v.consent ? 'Yes' : 'No'}`,
  ]
    .filter(Boolean)
    .join('\n');
}

/** Sends feedback by email through Web3Forms (free, no backend). Resolves to true on success. */
async function sendByEmail(v) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: web3formsAccessKey,
      subject: `New ${v.rating}★ feedback – ${siteConfig.name} website`,
      from_name: `${siteConfig.name} website`,
      Rating: `${v.rating}/5 – ${ratingLabels[v.rating - 1]}`,
      Name: v.name.trim() || 'Not given',
      Service: v.service || 'Not given',
      Feedback: v.comment.trim(),
      'OK to publish on website': v.consent ? 'Yes' : 'No',
      botcheck: v.botcheck,
    }),
  });
  const data = await res.json().catch(() => ({}));
  return res.ok && data.success !== false;
}

/**
 * Patient feedback form with a star rating.
 * Delivery: email via Web3Forms when `siteConfig.feedback.web3formsAccessKey` is set, otherwise WhatsApp.
 */
export default function FeedbackForm() {
  const id = useId();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  // idle | submitting | sent (email) | whatsapp | blocked | error
  const [status, setStatus] = useState('idle');
  const [link, setLink] = useState('');
  const viaEmail = Boolean(web3formsAccessKey);
  const thanksRef = useRef(null);
  const done = status === 'sent' || status === 'whatsapp';

  // The thank-you panel is shorter than the form, so bring it into view once it replaces the form.
  useEffect(() => {
    if (done) thanksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [done]);

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

  const openWhatsApp = () => {
    const url = getWhatsAppLink(buildMessage(values));
    setLink(url);
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    setStatus(win ? 'whatsapp' : 'blocked');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document
        .querySelector(first === 'rating' ? `input[name="${id}-rating"]` : `#${CSS.escape(`${id}-${first}`)}`)
        ?.focus();
      return;
    }

    if (!viaEmail) {
      openWhatsApp();
      return;
    }

    setStatus('submitting');
    try {
      setStatus((await sendByEmail(values)) ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setStatus('idle');
  };

  if (done) {
    const happy = values.rating >= 4;
    return (
      <div ref={thanksRef} role="status" className="py-6 text-center sm:py-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600">
          <CircleCheck className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-2xl">Thank you{values.name.trim() ? `, ${values.name.trim().split(' ')[0]}` : ''}!</h3>
        <p className="mx-auto mt-2 max-w-md text-navy-900/65">
          {status === 'sent'
            ? 'Your feedback has reached our team. We read every response and use it to improve our care.'
            : 'Your feedback is ready in WhatsApp – just press send to share it with our team.'}
        </p>
        {status === 'whatsapp' && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-semibold text-teal-700 underline underline-offset-2"
          >
            WhatsApp didn’t open? Try again
          </a>
        )}

        {happy && googleReviewUrl && (
          <div className="mx-auto mt-8 max-w-md rounded-2xl bg-gold-50 p-5">
            <p className="font-semibold text-navy-900">Glad we could help!</p>
            <p className="mt-1 text-sm text-navy-900/65">
              Would you share your experience on Google? It helps other families in {siteConfig.location.areaLabel} find
              us.
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
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-teal-700"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Send more feedback
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
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            <p className="flex items-center gap-2 font-medium">
              <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
              Sorry, we couldn’t send your feedback. Please check your connection and try again.
            </p>
            <button type="button" onClick={openWhatsApp} className="mt-2 font-bold underline underline-offset-2">
              Send it via WhatsApp instead
            </button>
          </div>
        )}
        {status === 'blocked' && (
          <p className="flex items-start gap-2 rounded-xl bg-gold-50 px-4 py-3 text-sm font-medium text-navy-800">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
            <span>
              Your browser blocked the new window.{' '}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline underline-offset-2"
              >
                Open WhatsApp
              </a>{' '}
              to send your feedback.
            </span>
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
          Your comments{' '}
          <span className="text-red-600" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          rows={5}
          required
          maxLength={2000}
          className={inputClassName(errors.comment)}
          placeholder="What went well? What could we do better?"
          {...field('comment')}
        />
        <FieldError id={`${id}-comment-error`} message={errors.comment} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-semibold text-navy-900">
            Your name <span className="font-normal text-navy-900/50">(optional)</span>
          </label>
          <input
            type="text"
            autoComplete="name"
            className={inputClassName(false)}
            placeholder="e.g. Ananya S."
            {...field('name')}
          />
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

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-navy-100 bg-mist-50 p-4">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(e) => set('consent', e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-navy-300 accent-teal-600"
        />
        <span className="text-sm text-navy-900/75">
          MoveMantra may share my feedback on its website (with my first name only).
        </span>
      </label>

      {/* Honeypot: hidden from people, often filled in by spam bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        checked={Boolean(values.botcheck)}
        onChange={(e) => set('botcheck', e.target.checked ? 'on' : '')}
      />

      <Button
        type="submit"
        variant={viaEmail ? 'primary' : 'whatsapp'}
        size="lg"
        className="w-full"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : viaEmail ? (
          'Submit feedback'
        ) : (
          <>
            <WhatsAppIcon />
            Send feedback via WhatsApp
          </>
        )}
      </Button>
      <p id={`${id}-note`} className="text-xs text-navy-900/55">
        Please don’t include medical details. If something went wrong during your care, call us on{' '}
        {siteConfig.contact.phoneDisplay} so we can put it right.
      </p>
    </form>
  );
}
