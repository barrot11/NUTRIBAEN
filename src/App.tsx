import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Credentials from "./components/Credentials";
import About from "./components/About";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import BookingStepper from "./components/BookingStepper";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Helper to scroll to any ID offsetted by the sticky navbar height
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollToId("reserva");
  };

  return (
    <div className="min-h-screen bg-neutral-warm-50 text-neutral-warm-800 antialiased font-sans selection:bg-brand-500 selection:text-black">
      {/* 1. Stick Navbar with Scroll Detect */}
      <Navbar onBookClick={() => scrollToId("reserva")} />

      {/* Main Layout Containers */}
      <main>
        {/* 2. Hero Section */}
        <Hero 
          onBookClick={() => scrollToId("reserva")} 
          onAboutClick={() => scrollToId("sobre-mi")} 
        />

        {/* 3. Academic & Professional Credentials Strip */}
        <Credentials />

        {/* 4. About Me (Sobre Mi) biography and story */}
        <About />

        {/* 5. Services Grid with callback */}
        <Services onSelectService={handleSelectService} />

        {/* 6. Step-by-Step interactive process (Com funciona) */}
        <HowItWorks />

        {/* 7. The 3-Step Interactive Booking Stepper */}
        <BookingStepper 
          selectedServiceId={selectedServiceId} 
          onBookingSuccess={() => setSelectedServiceId(null)} 
        />

        {/* 8. Carousel slider of active patients testimonials */}
        <Testimonials />

        {/* 9. Accordion folding FAQs */}
        <FAQ />

        {/* 10. Contact form and address blocks */}
        <Contact />
      </main>

      {/* 11. Footer with business schedule details and legal blocks */}
      <Footer />
    </div>
  );
}

