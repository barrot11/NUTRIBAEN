import { motion } from "motion/react";
import { BookOpen, Heart, Flame, ArrowRight } from "lucide-react";

interface ServeiIntegralProps {
  onExploreMoreClick?: () => void;
}

export default function ServeiIntegral({ onExploreMoreClick }: ServeiIntegralProps) {
  const pillars = [
    {
      title: "Reeducació",
      highlight: "Oblida't de les dietes.",
      desc: "Reeduquem els teus hàbits dins del teu context. T'ensenyo a decidir perquè siguis completament autònom.",
      icon: BookOpen,
    },
    {
      title: "Confiança",
      highlight: "No estàs sol en aquest procés.",
      desc: "El meu enfocament és humà, directe i proper. Soc aquí per escoltar-te i resoldre els teus dubtes de forma transparent.",
      icon: Heart,
    },
    {
      title: "Passió",
      highlight: "No entenc la salut a mitges.",
      desc: "Establim un compromís mutu on et guio i m'implico en la teva evolució. Estimo el que faig i ho transmeto a cada consulta.",
      icon: Flame,
    },
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
            SERVEI INTEGRAL
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans font-extrabold text-3xl sm:text-4xl text-neutral-warm-900 leading-tight mt-3 mb-4 uppercase"
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
            Els tres pilars fonamentals que defineixen com treballem cada dia al teu costat:
          </motion.p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-12">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col items-center md:items-start text-center md:text-left rounded-2xl p-8 sm:p-10 border border-neutral-warm-200 bg-neutral-warm-100 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-brand-500 group relative overflow-hidden"
              >
                {/* Subtle top brand glow line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-neutral-warm-200 group-hover:bg-brand-500 transition-colors" />

                {/* Icon Wrapper */}
                <div className="mb-6 p-4 rounded-full w-fit bg-brand-100/10 border border-neutral-warm-200 group-hover:border-brand-500 transition-all">
                  <IconComponent className="h-8 w-8 text-brand-500" />
                </div>

                {/* Big Title */}
                <h3 className="font-sans font-black text-2xl sm:text-3xl tracking-tight mb-2 uppercase text-neutral-warm-900 group-hover:text-brand-400 transition-colors">
                  {pillar.title}
                </h3>

                {/* Highlight text / Subtitle */}
                <p className="font-sans font-bold text-sm italic mb-4 text-brand-500">
                  {pillar.highlight}
                </p>

                {/* Description paragraph */}
                <p className="font-sans text-sm leading-relaxed text-neutral-warm-500">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Button to new page */}
        {onExploreMoreClick && (
          <div className="mt-16 text-center">
            <motion.button
              onClick={onExploreMoreClick}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-black font-sans font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
              id="btn-explore-dirigit"
            >
              Descobreix els meus serveis
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        )}

      </div>
    </section>
  );
}
