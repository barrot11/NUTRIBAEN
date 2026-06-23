import { useState } from "react";
import { FAQS } from "../data";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16" id="faq-header">
          <span className="font-sans font-bold text-xs text-brand-600 uppercase tracking-widest">
            Dubtes comuns
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-warm-900 leading-tight mt-3 mb-4">
            Preguntes Freqüents (FAQ)
          </h2>
          <p className="font-sans text-sm text-neutral-warm-500 font-light">
            Tens algun dubte sobre el funcionament de la consulta? Aquí trobaràs les respostes a les preguntes més habituals. Si no trobes el que busques, contacta'm directament.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4" id="faq-accordion-list">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen
                    ? "bg-brand-50/30 border-brand-200 shadow-sm"
                    : "bg-white border-neutral-warm-200/60 hover:border-neutral-warm-300"
                }`}
                id={`faq-item-card-${faq.id}`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                  id={`faq-trigger-${faq.id}`}
                >
                  <span className="font-sans font-bold text-sm sm:text-base text-neutral-warm-800 flex items-center gap-3 pr-4">
                    <HelpCircle className={`h-5 w-5 shrink-0 transition-colors ${isOpen ? "text-brand-600" : "text-neutral-warm-400"}`} />
                    {faq.question}
                  </span>
                  
                  {/* Expanding indicators */}
                  <span className={`p-1.5 rounded-lg shrink-0 transition-colors ${isOpen ? "bg-brand-100 text-brand-700" : "bg-neutral-warm-50 text-neutral-warm-500"}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                {/* Smooth folding animation */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 border-t border-neutral-warm-100/50 pt-3">
                        <p className="font-sans text-sm text-neutral-warm-600 leading-relaxed font-light text-left">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 text-center p-6 bg-neutral-warm-50 border border-neutral-warm-200/40 rounded-2xl">
          <p className="font-sans text-xs sm:text-sm text-neutral-warm-600 font-light">
            Encara tens algun dubte pendent de resoldre?{" "}
            <a href="#contacte" className="text-brand-600 font-bold hover:underline">
              Envia'm un missatge a través del formulari de contacte
            </a>{" "}
            o truca'm directament al <strong className="font-semibold text-neutral-warm-800">973 00 00 00</strong>.
          </p>
        </div>

      </div>
    </section>
  );
}
