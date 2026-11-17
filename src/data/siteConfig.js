/**
 * MoveMantra – central site configuration.
 *
 * Update business details here; every page, link and SEO tag reads from this file.
 * Values marked "PLACEHOLDER" are not confirmed yet – replace them before going live.
 *
 * Keep this file free of JSX/asset imports: scripts/generate-sitemap.mjs imports it in Node.
 */

export const siteConfig = {
  name: 'MoveMantra',
  tagline: 'Your Movement, Our Mantra.',
  description:
    'MoveMantra brings personalised physiotherapy and rehabilitation to your home – for pain, injuries, post-operative recovery, neurological conditions and healthy ageing.',

  // The live website address (no trailing slash). Used for canonical URLs, Open Graph tags and sitemap.xml.
  // Change this if you add a custom domain later.
  siteUrl: 'https://movemantra.pages.dev',

  contact: {
    // Number for phone calls – displayed format and dialable (E.164) format.
    phoneDisplay: '+91 87875 74657',
    phoneE164: '+918787574657',
    // Shown on the Contact page and footer; also used by "Send by email" on the enquiry form.
    email: 'debmayuri8787@gmail.com',
    // PLACEHOLDER – your working hours.
    hours: [
      { days: 'Monday – Saturday', time: '8:00 AM – 8:00 PM' },
      { days: 'Sunday', time: 'By appointment' },
    ],
  },

  whatsapp: {
    // WhatsApp booking number. `number`: digits only, including country code – no "+", spaces or dashes.
    number: '916033543736',
    display: '+91 60335 43736',
    defaultMessage:
      'Hello MoveMantra, I would like to enquire about booking a home physiotherapy session. Please share the details.',
  },

  location: {
    city: 'Kolkata',
    region: 'West Bengal',
    country: 'India',
    // The area you serve, as shown in headings and copy ("Home visits across South Kolkata").
    areaLabel: 'South Kolkata',
    // Shown on the Contact page.
    addressLines: ['Home visits across South Kolkata', 'Kolkata, West Bengal, India'],
    // Anything Google Maps can search: a full address, a locality or a place name.
    mapQuery: 'South Kolkata, Kolkata, West Bengal',
    mapZoom: 12,
    // Areas shown as chips on Home, Home Visits and Contact. Add specific localities here if you like,
    // e.g. 'Ballygunge', 'Jadavpur', 'Tollygunge'.
    serviceAreas: ['South Kolkata'],
  },

  social: {
    // PLACEHOLDER – add profile URLs to show icons in the footer; leave empty to hide.
    instagram: '',
    facebook: '',
    linkedin: '',
  },

  feedback: {
    // Your Google Business Profile review link ("Ask for reviews" → copy link).
    // Leave empty to hide the "Review us on Google" buttons.
    googleReviewUrl: '',
  },
};

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Home Visits', to: '/home-visits' },
  { label: 'Contact', to: '/contact' },
];

/** "across South Kolkata" – falls back to the city, then to neutral copy if neither is set. */
export const cityLabel = siteConfig.location.areaLabel || siteConfig.location.city || 'your city';
