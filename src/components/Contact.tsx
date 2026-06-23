import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, Instagram, Linkedin, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Floating label helpers
  const [activeFields, setActiveFields] = useState<Record<string, boolean>>({});
  const handleFocus = (field: string) => setActiveFields(prev => ({ ...prev, [field]: true }));
  const handleBlur = (field: string, value: string) => {
    if (!value) {
      setActiveFields(prev => ({ ...prev, [field]: false }));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "El nom és obligatori.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "El correu és obligatori.";
    } else if (!emailRegex.test(formData.email)) {
      errs.email = "Correu electrònic no vàlid.";
    }

    if (!formData.message.trim()) errs.message = "El missatge no pot estar buit.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate sending message
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setActiveFields({});
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacte" className="py-20 md:py-28 bg-neutral-warm-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16" id="contact-header">
          <span className="font-sans font-bold text-xs text-brand-600 uppercase tracking-widest">
            Comencem avui
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-warm-900 leading-tight mt-3 mb-4">
            Contacta amb en Pol Barrot
          </h2>
          <p className="font-sans text-sm text-neutral-warm-500 font-light">
            Tens un cas complex, dubtes sobre el tractament o necessites rebre assessorament personalitzat abans de reservar? Deixa'm les teves dades i et respondré en menys de 24 hores laborables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Side: Contact Information Cards & Map */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6" id="contact-info-block">
            <div className="space-y-6 text-left">
              <h3 className="font-sans font-bold text-lg text-neutral-warm-900">
                Informació de contacte
              </h3>
              
              {/* Cards Grid */}
              <div className="grid grid-cols-1 gap-4">
                {/* Phone Card */}
                <div className="flex items-center gap-4 p-4.5 bg-white border border-neutral-warm-200/50 rounded-2xl">
                  <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-sans text-[10px] text-neutral-warm-400 uppercase tracking-wider block">
                      Truca'm directament
                    </span>
                    <a href="tel:+34973000000" className="font-sans font-bold text-sm text-neutral-warm-800 hover:text-brand-600 mt-0.5 block">
                      973 00 00 00
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex items-center gap-4 p-4.5 bg-white border border-neutral-warm-200/50 rounded-2xl">
                  <div className="p-3 bg-brand-50 rounded-xl text-brand-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-sans text-[10px] text-neutral-warm-400 uppercase tracking-wider block">
                      Correu electrònic
                    </span>
                    <a href="mailto:pol@barrotnutricio.com" className="font-sans font-bold text-sm text-neutral-warm-800 hover:text-brand-600 mt-0.5 block">
                      pol@barrotnutricio.com
                    </a>
                  </div>
                </div>

                {/* Address Card */}
                <div className="flex items-start gap-4 p-4.5 bg-white border border-neutral-warm-200/50 rounded-2xl">
                  <div className="p-3 bg-brand-50 rounded-xl text-brand-600 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-sans text-[10px] text-neutral-warm-400 uppercase tracking-wider block">
                      Consulta presencial
                    </span>
                    <address className="font-sans font-bold text-sm text-neutral-warm-800 not-italic mt-0.5 block leading-normal">
                      Carrer Major, 15, Principal, 25007 Lleida
                      <span className="font-light text-xs text-neutral-warm-400 block mt-1">
                        Davant del Palau de la Paeria (Centre històric)
                      </span>
                    </address>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 flex gap-4">
                <a
                  href="https://instagram.com/polbarrot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white border border-neutral-warm-200 text-neutral-warm-600 hover:text-brand-600 hover:border-brand-200 rounded-xl shadow-sm transition-all flex items-center justify-center"
                >
                  <Instagram className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://linkedin.com/in/polbarrot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white border border-neutral-warm-200 text-neutral-warm-600 hover:text-brand-600 hover:border-brand-200 rounded-xl shadow-sm transition-all flex items-center justify-center"
                >
                  <Linkedin className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>

            {/* Interactive Map Block */}
            <div className="rounded-2xl overflow-hidden border border-neutral-warm-200/60 shadow-inner h-56 md:h-64 mt-6">
              <iframe
                title="Google Maps - Consulta Pol Barrot"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2989.4442654316715!2d0.6231940763959146!3d41.613697971228515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a723afaa5718df%3A0xc3f619e09d57a2df!2sCarrer%20Major%2C%20Lleida!5e0!3m2!1sca!2ses!4v1711200000000!5m2!1sca!2ses"
                className="w-full h-full border-none opacity-85 hover:opacity-100 transition-opacity"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Side: Message Form */}
          <div className="lg:col-span-7 bg-white border border-neutral-warm-200/50 rounded-3xl p-6 md:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex flex-col justify-center relative min-h-[450px]">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  <h3 className="font-sans font-bold text-lg text-neutral-warm-900 text-left">
                    Envia un missatge directe
                  </h3>
                  
                  <form onSubmit={handleSendMessage} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Floating Label Name */}
                      <div className="relative">
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          required
                          value={formData.name}
                          onFocus={() => handleFocus("name")}
                          onBlur={(e) => handleBlur("name", e.target.value)}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: "" });
                          }}
                          className={`w-full px-4 pt-6 pb-2 border rounded-xl font-sans text-sm outline-none transition-all ${
                            errors.name
                              ? "border-red-400 bg-red-50/10 focus:border-red-500"
                              : formData.name || activeFields.name
                              ? "border-brand-500 bg-white"
                              : "border-neutral-warm-200 focus:border-brand-500"
                          }`}
                        />
                        <label
                          htmlFor="contact-name"
                          className={`absolute left-4 font-sans text-xs transition-all duration-200 pointer-events-none ${
                            formData.name || activeFields.name
                              ? "top-1.5 text-brand-600 scale-90 origin-top-left"
                              : "top-4 text-neutral-warm-400 text-sm"
                          }`}
                        >
                          El teu nom *
                        </label>
                        {errors.name && (
                          <span className="text-[10px] text-red-500 flex items-center gap-1 mt-1">
                            <ShieldAlert className="h-3 w-3 shrink-0" />
                            {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Floating Label Email */}
                      <div className="relative">
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          required
                          value={formData.email}
                          onFocus={() => handleFocus("email")}
                          onBlur={(e) => handleBlur("email", e.target.value)}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          className={`w-full px-4 pt-6 pb-2 border rounded-xl font-sans text-sm outline-none transition-all ${
                            errors.email
                              ? "border-red-400 bg-red-50/10 focus:border-red-500"
                              : formData.email || activeFields.email
                              ? "border-brand-500 bg-white"
                              : "border-neutral-warm-200 focus:border-brand-500"
                          }`}
                        />
                        <label
                          htmlFor="contact-email"
                          className={`absolute left-4 font-sans text-xs transition-all duration-200 pointer-events-none ${
                            formData.email || activeFields.email
                              ? "top-1.5 text-brand-600 scale-90 origin-top-left"
                              : "top-4 text-neutral-warm-400 text-sm"
                          }`}
                        >
                          Correu electrònic *
                        </label>
                        {errors.email && (
                          <span className="text-[10px] text-red-500 flex items-center gap-1 mt-1">
                            <ShieldAlert className="h-3 w-3 shrink-0" />
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Floating Label Subject */}
                    <div className="relative">
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onFocus={() => handleFocus("subject")}
                        onBlur={(e) => handleBlur("subject", e.target.value)}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={`w-full px-4 pt-6 pb-2 border rounded-xl font-sans text-sm outline-none transition-all ${
                          formData.subject || activeFields.subject
                            ? "border-brand-500 bg-white"
                            : "border-neutral-warm-200 focus:border-brand-500"
                        }`}
                      />
                      <label
                        htmlFor="contact-subject"
                        className={`absolute left-4 font-sans text-xs transition-all duration-200 pointer-events-none ${
                          formData.subject || activeFields.subject
                            ? "top-1.5 text-brand-600 scale-90 origin-top-left"
                            : "top-4 text-neutral-warm-400 text-sm"
                        }`}
                      >
                        Motiu del missatge (opcional)
                      </label>
                    </div>

                    {/* Floating Label Message */}
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onFocus={() => handleFocus("message")}
                        onBlur={(e) => handleBlur("message", e.target.value)}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: "" });
                        }}
                        className={`w-full px-4 pt-6 pb-2 border rounded-xl font-sans text-sm outline-none transition-all resize-none ${
                          errors.message
                            ? "border-red-400 bg-red-50/10 focus:border-red-500"
                            : formData.message || activeFields.message
                            ? "border-brand-500 bg-white"
                            : "border-neutral-warm-200 focus:border-brand-500"
                        }`}
                      />
                      <label
                        htmlFor="contact-message"
                        className={`absolute left-4 font-sans text-xs transition-all duration-200 pointer-events-none ${
                          formData.message || activeFields.message
                            ? "top-1.5 text-brand-600 scale-90 origin-top-left"
                            : "top-4 text-neutral-warm-400 text-sm"
                        }`}
                      >
                        El teu missatge... *
                      </label>
                      {errors.message && (
                        <span className="text-[10px] text-red-500 flex items-center gap-1 mt-1">
                          <ShieldAlert className="h-3 w-3 shrink-0" />
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Button */}
                    <div className="flex justify-end pt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-sans font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 disabled:bg-neutral-warm-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                        id="contact-submit-btn"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Enviant missatge...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Enviar missatge
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center p-6"
                  id="contact-success-block"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
                    <CheckCircle2 className="h-9 w-9 stroke-[2]" />
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-neutral-warm-900 leading-tight">
                    Missatge enviat amb èxit!
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-neutral-warm-500 mt-2 font-light max-w-sm leading-relaxed">
                    Gràcies per posar-te en contacte. En Pol Barrot llegirà personalment el teu missatge i et respondrà al correu indicat al més aviat possible.
                  </p>
                  
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 px-6 py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-sans font-semibold text-xs rounded-xl transition-all"
                  >
                    Envia un altre missatge
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
