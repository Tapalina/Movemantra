# MoveMantra – Physiotherapy Home Care Website

*Your Movement, Our Mantra.*

A responsive marketing site for MoveMantra's home physiotherapy service. It is built with React 18, Vite 5, Tailwind CSS 3, React Router 6, Framer Motion, Lucide icons and React Helmet Async.

## Run it locally

Requirements: **Node.js 18 or newer** and npm.

```bash
cd movemantra
npm install      # first time only
npm run dev      # starts http://localhost:5173 and opens your browser
```

| Command           | What it does                                                      |
| ----------------- | ----------------------------------------------------------------- |
| `npm run dev`     | Website on `http://localhost:5173` plus the reviews API (with a local database) |
| `npm run build`   | Regenerates `sitemap.xml` and `robots.txt`, then builds to `dist/` |
| `npm run preview` | Serves the production build locally to check it                   |
| `npm run sitemap` | Regenerates `public/sitemap.xml` and `public/robots.txt` only     |
| `npm run format`  | Formats the code with Prettier                                    |

No API keys, paid services or backend are needed.

## Where to edit things

All business details and content live in `src/data/`. You never need to touch components to update text.

| File                     | Contains                                                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `src/data/siteConfig.js` | Phone, **WhatsApp number and default message**, email, hours, city, map location, service areas, social links, domain |
| `src/data/services.js`   | The seven services: titles, summaries, detail-page copy, SEO title and description           |
| `src/data/content.js`    | "How it works" steps, reasons to choose MoveMantra, home-visit benefits, visit expectations, FAQs |
| `src/data/images.js`     | Every photo and its alt text                                                                 |

### Placeholders to replace before going live

Search `siteConfig.js` for `PLACEHOLDER`:

- **`siteUrl`**: your real domain (used for canonical URLs, Open Graph and the sitemap).
- **`contact.email`**: currently `hello@movemantra.example`.
- **`contact.hours`**: your working hours.
- **`social`**: add profile URLs to show icons in the footer.

Already set:

- **Calls**: +91 87875 74657 (`contact.phoneDisplay` / `phoneE164`)
- **WhatsApp booking**: +91 60335 43736 (`whatsapp.number` / `whatsapp.display`)
- **Area**: South Kolkata (`location.areaLabel`). The map is centred on South Kolkata. To list specific localities as chips, add them to `location.serviceAreas`.

### WhatsApp booking

Every WhatsApp button builds its link from `siteConfig.whatsapp` using `src/utils/whatsapp.js`. Change the number or the prefilled message in one place and it updates everywhere: the floating button, hero, Home Visits, Contact, service pages and footer.

