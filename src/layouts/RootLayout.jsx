import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import FloatingWhatsApp from '../components/layout/FloatingWhatsApp';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Spinner from '../components/ui/Spinner';
import { useScrollToTop } from '../hooks/useScrollToTop';

export default function RootLayout() {
  useScrollToTop();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
