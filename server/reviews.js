/**
 * Shared helpers for the reviews API (Cloudflare Pages Functions in /functions).
 *
 * Storage: a Cloudflare D1 database bound as `DB`. The table is created automatically on first use.
 * Admin:   deleting reviews requires the `ADMIN_PASSWORD` secret (set in Cloudflare, or .dev.vars locally).
 */
import { services } from '../src/data/services.js';

export const LIMITS = {
  nameMin: 2,
  nameMax: 50,
  commentMin: 10,
  commentMax: 1000,
  perDevicePerDay: 3,
};

const serviceTitles = new Set(services.map((s) => s.title));

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    service TEXT,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    ip_hash TEXT
  )`,
  'CREATE INDEX IF NOT EXISTS reviews_ip_recent ON reviews (ip_hash, created_at)',
];

let schemaReady;

/** Creates the table once per worker instance. */
export function ensureSchema(db) {
  schemaReady ??= db.batch(SCHEMA.map((sql) => db.prepare(sql))).catch((err) => {
    schemaReady = undefined;
    throw err;
  });
  return schemaReady;
}

export function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export const errorResponse = (message, status) => json({ error: message }, status);

/** Returns a 503 response when the D1 binding has not been set up yet, otherwise null. */
export function requireDb(env) {
  if (env.DB) return null;
  return errorResponse('Reviews are not available yet – the database has not been connected.', 503);
}

const PUBLIC_COLUMNS = 'id, name, service, rating, comment, created_at';

export async function listReviews(db, { limit, offset }) {
  const [rows, stats] = await db.batch([
    db.prepare(`SELECT ${PUBLIC_COLUMNS} FROM reviews ORDER BY id DESC LIMIT ? OFFSET ?`).bind(limit, offset),
    db.prepare('SELECT COUNT(*) AS count, AVG(rating) AS average FROM reviews'),
  ]);
  const { count, average } = stats.results[0];
  return { reviews: rows.results, count, average: average ? Math.round(average * 10) / 10 : null };
}

// Strip control characters (keeping line breaks in comments) and tidy whitespace.
const cleanLine = (value) =>
  String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
const cleanText = (value) =>
  String(value ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const LINK_PATTERN = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|in|net|org|co|io|xyz|info|biz)\b)/i;

/** Validates and normalises a submitted review. Returns { review } or { error }. */
export function validateReview(input) {
  const rating = Number(input.rating);
  const name = cleanLine(input.name);
  const service = cleanLine(input.service);
  const comment = cleanText(input.comment);

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return { error: 'Please choose a star rating.' };
  if (name.length < LIMITS.nameMin || name.length > LIMITS.nameMax)
    return { error: `Please enter a name between ${LIMITS.nameMin} and ${LIMITS.nameMax} characters.` };
  if (comment.length < LIMITS.commentMin) return { error: 'Please tell us a little more about your experience.' };
  if (comment.length > LIMITS.commentMax)
    return { error: `Please keep your review under ${LIMITS.commentMax} characters.` };
  if (service && !serviceTitles.has(service)) return { error: 'Please choose a service from the list.' };
  if (LINK_PATTERN.test(comment) || LINK_PATTERN.test(name))
    return { error: 'Please remove any links or website addresses from your review.' };

  return { review: { rating, name, service: service || null, comment } };
}

async function sha256Hex(text) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** A one-way hash of the visitor's IP, used only for the daily rate limit (the raw IP is never stored). */
export function hashIp(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  return sha256Hex(`${ip}:${env.IP_HASH_SALT || 'movemantra-reviews'}`);
}

/** Checks the `Authorization: Bearer <password>` header against the ADMIN_PASSWORD secret. */
export async function isAdmin(request, env) {
  const expected = env.ADMIN_PASSWORD;
  if (!expected) return false;
  const given = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!given) return false;
  // Compare hashes so the comparison time does not depend on how much of the password matched.
  const [a, b] = await Promise.all([sha256Hex(given), sha256Hex(expected)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function adminDenied(env) {
  // Slow down password guessing a little.
  await new Promise((r) => setTimeout(r, 700));
  if (!env.ADMIN_PASSWORD) return errorResponse('The admin password has not been set up yet.', 503);
  return errorResponse('Incorrect password.', 401);
}
