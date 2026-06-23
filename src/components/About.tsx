import { CheckCircle2, Award, Heart, BookOpen } from "lucide-react";
import { motion } from "motion/react";
// @ts-ignore
import sportsPrepImg from "../assets/images/sports_nutrition_prep_1782233882086.jpg";

export default function About() {
  const bulletPoints = [
    {
      title: "Ciència, no mites ni modes",
      desc: "Totes les recomanacions i plans que et proposo estan recolzats per la darrera evidència científica en nutrició i salut.",
      icon: <BookOpen className="h-5 w-5 text-brand-500" />
    },
    {
      title: "Enfocament 100% humà",
      desc: "No ets un número de la bàscula ni un percentatge de greix. M'importa la teva relació amb el menjar, el teu estrès, el descans i com et sents.",
      icon: <Heart className="h-5 w-5 text-brand-500" />
    },
    {
      title: "Acompanyament actiu",
      desc: "Resolem dubtes de dilluns a divendres via WhatsApp. No estàs sol entre visites; t'acompanyo en cada pas del teu camí.",
      icon: <Award className="h-5 w-5 text-brand-500" />
    }
  ];

  return (
    <section id="sobre-mi" className="py-20 md:py-28 bg-neutral-warm-50 overflow-hidden border-b border-neutral-warm-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Images Grid */}
          <div className="lg:col-span-5 relative" id="about-image-section">
            <div className="relative">
              {/* Main portrait */}
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_0_25px_rgba(0,255,102,0.1)] bg-neutral-warm-100 border border-neutral-warm-200 z-10 relative">
                <img
                  src={sportsPrepImg}
                  alt="Nutrició esportiva i saludable"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Accent decorative background block */}
              <div className="absolute -bottom-6 -left-6 w-1/2 aspect-square bg-brand-500/10 rounded-2xl -z-10 blur-xl" />
              <div className="absolute -top-6 -right-6 w-1/2 aspect-square bg-brand-400/5 rounded-2xl -z-10 blur-xl" />
              
              {/* Overlaid stat/quote box */}
              <div className="absolute -right-6 -bottom-6 bg-neutral-warm-100 border border-brand-500/30 text-white p-5 rounded-2xl shadow-2xl max-w-[240px] z-20">
                <p className="font-sans italic text-sm text-neutral-warm-800">
                  "Menjar saludable no hauria de ser sinònim de patir o de passar gana. Hauria de ser un plaer."
                </p>
                <div className="mt-3 border-t border-neutral-warm-200 pt-2 flex items-center justify-between">
                  <span className="font-sans text-xs font-black uppercase tracking-wider text-brand-500">
                    Pol Barrot
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left" id="about-content">
            <span className="font-sans font-bold text-xs text-brand-500 uppercase tracking-widest mb-3">
              Mètode i Filosofia
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-neutral-warm-900 leading-tight mb-6">
              Hola, sóc en Pol. Redefinim el que significa menjar bé.
            </h2>
            
            <div className="font-sans text-base text-neutral-warm-600 leading-relaxed space-y-4 mb-8 font-light">
              <p>
                Com a <strong className="font-semibold text-neutral-warm-900">Dietista-Nutricionista col·legiat (CAT001842)</strong> format a la Universitat de Lleida, em vaig adonar ràpidament de com la cultura de la dieta ens ha ensenyat a relacionar-nos amb el menjar des de la restricció, la culpa i el control.
              </p>
              <p>
                La meva consulta neix d'una idea molt diferent: <strong>menjar sa ha de ser fàcil, flexible i sostenible</strong> en el temps. El meu objectiu és ensenyar-te a alimentar-te de manera intel·ligent, adaptant el menjar a les teves necessitats físiques, esportives o patològiques, sense que hagis de renunciar a la teva vida social.
              </p>
            </div>

            {/* Structured Value Props */}
            <div className="space-y-6 w-full mb-8">
              {bulletPoints.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start" id={`about-bullet-${idx}`}>
                  <div className="p-2 bg-brand-100 border border-neutral-warm-200 rounded-lg shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-base text-neutral-warm-900">
                      {item.title}
                    </h4>
                    <p className="font-sans text-sm text-neutral-warm-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Qualifications Card */}
            <div className="p-5 bg-neutral-warm-100 border border-neutral-warm-200 rounded-2xl w-full">
              <h5 className="font-sans font-bold text-xs text-neutral-warm-800 uppercase tracking-wider mb-3">
                Trajectòria Acadèmica i Especialitats
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-neutral-warm-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0" />
                  <span>Grau en Nutrició Humana i Dietètica (UdL)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0" />
                  <span>Mestratge en Nutrició Esportiva i Fisiologia</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0" />
                  <span>Esp. en SIBO i Patologia Digestiva</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0" />
                  <span>Abordatge no-pesocentrista i Psiconutrició</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
