import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import RouteError from './pages/RouteError';

// Home loads eagerly for the fastest first paint; other pages are split into their own chunks.
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const HomeVisits = lazy(() => import('./pages/HomeVisits'));
const Contact = lazy(() => import('./pages/Contact'));
const Feedback = lazy(() => import('./pages/Feedback'));
const ManageReviews = lazy(() => import('./pages/ManageReviews'));
const NotFound = lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      errorElement: <RouteError />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/services', element: <Services /> },
        { path: '/services/:slug', element: <ServiceDetail /> },
        { path: '/home-visits', element: <HomeVisits /> },
        { path: '/contact', element: <Contact /> },
        { path: '/feedback', element: <Feedback /> },
        { path: '/manage-reviews', element: <ManageReviews /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    // Opt in to React Router v7 behaviour now (silences upgrade warnings, eases a future upgrade).
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </MotionConfig>
  );
}
