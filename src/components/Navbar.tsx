import { useState, useEffect } from "react";
import { Menu, X, Calendar, Apple } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inici");

  const navLinks = [
    { name: "Inici", id: "inici" },
    { name: "Sobre Mi", id: "sobre-mi" },
    { name: "Servei Integral", id: "servei-integral" },
    { name: "FAQ", id: "faq" },
    { name: "Contacte", id: "contacte" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background change on scroll
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section detection
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-warm-50/80 backdrop-blur-md border-b border-neutral-warm-200/50 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Brand */}
        <button
          onClick={() => scrollToSection("inici")}
          className="flex items-center gap-3 text-left focus:outline-none group"
          id="nav-logo"
        >
          <Logo size={44} className="transition-transform duration-300 group-hover:scale-105" />
          <div>
            <div className="font-sans font-extrabold text-xl md:text-2xl text-neutral-warm-900 leading-none tracking-tight flex items-center uppercase">
              NUTRIBAEN
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500 ml-1"></span>
            </div>
            <div className="font-sans font-semibold text-[10px] md:text-[11px] text-brand-400 uppercase tracking-widest mt-1">
              Pol Barrot • Dietista
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`font-sans font-medium text-sm transition-all relative py-2 focus:outline-none ${
                activeSection === link.id
                  ? "text-brand-700"
                  : "text-neutral-warm-600 hover:text-brand-600"
              }`}
              id={`navlink-${link.id}`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block">
          <button
            onClick={onBookClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-black font-sans font-extrabold text-sm rounded-xl hover:bg-brand-600 hover:scale-[1.03] shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all transform active:scale-95"
            id="nav-cta-btn"
          >
            <Calendar className="h-4 w-4 stroke-[2.5]" />
            Reserva Cita
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 lg:hidden text-neutral-warm-800 hover:text-brand-600 hover:bg-neutral-warm-100 rounded-lg transition-colors focus:outline-none"
          aria-label="Toggle menu"
          id="mobile-nav-toggle"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-neutral-warm-50 border-b border-neutral-warm-200 overflow-hidden shadow-inner"
            id="mobile-menu-drawer"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left font-sans font-medium text-base py-2 border-b border-neutral-warm-100 transition-colors ${
                    activeSection === link.id
                      ? "text-brand-700 font-semibold"
                      : "text-neutral-warm-600 hover:text-brand-600"
                  }`}
                  id={`mobile-navlink-${link.id}`}
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onBookClick();
                }}
                className="flex items-center justify-center gap-2 mt-4 px-5 py-3 bg-brand-600 text-white font-sans font-semibold text-base rounded-xl hover:bg-brand-700 shadow-md transition-all active:scale-95"
                id="mobile-cta-btn"
              >
                <Calendar className="h-5 w-5" />
                Reserva Cita
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
