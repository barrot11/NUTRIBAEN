import { SERVICES } from "../data";
import { Apple, Dumbbell, Stethoscope, Leaf, CheckCircle2, ChevronRight, Calendar } from "lucide-react";
import { motion } from "motion/react";

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  // Helper to map icon name to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Apple":
        return <Apple className="h-6 w-6 text-brand-600" />;
      case "Dumbbell":
        return <Dumbbell className="h-6 w-6 text-brand-600" />;
      case "Stethoscope":
        return <Stethoscope className="h-6 w-6 text-brand-600" />;
      case "Leaf":
        return <Leaf className="h-6 w-6 text-brand-600" />;
      default:
        return <Apple className="h-6 w-6 text-brand-600" />;
    }
  };

  return (
    <section id="serveis" className="py-20 md:py-28 bg-brand-50/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="services-header">
          <span className="font-sans font-bold text-xs text-brand-600 uppercase tracking-widest">
            Què fem a consulta?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-warm-900 leading-tight mt-3 mb-4">
            Especialitats i Serveis de Salut Nutricional
          </h2>
          <p className="font-sans text-base text-neutral-warm-500 font-light max-w-2xl mx-auto">
            Abordem els teus objectius o problemes de salut des de la personalització absoluta, elaborant menús que s'adapten a la teva vida real i aportant educació per la sostenibilitat.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch" id="services-grid">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-8 bg-white border border-neutral-warm-200/50 hover:border-brand-300 rounded-3xl transition-all shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-lg group relative overflow-hidden"
              id={`service-card-${service.id}`}
            >
              {/* Subtle top brand glow line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-100 group-hover:bg-brand-500 transition-colors" />

              <div>
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3.5 rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100 shrink-0">
                    {getIcon(service.icon)}
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-xl text-neutral-warm-900">
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-[11px] text-neutral-warm-400 font-medium">
                        {service.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="font-sans text-sm text-neutral-warm-600 leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                {/* Bullets */}
                <div className="border-t border-neutral-warm-100 pt-5 mb-8">
                  <p className="font-sans font-bold text-xs text-neutral-warm-400 uppercase tracking-wider mb-3 text-left">
                    Què inclou el servei?
                  </p>
                  <ul className="space-y-3 text-left">
                    {service.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm text-neutral-warm-600">
                        <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                        <span className="font-light">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer: Modalitat & CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-neutral-warm-150 mt-auto">
                <div>
                  <span className="font-sans text-[11px] text-neutral-warm-400 block uppercase tracking-wider">
                    Modalitat
                  </span>
                  <span className="font-sans font-semibold text-sm text-brand-400">
                    Presencial o Online
                  </span>
                </div>
                <button
                  onClick={() => onSelectService(service.id)}
                  className="flex items-center gap-1.5 px-4.5 py-2.5 bg-brand-100 hover:bg-brand-500 hover:text-black text-brand-800 font-sans font-semibold text-xs rounded-xl transition-all shadow-sm group-hover:shadow-md"
                  id={`service-cta-btn-${service.id}`}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Reservar visita
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
