import { siteConfig } from '../data/siteConfig';

/**
 * Builds a wa.me link with a prefilled message.
 * The number comes from siteConfig so it is never hardcoded in components.
 */
export function getWhatsAppLink(message = siteConfig.whatsapp.defaultMessage) {
  const number = siteConfig.whatsapp.number.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Prefilled message for a specific service, e.g. from a service detail page. */
export function getServiceWhatsAppLink(serviceTitle) {
  return getWhatsAppLink(
    `Hello MoveMantra, I would like to enquire about ${serviceTitle} at home. Please share the details.`,
  );
}
