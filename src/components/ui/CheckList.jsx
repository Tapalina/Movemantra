import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function CheckList({ items, columns = 1, tone = 'dark', className }) {
  const light = tone === 'light';
  return (
    <ul className={cn('grid gap-3', columns === 2 && 'sm:grid-cols-2 sm:gap-x-8', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={cn(
              'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
              light ? 'bg-teal-400/20 text-teal-200' : 'bg-teal-50 text-teal-600',
            )}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className={light ? 'text-navy-50/90' : 'text-navy-900/80'}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
