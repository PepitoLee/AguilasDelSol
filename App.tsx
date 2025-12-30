import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import History from './pages/History';
import Documentation from './pages/Documentation';
import Contact from './pages/Contact';
import Footer from './components/Footer';

// Componente para resetear scroll al cambiar de página
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si hay un hash (ancla), hacer scroll a ese elemento
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }

    // Si no hay hash, scroll al inicio
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/servicios/:slug" element={<ServiceDetail />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/historia" element={<History />} />
          <Route path="/documentacion" element={<Documentation />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-black text-neutral-200 font-sans selection:bg-brand-500/30 selection:text-brand-400">
        <Navigation />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;