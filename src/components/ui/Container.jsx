import { cn } from '../../utils/cn';

export default function Container({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8', className)} {...props}>
      {children}
    </Tag>
  );
}
