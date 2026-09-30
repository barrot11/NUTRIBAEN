import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ServeiIntegral from "./components/ServeiIntegral";
import BookingStepper from "./components/BookingStepper";
import FAQ from "./components/FAQ";
import HealthTestSection from "./components/HealthTestSection";
import FullDeRutaPage from "./components/FullDeRutaPage";
import { downloadRoadmapPptx } from "./utils/generateRoadmapPptx";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import QuiSocPage from "./components/QuiSocPage";
import QuiVaDirigitPage from "./components/QuiVaDirigitPage";

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [view, setView] = useState<'home' | 'qui-soc' | 'qui-va-dirigit' | 'full-de-ruta' | 'valoracio-salut'>(
    window.location.pathname === "/qui-soc" 
      ? "qui-soc" 
      : window.location.pathname === "/qui-va-dirigit" 
      ? "qui-va-dirigit" 
      : window.location.pathname === "/full-de-ruta"
      ? "full-de-ruta"
      : window.location.pathname === "/valoracio-salut" || window.location.pathname === "/test-salut"
      ? "valoracio-salut"
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

  const navigateTo = (newView: 'home' | 'qui-soc' | 'qui-va-dirigit' | 'full-de-ruta' | 'valoracio-salut', targetId?: string) => {
    const newPath = 
      newView === 'qui-soc' ? '/qui-soc' 
      : newView === 'qui-va-dirigit' ? '/qui-va-dirigit' 
      : newView === 'full-de-ruta' ? '/full-de-ruta'
      : newView === 'valoracio-salut' ? '/valoracio-salut'
      : '/';
      
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

  const handleOpenRoadmap = async () => {
    try {
      await downloadRoadmapPptx();
    } catch (e) {
      console.error("Error downloading PPTX:", e);
    }
    window.open("/full-de-ruta", "_blank");
  };

  const handleOpenTestWindow = () => {
    setIsTestModalOpen(true);
  };

  // Synchronize history navigation (back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setView(
        path === "/qui-soc" ? "qui-soc" 
        : path === "/qui-va-dirigit" ? "qui-va-dirigit" 
        : path === "/full-de-ruta" ? "full-de-ruta"
        : path === "/valoracio-salut" || path === "/test-salut" ? "valoracio-salut"
        : "home"
      );
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
        } else if (href && (href === "/full-de-ruta" || href.endsWith("/full-de-ruta"))) {
          e.preventDefault();
          navigateTo("full-de-ruta");
        } else if (href && (href === "/valoracio-salut" || href === "/test-salut")) {
          e.preventDefault();
          navigateTo("valoracio-salut");
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
      {/* 1. Sticky Navbar with Scroll Detect (Hidden in standalone document view) */}
      {view !== 'full-de-ruta' && (
        <Navbar 
          onBookClick={() => view === 'home' ? scrollToId("reserva") : navigateTo('home', 'reserva')} 
          onTestClick={handleOpenTestWindow}
          onNavigateToSection={(sectionId) => navigateTo('home', sectionId)}
        />
      )}

      {/* Main Layout Containers */}
      <main>
        {view === 'full-de-ruta' ? (
          /* Full de Ruta: 5-Slide Official Presentation & Download */
          <FullDeRutaPage onBack={() => navigateTo('home')} />
        ) : view === 'valoracio-salut' ? (
          /* Dedicated Standalone Test Window View */
          <div className="min-h-screen bg-neutral-warm-950">
            <HealthTestSection 
              isModal={true} 
              onClose={() => navigateTo('home')} 
              onBookClick={() => navigateTo('home', 'reserva')} 
            />
          </div>
        ) : view === 'qui-soc' ? (
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
              onTestClick={handleOpenTestWindow}
              onRoadmapClick={handleOpenRoadmap}
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

            {/* 9. Contact form and address blocks */}
            <Contact />
          </>
        )}
      </main>

      {/* Dedicated Test Window Modal Overlay */}
      {isTestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md overflow-y-auto p-2 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-5xl my-auto rounded-3xl overflow-hidden border border-brand-500/40 shadow-2xl bg-neutral-warm-950">
            <HealthTestSection 
              isModal={true} 
              onClose={() => setIsTestModalOpen(false)} 
              onBookClick={() => {
                setIsTestModalOpen(false);
                scrollToId("reserva");
              }} 
            />
          </div>
        </div>
      )}

      {/* 11. Footer with business schedule details and legal blocks */}
      {view !== 'full-de-ruta' && <Footer />}
    </div>
  );
}
