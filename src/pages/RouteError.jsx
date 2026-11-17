import { Link, useRouteError } from 'react-router-dom';
import { RotateCw } from 'lucide-react';
import logo from '../assets/brand/logo-horizontal.png';
import { siteConfig } from '../data/siteConfig';
import { phoneHref } from '../utils/contact';

/**
 * Shown when a page fails to render or a lazy chunk fails to load (e.g. lost connection).
 * Rendered outside the main layout, so it keeps its own minimal chrome.
 */
export default function RouteError() {
  const error = useRouteError();
  if (import.meta.env.DEV) console.error(error);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-mist-50 px-4 text-center">
      <img src={logo} alt={siteConfig.name} className="h-10 w-auto" />
      <h1 className="mt-10 text-3xl sm:text-4xl">Something went wrong</h1>
      <p className="mt-3 max-w-md text-navy-900/65">
        We could not load this page. Please check your connection and try again, or call us on{' '}
        <a href={phoneHref} className="font-semibold text-teal-700 underline underline-offset-2">
          {siteConfig.contact.phoneDisplay}
        </a>
        .
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-navy-700 px-6 font-semibold text-white hover:bg-navy-800"
        >
          <RotateCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
        <Link
          to="/"
          reloadDocument
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-navy-200 bg-white px-6 font-semibold text-navy-800 hover:bg-mist-100"
        >
          Go to homepage
        </Link>
      </div>
    </main>
  );
}
