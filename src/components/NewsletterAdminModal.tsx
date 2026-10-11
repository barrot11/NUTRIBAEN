import React, { useState, useEffect, useRef } from "react";
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
  Bold,
  Italic,
} from "lucide-react";
import {
  fetchAllSubscribers,
  broadcastNewsletter,
  fetchPastNewsletters,
  removeSubscriber,
  addManualSubscriber,
  Subscriber,
  NewsletterRecord,
  BroadcastResult,
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
  const [showRecipientsPreview, setShowRecipientsPreview] = useState(false);

  // Compose State
  const [subject, setSubject] = useState("");
  const [preheader, setPreheader] = useState("");
  const [content, setContent] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  // Sending State & Detailed Reporting
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState("");
  const [sendErrorMessage, setSendErrorMessage] = useState("");
  const [sendReport, setSendReport] = useState<BroadcastResult | null>(null);
  const [testEmailInput, setTestEmailInput] = useState("polbaen@gmail.com, Ferranbaren@gmail.com");
  const [showTestConfig, setShowTestConfig] = useState(false);

  // History State
  const [history, setHistory] = useState<NewsletterRecord[]>([]);

  // Textarea ref and formatting helpers
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormat = (type: "bold" | "italic") => {
    const textarea = textareaRef.current;
    const marker = type === "bold" ? "**" : "*";
    const placeholder = type === "bold" ? "text en negreta" : "text en cursiva";

    if (!textarea) {
      setContent((prev) => prev + `${marker}${placeholder}${marker}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = content;

    if (start !== end) {
      // User has selected a portion of text!
      const selected = currentText.substring(start, end);
      const newText =
        currentText.substring(0, start) +
        `${marker}${selected}${marker}` +
        currentText.substring(end);
      setContent(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + marker.length, end + marker.length);
      }, 0);
    } else {
      // No text selected, insert placeholder and select it
      const newText =
        currentText.substring(0, start) +
        `${marker}${placeholder}${marker}` +
        currentText.substring(start);
      setContent(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + marker.length,
          start + marker.length + placeholder.length
        );
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      handleFormat("bold");
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
      e.preventDefault();
      handleFormat("italic");
    }
  };

  const renderFormattedPreview = (rawContent: string) => {
    if (!rawContent.trim()) {
      return (
        <p className="italic text-neutral-500">
          (Escriu contingut per veure la vista prèvia...)
        </p>
      );
    }

    return rawContent.split("\n\n").map((p, pIdx) => {
      const tokens = p.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return (
        <p key={pIdx} className="mb-3 leading-relaxed">
          {tokens.map((token, tIdx) => {
            if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
              return (
                <strong
                  key={tIdx}
                  className="font-bold text-white"
                  style={{ color: "#ffffff" }}
                >
                  {token.slice(2, -2)}
                </strong>
              );
            }
            if (token.startsWith("*") && token.endsWith("*") && token.length >= 2) {
              return (
                <em key={tIdx} className="italic text-neutral-100">
                  {token.slice(1, -1)}
                </em>
              );
            }
            return token.split("\n").map((line, lIdx, arr) => (
              <React.Fragment key={lIdx}>
                {line}
                {lIdx < arr.length - 1 && <br />}
              </React.Fragment>
            ));
          })}
        </p>
      );
    });
  };

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
    setSendReport(null);

    if (!subject.trim()) {
      setSendErrorMessage("Si us plau, escriu un assumpte per al newsletter.");
      return;
    }
    if (!content.trim()) {
      setSendErrorMessage("El contingut del newsletter està buit.");
      return;
    }

    const activeRecipients = subscribers.filter((s) => s.active).map((s) => s.email);

    let targetRecipients: string[] = [];
    if (isTestOnly) {
      targetRecipients = testEmailInput
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter((e) => e.includes("@"));

      if (!targetRecipients.length) {
        targetRecipients = ["ferranbaren@gmail.com", "polbaen@gmail.com"];
      }
    } else {
      targetRecipients = activeRecipients;
    }

    if (!targetRecipients.length) {
      setSendErrorMessage("No hi ha cap destinatari actiu a la llista.");
      return;
    }

    if (
      !isTestOnly &&
      !window.confirm(
        `Atenció: Aquest newsletter s'enviarà en lot (Resend Batch API) a TOTS els ${targetRecipients.length} subscriptors actius. Vols continuar?`
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

      setSendReport(result);

      if (result.failedCount === 0 && result.sentCount > 0) {
        setSendSuccessMessage(
          isTestOnly
            ? `Prova enviada amb èxit a ${result.sentCount} adreces (${result.accepted.join(", ")})!`
            : `Newsletter transmès amb èxit a tots els ${result.sentCount} subscriptors!`
        );
      } else if (result.sentCount > 0 && result.failedCount > 0) {
        setSendErrorMessage(
          `Enviament parcial: ${result.sentCount} acceptats, ${result.failedCount} fallits de ${result.totalRecipients} totals.`
        );
      } else {
        setSendErrorMessage(
          `No s'ha pogut transmetre: cap destinatari acceptat (${result.failedCount} fallits).`
        );
      }

      if (!isTestOnly && result.sentCount > 0) {
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

                {/* Detailed Broadcast Breakdown (Totals, Accepted, Failed, Pending) */}
                {sendReport && (
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-700 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-300">
                      <span>Estat del Repartiment (Resend Batch API)</span>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {sendReport.failedCount === 0 ? "✓ Sense incidències" : "⚠️ Incidències detectades"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                        <div className="text-neutral-400 text-[10px] uppercase font-bold">Destinataris Totals</div>
                        <div className="text-lg font-black text-white mt-0.5">{sendReport.totalRecipients}</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                        <div className="text-[#00FF66] text-[10px] uppercase font-bold">Acceptats</div>
                        <div className="text-lg font-black text-[#00FF66] mt-0.5">{sendReport.sentCount}</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                        <div className="text-red-400 text-[10px] uppercase font-bold">Fallits</div>
                        <div className="text-lg font-black text-red-400 mt-0.5">{sendReport.failedCount}</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                        <div className="text-amber-400 text-[10px] uppercase font-bold">Pendents</div>
                        <div className="text-lg font-black text-amber-400 mt-0.5">{sendReport.pendingCount}</div>
                      </div>
                    </div>

                    {sendReport.failed.length > 0 && (
                      <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/40 text-xs text-red-300 space-y-1.5">
                        <div className="font-bold">Detall d'adreces fallides:</div>
                        {sendReport.failed.map((f, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono border-t border-red-900/40 pt-1">
                            <span className="text-white font-semibold">{f.email}</span>
                            <span className="text-red-400">{f.reason}</span>
                          </div>
                        ))}
                      </div>
                    )}
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
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Contingut del Newsletter
                    </label>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* BOLD BUTTON */}
                      <button
                        type="button"
                        onClick={() => handleFormat("bold")}
                        title="Negreta: Selecciona text o fes clic per inserir (**text**)"
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-bold transition-all border border-neutral-700 hover:border-neutral-500 active:scale-95 cursor-pointer shadow-sm"
                        style={{ color: "#ffffff" }}
                      >
                        <Bold className="h-3.5 w-3.5 stroke-[2.8]" />
                        <span>Negreta</span>
                      </button>

                      {/* ITALIC BUTTON */}
                      <button
                        type="button"
                        onClick={() => handleFormat("italic")}
                        title="Cursiva: Selecciona text o fes clic per inserir (*text*)"
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white italic transition-all border border-neutral-700 hover:border-neutral-500 active:scale-95 cursor-pointer shadow-sm"
                        style={{ color: "#ffffff" }}
                      >
                        <Italic className="h-3.5 w-3.5 stroke-[2.2]" />
                        <span>Cursiva</span>
                      </button>

                      {/* CONSELL DESTACAT */}
                      <button
                        type="button"
                        onClick={() =>
                          setContent(
                            (c) =>
                              c +
                              "\n\n⚡ **Consell d'en Pol:** Intenta sopar 3 hores abans d'anar a dormir per afavorir el descans digestiu i la melatonina."
                          )
                        }
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[#00FF66] font-medium transition-colors border border-neutral-800 hover:border-neutral-700 cursor-pointer"
                      >
                        + Consell Destacat
                      </button>

                      {/* PREVIEW MODE TOGGLE */}
                      <button
                        type="button"
                        onClick={() => setPreviewMode(!previewMode)}
                        className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                          previewMode
                            ? "bg-[#00FF66] text-black font-extrabold shadow-sm"
                            : "bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700"
                        }`}
                      >
                        <Eye className="h-3.5 w-3.5" />
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

                      <div className="space-y-3 leading-relaxed font-light text-neutral-200">
                        {renderFormattedPreview(content)}
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
                    <div>
                      <textarea
                        ref={textareaRef}
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Bon dia! Avui a consulta hem tractat un cas molt habitual: l'error de pensar que menjar més carbohidrats a la nit engreixa directament...

Aquí teniu 3 claus que canvien completament el vostre descans:
1. La **digestió pesada** interfereix amb la fase REM.
2. Si entrenes a la tarda, el *glucogen muscular* agraeix el reompliment.
3. La coherència circadiana sempre guanya als dogmes."
                        className="w-full px-4 py-3 bg-[#0a0c0e] border border-neutral-800 rounded-xl text-[#ffffff] !text-[#ffffff] placeholder-neutral-500 text-sm focus:outline-none focus:border-[#00FF66] font-mono leading-relaxed"
                        style={{ color: '#ffffff', caretColor: '#00FF66' }}
                      />
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-1.5 px-1 font-mono">
                        <span>Pots prémer **Negreta** o *Cursiva* a la barra d'eines o amb les dreceres <kbd className="px-1 py-0.5 rounded bg-neutral-800 text-neutral-300">Ctrl+B</kbd> i <kbd className="px-1 py-0.5 rounded bg-neutral-800 text-neutral-300">Ctrl+I</kbd>.</span>
                        <span>{content.length} caràcters</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dispatch Controls */}
                <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-xs text-neutral-300">
                      Destinataris:{" "}
                      <strong className="text-[#00FF66] font-bold">{subscribers.length} subscriptors actius</strong>
                      {subscribers.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setShowRecipientsPreview(!showRecipientsPreview)}
                          className="ml-3 text-xs underline text-[#00FF66] hover:text-white font-semibold transition-colors cursor-pointer"
                        >
                          {showRecipientsPreview ? "Amagar llista" : "Veure correus destinataris"}
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={isSending}
                          onClick={() => handleSendBroadcast(true)}
                          className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                          style={{ color: '#ffffff' }}
                        >
                          Enviar correu de prova
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowTestConfig(!showTestConfig)}
                          title="Personalitzar adreces de prova"
                          className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer text-xs"
                        >
                          ⚙️
                        </button>
                      </div>

                      <button
                        type="button"
                        disabled={isSending || subscribers.length === 0}
                        onClick={() => handleSendBroadcast(false)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,255,102,0.3)] disabled:opacity-50 cursor-pointer active:scale-95"
                      >
                        {isSending ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>Transmetent en lot...</span>
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

                  {/* Customizable Test Emails Input */}
                  {showTestConfig && (
                    <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2 animate-fadeIn text-xs">
                      <div className="flex items-center justify-between text-neutral-300 font-bold">
                        <span>Adreces per a la prova (separades per coma):</span>
                        <span className="text-[11px] text-[#00FF66]">Pots posar 1 o més correus</span>
                      </div>
                      <input
                        type="text"
                        value={testEmailInput}
                        onChange={(e) => setTestEmailInput(e.target.value)}
                        placeholder="polbaen@gmail.com, Ferranbaren@gmail.com"
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FF66]"
                        style={{ color: '#ffffff' }}
                      />
                    </div>
                  )}

                  {/* Expandable Preview of Recipient Emails in Bright White */}
                  {showRecipientsPreview && subscribers.length > 0 && (
                    <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl max-h-36 overflow-y-auto flex flex-wrap gap-2 animate-fadeIn">
                      {subscribers.map((s) => (
                        <span
                          key={s.id}
                          className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700 text-xs font-bold"
                          style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}
                        >
                          {s.email}
                        </span>
                      ))}
                    </div>
                  )}
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
                    className="w-full sm:w-1/3 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs placeholder-neutral-400 focus:outline-none focus:border-[#00FF66]"
                    style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', caretColor: '#00FF66' }}
                  />
                  <input
                    type="email"
                    required
                    value={newSubEmail}
                    onChange={(e) => setNewSubEmail(e.target.value)}
                    placeholder="Correu electrònic *"
                    className="w-full sm:w-1/2 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs placeholder-neutral-400 focus:outline-none focus:border-[#00FF66]"
                    style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', caretColor: '#00FF66' }}
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#00FF66] text-black font-bold text-xs rounded-lg hover:bg-[#00e65c] transition-colors shrink-0 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Afegir</span>
                  </button>
                </form>

                {/* Subscribers Table / List */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg">
                  <div className="px-4 py-3 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between text-xs font-bold text-white">
                    <span style={{ color: '#ffffff' }}>Llista de Subscriptors Actius</span>
                    <span className="text-[#00FF66]">Total: {subscribers.length}</span>
                  </div>

                  {subscribers.length === 0 ? (
                    <div className="p-8 text-center text-xs text-neutral-300" style={{ color: '#ffffff' }}>
                      Encara no hi ha cap subscriptor a la base de dades.
                    </div>
                  ) : (
                    <div className="divide-y divide-neutral-800 max-h-96 overflow-y-auto">
                      {subscribers.map((sub) => (
                        <div
                          key={sub.id}
                          className="px-4 py-3.5 flex items-center justify-between hover:bg-neutral-900/90 transition-colors bg-neutral-950"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#00FF66]/20 border border-[#00FF66]/40 flex items-center justify-center text-[#00FF66] text-xs font-extrabold shrink-0">
                              {sub.name ? sub.name[0].toUpperCase() : sub.email[0].toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-bold flex items-center gap-2">
                                <span 
                                  className="text-white font-bold tracking-wide"
                                  style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}
                                >
                                  {sub.email}
                                </span>
                                {sub.name && (
                                  <span 
                                    className="text-xs px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-white font-normal"
                                    style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}
                                  >
                                    {sub.name}
                                  </span>
                                )}
                              </div>
                              <div 
                                className="text-[11px] mt-0.5 text-neutral-300"
                                style={{ color: '#e4e4e7', WebkitTextFillColor: '#e4e4e7' }}
                              >
                                Alta: {new Date(sub.createdAt).toLocaleDateString("ca-ES")}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteSubscriber(sub.id, sub.email)}
                            className="p-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                            title="Eliminar subscriptor"
                          >
                            <Trash2 className="h-4 w-4" />
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
