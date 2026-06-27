import { Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
// @ts-ignore
import polHeroImg from "../assets/images/Pol.jpg";

interface HeroProps {
  onBookClick: () => void;
  onAboutClick: () => void;
}

export default function Hero({ onBookClick, onAboutClick }: HeroProps) {
  return (
    <section
      id="inici"
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-neutral-warm-50 overflow-hidden border-b border-neutral-warm-200"
    >
      {/* Decorative organic shapes */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-brand-400/5 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Side Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans font-black leading-none tracking-tight mb-6 pt-6 text-5xl sm:text-7xl md:text-8xl lg:text-[90px] select-none"
              id="hero-title"
            >
              <span className="text-red">NUTRI</span><span className="text-brand-500">BAEN</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-lg md:text-xl text-neutral-warm-600 leading-relaxed max-w-2xl mb-8 font-light mx-auto lg:mx-0"
              id="hero-subtitle"
            >
              Oblida't de l'estètica. 
              Aquí busquem vitalitat, tenir un cos eficient, sincronitzat amb els teus ritmes naturals i ple d'energia.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12"
              id="hero-actions"
            >
              <button
                onClick={onBookClick}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-500 text-black font-sans font-extrabold text-base rounded-2xl hover:bg-brand-600 shadow-[0_0_25px_rgba(0,255,102,0.4)] hover:scale-[1.01] transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95 group"
                id="hero-cta-main"
              >
                <Calendar className="h-5 w-5 stroke-[2.5]" />
                Reserva la teva Cita
                <ArrowRight className="h-4 w-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onAboutClick}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-neutral-warm-100 border border-neutral-warm-200 text-neutral-warm-800 font-sans font-bold text-base rounded-2xl hover:bg-neutral-warm-200 hover:border-brand-500/50 hover:text-brand-500 transition-all active:scale-95"
                id="hero-cta-secondary"
              >
                Saber-ne més
              </button>
            </motion.div>
          </div>

          {/* Right Side Image & Floating Elements */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[370px]"
              id="hero-image-wrapper"
            >
              {/* Outer decorative ring */}
              <div className="absolute inset-0 border-2 border-brand-500/20 rounded-3xl transform rotate-3 scale-[1.02] pointer-events-none" />

              {/* Main Image */}
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-brand-100/10 border border-brand-500/30 shadow-[0_0_30px_rgba(34,197,94,0.15)] relative z-10">
                <img
                  src={polHeroImg}
                  alt="Pol Barrot - Dietista-Nutricionista a Lleida"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-warm-950/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge 1 - Clinician Badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -left-6 bottom-16 bg-neutral-warm-100 border border-neutral-warm-200 p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20 max-w-[200px]"
                id="floating-badge-1"
              >
                <div className="p-2 bg-brand-100 rounded-xl text-brand-500 shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-sans font-bold text-sm text-neutral-warm-900 leading-none">
                    NutriBaen
                  </div>
                  <div className="font-sans text-[10px] text-neutral-warm-500 mt-1 leading-tight">
                    Dietista
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
