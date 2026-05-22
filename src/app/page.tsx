import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DashboardShowcase from "@/components/DashboardShowcase";
import HowItWorks from "@/components/HowItWorks";
import Platforms from "@/components/Platforms";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <DashboardShowcase />
        <HowItWorks />
        <Platforms />
        <Pricing />
        <FAQ />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
