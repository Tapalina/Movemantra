import { useEffect, useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { cn } from '../../utils/cn';
import { getMapEmbedUrl, getMapLink } from '../../utils/contact';

/**
 * Google Maps embed driven by siteConfig.location.mapQuery – no API key required.
 * Shows a skeleton while loading and a link fallback if the iframe has not loaded after a while
 * (e.g. offline or blocked by a browser extension).
 */
export default function MapEmbed({ className, title = `Map showing ${siteConfig.name} service location` }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (status !== 'loading') return undefined;
    const timer = setTimeout(() => setStatus((s) => (s === 'loading' ? 'slow' : s)), 10000);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div
      className={cn('relative overflow-hidden rounded-3xl border border-navy-100 bg-mist-100 shadow-soft', className)}
    >
      {status !== 'loaded' && (
        <div className="skeleton absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <MapPin className="h-8 w-8 text-teal-500" aria-hidden="true" />
          <p className="text-sm font-medium text-navy-700">
            {status === 'slow' ? 'The map is taking a while to load.' : 'Loading map…'}
          </p>
          {status === 'slow' && (
            <a
              href={getMapLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 underline-offset-4 hover:underline"
            >
              Open in Google Maps <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      )}
      <iframe
        title={title}
        src={getMapEmbedUrl()}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setStatus('loaded')}
        className={cn(
          'relative h-full min-h-[320px] w-full border-0 transition-opacity duration-500',
          status === 'loaded' ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  );
}
