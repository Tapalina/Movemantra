/**
 * Client for the reviews API (Cloudflare Pages Functions in /functions/api).
 * Every function throws an ApiError with a message that can be shown to the visitor.
 */

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, options) {
  let res;
  try {
    res = await fetch(`/api${path}`, options);
  } catch {
    throw new ApiError('Could not connect. Please check your internet connection and try again.', 0);
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(data?.error || 'Something went wrong. Please try again.', res.status);
  if (!data) throw new ApiError('Reviews are not available right now.', res.status);
  return data;
}

const authHeader = (password) => ({ Authorization: `Bearer ${password}` });

export const fetchReviews = ({ limit = 6, offset = 0 } = {}) => request(`/reviews?limit=${limit}&offset=${offset}`);

export const submitReview = (review) =>
  request('/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });

export const deleteReview = (id, password) =>
  request(`/reviews/${id}`, { method: 'DELETE', headers: authHeader(password) });

export const verifyAdmin = (password) => request('/admin/login', { method: 'POST', headers: authHeader(password) });

/** "17 Nov 2026" from the database's UTC timestamp ("2026-11-17 18:15:53"). */
export function formatReviewDate(createdAt) {
  const date = new Date(`${String(createdAt).replace(' ', 'T')}Z`);
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
