import { Search, Compass, HeartHandshake, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function HowItWorks() {
  const steps = [
    {
      stepNum: "01",
      title: "Primera visita d'avaluació",
      duration: "Durada: 60 minuts",
      description: "Realitzem una entrevista detallada d'estil de vida, historial de salut, relació amb el menjar, analítiques de sang recents i objectius reals. No et peso si no et sents còmode; ens enfoquem en l'estat clínic i emocional global.",
      icon: <Search className="h-6 w-6 text-brand-600" />,
      badge: "Entrevista & Història"
    },
    {
      stepNum: "02",
      title: "Lliurament del pla i educació",
      duration: "A les 48 - 72 hores",
      description: "T'envio el teu pla d'alimentació 100% personalitzat i digitalitzat. El dissenyo de forma consensuada, incloent receptes pràctiques, menús flexibles, llista de la compra intel·ligent i el primer bloc de materials de reeducació.",
      icon: <Compass className="h-6 w-6 text-brand-600" />,
      badge: "Estratègia & Menú"
    },
    {
      stepNum: "03",
      title: "Visites de seguiment",
      duration: "Durada: 30 minuts",
      description: "Ens reunim periòdicament (cada 2-3 setmanes) per avaluar com t'estàs adaptant, resoldre dubtes concrets, tractar possibles situacions socials complicades i realitzar noves propostes per continuar millorant la teva relació amb el menjar.",
      icon: <HeartHandshake className="h-6 w-6 text-brand-600" />,
      badge: "Suport Continuat"
    }
  ];

  return (
    <section id="com-funciona" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20" id="howitworks-header">
          <span className="font-sans font-bold text-xs text-brand-600 uppercase tracking-widest">
            Quin és el camí?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-warm-900 leading-tight mt-3 mb-4">
            El Mètode Pas a Pas de Pol Barrot
          </h2>
          <p className="font-sans text-base text-neutral-warm-500 font-light max-w-2xl mx-auto">
            El canvi d'hàbits d'èxit és un procés estructurat que requereix temps, educació i acompanyament professional continuat.
          </p>
        </div>

        {/* Timeline Process */}
        <div className="relative" id="howitworks-timeline">
          {/* Connector Line (visible only on desktop md and up) */}
          <div className="hidden md:block absolute top-[100px] left-1/12 right-1/12 h-0.5 bg-neutral-warm-200" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left group" id={`step-item-${idx}`}>
                {/* Visual Circle & Icon */}
                <div className="relative mb-6">
                  {/* Step number hanging behind */}
                  <span className="absolute -top-7 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 font-serif text-8xl font-black text-brand-100/50 leading-none select-none z-0">
                    {step.stepNum}
                  </span>

                  {/* Icon badge */}
                  <div className="relative w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border-2 border-white shadow-md group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-500 transition-all duration-300 z-10">
                    {step.icon}
                  </div>
                </div>

                {/* Tag Badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-brand-100/50 border border-brand-200/40 text-brand-800 font-sans font-semibold text-[10px] uppercase tracking-wider mb-3">
                  {step.badge}
                </span>

                {/* Title & Info */}
                <h3 className="font-sans font-bold text-lg text-neutral-warm-900 mb-1">
                  {step.title}
                </h3>
                <span className="font-mono text-xs text-neutral-warm-400 font-medium block mb-4 uppercase tracking-wider">
                  {step.duration}
                </span>

                {/* Description */}
                <p className="font-sans text-sm text-neutral-warm-500 leading-relaxed font-light max-w-sm md:max-w-none">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 p-6 md:p-8 bg-brand-50 rounded-2xl border border-brand-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-white rounded-xl text-brand-600 shrink-0">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-base text-neutral-warm-900 leading-tight">
                Necessites una solució a mida o tens algun dubte?
              </h4>
              <p className="font-sans text-xs text-neutral-warm-500 mt-1 leading-normal max-w-xl font-light">
                Comencem per parlar sense compromís. També em pots escriure directament per WhatsApp per comentar el teu cas clínic i valorar quin és el servei idoni.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/34600000000?text=Hola%20Pol!%20M'agradaria%20fer-te%20una%20consulta%20nutricional"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-white border border-brand-200 text-brand-700 font-sans font-semibold text-sm rounded-xl hover:bg-brand-50 shadow-sm transition-all text-center whitespace-nowrap active:scale-95 shrink-0"
            id="howitworks-whatsapp-btn"
          >
            Pregunta per WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
