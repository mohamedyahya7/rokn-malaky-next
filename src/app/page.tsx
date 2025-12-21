import Header from "@/components/layout/Header";
import HeaderNew from "@/components/layout/HeaderNew";
import Footer from "@/components/layout/Footer";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Clients from "@/components/sections/Clients";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      {/* Old Header (uncomment to see original version) */}
      {/* <Header /> */}
      
      {/* New Glassmorphism Sticky Header */}
      <HeaderNew />
      <main className="min-h-screen">
        <About />
        <Services />
        <Clients />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
