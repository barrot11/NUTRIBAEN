import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ServeiIntegral from "./components/ServeiIntegral";
import BookingStepper from "./components/BookingStepper";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import QuiSocPage from "./components/QuiSocPage";
import QuiVaDirigitPage from "./components/QuiVaDirigitPage";

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [view, setView] = useState<'home' | 'qui-soc' | 'qui-va-dirigit'>(
    window.location.pathname === "/qui-soc" 
      ? "qui-soc" 
      : window.location.pathname === "/qui-va-dirigit" 
      ? "qui-va-dirigit" 
      : "home"
  );

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

  const navigateTo = (newView: 'home' | 'qui-soc' | 'qui-va-dirigit', targetId?: string) => {
    const newPath = newView === 'qui-soc' ? '/qui-soc' : newView === 'qui-va-dirigit' ? '/qui-va-dirigit' : '/';
    window.history.pushState({}, "", newPath);
    setView(newView);
    
    if (newView === 'home') {
      if (targetId) {
        setTimeout(() => {
          scrollToId(targetId);
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Synchronize history navigation (back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setView(path === "/qui-soc" ? "qui-soc" : path === "/qui-va-dirigit" ? "qui-va-dirigit" : "home");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Intercept all page link clicks to handle SPA transitions automatically and beautifully
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        
        // Handle absolute-like paths
        if (href && (href === "/qui-soc" || href.endsWith("/qui-soc"))) {
          e.preventDefault();
          navigateTo("qui-soc");
        } else if (href && (href === "/qui-va-dirigit" || href.endsWith("/qui-va-dirigit"))) {
          e.preventDefault();
          navigateTo("qui-va-dirigit");
        } else if (href && (href === "/" || href === "")) {
          e.preventDefault();
          navigateTo("home");
        } else if (href && href.startsWith("#")) {
          if (view !== "home") {
            e.preventDefault();
            const targetId = href.substring(1);
            navigateTo("home", targetId);
          }
        }
      }
    };
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [view]);

  return (
    <div className="min-h-screen bg-neutral-warm-50 text-neutral-warm-800 antialiased font-sans selection:bg-brand-500 selection:text-black">
      {/* 1. Sticky Navbar with Scroll Detect */}
      <Navbar 
        onBookClick={() => view === 'home' ? scrollToId("reserva") : navigateTo('home', 'reserva')} 
        onNavigateToSection={(sectionId) => navigateTo('home', sectionId)}
      />

      {/* Main Layout Containers */}
      <main>
        {view === 'qui-soc' ? (
          /* Qui Soc page view */
          <QuiSocPage onBack={() => navigateTo('home')} />
        ) : view === 'qui-va-dirigit' ? (
          /* Qui Va Dirigit page view */
          <QuiVaDirigitPage 
            onBack={() => navigateTo('home')} 
            onContactClick={() => navigateTo('home', 'contacte')} 
            onBookClick={() => navigateTo('home', 'reserva')}
          />
        ) : (
          /* Home page view */
          <>
            {/* 2. Hero Section */}
            <Hero 
              onBookClick={() => scrollToId("reserva")} 
              onAboutClick={() => scrollToId("sobre-mi")} 
            />

            {/* 4. About Me (Sobre Mi) biography and story */}
            <About onLearnMore={() => navigateTo('qui-soc')} />

            {/* 6. Servei Integral */}
            <ServeiIntegral onExploreMoreClick={() => navigateTo('qui-va-dirigit')} />

            {/* 7. The 3-Step Interactive Booking Stepper */}
            <BookingStepper 
              selectedServiceId={selectedServiceId} 
              onBookingSuccess={() => setSelectedServiceId(null)} 
            />

            {/* 8. Accordion folding FAQs */}
            <FAQ />

            {/* 10. Contact form and address blocks */}
            <Contact />
          </>
        )}
      </main>

      {/* 11. Footer with business schedule details and legal blocks */}
      <Footer />
    </div>
  );
}
