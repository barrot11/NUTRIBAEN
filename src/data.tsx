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
    duration: "Sessió de 45 minuts"
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
    duration: "Sessió de 45 minuts"
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
    duration: "Sessió de 45 minuts"
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
    duration: "Sessió de 45 minuts"
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
    answer: "Un cop al mes."
  },
  {
    id: "faq-4",
    question: "Puc triar si fer la visita presencial a Lleida o de forma online?",
    answer: "I tant. Totes les consultes (tant la primera com els seguiments) es poden fer de manera presencial a la meva consulta del centre de Lleida, o bé de forma online mitjançant videotrucada. L'eficàcia del tractament, l'atenció i els materials lliurats són exactament els mateixos."
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
