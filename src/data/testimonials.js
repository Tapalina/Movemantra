/**
 * Patient reviews shown on the Home and Feedback pages.
 *
 * Only add genuine feedback, and only from patients who agreed to have it published
 * (the feedback form asks for this permission). While the list is empty, the site shows an
 * invitation to leave feedback instead of a reviews section.
 *
 * Format:
 * {
 *   name: 'Ananya S.',              // first name + initial is enough
 *   area: 'Jadavpur',               // optional
 *   service: 'Post-operative Rehabilitation', // optional
 *   rating: 5,                      // 1–5
 *   text: 'What the patient said…',
 * },
 */

export const testimonials = [];
