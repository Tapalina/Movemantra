import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Image with a shimmer while loading and a branded fallback if it fails.
 * Pass an entry from src/data/images.js as `image`.
 */
export default function SmartImage({ image, sizes = '100vw', className, imgClassName, priority = false }) {
  const [status, setStatus] = useState('loading');

  return (
    // Callers may position the wrapper themselves (e.g. `absolute`); default to `relative` otherwise.
    <div
      className={cn(
        !/\b(absolute|fixed)\b/.test(className ?? '') && 'relative',
        'overflow-hidden bg-mist-100',
        className,
      )}
    >
      {status === 'loading' && <div className="skeleton absolute inset-0" aria-hidden="true" />}

      {status === 'error' ? (
        <div
          role="img"
          aria-label={image.alt}
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-100 via-mist-100 to-teal-100"
        >
          <ImageOff className="h-8 w-8 text-navy-300" aria-hidden="true" />
        </div>
      ) : (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : undefined}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-500',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
