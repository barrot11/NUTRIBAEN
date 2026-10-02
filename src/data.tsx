import { Service, FAQItem, Testimonial } from "./types";

export const SERVICES: Service[] = [
  {
    id: "consulta-unica",
    title: "Consulta Única",
    description: "Sessió individual de 40 minuts on farem una radiografia completa del teu estat actual.",
    bullets: [
      "Entrevista exhaustiva i radiografia de la teva situació inicial",
      "Anàlisi d'hàbits, digestió, descans i patrons diaris",
      "Pla d'acció immediat i recomanacions adaptades al teu context",
      "Ideal per tenir claredat sense compromís a llarg termini"
    ],
    icon: "Stethoscope",
    duration: "Sessió individual de 40 minuts"
  },
  {
    id: "trimestral",
    title: "Protocol Trimestral",
    popular: true,
    description: "Programa de tres mesos de seguiment personalitzat. Ideal per a qui busca un canvi de xip, trencar la inflamació i consolidar hàbits reals.",
    bullets: [
      "3 mesos d'acompanyament i seguiment estret",
      "Estudi de la situació de partida i reprogramació nutricional",
      "Valoracions periòdiques d'evolució i ajustos continuats",
      "Resolució de dubtes ràpida durant tota la fase de transformació"
    ],
    icon: "Zap",
    duration: "Programa complet de 3 mesos"
  },
  {
    id: "xerrades-tallers",
    title: "Xerrades i Tallers",
    description: "Sessions formatives i tallers pràctics dirigits a clubs esportius, gimnasos, empreses o col·lectius que volen comprendre com la nutrició i els hàbits marquen el seu futur.",
    bullets: [
      "Formacions a mida presencials o online per a equips i empreses",
      "Tallers pràctics: compra conscient, menjador d'empresa i mites nutricionals",
      "Eines directament aplicables des de l'endemà de la sessió",
      "Torn obert de preguntes i consultori en directe"
    ],
    icon: "Users",
    duration: "Format adaptat al col·lectiu"
  },
  {
    id: "antropometria",
    title: "Antropometria",
    description: "Valoració física objectiva i evolució. El punt de partida de qualsevol canvi real mitjançant mesures i plecs de precisió homologats.",
    bullets: [
      "Mesuraments corporals objectius amb instrumental homologat",
      "Anàlisi dels plecs de greix subcutani, perímetres i diàmetres ossis",
      "Distinció real entre pèrdua de greix, retenció de líquids i massa muscular",
      "Informe detallat de composició corporal per seguir la teva progressió"
    ],
    icon: "Ruler",
    duration: "Sessió de 30-40 minuts"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-2",
    question: "Com funciona la primera visita i quina durada té?",
    answer: "La primera visita té una durada de 45 minuts. En ella realitzem una entrevista exhaustiva (anamnesi) on parlem de la teva història clínica, hàbits actuals, relació amb el menjar, horaris, nivell d'activitat física i objectius. A partir d'aquí, dissenyem conjuntament les primeres pautes 100% personalitzades."
  },
  {
    id: "faq-3",
    question: "Amb quina freqüència es fan les visites de seguiment?",
    answer: "Dependrà del context i la persona, però majoritàriament s'establirà una visita de seguiment un cop al mes per valorar el procés i com prosseguim amb el protocol."
  },
  {
    id: "faq-4",
    question: "Puc triar si fer la visita presencial a Lleida o de forma online?",
    answer: "I tant. Totes les consultes (tant la primera com els seguiments) es poden fer de manera presencial a la meva consulta del centre de Lleida, o bé de forma online mitjançant videotrucada."
  },
  {
    id: "faq-5",
    question: "Quina és la vostra política de cancel·lació?",
    answer: (
      <span>
        Per respecte al temps dels altres pacients i a la planificació de la meva agenda, demano que qualsevol canvi o cancel·lació de cita es faci amb un mínim de 24 hores d'antelació. Si us plau, escriu un missatge a l'{" "}
        <a href="#contacte" className="text-brand-600 font-bold hover:underline">
          enquesta de contacte
        </a>{" "}
        per gestionar qualsevol modificació.
      </span>
    )
  },
  {
    id: "faq-6",
    question: "Quina diferència hi ha entre el pla de 3 mesos i el de 6?",
    answer: "En 3 mesos veuràs un canvi físic i energètic notable. En 6 mesos, haurem consolidat aquests canvis a nivell epigenètic. El protocol de 6 mesos és el que realment et garanteix que no tornaràs mai més als teus vells hàbits."
  },
  {
    id: "faq-7",
    question: "Estaràs en contacte directe amb mi per a dubtes diaris?",
    answer: "Absolutament sí. A diferència dels serveis de nutrició convencionals, a NutriBaen entenem que l'optimització de la salut passa als detalls diaris. Aquí tindràs una via de comunicació directa amb mi per resoldre dubtes ràpids."
  },
  {
    id: "faq-8",
    question: "Quins mètodes de pagament accepta NutriBaen?",
    answer: "Pots optar pel pagament únic del protocol sencer o bé la subscripció mensual, on el càrrec s'efectua automàticament cada mes per evitar interrupcions en el teu assessorament."
  },
  {
    id: "faq-9",
    question: "Què rebràs exactament quan contractis el teu pla?",
    answer: (
      <ul className="list-disc pl-5 space-y-1.5 mt-1 text-neutral-warm-600">
        <li>Pla nutricional adaptat segons el teu context.</li>
        <li>Accés al programa amb tota l'estratègia, documents d’interès, il·lustracions, etc.</li>
        <li>Accés a l'App Premium personalitzat.</li>
        <li>Suport de Xat directe amb mi per mitjà de l'App.</li>
        <li>Coaching Nutricional a través de la gestió d'hàbits.</li>
        <li>Seguiment i Videotrucades.</li>
        <li>Guia d'idees de plats ràpids i sans.</li>
        <li>Llista de la compra intel·ligent.</li>
      </ul>
    )
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
