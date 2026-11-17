import { faqs } from '../../data/content';
import { getWhatsAppLink } from '../../utils/whatsapp';
import Accordion from '../ui/Accordion';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import WhatsAppIcon from '../ui/WhatsAppIcon';

export default function FaqSection({ items = faqs, className = 'bg-mist-50' }) {
  return (
    <section aria-labelledby="faq-title" className={`py-20 lg:py-28 ${className}`}>
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQs"
            title="Questions, answered"
            lead="Everything you might want to know before booking physiotherapy at home."
          />
          <Reveal delay={0.1} className="mt-8 rounded-3xl border border-teal-100 bg-white p-6 shadow-soft">
            <p className="font-semibold text-navy-900">Still have a question?</p>
            <p className="mt-1 text-sm text-navy-900/65">Message us and a member of our team will get back to you.</p>
            <a
              href={getWhatsAppLink('Hello MoveMantra, I have a question about home physiotherapy: ')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-teal-700 underline-offset-4 hover:underline"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Ask on WhatsApp
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <Accordion items={items} />
        </Reveal>
      </Container>
    </section>
  );
}

/** FAQPage structured data for rich results. */
export function getFaqJsonLd(items = faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
