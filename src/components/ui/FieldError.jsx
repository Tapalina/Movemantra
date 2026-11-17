import { TriangleAlert } from 'lucide-react';
import { cn } from '../../utils/cn';

/** Inline validation message, linked to its field via aria-describedby. */
export default function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
      <TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" />
      {message}
    </p>
  );
}

/** Shared text input / select / textarea styling for forms. */
export const inputClassName = (hasError) =>
  cn(
    'mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-navy-900 shadow-sm transition-colors placeholder:text-navy-900/35 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30',
    hasError ? 'border-red-400' : 'border-navy-200',
  );
