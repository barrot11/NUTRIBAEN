import { motion } from "motion/react";
import { BookOpen, Heart, Flame, ArrowRight } from "lucide-react";

interface ServeiIntegralProps {
  onExploreMoreClick?: () => void;
  onBookService?: (serviceId: string) => void;
}

export default function ServeiIntegral({ onExploreMoreClick }: ServeiIntegralProps) {
  const pillars = [
    {
      id: "reeducacio",
      icon: BookOpen,
      title: "REEDUCACIÓ",
      subtitle: "Oblida't de les dietes.",
      desc: "Reeduquem els teus hàbits dins del teu context. T'ensenyo a decidir perquè siguis completament autònom."
    },
    {
      id: "confianca",
      icon: Heart,
      title: "CONFIANÇA",
      subtitle: "No estàs sol en aquest procés.",
      desc: "El meu enfocament és humà, directe i proper. Soc aquí per escoltar-te i resoldre els teus dubtes de forma transparent."
    },
    {
      id: "passio",
      icon: Flame,
      title: "PASSIÓ",
      subtitle: "No entenc la salut a mitges.",
      desc: "Establim un compromís mutu on et guio i m'implico en la teva evolució. Estimo el que faig i ho transmeto a cada consulta."
    }
  ];

  return (
    <section 
      id="servei-integral" 
      className="py-24 bg-neutral-warm-50 border-t border-b border-neutral-warm-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans font-bold text-xs text-brand-500 uppercase tracking-widest">
            
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans font-extrabold text-3xl sm:text-4xl leading-tight mt-3 mb-4 uppercase"
            style={{ color: '#ffffff' }}
          >
            ELS MEUS SERVEIS
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-neutral-warm-500 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
           
          </motion.p>
        </div>

        {/* 3 Pillars Grid (Reeducació, Confiança, Passió) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {pillars.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col justify-between rounded-3xl p-8 sm:p-9 bg-[#121212] border border-neutral-800 hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300 relative group text-left shadow-xl"
              >
                <div>
                  {/* Icon Circle */}
                  <div className="w-12 h-12 rounded-full border border-neutral-800 bg-neutral-900/90 flex items-center justify-center text-brand-500 mb-6 group-hover:border-brand-500/50 group-hover:scale-105 transition-all">
                    <IconComponent className="h-5 w-5 stroke-[2]" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 
                    className="font-sans font-black text-2xl text-white tracking-wide uppercase mb-1.5"
                    style={{ color: '#ffffff' }}
                  >
                    {item.title}
                  </h3>
                  <span className="font-sans text-xs text-brand-500 italic font-semibold tracking-wide block mb-4">
                    {item.subtitle}
                  </span>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm leading-relaxed text-neutral-300 font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Button to full services & protocols page */}
        {onExploreMoreClick && (
          <div className="mt-16 text-center">
            <motion.button
              onClick={onExploreMoreClick}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-black font-sans font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(0,255,102,0.2)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              id="btn-explore-dirigit"
            >
              Veure tots els serveis
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </motion.button>
          </div>
        )}

      </div>
    </section>
  );
}