The Contact page enquiry form has no backend. After validating the fields, it opens WhatsApp (or the user's email app) with the details prefilled. To store enquiries later, replace the submit handler in `src/components/sections/EnquiryForm.jsx` with a call to a form service.

### Patient reviews (ratings and comments)

Patients can post a 1–5 star rating with a comment on the **Feedback page** (`/feedback`). Reviews are **published immediately**, Google-style, and appear on the Feedback page and on the homepage.

- **Deleting reviews:** go to `/manage-reviews` and sign in with the admin password. Each review has a **Delete** button.
- **How it works:** a small API in `functions/api/` (Cloudflare Pages Functions) stores reviews in a Cloudflare D1 database. Shared logic and validation live in `server/reviews.js`.
- **Spam protection:** a hidden bot trap, a limit of 3 reviews per device per day, length limits, and no links allowed.
- **Going live:** create the database and set the admin password as described in **Step 3b of [DEPLOYMENT.md](DEPLOYMENT.md)**.
- **Locally:** `npm run dev` runs the API with a local database automatically. The local admin password is in `.dev.vars` (copy `.dev.vars.example` if it's missing). This file is never committed. Local reviews are kept in `.wrangler/` and never reach the live site.
- **Google reviews (optional):** paste your Google Business Profile review link into `feedback.googleReviewUrl` in `siteConfig.js` to show "Review us on Google" buttons.

### Images

Photos are loaded from Unsplash (free licence) with responsive sizes. To use your own photos, which is recommended (real photos of your team build trust):

1. Put the files in `public/images/`.
2. In `src/data/images.js`, replace `id: '…'` with `src: '/images/your-photo.jpg'` and update the `alt` text.

If an image fails to load, the site shows a branded placeholder instead of a broken image.

### Logo

`src/assets/brand/` holds crops of the official logo (the original file plus transparent cut-outs of the mark and wordmark). Nothing has been redrawn or recoloured. `public/` holds the favicon, Apple touch icon and Open Graph image made from the same logo.

## Project structure

```
movemantra/
├── functions/api/          reviews API (Cloudflare Pages Functions)
├── public/                 favicon, og-image, robots.txt, sitemap.xml
├── server/                 shared reviews logic: validation, database, admin check
├── scripts/
│   └── generate-sitemap.mjs
├── src/
│   ├── assets/brand/       logo files
│   ├── components/
│   │   ├── layout/         Header (incl. mobile menu), Footer, FloatingWhatsApp
│   │   ├── sections/       Page sections: heroes, services grid, FAQ, CTA, enquiry form…
│   │   ├── seo/            <Seo> component + structured data helpers
│   │   └── ui/             Button, Container, SmartImage, Accordion, MapEmbed, Reveal…
│   ├── data/               ← all editable content and configuration
│   ├── hooks/              useScrolled, useLockBodyScroll, useScrollToTop
│   ├── layouts/            RootLayout (header, footer, skip link, Suspense)
│   ├── pages/              Home, About, Services, ServiceDetail, HomeVisits, Contact, Feedback, ManageReviews, NotFound, RouteError
│   ├── utils/              whatsapp/contact link builders, cn()
│   ├── App.jsx             routes
│   ├── main.jsx
│   └── index.css           Tailwind layers + base styles
└── tailwind.config.js      brand colours, fonts, shadows
```

### Routes

| URL                       | Page                                        |
| ------------------------- | ------------------------------------------- |
| `/`                       | Home                                        |
| `/about`                  | About Us                                    |
| `/services`               | All services                                |
| `/services/:slug`         | Service detail (one per entry in `services.js`) |
| `/home-visits`            | Home Visits                                 |
| `/contact`                | Contact (enquiry form at `/contact#enquiry`) |
| anything else             | 404 page                                    |

## Design system

- **Colours** were sampled from the logo: navy `#154A7E`, teal `#0F9598` and gold `#FAB114`, with mist/white backgrounds. Full scales are in `tailwind.config.js`.
- **Type**: Plus Jakarta Sans for headings and body text, with Fraunces italic for short accent phrases. Both load from Google Fonts.
- **Motifs**: curved swooshes and a gold "sun", taken from the logo's movement lines.
- **Motion**: gentle fade-ins as you scroll. They switch off automatically for visitors who set "reduce motion" in their system settings.

## SEO and accessibility

- Every page has its own title, meta description, canonical URL, and Open Graph and Twitter tags (`src/components/seo/Seo.jsx`).
- Structured data: MedicalBusiness on Home and Contact, FAQPage on Home and Home Visits, MedicalTherapy on each service page.
- `sitemap.xml` and `robots.txt` are generated from `siteConfig.siteUrl` and the services list.
- Each page has one H1 and a logical H2/H3 order. Landmarks are semantic, and the site has a skip link, a keyboard-operable menu and accordion, visible focus rings and accessible form errors.

## Going live (later)

This version is meant to run locally. When you deploy:

- Set `siteUrl`, then run `npm run build`.
- Optionally, prerender the pages so search engines receive full HTML without running JavaScript.

Step-by-step free hosting instructions (GitHub + Cloudflare Pages) are in [DEPLOYMENT.md](DEPLOYMENT.md).
