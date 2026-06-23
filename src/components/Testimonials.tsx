import { useState, useEffect } from "react";
import { TESTIMONIALS } from "../data";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonis" className="py-20 md:py-28 bg-brand-50/30 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16" id="testimonials-header">
          <span className="font-sans font-bold text-xs text-brand-600 uppercase tracking-widest">
            Històries d'èxit
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-warm-900 leading-tight mt-3 mb-4">
            El que diuen els meus pacients
          </h2>
          <p className="font-sans text-sm text-neutral-warm-500 font-light">
            No hi ha millor aval que l'experiència real de persones que han canviat la seva relació amb el menjar i millorat la seva salut global.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto" id="testimonials-carousel">
          
          {/* Large Quote Icon Background */}
          <div className="absolute -top-10 -left-6 md:-left-12 text-brand-100 select-none pointer-events-none opacity-50">
            <Quote className="h-24 w-24 fill-current" />
          </div>

          <div className="bg-white border border-neutral-warm-200/50 rounded-3xl p-8 md:p-12 shadow-[0_4px_25px_rgba(0,0,0,0.01)] relative z-10 min-h-[300px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6 text-left"
                id={`testimonial-slide-${currentIndex}`}
              >
                {/* Stars Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent-400 fill-accent-400" />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <blockquote className="font-serif text-base sm:text-lg md:text-xl text-neutral-warm-700 italic leading-relaxed font-light">
                  "{TESTIMONIALS[currentIndex].text}"
                </blockquote>

                {/* User Bio Details */}
                <div className="flex items-center gap-4 pt-6 border-t border-neutral-warm-100">
                  <div className="h-14 w-14 rounded-full overflow-hidden bg-brand-50 shrink-0">
                    <img
                      src={TESTIMONIALS[currentIndex].avatarUrl}
                      alt={TESTIMONIALS[currentIndex].name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <cite className="font-sans font-bold text-sm text-neutral-warm-900 not-italic block">
                      {TESTIMONIALS[currentIndex].name}
                    </cite>
                    <span className="font-sans text-xs text-neutral-warm-400 mt-0.5 block">
                      {TESTIMONIALS[currentIndex].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls inside Card (Mobile bottom / Desktop floating absolute) */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-warm-100/50">
              {/* Bullets indicators */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? "w-6 bg-brand-600" : "w-2 bg-neutral-warm-200 hover:bg-neutral-warm-300"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Navigation arrows */}
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 border border-neutral-warm-200 hover:border-neutral-warm-300 bg-white hover:bg-neutral-warm-50 text-neutral-warm-600 hover:text-neutral-warm-900 rounded-xl transition-all active:scale-95 cursor-pointer"
                  aria-label="Previous testimonial"
                  id="testimonial-prev-arrow"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 border border-neutral-warm-200 hover:border-neutral-warm-300 bg-white hover:bg-neutral-warm-50 text-neutral-warm-600 hover:text-neutral-warm-900 rounded-xl transition-all active:scale-95 cursor-pointer"
                  aria-label="Next testimonial"
                  id="testimonial-next-arrow"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
