import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';

/**
 * Per-page metadata: title, description, canonical URL, Open Graph and Twitter tags,
 * plus optional JSON-LD structured data.
 */
export default function Seo({
  title,
  description = siteConfig.description,
  image = '/og-image.jpg',
  jsonLd,
  noindex = false,
}) {
  const { pathname } = useLocation();
  const url = `${siteConfig.siteUrl}${pathname === '/' ? '' : pathname}`;
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | Physiotherapy at Home`;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.siteUrl}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

/** LocalBusiness-style structured data for the homepage and contact page. */
export function getBusinessJsonLd() {
  const { contact, location } = siteConfig;
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    additionalType: 'https://schema.org/Physiotherapy',
    name: siteConfig.name,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/favicon-512.png`,
    image: `${siteConfig.siteUrl}/og-image.jpg`,
    telephone: contact.phoneE164,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city || undefined,
      addressRegion: location.region || undefined,
      addressCountry: location.country,
    },
    areaServed: location.serviceAreas.map((area) => ({
      '@type': 'Place',
      name: location.city ? `${area}, ${location.city}` : area,
    })),
  };
}
