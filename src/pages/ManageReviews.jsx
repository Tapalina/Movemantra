import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LoaderCircle, Lock, LogOut, RotateCw, Trash2, TriangleAlert } from 'lucide-react';
import Seo from '../components/seo/Seo';
import ReviewCard, { ReviewCardSkeleton } from '../components/sections/ReviewCard';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import FieldError, { inputClassName } from '../components/ui/FieldError';
import { useReviews } from '../hooks/useReviews';
import { deleteReview, verifyAdmin } from '../utils/reviewsApi';

const SESSION_KEY = 'movemantra-admin';

// The password is kept only for this browser tab (sessionStorage), never in the code or localStorage.
const readSession = () => {
  try {
    return sessionStorage.getItem(SESSION_KEY) || '';
  } catch {
    return '';
  }
};
const writeSession = (value) => {
  try {
    if (value) sessionStorage.setItem(SESSION_KEY, value);
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage unavailable – stay signed in for this page view only */
  }
};

function SignIn({ onSignedIn, notice }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter the admin password.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await verifyAdmin(password);
      writeSession(password);
      onSignedIn(password);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className="mx-auto max-w-md rounded-[2rem] border border-navy-100 bg-white p-8 shadow-soft"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 text-navy-700">
        <Lock className="h-6 w-6" aria-hidden="true" />
      </span>
      <h1 className="mt-5 text-2xl">Manage reviews</h1>
      <p className="mt-2 text-sm text-navy-900/65">Sign in with the admin password to remove reviews.</p>
      {notice && <p className="mt-4 rounded-xl bg-gold-50 px-4 py-3 text-sm text-navy-800">{notice}</p>}
      <label htmlFor="admin-password" className="mt-6 block text-sm font-semibold text-navy-900">
        Admin password
      </label>
      <input
        id="admin-password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'admin-password-error' : undefined}
        className={inputClassName(error)}
      />
      <FieldError id="admin-password-error" message={error} />
      <Button type="submit" variant="primary" className="mt-6 w-full" disabled={busy}>
        {busy && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {busy ? 'Checking…' : 'Sign in'}
      </Button>
    </form>
  );
}

function ReviewList({ password, onSignOut }) {
  const reviews = useReviews(30);
  const [deleting, setDeleting] = useState(null);
  const [errors, setErrors] = useState({});

  const remove = async (review) => {
    if (!window.confirm(`Delete the review by ${review.name}? This cannot be undone.`)) return;
    setDeleting(review.id);
    setErrors((e) => ({ ...e, [review.id]: undefined }));
    try {
      await deleteReview(review.id, password);
      reviews.remove(review.id);
    } catch (err) {
      if (err.status === 401) {
        onSignOut('Your session has expired or the password was changed. Please sign in again.');
        return;
      }
      if (err.status === 404) reviews.remove(review.id);
      else setErrors((e) => ({ ...e, [review.id]: err.message }));
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl">Manage reviews</h1>
          <p className="mt-2 text-navy-900/65">
            {reviews.status === 'ready'
              ? `${reviews.count} published ${reviews.count === 1 ? 'review' : 'reviews'}. Deleting removes a review from the website immediately.`
              : 'Loading reviews…'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button to="/feedback#reviews" variant="outline" size="sm">
            View on site
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button onClick={() => onSignOut()} variant="outline" size="sm">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </Button>
        </div>
      </div>

      {reviews.status === 'loading' && (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
          <ReviewCardSkeleton />
        </div>
      )}

      {reviews.status === 'error' && (
        <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
            {reviews.error}
          </p>
          <Button onClick={reviews.reload} variant="outline" size="sm">
            <RotateCw className="h-4 w-4" aria-hidden="true" />
            Try again
          </Button>
        </div>
      )}

      {reviews.status === 'ready' && reviews.count === 0 && (
        <p className="mt-10 rounded-2xl border border-dashed border-navy-200 p-8 text-center text-navy-900/65">
          There are no reviews yet.
        </p>
      )}

      {reviews.status === 'ready' && reviews.reviews.length > 0 && (
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.reviews.map((review) => (
            <li key={review.id}>
              <ReviewCard
                review={review}
                action={
                  <button
                    type="button"
                    onClick={() => remove(review)}
                    disabled={deleting === review.id}
                    aria-label={`Delete review by ${review.name}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-bold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-60"
                  >
                    {deleting === review.id ? (
                      <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    Delete
                  </button>
                }
              />
              {errors[review.id] && <p className="mt-2 text-sm text-red-600">{errors[review.id]}</p>}
            </li>
          ))}
        </ul>
      )}

      {reviews.status === 'ready' && reviews.hasMore && (
        <div className="mt-10 text-center">
          <Button onClick={reviews.loadMore} variant="outline" disabled={reviews.loadingMore}>
            {reviews.loadingMore ? 'Loading…' : 'Load more'}
          </Button>
          {reviews.moreError && <p className="mt-3 text-sm text-red-600">{reviews.moreError}</p>}
        </div>
      )}
    </>
  );
}

/** Private page (not linked anywhere, hidden from search engines) for deleting reviews. */
export default function ManageReviews() {
  const [password, setPassword] = useState(readSession);
  const [notice, setNotice] = useState('');

  const signOut = (message = '') => {
    writeSession('');
    setPassword('');
    setNotice(message);
  };

  return (
    <>
      <Seo title="Manage reviews" description="Admin page for managing patient reviews." noindex />
      <section className="min-h-[80vh] bg-mist-50 pb-20 pt-28 sm:pt-32">
        <Container>
          {password ? (
            <ReviewList password={password} onSignOut={signOut} />
          ) : (
            <SignIn onSignedIn={setPassword} notice={notice} />
          )}
          <p className="mt-10 text-center text-sm text-navy-900/50">
            <Link to="/" className="hover:text-teal-700">
              ← Back to website
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
