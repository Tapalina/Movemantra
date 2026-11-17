// POST /api/admin/login   (Authorization: Bearer <ADMIN_PASSWORD>) → 200 if the password is correct
import { adminDenied, isAdmin, json } from '../../../server/reviews.js';

export async function onRequestPost({ request, env }) {
  if (!(await isAdmin(request, env))) return adminDenied(env);
  return json({ ok: true });
}
