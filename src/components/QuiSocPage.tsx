import { motion } from "motion/react";
import { ArrowLeft, Sparkles, Apple, Compass } from "lucide-react";
// @ts-ignore
import sportsPrepImg from "../assets/images/mi2.jpg";

interface QuiSocPageProps {
  onBack: () => void;
}

export default function QuiSocPage({ onBack }: QuiSocPageProps) {
  const philosophyItems = [
    {
      title: "Més enllà del plat",
      desc: "Som el resultat d'allò que mengem, però també de com descansem, com ens movem i com ens exposem a l'entorn.",
      icon: Sparkles
    },
    {
      title: "Densitat nutricional",
      desc: "Prioritzar aliments reals amb una alta densitat de nutrients, respectant els senyals de gana i sacietat, i fugint dels que t'obliguen a menjar cada dues hores.",
      icon: Apple
    },
    {
      title: "Sentit comú",
      desc: "No hi ha una alimentació perfecta que funcioni per a tothom. No s'ha d'adaptar la persona a la dieta, s'ha d'adaptar la nutrició a la biologia de cada individu.",
      icon: Compass
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-warm-50 py-24 px-6 md:px-12 selection:bg-brand-500 selection:text-black">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-neutral-warm-500 hover:text-brand-500 font-sans font-semibold text-sm transition-colors mb-12 group"
          id="back-to-home-top"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Tornar a l'inici
        </button>

        {/* Hero / Capçalera */}
        <div className="text-center mb-16 flex flex-col items-center">
          {/* Avatar circular gran amb la foto de Pol Barrot */}
          <div className="relative mb-8">
            <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-brand-500 shadow-2xl relative bg-neutral-warm-100">
              <img
                src={sportsPrepImg}
                alt="Pol Barrot Enjuanes"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Absolute badge amb les inicials "PB" */}
            <div className="absolute -bottom-1 -right-1 bg-brand-500 text-black font-sans font-black text-xs h-10 w-10 rounded-full flex items-center justify-center border-2 border-neutral-warm-50 shadow-lg">
              PB
            </div>
          </div>

          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-neutral-warm-900 uppercase tracking-tight leading-none mb-4">
            Pol Barrot Enjuanes
          </h1>
          <p className="font-sans font-bold text-sm sm:text-base text-brand-500 uppercase tracking-widest">
            Jugador de futbol sala · Dietista
          </p>
        </div>

        {/* Narrativa personal */}
        <div className="prose prose-neutral max-w-none mb-20 text-center md:text-left">
          <p className="font-serif text-base sm:text-lg text-neutral-warm-800 leading-relaxed font-light mb-8">
            Soc el Pol Barrot Enjuanes, nascut a Lleida l'any 2003. Si m'hagués de definir, em considero una persona familiar, propera i un autèntic apassionat de l'esport i la salut.
          </p>
          <p className="font-serif text-base sm:text-lg text-neutral-warm-800 leading-relaxed font-light mb-8">
            Quan vaig acabar el batxillerat, no tenia gens clar cap a on dirigir el meu futur professional. L'únic que tenia clavat al cap era el somni de ser jugador de futbol sala. Mai vaig ser un estudiant excel·lent, però sempre he estat una persona extremadament curiosa. Quan alguna cosa em crida l'atenció, em buido de veritat, orientant tota la meva atenció i capacitats a assolir l'excel·lència del repte.
          </p>
          <p className="font-serif text-base sm:text-lg text-neutral-warm-800 leading-relaxed font-light mb-8">
            El meu punt d'inflexió va arribar mentre cursava el Cicle Superior d'Esports. De cop, en un moment inesperat, la vida em va fer un gir de 180 graus i un equip de Primera Divisió em va obrir les portes per fer la pretemporada. Sabia que era la meva oportunitat. Aquell estiu vaig realitzar tot el que estava sota el meu control i finalment el club va decidir quedar-se amb mi a l'elit.
          </p>
          <p className="font-serif text-base sm:text-lg text-neutral-warm-800 leading-relaxed font-light mb-8">
            Va ser precisament durant aquell primer any a la màxima competició quan la meva curiositat es va desplaçar cap a un altre terreny, la salut. Vaig començar comprant-me un parell de llibres de nutrició per pur interès personal i, mentre acabava els meus estudis d'esports, vaig començar a dedicar hores i hores a descobrir un univers que desconeixia completament. Volia entendre com funcionava el nostre cos per dins. Després de tot un any a Primera Divisió, la fam de saber més em va portar a obrir una nova porta acadèmica, el Cicle Superior de Dietètica.
          </p>
          <p className="font-serif text-base sm:text-lg text-neutral-warm-800 leading-relaxed font-light mb-8">
            En finalitzar-lo, el que havia començat com un interès es va convertir en una autèntica obsessió ben entesa. Em vaig tornar un apassionat de la lectura i de la recerca científica. Vaig començar a mirar molt més enllà dels simples aliments, a estudiar els ritmes circadians, la biologia evolutiva, d'on venim i com funciona la salut des de la cèl·lula. Va ser en aquest punt on vaig començar a qüestionar molts dels aspectes i dogmes de la nutrició actual.
          </p>
          <p className="font-serif text-base sm:text-lg text-neutral-warm-800 leading-relaxed font-light mb-8">
            A dia d'avui, segueixo estudiant cada dia amb el màxim rigor, tocant de peus a terra i conscient que em queda un llarg camí per recórrer i aprendre. Fruit d'aquesta evolució, el gener de 2026 va néixer NutriBaen, un projecte que neix des de la humilitat i amb una aspiració molt clara, no parar mai d'aprendre, d'entrenar, i d'ajudar els altres a optimitzar la seva vida mentre jo segueixo gaudint de la meva en família, pau i alegria.
          </p>
        </div>

        {/* Separador Visual */}
        <div className="flex items-center justify-center gap-4 mb-20">
          <div className="h-[1px] bg-neutral-warm-200 flex-grow"></div>
          <div className="h-2 w-2 rounded-full bg-brand-500"></div>
          <div className="h-2 w-2 rounded-full bg-brand-500/50"></div>
          <div className="h-2 w-2 rounded-full bg-brand-500/20"></div>
          <div className="h-[1px] bg-neutral-warm-200 flex-grow"></div>
        </div>

        {/* Filosofia de salut */}
        <div className="mb-16">
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-neutral-warm-900 uppercase tracking-tight text-center mb-6">
            Com entenc la salut?
          </h2>
          <p className="font-sans text-sm text-neutral-warm-500 text-center max-w-2xl mx-auto mb-12">
            En un món saturat de dietes miracle i de productes ultraprocessats, la meva filosofia es basa a entendre com funciona el nostre cos i tocar l'arrel de la nostra naturalesa evolutiva.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {philosophyItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 bg-neutral-warm-100 border border-neutral-warm-200 rounded-2xl flex flex-col items-center text-center shadow-sm"
                >
                  <div className="p-3 bg-brand-500/10 rounded-xl text-brand-500 mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-sans font-extrabold text-base text-neutral-warm-900 mb-3 uppercase">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-warm-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Return Button at bottom */}
        <div className="text-center pt-10 border-t border-neutral-warm-200">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-warm-100 hover:bg-neutral-warm-200 text-neutral-warm-800 hover:text-black font-sans font-bold text-sm rounded-xl border border-neutral-warm-200 transition-all active:scale-95 group"
            id="back-to-home-bottom"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            ← Tornar a l'inici
          </button>
        </div>

      </div>
    </div>
  );
}
