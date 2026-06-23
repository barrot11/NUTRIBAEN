import { Apple, Instagram, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-neutral-warm-900 text-white pt-16 pb-12 overflow-hidden border-t border-neutral-warm-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 text-left mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-3 text-left focus:outline-none group mb-4"
              id="footer-logo"
            >
              <div className="p-2 rounded-xl bg-brand-800 text-brand-300">
                <Apple className="h-6 w-6" />
              </div>
              <div>
                <div className="font-serif font-bold text-xl text-white leading-none tracking-tight">
                  Pol Barrot
                </div>
                <div className="font-sans font-medium text-[10px] text-neutral-warm-400 uppercase tracking-widest mt-1">
                  Dietista - Nutricionista
                </div>
              </div>
            </button>
            <p className="font-sans text-xs text-neutral-warm-400 leading-relaxed max-w-sm font-light mt-4">
              Consulta de nutrició clínica, digestiva i esportiva basada en la darrera evidència científica. Menja de forma saludable, flexible i humana a Lleida o online.
            </p>
            <p className="font-sans text-[11px] text-neutral-warm-500 font-medium mt-3">
              Col·legiat núm. CAT001842 (CoDiNuCat)
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider mb-4">
              Navegació
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: "Inici", id: "inici" },
                { name: "Sobre Mi", id: "sobre-mi" },
                { name: "Serveis", id: "serveis" },
                { name: "Com Funciona", id: "com-funciona" },
                { name: "Testimonis", id: "testimonis" },
                { name: "Preguntes Freqüents", id: "faq" },
                { name: "Contacte", id: "contacte" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={`#${link.id}`}
                    className="font-sans text-xs text-neutral-warm-400 hover:text-brand-300 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Contact Columns */}
          <div>
            <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider mb-4">
              Horari i Contacte
            </h4>
            <ul className="space-y-3 font-sans text-xs text-neutral-warm-400 font-light">
              <li>
                <span className="font-semibold text-neutral-warm-300 block">Dilluns - Divendres:</span>
                09:00 h - 14:00 h / 16:00 h - 20:00 h
              </li>
              <li>
                <span className="font-semibold text-neutral-warm-300 block">Correu:</span>
                pol@barrotnutricio.com
              </li>
              <li>
                <span className="font-semibold text-neutral-warm-300 block">Adreça:</span>
                Carrer Major, 15, Principal, Lleida
              </li>
            </ul>
          </div>

        </div>

        {/* Separator */}
        <div className="border-t border-neutral-warm-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Copyright details */}
          <div className="font-sans text-xs text-neutral-warm-500 font-light">
            <p>&copy; {currentYear} Pol Barrot Nutrició. Tots els drets reservats.</p>
            <div className="flex justify-center sm:justify-start gap-3 mt-1.5 text-[11px] text-neutral-warm-600">
              <a href="#avis-legal" className="hover:underline hover:text-neutral-warm-400">Avís Legal</a>
              <span>&bull;</span>
              <a href="#privacitat" className="hover:underline hover:text-neutral-warm-400">Política de Privacitat</a>
              <span>&bull;</span>
              <a href="#cookies" className="hover:underline hover:text-neutral-warm-400">Cookies</a>
            </div>
          </div>

          {/* Credits */}
          <div className="font-sans text-[11px] text-neutral-warm-600 flex items-center gap-1.5">
            <span>Fet amb</span>
            <Heart className="h-3 w-3 text-red-700 fill-red-700 animate-pulse" />
            <span>a Lleida</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
