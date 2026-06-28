import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Calendar, Check, X, Sparkles
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
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "adults",
      title: "ADULTS ACTIUS",
      sub: "Vida Activa & Energia",
      desc: "Professionals ocupats que, malgrat portar una vida familiar, esportiva i saludable, pateixen fatiga crònica i insatisfacció corporal.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "opositors",
      title: "OPOSITORS POLICIA/BOMBERS",
      sub: "Preparació Física & Mental",
      desc: "Opositors conscients de l'exigència física i mental, que treballen per potenciar les seves capacitats i assolir la plaça.",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "recomposicio",
      title: "RECOMPOSICIÓ CORPORAL",
      sub: "Canvi Real & Sostenible",
      desc: "Persones amb un percentatge de greix elevat que han assajat tota mena de dietes sense èxit.",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "longevitat",
      title: "LONGEVITAT I SALUT PREVENTIVA",
      sub: "Envelliment Actiu",
      desc: "No busquen córrer una marató, busquen arribar als 80 anys amb la vitalitat d'un de 40. Gent que vol prevenir malalties metabòliques.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const protocols = [
    {
      id: "trimestral",
      type: "PROTOCOL",
      name: "PROTOCOL TRIMESTRAL",
      sub: "Fase de Xoc i Reset",
      desc: "Programa de tres mesos. Ideal per a qui busca un canvi de xip immediat i sortir de l'estat d'inflamació.",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
      buttonText: "MÉS INFORMACIÓ",
      popular: false,
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
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600",
      buttonText: "MÉS INFORMACIÓ",
      popular: true,
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
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=600",
      buttonText: "MÉS INFORMACIÓ",
      popular: false,
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
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=600",
      buttonText: "MÉS INFORMACIÓ",
      popular: false,
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
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600",
      buttonText: "SOL·LICITA LA TEVA PROPOSTA",
      popular: false,
      details: [
        "Formacions i xerrades a mida per a clubs esportius, gimnasos o empreses.",
        "Tallers pràctics sobre compra intel·ligent, cuina saludable i mites nutricionals.",
        "Eines aplicables de forma directa l'endemà de la sessió.",
        "Espai de preguntes i respostes per aclarir mites comuns."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-warm-950 text-neutral-warm-100 py-24 px-6 md:px-12 selection:bg-[#1ed760] selection:text-black">
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
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#1ed760]/10 border border-[#1ed760]/20 rounded-full mb-4 mx-auto"
          >
            <Sparkles className="h-4 w-4 text-[#1ed760]" />
            <span className="font-sans font-bold text-[10px] text-[#1ed760] uppercase tracking-wider text-center">
              Enfocament personalitzat
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-[#1ed760] uppercase tracking-tight leading-none mb-6 text-center"
          >
            ELS MEUS SERVEIS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-base sm:text-lg text-neutral-warm-400 leading-relaxed font-light text-center"
          >
            Protocols i serveis d'assessorament nutricional i esportiu dissenyats a mida segons el teu objectiu, biologia i ritme de vida.
          </motion.p>
        </div>

        {/* 2. FIRST SECTION: PROTOCOLS AND SERVICES */}
        <div className="mb-28 text-center">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <span className="font-sans font-bold text-xs text-[#1ed760] uppercase tracking-widest mb-2 block text-center">
              FÒRMULES DE TREBALL
            </span>
            <h2 className="font-sans font-black italic text-2xl sm:text-3xl text-white tracking-tight leading-none text-center">
              PROTOCOLS I SERVEIS A LA TEVA MIDA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center justify-center items-center">
            {protocols.map((proto, index) => {
              return (
                <motion.div
                  key={proto.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col h-full rounded-2xl border border-neutral-warm-800 bg-neutral-warm-900/60 overflow-hidden shadow-lg hover:border-[#1ed760]/40 hover:-translate-y-1 transition-all group relative text-center"
                  id={`protocol-card-${proto.id}`}
                >
                  {/* POPULAR BADGE */}
                  {proto.popular && (
                    <div className="absolute top-4 -left-4 z-20 -rotate-12 bg-[#e53935] text-white font-sans font-black text-[9px] uppercase tracking-wider py-1 px-4 rounded-md shadow-md shadow-black/30 border border-white/10 animate-pulse text-center">
                      ⭐ POPULAR
                    </div>
                  )}

                  {/* Upper Block: Image with semi-transparent dark overlay & centered title */}
                  <div className="h-48 shrink-0 relative overflow-hidden bg-neutral-warm-950 text-center">
                    <img 
                      src={proto.image} 
                      alt={proto.name} 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-warm-950 via-neutral-warm-950/40 to-transparent" />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-between items-center text-center">
                      <span className="font-sans font-bold text-[9px] uppercase tracking-widest text-[#1ed760] bg-black/60 px-2.5 py-1 rounded-md border border-[#1ed760]/20 text-center">
                        {proto.type}
                      </span>

                      <div className="mt-auto text-center">
                        <h3 className="font-sans font-black italic uppercase text-lg sm:text-xl leading-tight text-white tracking-tight mb-1 group-hover:text-[#1ed760] transition-colors text-center">
                          {proto.name}
                        </h3>
                        <span className="font-sans text-xs text-[#1ed760] font-semibold tracking-wider uppercase block text-center">
                          {proto.sub}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lower Block: Green background & centered texts */}
                  <div className="flex-1 p-6 bg-[#1ed760] text-black flex flex-col justify-between text-center items-center">
                    <p className="font-sans text-xs sm:text-sm text-black/85 leading-relaxed font-medium mb-6 text-center">
                      {proto.desc}
                    </p>

                    <button
                      onClick={() => setActiveModal({
                        title: proto.name,
                        sub: `${proto.type} · ${proto.sub}`,
                        desc: proto.desc,
                        details: proto.details
                      })}
                      className="w-full py-3 bg-black hover:bg-neutral-900 text-[#1ed760] font-sans font-bold text-xs rounded-xl shadow-md uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer text-center"
                    >
                      {proto.buttonText}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 3. SECOND SECTION: A QUI VA DIRIGIT */}
        <div className="mb-28 text-center">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <span className="font-sans font-bold text-xs text-[#1ed760] uppercase tracking-widest mb-2 block text-center">
              A QUI VA DIRIGIT?
            </span>
            <p className="font-sans text-base sm:text-lg text-neutral-warm-400 max-w-2xl leading-relaxed font-light text-center">
              Si et sents reflectit en algun d'aquests escenaris, estàs en el lloc indicat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center justify-center items-center">
            {profiles.map((profile, index) => {
              return (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col h-full rounded-2xl border border-neutral-warm-800 bg-neutral-warm-900/60 overflow-hidden shadow-lg hover:border-[#1ed760]/40 hover:-translate-y-1 transition-all group relative text-center"
                  id={`profile-card-${profile.id}`}
                >
                  {/* Upper Block with Photo */}
                  <div className="h-48 shrink-0 relative overflow-hidden bg-neutral-warm-950 text-center">
                    <img 
                      src={profile.image} 
                      alt={profile.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-warm-950 via-neutral-warm-950/40 to-transparent" />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
                      <div className="text-center">
                        <h3 className="font-sans font-black italic uppercase text-lg sm:text-xl leading-tight text-white tracking-tight mb-1 group-hover:text-[#1ed760] transition-colors text-center">
                          {profile.title}
                        </h3>
                        <span className="font-sans text-xs text-[#1ed760] font-semibold tracking-wider uppercase block text-center">
                          {profile.sub}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lower Block: Green background & fully centered text. No button! */}
                  <div className="flex-1 p-6 bg-[#1ed760] text-black flex flex-col justify-center text-center items-center">
                    <p className="font-sans text-xs sm:text-sm text-black/85 leading-relaxed font-medium text-center">
                      {profile.desc}
                    </p>
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
          <p className="font-sans text-sm sm:text-base text-neutral-warm-300 max-w-2xl mx-auto leading-relaxed mb-8 text-center">
            El meu mètode és ultra-personalitzat. No venc plantilles genèriques de pdf: cada cas és estudiat a fons i adaptat a la teva biologia i disponibilitat. Contacta directament amb mi per conèixer els preus detallats i trobar la fórmula exacta per a tu.
          </p>
          
          <button
            onClick={onContactClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1ed760] hover:bg-[#1db954] text-black font-sans font-black text-sm rounded-xl shadow-md shadow-[#1ed760]/20 hover:shadow-lg hover:shadow-[#1ed760]/30 transition-all uppercase tracking-wide active:scale-95 cursor-pointer text-center mx-auto"
          >
            CONTACTA AMB MI → FORMULARI
          </button>
        </motion.div>

        {/* 5. SECCIÓ FINAL DE RESERVA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border-t-4 border-[#1ed760] bg-black py-12 md:py-16 px-6 text-center shadow-2xl text-center"
          id="contact-final-booking"
        >
          <h3 className="font-sans font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2 text-center">
            LLEST PER COMENÇAR?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-white max-w-md mx-auto leading-relaxed mb-8 text-center">
            Reserva una sessió de descobriment per valorar la teva situació de partida i explicar-te en detall com l'abordarem.
          </p>

          <button
            onClick={onBookClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1ed760] hover:bg-[#1db954] text-black font-sans font-black text-sm rounded-xl shadow-lg hover:shadow-xl transition-all uppercase tracking-wide active:scale-95 cursor-pointer text-center mx-auto"
          >
            <Calendar className="h-4.5 w-4.5" />
            📅 RESERVA ARA
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
                <p className="font-sans text-sm text-neutral-warm-300 leading-relaxed mb-6 text-center">
                  {activeModal.desc}
                </p>

                <div className="border-t border-neutral-warm-800 pt-6 w-full flex flex-col items-center justify-center">
                  <span className="font-sans font-extrabold text-xs uppercase text-[#1ed760] tracking-wider block mb-4 text-center">
                    Què inclou el protocol?
                  </span>
                  
                  <ul className="space-y-3 flex flex-col items-center text-center">
                    {activeModal.details.map((item, idx) => (
                      <li key={idx} className="flex flex-col items-center text-center">
                        <span className="font-sans text-xs sm:text-sm text-neutral-warm-300 leading-relaxed text-center">
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
