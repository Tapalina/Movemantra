import { siteConfig } from '../data/siteConfig';

export const phoneHref = `tel:${siteConfig.contact.phoneE164}`;
export const emailHref = `mailto:${siteConfig.contact.email}`;

/** Google Maps embed URL – uses the public embed endpoint, so no API key is needed. */
export function getMapEmbedUrl(query = siteConfig.location.mapQuery, zoom = siteConfig.location.mapZoom) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
}

export function getMapLink(query = siteConfig.location.mapQuery) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
