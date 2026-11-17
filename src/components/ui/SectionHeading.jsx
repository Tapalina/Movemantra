import { cn } from '../../utils/cn';
import Reveal from './Reveal';

/**
 * Eyebrow + heading + optional lead paragraph.
 * `as` controls the heading level so each page keeps a correct H1 → H2 → H3 outline.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Tag = 'h2',
  align = 'left',
  tone = 'dark',
  id,
  className,
}) {
  const centered = align === 'center';
  const light = tone === 'light';

  return (
    <Reveal className={cn(centered && 'mx-auto text-center', 'max-w-2xl', className)}>
      {eyebrow && (
        <p className={cn('eyebrow', light && 'text-teal-200', centered && 'justify-center')}>
          <span className={cn('h-px w-6', light ? 'bg-teal-200' : 'bg-teal-500')} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn('mt-3 text-[1.875rem] leading-[1.12] sm:text-4xl lg:text-[2.75rem]', light && 'text-white')}
      >
        {title}
      </Tag>
      {lead && (
        <p className={cn('mt-4 text-base sm:text-lg', light ? 'text-navy-100/85' : 'text-navy-900/70')}>{lead}</p>
      )}
    </Reveal>
  );
}
