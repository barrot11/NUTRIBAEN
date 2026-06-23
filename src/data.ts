import { Service, FAQItem, Testimonial } from "./types";

export const SERVICES: Service[] = [
  {
    id: "reeducacio",
    title: "Reeducació Alimentària",
    description: "Millora la teva relació amb el menjar, aprèn a menjar sa de forma sostenible i assoleix el teu pes saludable sense dietes restrictives ni culpabilitats.",
    bullets: [
      "Pla d'alimentació 100% flexible i adaptat als teus gustos",
      "Educació nutricional per a tota la vida (no més dietes miracle)",
      "Seguiment periòdic dels teus progressos i suport setmanal",
      "Estratègies pràctiques per gestionar la gana emocional i l'ansietat"
    ],
    icon: "Apple",
    duration: "Primera: 60 min | Seguiment: 30 min"
  },
  {
    id: "esportiva",
    title: "Nutrició Esportiva",
    description: "Optimitza el teu rendiment físic, millora la teva composició corporal (greix/múscul) i aprèn a planificar els teus entrenaments i competicions de manera professional.",
    bullets: [
      "Planificació periòdica segons càrrega d'entrenament",
      "Estratègies de suplementació esportiva basada en evidència",
      "Assessorament per a competicions (càrregues, hidratació, recuperació)",
      "Valoració antropomètrica ISAK per a anàlisi de composició corporal"
    ],
    icon: "Dumbbell",
    duration: "Primera: 60 min | Seguiment: 30 min"
  },
  {
    id: "clinica",
    title: "Nutrició Clínica i Digestiva",
    description: "Tractament dietètic per a patologies digestives i clíniques per reduir símptomes, recuperar el benestar intestinal i millorar la teva qualitat de vida.",
    bullets: [
      "Abordatge expert de SIBO, Colon Irritable (FODMAP), Celíacs i Crohn",
      "Gestió dietètica de diabetis, hypertension i perfils lipídics (colesterol)",
      "Regulació de problemes hormonals (Hipotiroïdisme, SOP)",
      "Millora del trànsit intestinal, reflux i digestions pesades"
    ],
    icon: "Stethoscope",
    duration: "Primera: 60 min | Seguiment: 30 min"
  },
  {
    id: "vegana",
    title: "Alimentació Vegetariana i Vegana",
    description: "Transicions segures cap a un estil de vida basat en plantes o assessorament per a persones vegetarianes/veganes que volen optimitzar la seva dieta de forma equilibrada.",
    bullets: [
      "Planificació de menús rics, variats i nutricionalment complets",
      "Suplementació clau i pautes per evitar dèficits (Vitamina B12)",
      "Estratègies per a l'obtenció adequada de proteïnes i ferro",
      "Assessorament en opcions basades en plantes de fàcil preparació"
    ],
    icon: "Leaf",
    duration: "Primera: 60 min | Seguiment: 30 min"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Treballes amb mútues de salut?",
    answer: "Treballo exclusivament de forma privada per poder garantir la màxima personalització i temps de qualitat a cada pacient. No obstant això, si la teva mútua disposa d'una polissa de reemborsament de lliure elecció, et puc emetre factures detallades perquè et retornin un percentatge del cost de la consulta (habitualment entre el 50% i el 80%)."
  },
  {
    id: "faq-2",
    question: "Com funciona la primera visita i quina durada té?",
    answer: "La primera visita té una durada de 60 minuts. En ella realitzem una entrevista exhaustiva (anamnesi) on parlem de la teva història clínica, hàbits actuals, relació amb el menjar, horaris, nivell d'activitat física i objectius. També analitzem analítiques recents si en portes. A partir d'aquí, dissenyem conjuntament les primeres pautes 100% personalitzades."
  },
  {
    id: "faq-3",
    question: "Amb quina freqüència es fan les visites de seguiment?",
    answer: "Depèn totalment del teu cas i objectius. Al principi, el més recomanable sol ser fer un seguiment cada 2 o 3 setmanes per anar consolidant hàbits, resoldre dubtes i fer els ajustos necessaris en els menús. A mesura que avances i guanyes autonomia, les visites s'espaien a un cop al mes o més, fins a rebre l'alta nutricional."
  },
  {
    id: "faq-4",
    question: "Puc triar si fer la visita presencial a Lleida o de forma online?",
    answer: "I tant. Totes les consultes (tant la primera com els seguiments) es poden fer de manera presencial a la meva consulta del centre de Lleida, o bé de forma online mitjançant videotrucada. L'eficàcia del tractament, l'atenció i els materials lliurats són exactament els mateixos."
  },
  {
    id: "faq-5",
    question: "Quina és la vostra política de cancel·lació?",
    answer: "Per respecte al temps dels altres pacients i a la planificació de la meva agenda, demano que qualsevol canvi o cancel·lació de cita es faci amb un mínim de 24 hores d'antelació. Si es cancel·la amb menys temps, es cobrarà el 50% de la sessió."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Marta Jover",
    role: "Pacient de Nutrició Clínica (SIBO)",
    text: "Després d'anys amb inflor constant i anar de metge en metge, trobar el Pol ha estat un abans i un després. Em va acompanyar en la dieta FODMAP i el tractament de SIBO de manera super humana i explicant-m'ho tot. Avui torno a menjar pràcticament de tot sense por i estic perfectament.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "t-2",
    name: "Xavier Soldevila",
    role: "Corredor de Trail i Triatleta",
    text: "Vaig acudir al Pol per preparar la Marató de Lleida i millorar els meus problemes estomacals durant les tirades llargues. Gràcies a les seves pautes de càrrega i hidratació vaig baixar la meva marca en 12 minuts i sense cap molèstia. Un professional de cap a peus que entén perfectament l'esportista.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "t-3",
    name: "Sònia Guiu",
    role: "Reeducació Alimentària",
    text: "Havia provat milers de dietes miracle amb les que sempre acabava amb ansietat i recuperant el pes. Amb el Pol he après a menjar bé, gaudint del menjar i sense prohibicions absurdes. He perdut 8 kg gairebé sense adonar-me'n, i el millor és que m'encanta el que menjo.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const CREDENTIALS = [
  { name: "CoDiNuCat", desc: "Col·legiat Nº CAT001842", logo: "CoDiNuCat" },
  { name: "UdL", desc: "Graduat en Nutrició Humana (Universitat de Lleida)", logo: "UdL" },
  { name: "ISAK 1", desc: "Cineantropometria Especialitzada", logo: "ISAK" },
  { name: "Acadèmia de Nutrició", desc: "Membre de l'Acadèmia de Nutrició i Dietètica", logo: "AND" }
];
