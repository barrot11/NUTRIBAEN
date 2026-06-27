import { motion } from "motion/react";
// @ts-ignore
import polAboutImg from "../assets/images/unnamed.jpg";

interface AboutProps {
  onLearnMore: () => void;
}

export default function About({ onLearnMore }: AboutProps) {
  return (
    <section id="sobre-mi" className="py-20 md:py-28 bg-neutral-warm-50 overflow-hidden border-b border-neutral-warm-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Narrative and Interactive Button */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left" id="about-content">
            <span 
              className="font-sans font-bold text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Qui soc
            </span>
            
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-warm-900 leading-tight mb-6 uppercase tracking-tight">
              POL BARROT
            </h2>
            
            {/* Structured Readable Narrative Text */}
            <div className="space-y-6 mb-8 text-neutral-warm-800 font-sans text-base sm:text-lg leading-relaxed">
              <p>
                Soc el Pol Barrot Enjuanes, dietista i esportista professional. NutriBaen neix de la meva passió per la salut, el benestar i el rendiment esportiu.
              </p>
              <p>
                Aquí no busquem solucions ràpides ni dietes miracle de poques setmanes. Creiem en la reeducació conscient per construir uns hàbits forts, sans i duradors.
              </p>
            </div>

            {/* Interactive Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onLearnMore();
              }}
              className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent hover:bg-neutral-warm-100 text-neutral-warm-800 hover:text-black font-sans font-bold text-sm sm:text-base rounded-xl border border-neutral-warm-300 hover:border-brand-500 transition-all active:scale-95 cursor-pointer"
              id="about-story-btn"
            >
              Coneix la meva història →
            </button>
          </div>

          {/* Right Side: Photo & Legend Box combo */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative" id="about-image-section">
            <div className="relative w-full max-w-sm">
              {/* Main portrait photo of Pol Barrot */}
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-neutral-warm-100 border border-neutral-warm-200 z-10 relative">
                <img
                  src={polAboutImg}
                  alt="Pol Barrot - Nutrició i Esport"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Overlaid legend card at the bottom-left of the photo */}
              <div className="absolute -bottom-8 -left-4 sm:-left-8 md:-left-12 max-w-[260px] sm:max-w-[280px] bg-white border border-neutral-warm-200/85 rounded-2xl p-4.5 shadow-2xl z-20 flex flex-col gap-1 border-l-4 border-l-brand-500">
                <p className="font-sans text-xs sm:text-sm text-neutral-warm-800 leading-relaxed font-bold italic text-left">
                  "Nutreix-te amb sentit comú, torna a l'essencial i construeix un cos eficient"
                </p>
              </div>

              {/* Decorative accent background glows */}
              <div className="absolute -bottom-4 -right-4 w-1/2 aspect-square bg-brand-500/10 rounded-full -z-10 blur-xl" />
              <div className="absolute -top-4 -left-4 w-1/2 aspect-square bg-brand-400/5 rounded-full -z-10 blur-xl" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
