import React, { useState } from "react";
import {
  Activity,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Download,
  Mail,
  Phone,
  User,
  Sparkles,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Printer,
  ShieldCheck,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface Question {
  id: number;
  block: "circadia" | "digestiu" | "forca" | "context";
  blockTitle: string;
  blockIcon: string;
  question: string;
  options: {
    letter: "A" | "B" | "C";
    text: string;
    points: number;
    sublabel: string;
  }[];
}

export const QUESTIONS_DATA: Question[] = [
  // BLOC 1: Descans, Energia i Ritmes Circadians (1-5)
  {
    id: 1,
    block: "circadia",
    blockTitle: "Descans i Ritmes Circadians",
    blockIcon: "🌙",
    question: "Com et despertes al matí habitualment abans d'iniciar la jornada?",
    options: [
      {
        letter: "A",
        text: "Amb vitalitat i energia espontània, sense necessitar alarma ni cafè per arrencar.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Em costa una mica arrencar, necessito temps i un cafè per començar a funcionar.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Cansat, atordit i sentint que no he descansat gens malgrat haver dormit.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 2,
    block: "circadia",
    blockTitle: "Descans i Ritmes Circadians",
    blockIcon: "🌙",
    question: "Quantes hores dorms de mitjana cada nit i quina és la qualitat del teu son?",
    options: [
      {
        letter: "A",
        text: "7-8 hores de son continu, profund i veritablement reparador.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "6-7 hores amb alguns despertars nocturns o dificultat puntual.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Menys de 6 hores o son extremadament fragmentat, superficial i agitat.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 3,
    block: "circadia",
    blockTitle: "Descans i Ritmes Circadians",
    blockIcon: "🌙",
    question: "Com és el teu nivell d'energia mental i concentració al llarg de la tarda?",
    options: [
      {
        letter: "A",
        text: "Estable, clar i productiu sense baixades dràstiques d'atenció.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Noto una petita boira mental cap a mitja tarda que compenso caminant o amb aigua.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Caiguda en picat, somnolència greu, bloqueig mental o necessitat urgent d'estimulants.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 4,
    block: "circadia",
    blockTitle: "Descans i Ritmes Circadians",
    blockIcon: "🌙",
    question: "A quina hora acostumes a sopar i com influeix en el teu descans?",
    options: [
      {
        letter: "A",
        text: "2 o 3 hores abans d'anar a dormir, un sopar nutritiu i lleuger que afavoreix el son.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Sopar entre 1 i 2 hores abans de dormir, a vegades amb una mica de pesadesa.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Sopar just abans de ficar-me al llit o picoteig continu al vespre mirant pantalles.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 5,
    block: "circadia",
    blockTitle: "Descans i Ritmes Circadians",
    blockIcon: "🌙",
    question: "Quants cafès, begudes energètiques o estimulants consumeixes al dia?",
    options: [
      {
        letter: "A",
        text: "Cap o màxim 1 cafè al matí pel plaer del sabor, sense dependència.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "2 cafès diaris per mantenir el ritme de treball.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "3 o més cafès/begudes energètiques per poder funcionar diàriament.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },

  // BLOC 2: Salut Digestiva i Metabolisme (6-10) [Text literal aportat per l'usuari]
  {
    id: 6,
    block: "digestiu",
    blockTitle: "Salut Digestiva i Metabolisme",
    blockIcon: "🥗",
    question: "Com està el teu abdomen al final del dia en comparació a quan et lleves?",
    options: [
      {
        letter: "A",
        text: "Plà, relaxat i sense diferències marcades.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Lleugerament carregat segons el que hagi menjat.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Inflat com un globus, amb gasos o pesadesa evident.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 7,
    block: "digestiu",
    blockTitle: "Salut Digestiva i Metabolisme",
    blockIcon: "🥗",
    question: "Amb quina freqüència vas al lavabo a fer deposicions i quina és la seva consistència?",
    options: [
      {
        letter: "A",
        text: "1-2 vegades al dia, de forma fàcil, ben formada i sense molèsties.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Anar-hi un dia sí i un dia no, o deposicions irregulars.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Estrenyiment freqüent o tendència a la diarreia/evacuacions incompletes.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 8,
    block: "digestiu",
    blockTitle: "Salut Digestiva i Metabolisme",
    blockIcon: "🥗",
    question: "Quina és la teva relació amb la gana entre àpats?",
    options: [
      {
        letter: "A",
        text: "Puc estar 5-6 hores sense menjar sense tenir ansietat, irritabilitat o boira mental.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Tinc gana cada 3-4 hores, però ho puc gestionar.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Si no menjo cada 2-3 hores em canvia l'humor, em marejo o tinc tremolors.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 9,
    block: "digestiu",
    blockTitle: "Salut Digestiva i Metabolisme",
    blockIcon: "🥗",
    question: "Què sents exactament 1 hora després de dinar?",
    options: [
      {
        letter: "A",
        text: "Vitalitat i claredat mental per continuar treballant o entrenant.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Una lleugera baixada de ritme normal, però manejable.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Una somnolència brutal, ganes de dormir o de prendre cafè.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 10,
    block: "digestiu",
    blockTitle: "Salut Digestiva i Metabolisme",
    blockIcon: "🥗",
    question: "Quin percentatge del teu plat diari prové d'aliments d'un sol ingredient (sense etiquetes)?",
    options: [
      {
        letter: "A",
        text: "Més del 80-90% (carn, peix, ous, fruita, verdura, tubercles, fruits secs).",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Al voltant del 50-60%. Menjo menjar real, però consumeixo processats/pa diàriament.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Menys del 40%. La meva dieta es basa en ultraprocessats, pa de motlle, precocinats o productes \"fit\".",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },

  // BLOC 3: Rendiment Físic, Força i Composició Corporal (11-15)
  {
    id: 11,
    block: "forca",
    blockTitle: "Rendiment Físic i Força",
    blockIcon: "💪",
    question: "Fas entrenament de força estructurat (peses, calistènia, resistència) setmanalment?",
    options: [
      {
        letter: "A",
        text: "Sí, 3 o més sessions intencionades de força per setmana.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "1-2 cops per setmana o de forma esporàdica.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "No faig exercici de força o sóc totalment sedentari.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 12,
    block: "forca",
    blockTitle: "Rendiment Físic i Força",
    blockIcon: "💪",
    question: "Com és la teva recuperació muscular després d'un esforç físic o entrenament?",
    options: [
      {
        letter: "A",
        text: "Ràpida i eficient, en 24-48h em sento totalment regenerat i fresc.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Una mica de dolor muscular persistent que triga uns dies a marxar.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Agulletes severes durant dies, fatiga extrema i dolors articulars.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 13,
    block: "forca",
    blockTitle: "Rendiment Físic i Força",
    blockIcon: "💪",
    question: "Com valores la teva massa muscular i proporció de greix corporal actual?",
    options: [
      {
        letter: "A",
        text: "Bona massa muscular, definició saludable i composició àgil.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Acceptable, però amb tendència a acumular greix abdominal i poca tonicitat.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Excés evident de greix visceral/abdominal o pèrdua visible de força i to.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 14,
    block: "forca",
    blockTitle: "Rendiment Físic i Força",
    blockIcon: "💪",
    question: "Com és la teva ingesta de proteïna de qualitat diària (ous, peix, carn, etc.)?",
    options: [
      {
        letter: "A",
        text: "Adequada a cada àpat principal (ous, peix, carns no processades).",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "En prenc al dinar, però poc o gens a l'esmorzar i sopar.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Molt baixa o deficitària; predominen farines refinades o precuinats.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 15,
    block: "forca",
    blockTitle: "Rendiment Físic i Força",
    blockIcon: "💪",
    question: "Com respons a situacions d'esforç físic inesperat (pujar escales, córrer, carregar pes)?",
    options: [
      {
        letter: "A",
        text: "Sense dificultat, amb agilitat, força i ràpida recuperació cardiorespiratòria.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Em canso una mica i noto les cames feixugues, però ho puc sostenir.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Em quedo sense alè de seguida, amb sensació d'ofec o mareig.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },

  // BLOC 4: Context, Estrès i Moviment (16-20) [Text literal aportat per l'usuari]
  {
    id: 16,
    block: "context",
    blockTitle: "Context, Estrès i Moviment",
    blockIcon: "🚶",
    question: "Quants passos o moviment no estructurat (NEAT) fas al dia al marge de l'entrenament?",
    options: [
      {
        letter: "A",
        text: "Més de 8.000 - 10.000 passos diaris i em moc sovint durant la jornada.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Entre 5.000 i 8.000 passos diaris.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Menys de 4.000 passos. Estil sedentari la major part del dia (feina de despatx/cotxe).",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 17,
    block: "context",
    blockTitle: "Context, Estrès i Moviment",
    blockIcon: "🚶",
    question: "Quina és la teva font principal d'hidratació durant el dia?",
    options: [
      {
        letter: "A",
        text: "Aigua mineral/filtrada, infusions o caldos, segons la meva quimera natural de set.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Aigua, però sovint consumeixo refrescos \"zero/light\" o sucs.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Em costa beure aigua sola. Bec refrescos, begudes energètiques o massa cafès per aguantar.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 18,
    block: "context",
    blockTitle: "Context, Estrès i Moviment",
    blockIcon: "🚶",
    question: "Com gestiones la teva relació amb la nutrició i l'estrès emocional?",
    options: [
      {
        letter: "A",
        text: "Menjo per nutrir-me. L'estrès no altera la meva manera de menjar.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "A vegades picotejo alguna cosa dolça quan tinc un dia molt estressant.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Menjo per ansietat o recompensa emocional al vespre (atracons de dolç/salat).",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 19,
    block: "context",
    blockTitle: "Context, Estrès i Moviment",
    blockIcon: "🚶",
    question: "Quina importància li dones a la llum natural, ritmes circadians i exposició solar al matí?",
    options: [
      {
        letter: "A",
        text: "M'exposo a la llum del sol en els primers 30 minuts del dia i prioritzo espais exteriors.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Només els caps de setmana o si fa bon temps. La resta de dies estic tancat en interiors.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Nul·la o gairebé inexistent. Visc sota llum artificial i pantalles des que em llevo fins al llit.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
  {
    id: 20,
    block: "context",
    blockTitle: "Context, Estrès i Moviment",
    blockIcon: "🚶",
    question: "Quin grau de constància i motivació tens per assolir una transformació física i de salut duradora?",
    options: [
      {
        letter: "A",
        text: "Alt i determinat: Estic compromès a canviar hàbits de soca-rel i vull un full de ruta clar.",
        points: 5,
        sublabel: "Estat òptim (5 pts)",
      },
      {
        letter: "B",
        text: "Moderat: Vull millorar, però em costa mantenir rutines quan augmenta l'estrès o la feina.",
        points: 2.5,
        sublabel: "Estat intermedi (2,5 pts)",
      },
      {
        letter: "C",
        text: "Desmotivat o bloquejat: He provat diverses dietes o intents i sento que torno sempre al mateix punt.",
        points: 0,
        sublabel: "Desconnexió biològica (0 pts)",
      },
    ],
  },
];

interface HealthTestSectionProps {
  onBookClick?: () => void;
  isModal?: boolean;
  onClose?: () => void;
}

export default function HealthTestSection({ onBookClick, isModal, onClose }: HealthTestSectionProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { letter: "A" | "B" | "C"; points: number; text: string }>>({});
  const [showResults, setShowResults] = useState(false);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentQ = QUESTIONS_DATA[currentIdx];
  const totalQuestions = QUESTIONS_DATA.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Score Calculation
  const totalScore = (Object.values(answers) as { points: number }[]).reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  // Block Scores
  const blockScores = {
    circadia: QUESTIONS_DATA.filter((q) => q.block === "circadia").reduce(
      (sum, q) => sum + (answers[q.id]?.points || 0),
      0
    ),
    digestiu: QUESTIONS_DATA.filter((q) => q.block === "digestiu").reduce(
      (sum, q) => sum + (answers[q.id]?.points || 0),
      0
    ),
    forca: QUESTIONS_DATA.filter((q) => q.block === "forca").reduce(
      (sum, q) => sum + (answers[q.id]?.points || 0),
      0
    ),
    context: QUESTIONS_DATA.filter((q) => q.block === "context").reduce(
      (sum, q) => sum + (answers[q.id]?.points || 0),
      0
    ),
  };

  // Status diagnosis
  let levelTitle = "";
  let levelColor = "";
  let levelDescription = "";

  if (totalScore >= 80) {
    levelTitle = "Estat Òptim de Vitalitat";
    levelColor = "text-brand-500 border-brand-500/40 bg-brand-500/10";
    levelDescription =
      "Felicitats! Tens una excel·lent alineació biològica, bona flexibilitat metabòlica i hàbits consistents. El teu objectiu ara és el rendiment superior i l'afinament de detalls.";
  } else if (totalScore >= 50) {
    levelTitle = "Estat Intermedi: Alerta Biològica";
    levelColor = "text-amber-500 border-amber-500/40 bg-amber-500/10";
    levelDescription =
      "El teu cos funciona, però arrossega friccions metabòliques o digestives (inflor, pujades i baixades d'energia, estrès) que et resten vitalitat. És el moment ideal per intervenir amb el Full de Ruta abans que es cronifiqui.";
  } else {
    levelTitle = "Desconnexió Biològica / Fatiga Crònica";
    levelColor = "text-rose-500 border-rose-500/40 bg-rose-500/10";
    levelDescription =
      "El teu organisme està operant en mode supervivència. La manca d'energia, la inflamació i el sedentarisme requereixen un canvi de prioritats i un protocol pas a pas supervisat per reiniciar els teus sistemes.";
  }

  const handleSelectOption = (option: Question["options"][0]) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        letter: option.letter,
        points: option.points,
        text: option.text,
      },
    }));

    if (currentIdx < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIdx((prev) => prev + 1);
      }, 180);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 200);
    }
  };

  const handleResetTest = () => {
    setAnswers({});
    setCurrentIdx(0);
    setShowResults(false);
    setSubmitSuccess(false);
    setErrorMessage("");
  };

  // Submit test and send email
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMessage("Si us plau, introdueix el teu nom i correu electrònic.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "health-test",
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          score: totalScore,
          blockScores,
          answers: QUESTIONS_DATA.map((q) => ({
            question: q.question,
            answer: answers[q.id]?.text || "No resposta",
            points: answers[q.id]?.points || 0,
          })),
          levelTitle,
          levelDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("No s'ha pogut enviar el resultat. Torna-ho a provar.");
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Hi ha hagut un error en processar la petició.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Direct download / open Full de Ruta in new tab
  const handleDownloadRoadmap = () => {
    window.open("/full-de-ruta", "_blank");
  };

  return (
    <section
      id="test-salut"
      className={`relative py-12 md:py-20 bg-neutral-warm-950 text-white overflow-hidden ${
        isModal ? "min-h-screen" : "border-t border-b border-neutral-warm-900"
      }`}
    >
      {/* Modal Window Top Header Bar (when shown in its own separate window) */}
      {isModal && (
        <div className="sticky top-0 z-40 bg-neutral-warm-900/95 backdrop-blur-md border-b border-neutral-warm-800 px-6 py-3.5 flex items-center justify-between mb-8 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-sans font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider">
              Finestra de Valoració de Salut • NutriBaen
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open("/valoracio-salut", "_blank")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-warm-800 hover:bg-neutral-warm-700 text-neutral-300 hover:text-white text-xs font-semibold transition-colors"
              title="Obrir en nova pestanya"
            >
              <span>Obrir en nova pestanya</span>
              <ArrowRight className="h-3 w-3" />
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/30 text-xs font-bold transition-colors"
                id="btn-close-test-modal"
              >
                <span>✕ Tancar finestra</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs md:text-sm font-extrabold uppercase tracking-widest mb-4">
            <Sparkles className="h-4 w-4" />
            Valoració de salut • 2 Minuts
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-white font-sans tracking-tight text-white mb-4">
            Valora la teva <span className="text-brand-500">Salut i Energia</span>
          </h2>

          <p className="text-base md:text-lg text-neutral-warm-400 font-light leading-relaxed">
            Respon les 20 preguntes clíniques sobre digestió, ritmes circadians i moviment. Descobreix la teva puntuació exacta sobre 100 i descarrega el teu{" "}
            <strong className="text-white font-semibold">Full de Ruta Inicial gratuït</strong> per guardar al mòbil o rebre'l al correu.
          </p>

          {/* Quick Direct Download button for users who want to grab the roadmap immediately */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleDownloadRoadmap}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-warm-900 border border-neutral-warm-700 text-neutral-warm-200 text-sm font-semibold hover:border-brand-500/50 hover:text-white transition-all shadow-sm"
              id="btn-direct-download-roadmap"
            >
              <Download className="h-4 w-4 text-brand-400" />
              Descarregar Full de Ruta Inicial directe
            </button>
            <button
              onClick={() => setShowRoadmapModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-warm-900 border border-neutral-warm-700 text-neutral-warm-200 text-sm font-semibold hover:border-brand-500/50 hover:text-white transition-all shadow-sm"
              id="btn-view-roadmap-modal"
            >
              <BookOpen className="h-4 w-4 text-brand-400" />
              Veure contingut del Full de Ruta
            </button>
          </div>
        </div>

        {/* Main Interactive Card */}
        <div className="bg-neutral-warm-900/90 border border-neutral-warm-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          {!showResults ? (
            /* QUESTIONNAIRE FLOW */
            <div>
              {/* Progress & Block Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-warm-800 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currentQ.blockIcon}</span>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-brand-400 font-bold">
                      {currentQ.blockTitle}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Pregunta {currentQ.id} de {totalQuestions}
                    </h3>
                  </div>
                </div>

                <div className="w-full sm:w-48 flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs text-neutral-warm-400 font-medium">
                    <span>Progrés</span>
                    <span className="text-brand-400 font-bold">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-warm-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <h4 className="text-lg sm:text-2xl font-bold text-white leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                {currentQ.options.map((option) => {
                  const isSelected = answers[currentQ.id]?.letter === option.letter;
                  return (
                    <button
                      key={option.letter}
                      onClick={() => handleSelectOption(option)}
                      className={`text-left p-5 rounded-2xl border transition-all flex items-start gap-4 focus:outline-none group ${
                        isSelected
                          ? "bg-brand-500/15 border-brand-500 shadow-[0_0_20px_rgba(0,255,102,0.15)]"
                          : "bg-neutral-warm-950/60 border-neutral-warm-800 hover:border-neutral-warm-600 hover:bg-neutral-warm-800/40"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 transition-colors ${
                          isSelected
                            ? "bg-brand-500 text-black shadow-md"
                            : "bg-neutral-warm-800 text-neutral-warm-300 group-hover:bg-neutral-warm-700"
                        }`}
                      >
                        {option.letter}
                      </div>

                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-medium text-white leading-relaxed">
                          {option.text}
                        </div>
                        <div className="text-xs text-brand-400/80 font-semibold mt-1">
                          {option.sublabel}
                        </div>
                      </div>

                      <div className="shrink-0 pt-1">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? "border-brand-500 bg-brand-500" : "border-neutral-warm-700"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer navigation inside questionnaire */}
              <div className="flex items-center justify-between pt-6 border-t border-neutral-warm-800 text-sm">
                <button
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-neutral-warm-400 hover:text-white disabled:opacity-30 disabled:hover:text-neutral-warm-400 transition-colors font-medium"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </button>

                <div className="text-xs text-neutral-warm-500">
                  {answeredCount} de {totalQuestions} respostes completes
                </div>

                {currentIdx < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
                    disabled={!answers[currentQ.id]}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 text-black font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-600 transition-all"
                  >
                    Següent
                    <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowResults(true)}
                    disabled={answeredCount < 10}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-500 text-black font-extrabold hover:bg-brand-600 transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)]"
                  >
                    Veure Resultats
                    <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* RESULTS & ROADMAP VIEW */
            <div>
              {/* Score Gauge & Header */}
              <div className="text-center pb-8 border-b border-neutral-warm-800">
                <div className="inline-block p-4 rounded-3xl bg-neutral-warm-950 border border-neutral-warm-800 shadow-inner mb-4">
                  <div className="text-5xl sm:text-6xl font-black text-brand-500 font-sans tracking-tight">
                    {totalScore}
                    <span className="text-2xl sm:text-3xl text-neutral-warm-500 font-light"> / 100</span>
                  </div>
                  <div className="text-xs text-neutral-warm-400 uppercase tracking-widest mt-1 font-semibold">
                    Puntuació Total del Test
                  </div>
                </div>

                <div className={`inline-block px-5 py-2 rounded-2xl border text-sm sm:text-base font-extrabold mb-4 ${levelColor}`}>
                  {levelTitle}
                </div>

                <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-warm-300 leading-relaxed font-light">
                  {levelDescription}
                </p>
              </div>

              {/* Block breakdown grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <div className="p-4 rounded-2xl bg-neutral-warm-950/70 border border-neutral-warm-800">
                  <div className="flex justify-between items-center text-xs text-neutral-warm-400 font-semibold mb-2">
                    <span className="flex items-center gap-1.5 text-white">🌙 Descans i Ritmes Circadians</span>
                    <span className="text-brand-400 font-bold">{blockScores.circadia} / 25 pts</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-warm-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full"
                      style={{ width: `${(blockScores.circadia / 25) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-warm-950/70 border border-neutral-warm-800">
                  <div className="flex justify-between items-center text-xs text-neutral-warm-400 font-semibold mb-2">
                    <span className="flex items-center gap-1.5 text-white">🥗 Salut Digestiva i Metabolisme</span>
                    <span className="text-brand-400 font-bold">{blockScores.digestiu} / 25 pts</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-warm-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full"
                      style={{ width: `${(blockScores.digestiu / 25) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-warm-950/70 border border-neutral-warm-800">
                  <div className="flex justify-between items-center text-xs text-neutral-warm-400 font-semibold mb-2">
                    <span className="flex items-center gap-1.5 text-white">💪 Rendiment Físic i Força</span>
                    <span className="text-brand-400 font-bold">{blockScores.forca} / 25 pts</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-warm-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full"
                      style={{ width: `${(blockScores.forca / 25) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-warm-950/70 border border-neutral-warm-800">
                  <div className="flex justify-between items-center text-xs text-neutral-warm-400 font-semibold mb-2">
                    <span className="flex items-center gap-1.5 text-white">🚶 Context, Estrès i Moviment</span>
                    <span className="text-brand-400 font-bold">{blockScores.context} / 25 pts</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-warm-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full"
                      style={{ width: `${(blockScores.context / 25) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Roadmap Download & Email Form */}
              <div className="bg-neutral-warm-950 border border-brand-500/30 rounded-2xl p-6 sm:p-8 mb-8 shadow-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-brand-500" />
                      Rep el teu Full de Ruta Inicial al correu
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-warm-400 mt-1">
                      T'enviarem el desglossament del teu resultat i la guia completa amb el protocol de 7 dies.
                    </p>
                  </div>

                  <button
                    onClick={handleDownloadRoadmap}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/40 text-xs sm:text-sm font-bold hover:bg-brand-500 hover:text-black transition-all"
                  >
                    <Download className="h-4 w-4" />
                    Descarregar al mòbil ara
                  </button>
                </div>

                {submitSuccess ? (
                  <div className="p-5 rounded-2xl bg-brand-500/10 border border-brand-500/40 text-center">
                    <CheckCircle2 className="h-10 w-10 text-brand-500 mx-auto mb-2" />
                    <h5 className="font-bold text-white text-base">Full de Ruta enviat correctament!</h5>
                    <p className="text-xs sm:text-sm text-neutral-warm-300 mt-1">
                      Hem enviat el teu informe a <span className="text-brand-400 font-semibold">{email}</span>. També pots descarregar-lo al mòbil directament amb el botó superior.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitLead} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-warm-300 uppercase tracking-wider mb-1.5">
                          El teu Nom *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-warm-500" />
                          <input
                            type="text"
                            required
                            placeholder="Ex: Maria García"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-neutral-warm-900 border border-neutral-warm-700 rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder-neutral-warm-500 focus:outline-none focus:border-brand-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-warm-300 uppercase tracking-wider mb-1.5">
                          Correu Electrònic *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-warm-500" />
                          <input
                            type="email"
                            required
                            placeholder="el-teu-email@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-neutral-warm-900 border border-neutral-warm-700 rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder-neutral-warm-500 focus:outline-none focus:border-brand-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-warm-300 uppercase tracking-wider mb-1.5">
                          Telèfon (Opcional)
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-warm-500" />
                          <input
                            type="tel"
                            placeholder="612 345 678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-neutral-warm-900 border border-neutral-warm-700 rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder-neutral-warm-500 focus:outline-none focus:border-brand-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="text-xs text-rose-400 bg-rose-950/50 border border-rose-800 rounded-xl p-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto self-start mt-2 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-500 text-black font-extrabold text-sm rounded-xl hover:bg-brand-600 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(0,255,102,0.3)]"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Enviant el teu Full de Ruta...
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 stroke-[2.5]" />
                          Enviar-me el Full de Ruta al Correu
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Action Buttons: Booking & Reset */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-warm-800">
                <button
                  onClick={handleResetTest}
                  className="flex items-center gap-2 text-xs font-semibold text-neutral-warm-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Tornar a fer el test
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShowRoadmapModal(true)}
                    className="px-5 py-3 rounded-xl bg-neutral-warm-800 border border-neutral-warm-700 text-white text-xs sm:text-sm font-bold hover:bg-neutral-warm-700 transition-all"
                  >
                    Llegir Full de Ruta ara
                  </button>

                  <button
                    onClick={() => {
                      if (onBookClick) {
                        onBookClick();
                      } else {
                        const el = document.getElementById("reserva");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-black font-extrabold text-xs sm:text-sm hover:bg-brand-600 shadow-[0_0_20px_rgba(0,255,102,0.3)] transition-all hover:scale-[1.02]"
                  >
                    <Calendar className="h-4 w-4 stroke-[2.5]" />
                    Reservar Consulta amb Pol
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ROADMAP MODAL VIEWER */}
      <AnimatePresence>
        {showRoadmapModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-warm-900 border border-brand-500/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-warm-800 mb-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-brand-400 font-bold">
                    Document Exclusiu
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">
                    Full de Ruta Inicial: Salut & Vitalitat
                  </h3>
                </div>
                <button
                  onClick={() => setShowRoadmapModal(false)}
                  className="p-2 rounded-xl bg-neutral-warm-800 hover:bg-neutral-warm-700 text-neutral-warm-300 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6 text-sm sm:text-base text-neutral-warm-300 leading-relaxed font-light">
                <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-xs sm:text-sm text-neutral-warm-200">
                  <strong className="text-brand-400">Objectiu del Full de Ruta:</strong> Aquest document sintetitza els 4 pilars biològics innegociables per eliminar la inflamació abdominal, estabilitzar la teva glucosa i despertar amb energia real.
                </div>

                <div>
                  <h4 className="text-base font-bold text-white uppercase tracking-wider text-brand-400 mb-2">
                    1. Menjar Real (80-90% un sol ingredient)
                  </h4>
                  <p>
                    Elimina ultraprocessats, olis refinats i sucres afegits. Basa cada àpat en proteïna de qualitat (ous de pastura, peix blau i blanc, carn no processada), tubercles (patata, moniato), verdures fresques i greixos bons (oli d'oliva verge extra, alvocat, olives).
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white uppercase tracking-wider text-brand-400 mb-2">
                    2. Sincronització Circadiana i Descans Fisiològic
                  </h4>
                  <p>
                    El metabolisme funciona amb rellotges biològics. Exposa't a la llum del sol en llevar-te abans de mirar pantalles. Mantén un dejuni fisiològic de 12 hores nocturnes (de 20:30h a 8:30h) per reparar el tracte digestiu. Sopa lleuger i 2-3h abans d'anar al llit.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white uppercase tracking-wider text-brand-400 mb-2">
                    3. Moviment Diari NEAT i Força
                  </h4>
                  <p>
                    El sedentarisme apaga la sensibilitat a la insulina. Assegura un mínim de 8.000 a 10.000 passos cada dia. Afegeix 3 sessions setmanals d'exercici de força (múscul com a òrgan protector i metabòlic).
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white uppercase tracking-wider text-brand-400 mb-2">
                    4. Hidratació i Sistema Nerviós
                  </h4>
                  <p>
                    Comença el dia amb un got gran d'aigua mineral i una petita mica de sal marina verge per recuperar electròlits. Allunya pantalles blaves almenys 60 minuts abans d'anar a dormir per afavorir la producció natural de melatonina.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-warm-950 border border-neutral-warm-800">
                  <h4 className="text-sm font-bold text-white mb-2">🗓️ Protocol d'Iniciació de 7 Dies</h4>
                  <ul className="text-xs sm:text-sm space-y-1.5 text-neutral-warm-400 pl-4 list-disc">
                    <li><strong>Dies 1-2:</strong> Neteja de la cuina i primers 10.000 passos diaris.</li>
                    <li><strong>Dies 3-4:</strong> Esmorzar proteic (ous, pernil o peix) en lloc de sucres.</li>
                    <li><strong>Dies 5-6:</strong> Sopar d'hora (abans de les 21h) i llum càlida al vespre.</li>
                    <li><strong>Dia 7:</strong> Avalua la reducció d'inflor i l'augment d'energia matinal.</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 pt-6 border-t border-neutral-warm-800">
                <button
                  onClick={handleDownloadRoadmap}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-500 text-black font-extrabold text-xs sm:text-sm hover:bg-brand-600 transition-all"
                >
                  <Download className="h-4 w-4" />
                  Descarregar al Mòbil / PDF
                </button>
                <button
                  onClick={() => setShowRoadmapModal(false)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-warm-800 text-neutral-warm-300 font-semibold text-xs sm:text-sm hover:bg-neutral-warm-700 transition-all"
                >
                  Tancar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
