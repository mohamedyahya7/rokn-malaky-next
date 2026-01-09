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

export default function Home() {
  return (
    <>
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
        
        <LandingTracking />
        
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
