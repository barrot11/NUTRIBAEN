import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { subscribeToNewsletter } from "../services/newsletterService";

interface NewsletterSectionProps {
  onOpenAdmin?: () => void;
}

export default function NewsletterSection({ onOpenAdmin }: NewsletterSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !email.includes("@")) {
      setErrorMessage("Si us plau, introdueix un correu electrònic vàlid.");
      return;
    }

    setIsSubmitting(true);
    try {
      await subscribeToNewsletter(email, name);
      setIsSuccess(true);
      setName("");
      setEmail("");
    } catch (err: any) {
      setErrorMessage(err.message || "Hi ha hagut un error en processar la subscripció.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="relative py-20 bg-black text-white overflow-hidden border-t border-neutral-800"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#00FF66]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Main Box - Dark Background matching page */}
        <div className="bg-[#121212] border border-neutral-800 hover:border-neutral-700/80 rounded-3xl p-8 sm:p-12 md:p-14 shadow-2xl relative overflow-hidden transition-all">
          {/* Subtle top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-black uppercase tracking-wider mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Divulgació Clínica Directa</span>
              </div>

              <h2 
                className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight mb-4 leading-tight text-[#ffffff]"
                style={{ color: '#ffffff' }}
              >
                El Newsletter de <span className="text-[#00FF66]">NutriBaen</span>
              </h2>

              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-6">
                Reflexions clíniques directes de consulta, sincronització de ritmes circadians, salut digestiva profunda i nutrició esportiva real sense filtres, directament al teu correu.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-neutral-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#00FF66]/15 border border-[#00FF66]/40 flex items-center justify-center text-[#00FF66] font-bold shrink-0 text-xs">
                    ✓
                  </div>
                  <span className="text-[#ffffff]">100% aplicable, científic i lliure de modes passatgeres.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#00FF66]/15 border border-[#00FF66]/40 flex items-center justify-center text-[#00FF66] font-bold shrink-0 text-xs">
                    ✓
                  </div>
                  <span className="text-[#ffffff]">Consells d'en Pol Barrot per mantenir la teva vitalitat alta.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#00FF66]/15 border border-[#00FF66]/40 flex items-center justify-center text-[#00FF66] font-bold shrink-0 text-xs">
                    ✓
                  </div>
                  <span className="text-[#ffffff]">Sense spam. Pots cancel·lar la teva subscripció amb un sol clic.</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Form Box */}
            <div className="lg:col-span-5 bg-[#181818] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              {isSuccess ? (
                <div className="text-center py-6 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-[#00FF66]/20 border border-[#00FF66]/40 flex items-center justify-center text-[#00FF66] mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#ffffff] mb-2" style={{ color: '#ffffff' }}>Benvingut/da a la comunitat!</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                    T'has subscrit correctament. Rebràs les properes edicions clíniques directament a la teva bústia.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs text-[#00FF66] underline hover:text-[#39FF14] font-semibold"
                  >
                    Subscriure un altre correu
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-left">
                    <label className="block text-xs font-bold text-[#00FF66] uppercase tracking-wider mb-1.5">
                      El teu Nom (Opcional)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Laura, Marc..."
                      className="w-full px-4 py-3 bg-[#0d0e10] border border-neutral-800 rounded-xl text-[#ffffff] !text-[#ffffff] placeholder-neutral-500 text-sm focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-colors"
                      style={{ color: '#ffffff', caretColor: '#00FF66' }}
                    />
                  </div>

                  <div className="text-left">
                    <label className="block text-xs font-bold text-[#00FF66] uppercase tracking-wider mb-1.5">
                      El teu Correu Electrònic *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@exemple.cat"
                      className="w-full px-4 py-3 bg-[#0d0e10] border border-neutral-800 rounded-xl text-[#ffffff] !text-[#ffffff] placeholder-neutral-500 text-sm focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-colors"
                      style={{ color: '#ffffff', caretColor: '#00FF66' }}
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,102,0.25)] hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Processant subscripció...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 stroke-[2.5]" />
                        <span>Subscriure'm al Newsletter</span>
                        <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 pt-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#00FF66]" />
                    <span>Dades protegides. Respectem la teva privacitat al 100%.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Pol's Administrative Access Footer Link */}
        <div className="mt-4 text-right">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-[11px] text-neutral-600 hover:text-[#00FF66] transition-colors font-mono"
            >
              🔒 Accés Redactor Pol Barrot
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
