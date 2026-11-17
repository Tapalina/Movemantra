import { useId, useState } from 'react';
import { CircleCheck, Mail, TriangleAlert } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { services } from '../../data/services';
import { getWhatsAppLink } from '../../utils/whatsapp';
import Button from '../ui/Button';
import FieldError, { inputClassName } from '../ui/FieldError';
import WhatsAppIcon from '../ui/WhatsAppIcon';

const initial = { name: '', phone: '', area: '', service: '', time: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  const digits = values.phone.replace(/\D/g, '');
  if (!digits) errors.phone = 'Please enter a phone number so we can reach you.';
  else if (digits.length < 10 || digits.length > 13) errors.phone = 'Please enter a valid phone number.';
  if (!values.area.trim()) errors.area = 'Please tell us your area or locality.';
  return errors;
}

function buildMessage(v) {
  return [
    'Hello MoveMantra, I would like to enquire about booking a home physiotherapy session.',
    '',
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
    `Area: ${v.area.trim()}`,
    v.service && `Service: ${v.service}`,
    v.time && `Preferred time: ${v.time}`,
    v.message.trim() && `Details: ${v.message.trim()}`,
  ]
    .filter((line) => line !== false && line !== undefined && line !== null)
    .join('\n');
}

/**
 * Enquiry form without a backend: on submit it opens WhatsApp (or email) with the details prefilled.
 * Replace `handleSubmit` with an API call later if you add a form service.
 */
export default function EnquiryForm() {
  const id = useId();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sent | blocked
  const [link, setLink] = useState('');

  const field = (name) => ({
    id: `${id}-${name}`,
    name,
    value: values[name],
    onChange: (e) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
      if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    },
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
  });

  const submit = (channel) => (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`${id}-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    const message = buildMessage(values);
    const url =
      channel === 'email'
        ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent('Home physiotherapy enquiry')}&body=${encodeURIComponent(message)}`
        : getWhatsAppLink(message);
    setLink(url);

    if (channel === 'email') {
      window.location.href = url;
      setStatus('sent');
      return;
    }
    // Opened without the "noopener" feature so we can detect popup blockers, then detached manually.
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    setStatus(win ? 'sent' : 'blocked');
  };

  const inputClass = (name) => inputClassName(errors[name]);

  const fieldError = (name) => <FieldError id={`${id}-${name}-error`} message={errors[name]} />;

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form noValidate onSubmit={submit('whatsapp')} className="space-y-5" aria-describedby={`${id}-note`}>
      <div aria-live="polite">
        {errorCount > 0 && (
          <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
            Please check the highlighted {errorCount === 1 ? 'field' : 'fields'}.
          </p>
        )}
        {status === 'sent' && (
          <p className="flex items-start gap-2 rounded-xl bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800">
            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Your message is ready – just press send in the app that opened. Nothing opened?{' '}
              <a href={link} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                Try this link
              </a>
              .
            </span>
          </p>
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
              to send your enquiry.
            </span>
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-semibold text-navy-900">
            Full name{' '}
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
          </label>
          <input
            type="text"
            autoComplete="name"
            required
            className={inputClass('name')}
            placeholder="Your name"
            {...field('name')}
          />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="text-sm font-semibold text-navy-900">
            Phone number{' '}
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
          </label>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            className={inputClass('phone')}
            placeholder="+91 98765 43210"
            {...field('phone')}
          />
          {fieldError('phone')}
        </div>
        <div>
          <label htmlFor={`${id}-area`} className="text-sm font-semibold text-navy-900">
            Area / locality{' '}
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
          </label>
          <input
            type="text"
            autoComplete="address-level2"
            required
            className={inputClass('area')}
            placeholder="Where should we visit?"
            {...field('area')}
          />
          {fieldError('area')}
        </div>
        <div>
          <label htmlFor={`${id}-service`} className="text-sm font-semibold text-navy-900">
            Service needed
          </label>
          <select className={inputClass('service')} {...field('service')}>
            <option value="">Not sure / general enquiry</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-time`} className="text-sm font-semibold text-navy-900">
          Preferred day / time
        </label>
        <input type="text" className={inputClass('time')} placeholder="e.g. Weekday mornings" {...field('time')} />
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="text-sm font-semibold text-navy-900">
          Tell us briefly what is going on
        </label>
        <textarea
          rows={4}
          className={inputClass('message')}
          placeholder="e.g. Knee pain for 3 weeks, finding stairs difficult"
          {...field('message')}
        />
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <Button type="submit" variant="whatsapp" size="lg" className="sm:flex-1">
          <WhatsAppIcon />
          Send via WhatsApp
        </Button>
        <Button onClick={submit('email')} variant="outline" size="lg">
          <Mail className="h-4 w-4" aria-hidden="true" />
          Send by email
        </Button>
      </div>
      <p id={`${id}-note`} className="text-xs text-navy-900/55">
        Your details are only used to respond to your enquiry. Please do not share sensitive medical records here.
      </p>
    </form>
  );
}
