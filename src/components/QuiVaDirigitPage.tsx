import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Calendar, Check, X, Sparkles,
  Zap, Clock, CalendarDays, Ruler, Users,
  Dumbbell, Activity, Target, Flame, Heart
} from "lucide-react";

interface QuiVaDirigitPageProps {
  onBack: () => void;
  onContactClick: () => void;
  onBookClick?: () => void;
}

export default function QuiVaDirigitPage({ onBack, onContactClick, onBookClick }: QuiVaDirigitPageProps) {
  const [activeModal, setActiveModal] = useState<{
    title: string;
    sub: string;
    desc: string;
    details: string[];
  } | null>(null);

  const profiles = [
    {
      id: "atletes",
      title: "ATLETES D'ALT RENDIMENT",
      sub: "Rendiment & Readaptació",
      desc: "Perfils d'alt rendiment a la recerca d'un 1% extra i esportistes en procés de readaptació per lesions recurrents.",
      icon: Dumbbell,
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=600",
      details: [
        "Optimització de la composició corporal per a la competició.",
        "Planificació nutricional segons els cicles de càrrega de l'entrenament.",
        "Suplementació esportiva basada en l'evidència científica més recent.",
        "Estratègies de recuperació muscular i readaptació postlesió."
      ]
    },
    {
      id: "adults",
      title: "ADULTS ACTIUS",
      sub: "Vida Activa & Energia",
      desc: "Professionals ocupats que, malgrat portar una vida familiar, esportiva i saludable, pateixen fatiga crònica i insatisfacció corporal.",
      icon: Activity,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600",
      details: [
        "Gestió d'energia al llarg del dia sense caigudes fatals.",
        "Optimització del descans i control d'estrès relacionat amb l'alimentació.",
        "Planificació de menús ràpids, sans i compatibles amb el ritme familiar.",
        "Fugir de pautes extremes per aconseguir una millora estètica duradora."
      ]
    },
    {
      id: "opositors",
      title: "OPOSITORS POLICIA/BOMBERS",
      sub: "Preparació Física & Mental",
      desc: "Opositors conscients de l'exigència física i mental, que treballen per potenciar les seves capacidades i assolir la plaça.",
      icon: Target,
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600",
      details: [
        "Nutrició enfocada a potenciar la força, la resistència i la velocitat.",
        "Estratègies per afrontar el dia de les proves físiques de forma òptima.",
        "Millora del focus mental i concentració durant les llargues hores d'estudi.",
        "Control de la inflamació muscular per mantenir el ritme de preparació."
      ]
    },
    {
      id: "recomposicio",
      title: "RECOMPOSICIÓ CORPORAL",
      sub: "Canvi Real & Sostenible",
      desc: "Persones amb un percentatge de greix elevat que han assajat tota mena de dietes sense èxit.",
      icon: Flame,
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
      details: [
        "Dèficit calòric sense gana gràcies a la selecció d'aliments realment saciants.",
        "Preservació de la massa muscular durant la pèrdua de teixit adipós.",
        "Reeducació metabòlica per evitar l'efecte rebot a llarg termini.",
        "Trencament de creences limitants i mites de les 'dietes miraculoses'."
      ]
    },
    {
      id: "longevitat",
      title: "LONGEVITAT I SALUT PREVENTIVA",
      sub: "Envelliment Actiu",
      desc: "No busquen córrer una marató, busquen arribar als 80 anys amb la vitalitat d'un de 40. Gent que vol prevenir malalties metabòliques.",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
      details: [
        "Prevenció activa de síndrome metabòlica, diabetis tipus 2 i hipertensió.",
        "Nutrició per a la salut mitocondrial, digestiva i cardiovascular.",
        "Promoció de la flexibilitat metabòlica per a una vitalitat constant.",
        "Hàbits diaris que minimitzen la inflamació de baix grau crònica."
      ]
    }
  ];

  const protocols = [
    {
      id: "trimestral",
      type: "PROTOCOL",
      name: "PROTOCOL TRIMESTRAL",
      sub: "Fase de Xoc i Reset",
      desc: "Programa de tres mesos. Ideal per a qui busca un canvi de xip immediat i sortir de l'estat d'inflamació.",
      buttonText: "MÉS INFORMACIÓ",
      popular: false,
      icon: Zap,
      details: [
        "3 mesos de seguiment estret i personalitzat.",
        "Estudi de la situació de partida i objectius realistes.",
        "Dues valoracions completes amb reprogramació nutricional.",
        "Resolució de dubtes ràpida durant tota la fase de reset."
      ]
    },
    {
      id: "semestral",
      type: "PROTOCOL",
      name: "PROTOCOL SEMESTRAL",
      sub: "Reeducació d'Hàbits",
      desc: "Programa de sis mesos. El temps necessari per fixar nous hàbits i veure canvis estructurals.",
      buttonText: "MÉS INFORMACIÓ",
      popular: true,
      icon: Clock,
      details: [
        "6 mesos d'acompanyament continuat.",
        "Establiment dels nous fonaments i hàbits consolidats.",
        "Valoracions periòdiques del progrés estètic i de vitalitat.",
        "Ajustos constants segons els teus canvis de ritme diaris.",
        "Ideal per aconseguir un canvi que es mantingui per a tota la vida."
      ]
    },
    {
      id: "anual",
      type: "PROTOCOL",
      name: "PROTOCOL ANUAL",
      sub: "Autonomia Total",
      desc: "Programa de dotze mesos. Per a qui vol un acompanyament total fins a ser 100% autònom.",
      buttonText: "MÉS INFORMACIÓ",
      popular: false,
      icon: CalendarDays,
      details: [
        "12 mesos complets de mentorització en salut.",
        "Estudi profund de la teva biologia i evolució estacional.",
        "Control exhaustiu de la composició corporal al llarg d'un any.",
        "Autonomia absoluta en el control de la teva nutrició i salut preventiva."
      ]
    },
    {
      id: "antropometria",
      type: "SERVEI",
      name: "ANTROPOMETRIA",
      sub: "Anàlisi Corporal Complet",
      desc: "Valoració física objectiva i evolució. El punt de partida de qualsevol canvi real.",
      buttonText: "MÉS INFORMACIÓ",
      popular: false,
      icon: Ruler,
      details: [
        "Mesuraments corporals objectius mitjançant plicòmetre i cintes homologades.",
        "Anàlisi dels plecs de greix, diàmetres ossis i perímetres musculars.",
        "Detecció del punt exacte del greix subcutani per a millores d'alta precisió.",
        "Ideal per comprovar si estàs perdent greix real o aigua/múscul."
      ]
    },
    {
      id: "tallers",
      type: "SERVEI",
      name: "XERRADES / TALLERS",
      sub: "Tallers Pràctics",
      desc: "Dirigit a tots aquells grups inquiets que volen continuar evolucionant i entenent com els hàbits marquen el seu futur.",
      buttonText: "SOL·LICITA LA TEVA PROPOSTA",
      popular: false,
      icon: Users,
      details: [
        "Formacions i xerrades a mida per a clubs esportius, gimnasos o empreses.",
        "Tallers pràctics sobre compra intel·ligent, cuina saludable i mites nutricionals.",
        "Eines aplicables de forma directa l'endemà de la sessió.",
        "Espai de preguntes i respostes per aclarir mites comuns."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-warm-950 text-neutral-warm-100 py-24 px-6 md:px-12 selection:bg-[#1ed760] selection:text-black animate-fade-in">
      <div className="max-w-6xl mx-auto relative text-center">
        
        {/* Back Button */}
        <div className="text-left mb-12">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-neutral-warm-400 hover:text-[#1ed760] font-sans font-semibold text-sm transition-colors group"
            id="back-to-home-dirigit"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Tornar a l'inici
          </button>
        </div>

        {/* 1. CAPÇALERA (Now "ELS MEUS SERVEIS") */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#1ed760]/10 border border-[#1ed760]/20 rounded-full mb-4 mx-auto"
          >
            <Sparkles className="h-4 w-4 text-[#1ed760]" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-[#1ed760] uppercase tracking-tight leading-none mb-6 text-center"
          >
            ELS MEUS SERVEIS
          </motion.h1>
        </div>

        {/* 2. FIRST SECTION: PROTOCOLS AND SERVICES */}
        <div className="mb-28 text-center">
          <div className="flex flex-wrap justify-center gap-8 text-center items-stretch w-full">
            {protocols.map((proto, index) => {
              const IconComponent = proto.icon;
              return (
                <motion.div
                  key={proto.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm rounded-3xl border border-neutral-warm-800/60 bg-[#121212] overflow-hidden shadow-xl hover:border-[#1ed760]/30 hover:-translate-y-1 transition-all group relative p-8 text-center items-center"
                  id={`protocol-card-${proto.id}`}
                >
                  {/* POPULAR BADGE */}
                  {proto.popular && (
                    <div className="absolute top-4 right-4 z-20 bg-[#e53935] text-white font-sans font-black text-[9px] uppercase tracking-wider py-1 px-3 rounded-md shadow-md border border-white/10 animate-pulse text-center">
                      ⭐ POPULAR
                    </div>
                  )}

                  {/* Badge */}
                  <div>
                    <span className="font-sans font-bold text-[9px] uppercase tracking-widest text-[#1ed760] bg-[#1ed760]/10 px-2.5 py-1 rounded-md border border-[#1ed760]/20 mb-4 inline-block text-center">
                      {proto.type}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 
                    className="font-sans font-black uppercase text-lg sm:text-xl text-white tracking-tight leading-none mb-1 text-center group-hover:!text-[#1ed760] transition-colors"
                    style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', backgroundImage: 'none' }}
                  >
                    {proto.name}
                  </h3>
                  <span className="font-sans text-xs text-[#1ed760] italic font-semibold tracking-wider uppercase block text-center mb-4">
                    {proto.sub}
                  </span>

                  {/* Description */}
                  <p 
                    className="font-sans text-xs sm:text-sm text-white leading-relaxed font-light text-center mb-8 flex-1"
                    style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', backgroundImage: 'none' }}
                  >
                    {proto.desc}
                  </p>

                  {/* Button "RESERVAR ARA" in green background */}
                  <button
                    onClick={onBookClick}
                    className="w-full py-3 bg-[#1ed760] hover:bg-[#1db954] text-black font-sans font-extrabold text-xs rounded-xl shadow-md uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer text-center"
                  >
                    RESERVAR ARA
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 3. SECOND SECTION: A QUI VA DIRIGIT */}
        <div className="mb-28 text-center">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <h2 
              className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-[#1ed760] uppercase tracking-tight leading-none mb-6 text-center"
              style={{ color: '#1ed760', WebkitTextFillColor: '#1ed760', backgroundImage: 'none' }}
            >
              A QUI VA DIRIGIT?
            </h2>
            <p className="font-sans text-base sm:text-lg text-neutral-warm-400 max-w-2xl leading-relaxed font-light text-center">
              Si et sents reflectit en algun d'aquests escenaris, estàs en el lloc indicat.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-center items-stretch w-full">
            {profiles.map((profile, index) => {
              const IconComponent = profile.icon;
              return (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm rounded-3xl border border-neutral-warm-800/60 bg-[#121212] overflow-hidden shadow-xl hover:border-[#1ed760]/30 hover:-translate-y-1 transition-all group relative text-center"
                  id={`profile-card-${profile.id}`}
                >
                  {/* Card Header Photo */}
                  <div className="h-44 w-full relative overflow-hidden bg-neutral-warm-950 shrink-0">
                    <img 
                      src={profile.image} 
                      alt={profile.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />
                  </div>

                  {/* Card Content with Padding */}
                  <div className="p-6 md:p-8 pt-4 flex flex-col items-center justify-between flex-1">
                    {/* Badge */}
                    <div className="mb-4">
                      <span className="font-sans font-bold text-[9px] uppercase tracking-widest text-[#1ed760] bg-[#1ed760]/10 px-2.5 py-1 rounded-md border border-[#1ed760]/20 inline-block text-center">
                        PERFIL
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 
                      className="font-sans font-black uppercase text-lg sm:text-xl text-white tracking-tight leading-none mb-1 text-center group-hover:!text-[#1ed760] transition-colors"
                      style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', backgroundImage: 'none' }}
                    >
                      {profile.title}
                    </h3>
                    <span className="font-sans text-xs text-[#1ed760] italic font-semibold tracking-wider uppercase block text-center mb-4">
                      {profile.sub}
                    </span>

                    {/* Description */}
                    <p 
                      className="font-sans text-xs sm:text-sm text-white leading-relaxed font-light text-center mb-8 flex-1"
                      style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', backgroundImage: 'none' }}
                    >
                      {profile.desc}
                    </p>

                    {/* Button "RESERVAR ARA" in green background */}
                    <button
                      onClick={onBookClick}
                      className="w-full py-3 bg-[#1ed760] hover:bg-[#1db954] text-black font-sans font-extrabold text-xs rounded-xl shadow-md uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer text-center"
                    >
                      RESERVAR ARA
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 4. BANNER "VOLS CONÈIXER ELS PREUS?" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border-2 border-[#1ed760] bg-[#1a1a1a] p-8 md:p-12 text-center shadow-xl relative overflow-hidden mb-24 text-center"
          id="banner-preus"
        >
          {/* Decorative neon green glow inside */}
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#1ed760]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-[#1ed760]/10 rounded-full blur-2xl pointer-events-none" />

          <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#1ed760] uppercase tracking-tight mb-4 text-center">
            VOLS CONÈIXER ELS PREUS?
          </h3>
          <p className="font-sans text-sm sm:text-base text-white max-w-2xl mx-auto leading-relaxed mb-8 text-center" style={{ color: '#ffffff' }}>
            Contacta directament amb mi per conèixer els preus detallats.
          </p>
          
          <button
            onClick={onContactClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1ed760] hover:bg-[#1db954] text-black font-sans font-black text-sm rounded-xl shadow-md shadow-[#1ed760]/20 hover:shadow-lg hover:shadow-[#1ed760]/30 transition-all uppercase tracking-wide active:scale-95 cursor-pointer text-center mx-auto"
          >
            CONTACTA AMB MI 
          </button>
        </motion.div>



      </div>

      {/* DETAILED INTERACTIVE MODAL */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-neutral-warm-900 border border-neutral-warm-800 rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl overflow-hidden text-center flex flex-col items-center justify-center"
              id="details-interactive-modal"
            >
              {/* Glowing accent border top */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1ed760]" />

              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-neutral-warm-950 text-neutral-warm-400 hover:text-[#1ed760] border border-neutral-warm-800 transition-colors cursor-pointer"
                title="Tancar"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center flex flex-col items-center justify-center">
                <span className="font-sans font-bold text-[10px] text-[#1ed760] uppercase tracking-widest block mb-1 text-center">
                  {activeModal.sub}
                </span>
                <h4 className="font-sans font-black italic uppercase text-2xl text-white tracking-tight leading-none mb-4 text-center">
                  {activeModal.title}
                </h4>
                <p 
                  className="font-sans text-sm text-white leading-relaxed mb-6 text-center"
                  style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', backgroundImage: 'none' }}
                >
                  {activeModal.desc}
                </p>

                <div className="border-t border-neutral-warm-800 pt-6 w-full flex flex-col items-center justify-center">
                  <span className="font-sans font-extrabold text-xs uppercase text-[#1ed760] tracking-wider block mb-4 text-center">
                    Què inclou el protocol?
                  </span>
                  
                  <ul className="space-y-3 flex flex-col items-center text-center">
                    {activeModal.details.map((item, idx) => (
                      <li key={idx} className="flex flex-col items-center text-center">
                        <span 
                          className="font-sans text-xs sm:text-sm text-white leading-relaxed text-center"
                          style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', backgroundImage: 'none' }}
                        >
                          ✓ {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex gap-3 w-full">
                <button
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-3 bg-neutral-warm-950 hover:bg-neutral-warm-800 text-white font-sans font-bold text-xs rounded-xl border border-neutral-warm-800 uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  TANCAR
                </button>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    onContactClick();
                  }}
                  className="flex-1 py-3 bg-[#1ed760] hover:bg-[#1db954] text-black font-sans font-black text-xs rounded-xl uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  SOL·LICITAR CITA
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
