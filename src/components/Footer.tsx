import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-warm-50 text-neutral-warm-600 py-8 border-t border-neutral-warm-200/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
            <Heart className="h-3 w-3 text-red-600 fill-red-600 animate-pulse" />
            <span>a Lleida</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

