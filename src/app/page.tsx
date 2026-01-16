import Header from "@/components/layout/Header";
import HeaderNew from "@/components/layout/HeaderNew";
import Footer from "@/components/layout/Footer";
import Services from "@/components/sections/Services";
// import Clients from "@/components/sections/Clients/Clients";
import Clients from "@/components/sections/Clients";
import FAQ from "@/components/sections/FAQ";
import Testimonials from "@/components/sections/Testimonials";

import Hero from "@/components/sections/Hero";

import LandingTracking from "@/components/sections/LandingTracking";
import JobsPromo from "@/components/sections/JobsPromo";
import SectionDivider from "@/components/ui/SectionDivider";
import { Suspense } from "react";
import Script from 'next/script';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RecruitmentAgency',
    name: 'شركة الركن الملكي للتوظيف',
    description: 'حلول توظيف واستقدام متكاملة في السعودية ودول الخليج',
    url: 'https://elroknelmalky.com',
    logo: 'https://elroknelmalky.com/icon.jpg',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
    },
    serviceArea: 'EG, GCC',
  };
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Old Header (uncomment to see original version) */}
      {/* <Header /> */}
      
      {/* New Glassmorphism Sticky Header */}
      <HeaderNew />
      
      <main className="min-h-screen">
        <Hero />
        <SectionDivider />
        
        <Services />
        <SectionDivider />
        
        <Testimonials />
        <SectionDivider />
        
        <Suspense fallback={<div className="py-20 bg-white min-h-[400px]" />}>
          <LandingTracking />
        </Suspense>
        
        <JobsPromo />
        <SectionDivider />
        
        <FAQ />
        <SectionDivider />
        
        <Clients/>
      </main>
      <Footer />
    </>
  );
}
