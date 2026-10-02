import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  Users,
  PenTool,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Plus,
  Trash2,
  Mail,
  Lock,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import {
  fetchAllSubscribers,
  broadcastNewsletter,
  fetchPastNewsletters,
  removeSubscriber,
  addManualSubscriber,
  Subscriber,
  NewsletterRecord,
} from "../services/newsletterService";

interface NewsletterAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterAdminModal({ isOpen, onClose }: NewsletterAdminModalProps) {
  // Authentication gate
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  // Active Tab: 'compose' | 'subscribers' | 'history'
  const [tab, setTab] = useState<"compose" | "subscribers" | "history">("compose");

  // Subscribers
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoadingSubscribers, setIsLoadingSubscribers] = useState(false);
  const [newSubEmail, setNewSubEmail] = useState("");
  const [newSubName, setNewSubName] = useState("");

  // Compose State
  const [subject, setSubject] = useState("");
  const [preheader, setPreheader] = useState("");
  const [content, setContent] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  // Sending State
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState("");
  const [sendErrorMessage, setSendErrorMessage] = useState("");

  // History State
  const [history, setHistory] = useState<NewsletterRecord[]>([]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  const loadData = async () => {
    setIsLoadingSubscribers(true);
    try {
      const [subs, pastNews] = await Promise.all([
        fetchAllSubscribers(),
        fetchPastNewsletters(),
      ]);
      setSubscribers(subs);
      setHistory(pastNews);
    } catch (e) {
      console.error("Error loading newsletter data:", e);
    } finally {
      setIsLoadingSubscribers(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pin.trim();
    const strippedPin = cleanPin.replace(/^\*+|\*+$/g, "");
    
    if (
      cleanPin === "MamaPapa2-0-0-3**" ||
      cleanPin === "MamaPapa2-0-0-3*" ||
      cleanPin === "MamaPapa2-0-0-3" ||
      cleanPin === "*MamaPapa2-0-0-3*" ||
      cleanPin === "*MamaPapa2-0-0-3**" ||
      strippedPin === "MamaPapa2-0-0-3" ||
      strippedPin.toLowerCase() === "mamapapa2-0-0-3" ||
      cleanPin.toLowerCase() === "mamapapa2-0-0-3**" ||
      cleanPin.toLowerCase() === "nutribaen" ||
      cleanPin === "polbaen"
    ) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubEmail || !newSubEmail.includes("@")) return;

    try {
      await addManualSubscriber(newSubEmail, newSubName);
      setNewSubEmail("");
      setNewSubName("");
      loadData();
    } catch (err: any) {
      alert("Error afegint subscriptor: " + err.message);
    }
  };

  const handleDeleteSubscriber = async (id: string, email: string) => {
    if (!window.confirm(`Eliminar ${email} de la llista de subscriptors?`)) return;
    try {
      await removeSubscriber(id);
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      alert("Error eliminant: " + err.message);
    }
  };

  const handleSendBroadcast = async (isTestOnly = false) => {
    setSendSuccessMessage("");
    setSendErrorMessage("");

    if (!subject.trim()) {
      setSendErrorMessage("Si us plau, escriu un assumpte per al newsletter.");
      return;
    }
    if (!content.trim()) {
      setSendErrorMessage("El contingut del newsletter està buit.");
      return;
    }

    const activeRecipients = subscribers.filter((s) => s.active).map((s) => s.email);

    const targetRecipients = isTestOnly
      ? ["Ferranbaren@gmail.com", "polbaen@gmail.com"]
      : activeRecipients;

    if (!targetRecipients.length) {
      setSendErrorMessage("No hi ha cap destinatari actiu a la llista.");
      return;
    }

    if (
      !isTestOnly &&
      !window.confirm(
        `Atenció: Aquest newsletter s'enviarà a TOTS els ${targetRecipients.length} subscriptors actius. Vols continuar?`
      )
    ) {
      return;
    }

    setIsSending(true);
    try {
      const result = await broadcastNewsletter(
        subject,
        content,
        targetRecipients,
        preheader
      );

      setSendSuccessMessage(
        isTestOnly
          ? `Prova enviada amb èxit al teu correu de prova!`
          : `Newsletter transmès amb èxit a ${result.sentCount} subscriptors!`
      );

      if (!isTestOnly) {
        setSubject("");
        setContent("");
        setPreheader("");
        loadData();
      }
    } catch (err: any) {
      setSendErrorMessage(err.message || "Hi ha hagut un error en enviar el newsletter.");
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        id="newsletter-admin-modal"
        className="relative w-full max-w-4xl bg-[#111315] border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-neutral-100"
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/30 flex items-center justify-center text-[#00FF66]">
              <PenTool className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#ffffff] leading-none" style={{ color: '#ffffff' }}>
                Panell Redactor de Newsletters
              </h2>
              <span className="text-[11px] text-[#00FF66] font-mono">
                NutriBaen • Pol Barrot
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Authenticated content vs Login gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-14 h-14 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[#00FF66] mb-5">
              <Lock className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold mb-2 text-[#ffffff]" style={{ color: '#ffffff' }}>Accés Administratiu</h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mb-6">
              Introdueix la contrasenya d'en Pol per redactar i enviar el newsletter diari als teus subscriptors.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Contrasenya d'accés"
                autoFocus
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-center text-sm text-[#ffffff] !text-[#ffffff] placeholder-neutral-500 focus:outline-none focus:border-[#00FF66]"
                style={{ color: '#ffffff', caretColor: '#00FF66' }}
              />

              {pinError && (
                <div className="text-xs text-red-400 font-semibold">
                  Contrasenya incorrecta. Revisa-la i torna-ho a provar.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Entrar al Redactor
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs Bar */}
            <div className="px-6 py-2.5 bg-neutral-950/60 border-b border-neutral-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTab("compose")}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    tab === "compose"
                      ? "bg-[#00FF66] text-black"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                  }`}
                >
                  <PenTool className="h-3.5 w-3.5" />
                  <span>Redactar Nova Edició</span>
                </button>

                <button
                  onClick={() => setTab("subscribers")}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    tab === "subscribers"
                      ? "bg-[#00FF66] text-black"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                  }`}
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>Subscriptors ({subscribers.length})</span>
                </button>

                <button
                  onClick={() => setTab("history")}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    tab === "history"
                      ? "bg-[#00FF66] text-black"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  <span>Històric d'Enviats ({history.length})</span>
                </button>
              </div>

              <button
                onClick={loadData}
                title="Actualitzar dades"
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* TAB CONTENT: COMPOSE */}
            {tab === "compose" && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {sendSuccessMessage && (
                  <div className="p-4 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-fadeIn">
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <span>{sendSuccessMessage}</span>
                  </div>
                )}

                {sendErrorMessage && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{sendErrorMessage}</span>
                  </div>
                )}

                {/* Subject & Preheader */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Assumpte del Correu *
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Ex: 🍏 Per què el dejuni intermitent et pot estar esgotant el cortisol"
                      className="w-full px-4 py-2.5 bg-[#0a0c0e] border border-neutral-800 rounded-xl text-[#ffffff] !text-[#ffffff] placeholder-neutral-500 text-sm focus:outline-none focus:border-[#00FF66]"
                      style={{ color: '#ffffff', caretColor: '#00FF66' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Preheader (Resum)
                    </label>
                    <input
                      type="text"
                      value={preheader}
                      onChange={(e) => setPreheader(e.target.value)}
                      placeholder="Ex: Reflexió clínica del dia"
                      className="w-full px-4 py-2.5 bg-[#0a0c0e] border border-neutral-800 rounded-xl text-[#ffffff] !text-[#ffffff] placeholder-neutral-500 text-sm focus:outline-none focus:border-[#00FF66]"
                      style={{ color: '#ffffff', caretColor: '#00FF66' }}
                    />
                  </div>
                </div>

                {/* Content Editor Toolbar & Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Contingut del Newsletter (Pots escriure paràgrafs amb espais)
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setContent(
                            (c) =>
                              c +
                              "\n\n⚡ Consell d'en Pol: Intenta sopar 3 hores abans d'anar a dormir per afavorir el descans digestiu i la melatonina."
                          )
                        }
                        className="text-[11px] px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-[#00FF66] transition-colors"
                      >
                        + Consell Destacat
                      </button>

                      <button
                        type="button"
                        onClick={() => setPreviewMode(!previewMode)}
                        className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded transition-colors ${
                          previewMode
                            ? "bg-[#00FF66] text-black font-bold"
                            : "bg-neutral-800 text-neutral-300 hover:text-white"
                        }`}
                      >
                        <Eye className="h-3 w-3" />
                        <span>{previewMode ? "Editar Text" : "Vista Prèvia"}</span>
                      </button>
                    </div>
                  </div>

                  {previewMode ? (
                    /* LIVE SIMULATED EMAIL PREVIEW */
                    <div className="border border-neutral-700 rounded-2xl bg-[#0f1113] p-6 text-neutral-200 text-sm max-w-xl mx-auto shadow-inner">
                      <div className="border-b border-[#2a2e35] pb-3 mb-4 flex items-center justify-between">
                        <span className="font-black text-[#00FF66] tracking-wider text-xs">
                          NB NUTRIBAEN
                        </span>
                        <span className="text-[11px] text-neutral-500 font-mono">
                          {preheader || "Newsletter Clínic"}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-[#ffffff] mb-4" style={{ color: '#ffffff' }}>
                        {subject || "Sense Assumpte"}
                      </h4>

                      <div className="space-y-3 leading-relaxed whitespace-pre-wrap font-light text-neutral-200">
                        {content || "(Escriu contingut per veure la vista prèvia...)"}
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#2a2e35] text-xs">
                        <div className="font-bold text-[#ffffff]" style={{ color: '#ffffff' }}>Pol Barrot</div>
                        <div className="text-[10px] text-neutral-400 mt-3 pt-3 border-t border-[#222]">
                          Estàs rebent aquest correu com a subscriptor de NutriBaen.<br />
                          <span className="text-[#00FF66] underline">Cancel·lar la subscripció / Donar-se de baixa</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <textarea
                      rows={10}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Bon dia! Avui a consulta hem tractat un cas molt habitual: l'error de pensar que menjar més carbohidrats a la nit engreixa directament...

Aquí teniu 3 claus que canvien completament el vostre descans:
1. La digestió pesada interfereix amb la fase REM.
2. Si entrenes a la tarda, el glucogen muscular agraeix el reompliment.
3. La coherència circadiana sempre guanya als dogmes."
                      className="w-full px-4 py-3 bg-[#0a0c0e] border border-neutral-800 rounded-xl text-[#ffffff] !text-[#ffffff] placeholder-neutral-500 text-sm focus:outline-none focus:border-[#00FF66] font-mono leading-relaxed"
                      style={{ color: '#ffffff', caretColor: '#00FF66' }}
                    />
                  )}
                </div>

                {/* Dispatch Controls */}
                <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-neutral-400">
                    Destinataris:{" "}
                    <strong className="text-[#00FF66]">{subscribers.length} subscriptors actius</strong>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      disabled={isSending}
                      onClick={() => handleSendBroadcast(true)}
                      className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold transition-colors disabled:opacity-50"
                    >
                      Enviar correu de prova
                    </button>

                    <button
                      type="button"
                      disabled={isSending || subscribers.length === 0}
                      onClick={() => handleSendBroadcast(false)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,255,102,0.3)] disabled:opacity-50 cursor-pointer active:scale-95"
                    >
                      {isSending ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Transmetent als subscriptors...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>Enviar a Tots ({subscribers.length})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SUBSCRIBERS */}
            {tab === "subscribers" && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Manual Add Subscriber Form */}
                <form
                  onSubmit={handleAddSubscriber}
                  className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row items-center gap-3"
                >
                  <input
                    type="text"
                    value={newSubName}
                    onChange={(e) => setNewSubName(e.target.value)}
                    placeholder="Nom (Opcional)"
                    className="w-full sm:w-1/3 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-[#ffffff] !text-[#ffffff] placeholder-neutral-500 focus:outline-none focus:border-[#00FF66]"
                    style={{ color: '#ffffff', caretColor: '#00FF66' }}
                  />
                  <input
                    type="email"
                    required
                    value={newSubEmail}
                    onChange={(e) => setNewSubEmail(e.target.value)}
                    placeholder="Correu electrònic *"
                    className="w-full sm:w-1/2 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-[#ffffff] !text-[#ffffff] placeholder-neutral-500 focus:outline-none focus:border-[#00FF66]"
                    style={{ color: '#ffffff', caretColor: '#00FF66' }}
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#00FF66] text-black font-bold text-xs rounded-lg hover:bg-[#00e65c] transition-colors shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Afegir</span>
                  </button>
                </form>

                {/* Subscribers Table / List */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between text-xs font-bold text-neutral-400">
                    <span>Llista de Subscriptors Actius</span>
                    <span>Total: {subscribers.length}</span>
                  </div>

                  {subscribers.length === 0 ? (
                    <div className="p-8 text-center text-xs text-neutral-500">
                      Encara no hi ha cap subscriptor a la base de dades.
                    </div>
                  ) : (
                    <div className="divide-y divide-neutral-850 max-h-80 overflow-y-auto">
                      {subscribers.map((sub) => (
                        <div
                          key={sub.id}
                          className="px-4 py-3 flex items-center justify-between hover:bg-neutral-900/60 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-[#00FF66]/10 flex items-center justify-center text-[#00FF66] text-xs font-bold">
                              {sub.name ? sub.name[0].toUpperCase() : sub.email[0].toUpperCase()}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-2">
                                <span>{sub.email}</span>
                                {sub.name && (
                                  <span className="text-[11px] text-neutral-400 font-normal">
                                    ({sub.name})
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-neutral-500">
                                Alta: {new Date(sub.createdAt).toLocaleDateString("ca-ES")}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteSubscriber(sub.id, sub.email)}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                            title="Eliminar subscriptor"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: HISTORY */}
            {tab === "history" && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {history.length === 0 ? (
                  <div className="p-8 text-center text-xs text-neutral-500">
                    Encara no s'ha transmès cap edició de newsletter.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-white">
                            {item.subject}
                          </span>
                          <span className="text-[11px] text-[#00FF66] font-mono">
                            {item.recipientsCount} lectors
                          </span>
                        </div>

                        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                          {item.content}
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-neutral-500 border-t border-neutral-900 pt-2">
                          <span>
                            Enviat el {new Date(item.sentAt || item.createdAt).toLocaleString("ca-ES")}
                          </span>
                          <button
                            onClick={() => {
                              setSubject(item.subject);
                              setContent(item.content);
                              setPreheader(item.preheader || "");
                              setTab("compose");
                            }}
                            className="text-[#00FF66] hover:underline font-semibold"
                          >
                            Duplicar al Redactor
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
