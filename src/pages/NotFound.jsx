import { ArrowLeft } from 'lucide-react';
import logoMark from '../assets/brand/logo-mark.png';
import Seo from '../components/seo/Seo';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for could not be found." noindex />
      <section className="bg-gradient-to-b from-mist-100 to-white">
        <Container className="flex min-h-[80vh] flex-col items-center justify-center pb-20 pt-32 text-center">
          <img src={logoMark} alt="" aria-hidden="true" className="h-24 w-auto" />
          <p className="eyebrow mt-8">Error 404</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">
            This page took a <span className="accent text-teal-600">wrong turn</span>
          </h1>
          <p className="mt-4 max-w-md text-navy-900/65">
            The page you are looking for does not exist or may have moved. Let’s get you back on track.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/" variant="primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Button>
            <Button href={getWhatsAppLink()} variant="outline">
              <WhatsAppIcon className="h-4 w-4" />
              Contact us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
