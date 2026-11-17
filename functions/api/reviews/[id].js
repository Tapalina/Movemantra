// DELETE /api/reviews/:id   (requires Authorization: Bearer <ADMIN_PASSWORD>)
import { adminDenied, ensureSchema, errorResponse, isAdmin, json, requireDb } from '../../../server/reviews.js';

export async function onRequestDelete({ request, env, params }) {
  const unavailable = requireDb(env);
  if (unavailable) return unavailable;
  if (!(await isAdmin(request, env))) return adminDenied(env);

  const id = Number(params.id);
  if (!Number.isInteger(id) || id < 1) return errorResponse('Invalid review id.', 400);

  await ensureSchema(env.DB);
  const result = await env.DB.prepare('DELETE FROM reviews WHERE id = ?').bind(id).run();
  if (!result.meta.changes) return errorResponse('Review not found – it may already have been deleted.', 404);

  return json({ deleted: id });
}
