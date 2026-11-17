// GET  /api/reviews?limit=6&offset=0  → { reviews, count, average }
// POST /api/reviews  { rating, name, service, comment, website }  → { review }  (published immediately)
import {
  LIMITS,
  ensureSchema,
  errorResponse,
  hashIp,
  json,
  listReviews,
  requireDb,
  validateReview,
} from '../../../server/reviews.js';

export async function onRequestGet({ request, env }) {
  const unavailable = requireDb(env);
  if (unavailable) return unavailable;

  const url = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit'), 10) || 6, 1), 50);
  const offset = Math.max(parseInt(url.searchParams.get('offset'), 10) || 0, 0);

  await ensureSchema(env.DB);
  return json(await listReviews(env.DB, { limit, offset }));
}

export async function onRequestPost({ request, env }) {
  const unavailable = requireDb(env);
  if (unavailable) return unavailable;

  if (Number(request.headers.get('Content-Length') || 0) > 10_000) return errorResponse('Review is too long.', 413);

  let input;
  try {
    input = await request.json();
  } catch {
    return errorResponse('Invalid request.', 400);
  }

  // Honeypot: real visitors never see or fill the "website" field. Pretend success so bots move on.
  if (input.website) return json({ review: null }, 201);

  const { review, error } = validateReview(input);
  if (error) return errorResponse(error, 400);

  await ensureSchema(env.DB);
  const ipHash = await hashIp(request, env);

  const { recent } = await env.DB.prepare(
    "SELECT COUNT(*) AS recent FROM reviews WHERE ip_hash = ? AND created_at > datetime('now', '-1 day')",
  )
    .bind(ipHash)
    .first();
  if (recent >= LIMITS.perDevicePerDay) {
    return errorResponse('Thank you – we’ve already received several reviews from you today.', 429);
  }

  const saved = await env.DB.prepare(
    `INSERT INTO reviews (name, service, rating, comment, ip_hash) VALUES (?, ?, ?, ?, ?)
     RETURNING id, name, service, rating, comment, created_at`,
  )
    .bind(review.name, review.service, review.rating, review.comment, ipHash)
    .first();

  return json({ review: saved }, 201);
}
