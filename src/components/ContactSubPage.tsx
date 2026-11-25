import React, { useState, FormEvent } from "react";
import {
  Send,
  Loader2,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  MapPin,
  Instagram,
  ArrowRight,
  Clock,
  MessageSquare
} from "lucide-react";

function Tiktok({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

interface ContactSubPageProps {
  onBackToHome?: () => void;
}

export default function ContactSubPage({ onBackToHome }: ContactSubPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "El nom és obligatori.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "El correu electrònic és obligatori.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = "El correu electrònic no és vàlid.";
    }

    const phoneRegex = /^[0-9\s+-]{9,15}$/;
    if (!formData.phone.trim()) {
      errs.phone = "El telèfon és obligatori.";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      errs.phone = "El número de telèfon no és vàlid.";
    }

    if (!formData.message.trim()) errs.message = "El missatge no pot estar buit.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ type: "contact", ...formData })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const errData = await response.json();
        setErrors({ submit: errData.error || "No s'ha pogut enviar el missatge." });
      }
    } catch (err) {
      console.error(err);
      setErrors({
        submit: "S'ha produït un error de connexió. Si us plau, torna-ho a intentar."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F0C] text-white font-sans selection:bg-[#00FF66] selection:text-black relative overflow-x-hidden">
      {/* Subtle ambient background glows matching NewsletterSubPage */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#00FF66]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-5%] w-[400px] h-[400px] bg-[#00FF66]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Clean Top Brand Bar */}
      <header className="border-b border-neutral-800/80 bg-[#0B0F0C]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00FF66] to-emerald-400 p-[1.5px] shadow-lg shadow-[#00FF66]/20">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <span className="text-[#00FF66] font-black text-xs tracking-tighter">PB</span>
              </div>
            </div>
            <div>
              <span
                className="font-bold text-white text-sm tracking-tight block whitespace-nowrap"
                style={{ color: "#ffffff" }}
              >
                Pol Barrot
              </span>
              <span className="text-[11px] text-[#00FF66] font-medium tracking-wide block uppercase whitespace-nowrap">
                Dietista
              </span>
            </div>
          </div>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="text-xs text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 py-2 px-4 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer whitespace-nowrap shrink-0"
              style={{ color: "#e5e7eb" }}
            >
              <span>Web oficial</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-5 py-10 sm:py-16 relative z-10">
        {!isSuccess ? (
          <div className="space-y-10">
            {/* Header Title */}
            <div className="text-center space-y-4">
              <h1
                className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance"
                style={{ color: "#ffffff" }}
              >
                Contacta amb mi
              </h1>

              <p
                className="text-neutral-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
                style={{ color: "#e5e7eb" }}
              >
                Tens dubtes sobre els protocols, tarifes o vols començar el teu procés? Deixa'm el teu missatge i et respondré personalment en menys de 24 hores laborables.
              </p>
            </div>

            {/* Main Contact Card */}
            <div className="bg-[#141815] border border-neutral-700/80 hover:border-[#00FF66]/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent" />

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="ig-contact-name"
                      className="block text-xs font-bold text-white tracking-wide"
                      style={{ color: "#ffffff" }}
                    >
                      El teu nom <span className="text-[#00FF66]">*</span>
                    </label>
                    <input
                      id="ig-contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      placeholder="Nom i cognoms"
                      className={`w-full bg-[#0B0F0C] border rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-all text-sm ${
                        errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-neutral-700 focus:border-[#00FF66] focus:ring-[#00FF66]"
                      }`}
                      style={{ color: "#ffffff", caretColor: "#00FF66" }}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 pt-0.5">
                        <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="ig-contact-email"
                      className="block text-xs font-bold text-white tracking-wide"
                      style={{ color: "#ffffff" }}
                    >
                      Correu electrònic <span className="text-[#00FF66]">*</span>
                    </label>
                    <input
                      id="ig-contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      placeholder="el.teu.correu@gmail.com"
                      className={`w-full bg-[#0B0F0C] border rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-all text-sm ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-neutral-700 focus:border-[#00FF66] focus:ring-[#00FF66]"
                      }`}
                      style={{ color: "#ffffff", caretColor: "#00FF66" }}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 pt-0.5">
                        <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="ig-contact-phone"
                      className="block text-xs font-bold text-white tracking-wide"
                      style={{ color: "#ffffff" }}
                    >
                      Número de telèfon <span className="text-[#00FF66]">*</span>
                    </label>
                    <input
                      id="ig-contact-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      placeholder="600 000 000"
                      className={`w-full bg-[#0B0F0C] border rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-all text-sm tabular-nums ${
                        errors.phone
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-neutral-700 focus:border-[#00FF66] focus:ring-[#00FF66]"
                      }`}
                      style={{ color: "#ffffff", caretColor: "#00FF66" }}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 pt-0.5">
                        <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label
                      htmlFor="ig-contact-subject"
                      className="block text-xs font-bold text-white tracking-wide"
                      style={{ color: "#ffffff" }}
                    >
                      Motiu o servei d'interès (opcional)
                    </label>
                    <input
                      id="ig-contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Ex: Protocol Semestral, tarifes, dubte..."
                      className="w-full bg-[#0B0F0C] border border-neutral-700 rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all text-sm"
                      style={{ color: "#ffffff", caretColor: "#00FF66" }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="ig-contact-message"
                    className="block text-xs font-bold text-white tracking-wide"
                    style={{ color: "#ffffff" }}
                  >
                    El teu missatge <span className="text-[#00FF66]">*</span>
                  </label>
                  <textarea
                    id="ig-contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                    placeholder="Explica'm breument quin és el teu objectiu o en què et puc ajudar..."
                    className={`w-full bg-[#0B0F0C] border rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-all text-sm resize-none ${
                      errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-neutral-700 focus:border-[#00FF66] focus:ring-[#00FF66]"
                    }`}
                    style={{ color: "#ffffff", caretColor: "#00FF66" }}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 pt-0.5">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {errors.submit && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errors.submit}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-sm sm:text-base py-4 px-6 rounded-xl shadow-lg shadow-[#00FF66]/20 hover:shadow-[#00FF66]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enviant missatge...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar missatge</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-neutral-300 text-xs pt-1">
                  <Clock className="w-4 h-4 text-[#00FF66] shrink-0" />
                  <span style={{ color: "#d1d5db" }}>
                    Resposta directa i personalitzada en menys de 24 h laborables.
                  </span>
                </div>
              </form>
            </div>

            {/* Secondary Info Row: Location & Socials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-5 bg-[#141815] border border-neutral-800 rounded-2xl text-left">
                <div className="p-2.5 bg-[#00FF66]/10 border border-[#00FF66]/30 rounded-xl text-[#00FF66] shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-bold block">
                    Consulta presencial i online
                  </span>
                  <address
                    className="font-semibold text-sm text-white not-italic mt-1 leading-relaxed"
                    style={{ color: "#ffffff" }}
                  >
                    Carrer d'Agustí Duran i Santpere, 9<br />
                    25001 Lleida
                  </address>
                </div>
              </div>

              <div className="flex flex-col justify-between p-5 bg-[#141815] border border-neutral-800 rounded-2xl text-left gap-3">
                <div>
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-bold block">
                    Segueix-me a xarxes
                  </span>
                  <p className="text-xs text-neutral-300 mt-1" style={{ color: "#d1d5db" }}>
                    Contingut diari sobre nutrició i hàbits reals.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/nutribaen?igsh=NGpqZHByZ2RhYW1p"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#0B0F0C] border border-neutral-700 text-neutral-300 hover:text-[#00FF66] hover:border-[#00FF66]/50 rounded-xl transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@nutribaen?_r=1&_t=ZN-97ZPWkajLPS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#0B0F0C] border border-neutral-700 text-neutral-300 hover:text-[#00FF66] hover:border-[#00FF66]/50 rounded-xl transition-colors"
                    title="TikTok"
                  >
                    <Tiktok className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="bg-[#141815] border border-[#00FF66]/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#00FF66]/15 border border-[#00FF66]/40 flex items-center justify-center text-[#00FF66] mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                style={{ color: "#ffffff" }}
              >
                Missatge enviat amb èxit
              </h2>
              <p
                className="text-sm sm:text-base text-neutral-200 max-w-md mx-auto leading-relaxed"
                style={{ color: "#e5e7eb" }}
              >
                Gràcies per posar-te en contacte. En Pol Barrot llegirà personalment la teva consulta i et respondrà al telèfon o correu indicat al més aviat possible.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-[#00FF66]/20 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enviar un altre missatge</span>
              </button>

              {onBackToHome && (
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  style={{ color: "#ffffff" }}
                >
                  <span>Explorar la web oficial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
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
