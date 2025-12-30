import React from 'react';
import PageTransition from '../components/PageTransition';
import HeroSection from '../components/HeroSection';
import { HomeServices, HomeAbout, HomeDocs, HomeContact, HomeHistory } from '../components/HomeSections';

const Home: React.FC = () => {
  return (
    <PageTransition className="!p-0 !max-w-none">
      {/* 1. HERO: The Breach */}
      <HeroSection />

      {/* 2. SERVICES: The Arsenal */}
      <HomeServices />

      {/* 3. ABOUT: Identity */}
      <HomeAbout />

      {/* 4. HISTORY: The Chrono-Lock */}
      <HomeHistory />

      {/* 5. DOCS */}
      <HomeDocs />

      {/* 6. CONTACT */}
      <HomeContact />
      
    </PageTransition>
  );
};

export default Home;