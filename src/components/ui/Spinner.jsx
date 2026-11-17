import { LoaderCircle } from 'lucide-react';

export default function Spinner({ label = 'Loading…' }) {
  return (
    <div role="status" className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-navy-600">
      <LoaderCircle className="h-8 w-8 animate-spin text-teal-500" aria-hidden="true" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
