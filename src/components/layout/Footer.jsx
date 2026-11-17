import { Link } from 'react-router-dom';
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import logo from '../../assets/brand/logo-horizontal.png';
import { cityLabel, navLinks, siteConfig } from '../../data/siteConfig';
import { services } from '../../data/services';
import { emailHref, phoneHref } from '../../utils/contact';
import { getWhatsAppLink } from '../../utils/whatsapp';
import Container from '../ui/Container';
import Swoosh from '../ui/Swoosh';
import WhatsAppIcon from '../ui/WhatsAppIcon';

const socialIcons = { instagram: Instagram, facebook: Facebook, linkedin: Linkedin };

function FooterHeading({ children }) {
  return <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-teal-200">{children}</h2>;
}

const linkClass = 'text-navy-100/80 transition-colors hover:text-white';

export default function Footer() {
  const { contact } = siteConfig;
  const socials = Object.entries(siteConfig.social).filter(([, url]) => url);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-navy-100">
      <Swoosh tone="light" className="absolute -right-24 -top-10 w-[560px] opacity-70" />

      <Container className="relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link
            to="/"
            className="inline-block rounded-2xl bg-white px-4 py-3 shadow-soft"
            aria-label={`${siteConfig.name} – home`}
          >
            <img src={logo} alt={siteConfig.name} width="320" height="60" className="h-9 w-auto" loading="lazy" />
          </Link>
          <p className="mt-6 max-w-sm text-navy-100/75">
            Personalised physiotherapy and rehabilitation, delivered at home across {cityLabel}.
          </p>
          <p className="mt-3 font-serif text-lg italic text-gold-300">{siteConfig.tagline}</p>

          {socials.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {socials.map(([key, url]) => {
                const SocialIcon = socialIcons[key];
                return (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`MoveMantra on ${key}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
                    >
                      <SocialIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="lg:col-span-2">
          <FooterHeading>Explore</FooterHeading>
          <ul className="mt-5 space-y-3">
            {[...navLinks, { label: 'Patient Reviews', to: '/feedback' }].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>Services</FooterHeading>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className={linkClass}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>Get in touch</FooterHeading>
          <ul className="mt-5 space-y-4">
            <li>
              <a href={phoneHref} className={`flex items-start gap-3 ${linkClass}`}>
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
                Call {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-start gap-3 ${linkClass}`}
              >
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                WhatsApp {siteConfig.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={emailHref} className={`flex items-start gap-3 break-all ${linkClass}`}>
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-navy-100/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
              <span>Home visits across {cityLabel}</span>
            </li>
            <li className="flex items-start gap-3 text-navy-100/80">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
              <span>
                {contact.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-navy-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="max-w-xl sm:text-right">
            Information on this website is general and not a substitute for an individual clinical assessment.
          </p>
        </Container>
      </div>
    </footer>
  );
}
