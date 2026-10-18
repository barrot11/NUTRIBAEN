import React, { useState } from "react";
import {
  Mail,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Laptop,
  Inbox,
  MoreVertical,
  ExternalLink,
  AlertCircle
} from "lucide-react";
import { subscribeToNewsletter } from "../services/newsletterService";

interface NewsletterSubPageProps {
  onBackToHome?: () => void;
}

export default function NewsletterSubPage({ onBackToHome }: NewsletterSubPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"mobile" | "desktop">("mobile");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMessage("Si us plau, introdueix una adreça de correu electrònic vàlida.");
      return;
    }

    setIsSubmitting(true);
    try {
      await subscribeToNewsletter(cleanEmail, name);
      setSubmittedEmail(cleanEmail);
      setIsSuccess(true);
      setEmail("");
      setName("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setErrorMessage(
        err.message || "Hi ha hagut un error en processar la subscripció. Torna-ho a provar en uns instants."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F0C] text-white font-sans selection:bg-[#00FF66] selection:text-black relative overflow-x-hidden">
      {/* Background radial ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#00FF66]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-5%] w-[400px] h-[400px] bg-[#00FF66]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="border-b border-neutral-800/80 bg-[#0B0F0C]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00FF66] to-emerald-400 p-[1.5px] shadow-lg shadow-[#00FF66]/20">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <span className="text-[#00FF66] font-black text-xs tracking-tighter">PB</span>
              </div>
            </div>
            <div>
              <span className="font-bold text-white text-sm tracking-tight block" style={{ color: "#ffffff" }}>
                Pol Barrot
              </span>
              <span className="text-[11px] text-[#00FF66] font-medium tracking-wide block uppercase">
                Dietista
              </span>
            </div>
          </div>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="text-xs text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer"
              style={{ color: "#e5e7eb" }}
            >
              <span>Web oficial</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-5 py-10 sm:py-16 relative z-10">
        {/* State 1: Form and Presentation */}
        {!isSuccess ? (
          <div className="space-y-12">
            {/* Header Title */}
            <div className="text-center space-y-4">
              <h1
                className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
                style={{ color: "#ffffff" }}
              >
                El Newsletter Clínic de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] via-emerald-400 to-[#00FF66]">
                  Pol Barrot
                </span>
              </h1>

              <p
                className="text-neutral-200 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
                style={{ color: "#e5e7eb" }}
              >
                Sense filtres d'algoritmes ni publicitat. Apunts directes de consulta, sincronització
                circadiana, digestió real i nutrició basada en ciència directament a la teva bústia.
              </p>
            </div>

            {/* Main Conversion Card */}
            <div className="bg-[#141815] border border-neutral-700/80 hover:border-[#00FF66]/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent" />

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="newsletter-name"
                    className="block text-xs font-bold text-white tracking-wide"
                    style={{ color: "#ffffff" }}
                  >
                    Nom de pila (opcional)
                  </label>
                  <input
                    id="newsletter-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Com et dius?"
                    className="w-full bg-[#0B0F0C] border border-neutral-700 rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all text-sm"
                    style={{ color: "#ffffff", caretColor: "#00FF66" }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="newsletter-email"
                    className="block text-xs font-bold text-white tracking-wide"
                    style={{ color: "#ffffff" }}
                  >
                    Correu electrònic <span className="text-[#00FF66]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="el.teu.correu@gmail.com"
                      className="w-full bg-[#0B0F0C] border border-neutral-700 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all text-sm"
                      style={{ color: "#ffffff", caretColor: "#00FF66" }}
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-sm sm:text-base py-4 rounded-xl shadow-lg shadow-[#00FF66]/20 hover:shadow-[#00FF66]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Processant la subscripció...</span>
                    </div>
                  ) : (
                    <>
                      <span>Vull subscriure'm de franc</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-neutral-300 text-xs pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
                  <span style={{ color: "#d1d5db" }}>
                    100% lliure d'Spam. Et pots donar de baixa amb un clic quan vulguis.
                  </span>
                </div>
              </form>
            </div>

            {/* Crucial Educational Section: The Welcome Email & Moving to Principal */}
            <div className="bg-[#141815] border border-neutral-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00FF66]/15 border border-[#00FF66]/40 flex items-center justify-center text-[#00FF66] shrink-0">
                  <Inbox className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-[#00FF66] tracking-wider mb-1">
                    Molt important abans de subscriure't
                  </div>
                  <h2
                    className="text-xl sm:text-2xl font-extrabold text-white tracking-tight"
                    style={{ color: "#ffffff" }}
                  >
                    Com assegurar-te de rebre el correu a la safata «Principal»
                  </h2>
                  <p
                    className="text-xs sm:text-sm text-neutral-200 mt-1 leading-relaxed"
                    style={{ color: "#e5e7eb" }}
                  >
                    Quan et subscrius a una newsletter, proveïdors com Google Gmail sovint la desvien
                    automàticament a la pestanya de{" "}
                    <span className="text-amber-300 font-bold">«Promocions»</span> o fins i tot a{" "}
                    <span className="text-neutral-200 font-bold">«Spam»</span> si no hi ha interacció prèvia.
                  </p>
                </div>
              </div>

              {/* Highlight callout box requested by user */}
              <div className="bg-[#1a211b] border-2 border-[#00FF66] p-4 sm:p-5 rounded-2xl space-y-2.5 shadow-lg">
                <p
                  className="text-base sm:text-lg font-extrabold text-white"
                  style={{ color: "#ffffff" }}
                >
                  💡 L'única solució 100% efectiva i definitiva:
                </p>
                <p
                  className="text-sm sm:text-base text-white leading-relaxed"
                  style={{ color: "#ffffff" }}
                >
                  En el primer correu de benvinguda que rebràs de seguida, sol·licita explícitament moure el correu a la
                  pestanya <strong className="text-[#00FF66] font-extrabold">«Principal»</strong> (o marcar-lo com a remitent segur). D'aquesta manera, Gmail aprèn que el contingut t'interessa i mai més te'l perdràs.
                </p>
              </div>

              {/* Tabs: Mobile vs Desktop Guide */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-neutral-700 pb-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("mobile")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === "mobile"
                        ? "bg-[#00FF66] text-black shadow-lg shadow-[#00FF66]/20"
                        : "bg-neutral-900 text-white border border-neutral-700 hover:border-neutral-500"
                    }`}
                    style={activeTab !== "mobile" ? { color: "#ffffff" } : {}}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Si ets al mòbil (Gmail App)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("desktop")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === "desktop"
                        ? "bg-[#00FF66] text-black shadow-lg shadow-[#00FF66]/20"
                        : "bg-neutral-900 text-white border border-neutral-700 hover:border-neutral-500"
                    }`}
                    style={activeTab !== "desktop" ? { color: "#ffffff" } : {}}
                  >
                    <Laptop className="w-4 h-4" />
                    <span>Si ets a l'ordinador (Web)</span>
                  </button>
                </div>

                {activeTab === "mobile" ? (
                  /* Mobile Step-by-step with visual representation */
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-[#1c221e] border border-neutral-700 p-4 sm:p-5 rounded-2xl space-y-2 shadow-md">
                      <div className="w-8 h-8 rounded-full bg-[#00FF66]/20 text-[#00FF66] font-black text-sm flex items-center justify-center">
                        1
                      </div>
                      <div
                        className="text-sm font-bold text-white"
                        style={{ color: "#ffffff" }}
                      >
                        Obre el correu de benvinguda
                      </div>
                      <p
                        className="text-xs text-neutral-200 leading-relaxed"
                        style={{ color: "#e5e7eb" }}
                      >
                        Entra a la teva app de Gmail o Correu. Si no el veus a la bústia principal, mira a la carpeta <span className="text-amber-300 font-bold">Promocions</span>.
                      </p>
                    </div>

                    <div className="bg-[#1c221e] border-2 border-[#00FF66]/60 p-4 sm:p-5 rounded-2xl space-y-2 relative shadow-lg">
                      <div className="w-8 h-8 rounded-full bg-[#00FF66] text-black font-black text-sm flex items-center justify-center">
                        2
                      </div>
                      <div
                        className="text-sm font-bold text-white flex items-center gap-1.5"
                        style={{ color: "#ffffff" }}
                      >
                        <span>Prem els botons de dalt</span>
                        <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-neutral-900 text-[#00FF66] border border-neutral-700">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <p
                        className="text-xs text-neutral-200 leading-relaxed"
                        style={{ color: "#e5e7eb" }}
                      >
                        A la part superior dreta del correu, toca la icona dels <strong className="text-white" style={{ color: "#ffffff" }}>tres punts (⋮)</strong> o el menú d'opcions.
                      </p>
                    </div>

                    <div className="bg-[#1c221e] border border-neutral-700 p-4 sm:p-5 rounded-2xl space-y-2 shadow-md">
                      <div className="w-8 h-8 rounded-full bg-[#00FF66]/20 text-[#00FF66] font-black text-sm flex items-center justify-center">
                        3
                      </div>
                      <div
                        className="text-sm font-bold text-white"
                        style={{ color: "#ffffff" }}
                      >
                        Tria «Moure a Principal»
                      </div>
                      <p
                        className="text-xs text-neutral-200 leading-relaxed"
                        style={{ color: "#e5e7eb" }}
                      >
                        Selecciona l'opció <span className="text-[#00FF66] font-bold">«Moure a» ➔ «Principal»</span>. Fent-ho aquest sol cop, ja quedarà configurat per sempre.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Desktop Step-by-step */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-[#1c221e] border border-neutral-700 p-4 sm:p-5 rounded-2xl space-y-2 shadow-md">
                      <div className="w-8 h-8 rounded-full bg-[#00FF66]/20 text-[#00FF66] font-black text-sm flex items-center justify-center">
                        A
                      </div>
                      <div
                        className="text-sm font-bold text-white"
                        style={{ color: "#ffffff" }}
                      >
                        Arrossega a la pestanya Principal
                      </div>
                      <p
                        className="text-xs text-neutral-200 leading-relaxed"
                        style={{ color: "#e5e7eb" }}
                      >
                        A la llista de missatges de la pestanya <span className="text-amber-300 font-bold">Promocions</span>, fes clic i arrossega el correu de Pol Barrot fins a la pestanya <span className="text-[#00FF66] font-bold">«Principal»</span>.
                      </p>
                    </div>

                    <div className="bg-[#1c221e] border border-neutral-700 p-4 sm:p-5 rounded-2xl space-y-2 shadow-md">
                      <div className="w-8 h-8 rounded-full bg-[#00FF66]/20 text-[#00FF66] font-black text-sm flex items-center justify-center">
                        B
                      </div>
                      <div
                        className="text-sm font-bold text-white"
                        style={{ color: "#ffffff" }}
                      >
                        Confirma l'acció permanent
                      </div>
                      <p
                        className="text-xs text-neutral-200 leading-relaxed"
                        style={{ color: "#e5e7eb" }}
                      >
                        Quan Gmail et pregunti a baix a l'esquerra: <em className="text-white font-medium" style={{ color: "#ffffff" }}>«Vols fer-ho per a tots els missatges futurs?»</em>, fes clic a <strong className="text-[#00FF66] font-bold">«Sí»</strong>.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Value Proposition bullets */}
            <div className="border border-neutral-700 rounded-3xl p-6 sm:p-8 bg-[#141815] space-y-4">
              <h3
                className="text-xs font-bold tracking-wider text-[#00FF66] uppercase"
              >
                Què trobaràs al newsletter de Pol Barrot?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white" style={{ color: "#ffffff" }}>
                    Criteri clínic basat en estudis recents, sense modes ni mites alimentaris.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white" style={{ color: "#ffffff" }}>
                    Protocol i hàbits de ritmes circadians: sol, son, descans i menjars.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white" style={{ color: "#ffffff" }}>
                    Casos reals de consulta: digestió, pèrdua de greix, inflamació i energia.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white" style={{ color: "#ffffff" }}>
                    Respostes directes a preguntes habituals de la comunitat.
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* State 2: Success Confirmation with Guided Instructions */
          <div className="space-y-8 animate-fadeIn">
            {/* Success Hero Badge */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#00FF66]/20 border-2 border-[#00FF66] flex items-center justify-center text-[#00FF66] mx-auto shadow-xl shadow-[#00FF66]/20 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF66]/10 text-[#00FF66] text-xs font-black uppercase tracking-wider">
                Subscripció Confirmada
              </div>

              <h1
                className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                style={{ color: "#ffffff" }}
              >
                Revisa el teu correu ara mateix! ✉️
              </h1>

              <p
                className="text-white text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
                style={{ color: "#ffffff" }}
              >
                Hem enviat el correu de benvinguda a <strong className="text-[#00FF66]">{submittedEmail}</strong>.
                Per assegurar-te que no et perds cap edició, segueix aquests senzills passos:
              </p>
            </div>

            {/* Checklist Guide Card */}
            <div className="bg-[#141815] border-2 border-[#00FF66]/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00FF66] uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Instruccions immediates per no perdre't res</span>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#1c221e] border border-neutral-700">
                  <div className="w-8 h-8 rounded-full bg-[#00FF66] text-black font-black text-sm flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4
                      className="text-sm font-bold text-white"
                      style={{ color: "#ffffff" }}
                    >
                      Obre la teva safata d'entrada (Gmail / Mail)
                    </h4>
                    <p
                      className="text-xs text-neutral-200 mt-1 leading-relaxed"
                      style={{ color: "#e5e7eb" }}
                    >
                      Busca el correu amb el remitent <strong className="text-white">Pol Barrot (NutriBaen)</strong>. Si no el trobes a la safata d'entrada, revisa la carpeta <span className="text-amber-300 font-bold">«Promocions»</span> o <span className="text-neutral-200 font-bold">«Spam»</span>.
                    </p>
                  </div>
                </div>

                {/* Step 2 (Mobile specific) */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#1c221e] border-2 border-[#00FF66]">
                  <div className="w-8 h-8 rounded-full bg-[#00FF66] text-black font-black text-sm flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4
                      className="text-sm font-bold text-white"
                      style={{ color: "#ffffff" }}
                    >
                      📱 Al mòbil: Prem els botons de dalt (tres punts ⋮)
                    </h4>
                    <p
                      className="text-xs text-neutral-200 mt-1 leading-relaxed"
                      style={{ color: "#e5e7eb" }}
                    >
                      Dins del correu obert, a la part superior dreta de la pantalla, prem la icona dels <strong className="text-white">tres punts (⋮)</strong> i selecciona <strong className="text-[#00FF66]">«Moure a» ➔ «Principal»</strong>.
                    </p>
                    <p
                      className="text-xs text-[#00FF66] font-semibold mt-1"
                    >
                      *Aquesta és l'única solució 100% definitiva perquè Gmail classifiqui sempre els nous consells a la safata principal.
                    </p>
                  </div>
                </div>

                {/* Step 3 (Desktop drag) */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#1c221e] border border-neutral-700">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 text-[#00FF66] border border-[#00FF66]/50 font-black text-sm flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4
                      className="text-sm font-bold text-white"
                      style={{ color: "#ffffff" }}
                    >
                      💻 A l'ordinador: Arrossega a la pestanya «Principal»
                    </h4>
                    <p
                      className="text-xs text-neutral-200 mt-1 leading-relaxed"
                      style={{ color: "#e5e7eb" }}
                    >
                      Simplement arrossega el correu de Promocions a Principal i confirma amb «Sí» quan pregunti si vols fer-ho per a tots els enviaments futurs.
                    </p>
                  </div>
                </div>

                {/* Step 4 (Safe Sender) */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#1c221e] border border-neutral-700">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 text-[#00FF66] border border-[#00FF66]/50 font-black text-sm flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <h4
                      className="text-sm font-bold text-white"
                      style={{ color: "#ffffff" }}
                    >
                      Afegeix l'adreça als teus contactes
                    </h4>
                    <p
                      className="text-xs text-neutral-200 mt-1 leading-relaxed"
                      style={{ color: "#e5e7eb" }}
                    >
                      Desa <span className="text-[#00FF66] font-mono font-bold">info@polbarrotdietista.com</span> a la teva llibreta d'adreces com a contacte de confiança.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://mail.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-[#00FF66]/20 transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Obrir la safata de Gmail</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {onBackToHome && (
                  <button
                    onClick={onBackToHome}
                    className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs sm:text-sm py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    style={{ color: "#ffffff" }}
                  >
                    <span>Explorar la web de Pol Barrot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Discreet bottom footer */}
      <footer className="border-t border-neutral-800 py-8 px-5 text-center text-xs text-neutral-400 relative z-10">
        <p className="max-w-md mx-auto leading-relaxed" style={{ color: "#9ca3af" }}>
          Pol Barrot Enjuanes · Dietista · NutriBaen
        </p>
        <p className="text-[11px] text-neutral-500 mt-1" style={{ color: "#6b7280" }}>
          Drets reservats © {new Date().getFullYear()} · polbarrotdietista.com
        </p>
      </footer>
    </div>
  );
}
