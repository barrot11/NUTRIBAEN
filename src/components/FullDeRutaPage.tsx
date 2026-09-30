import React, { useState } from "react";
import {
  Download,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Printer,
  Maximize2,
  FileSpreadsheet,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { downloadRoadmapPptx } from "../utils/generateRoadmapPptx";
// @ts-ignore
import polHeroImg from "../assets/images/polba.png";

interface FullDeRutaPageProps {
  onBack?: () => void;
}

export default function FullDeRutaPage({ onBack }: FullDeRutaPageProps) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const totalSlides = 5;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadRoadmapPptx();
    } catch (e) {
      console.error("Error generating PPTX:", e);
    } finally {
      setIsDownloading(false);
    }
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 1) setCurrentSlide(currentSlide - 1);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans flex flex-col justify-between selection:bg-[#8FFF00] selection:text-black">
      {/* 1. Minimal PowerPoint Header Bar */}
      <header className="bg-[#121216] border-b border-neutral-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shadow-md print:hidden z-30">
        <div className="flex items-center gap-3">
          {onBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Tornar a la web</span>
            </button>
          ) : (
            <a
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Tornar</span>
            </a>
          )}
          <div className="hidden md:flex items-center gap-2 border-l border-neutral-800 pl-3">
            <span className="text-xs font-bold text-[#8FFF00] tracking-wide uppercase">
              PowerPoint • Full de Ruta
            </span>
            <span className="text-xs text-neutral-400">NutriBaen & Sïmma Lleida</span>
          </div>
        </div>

        {/* Slide Counter & Main Download Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => window.open("https://wa.me/34640775160", "_blank")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-bold hover:bg-[#25D366]/30 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>640 77 51 60</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition-colors"
            title="Descarregar com a PDF o Imprimir"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">PDF</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8FFF00] text-black font-extrabold text-xs sm:text-sm hover:bg-[#a6ff33] shadow-[0_0_20px_rgba(143,255,0,0.3)] transition-all active:scale-95 disabled:opacity-50"
            id="btn-download-pptx"
          >
            <Download className="h-4 w-4 stroke-[2.5]" />
            <span>{isDownloading ? "Generant..." : "Descarregar (.pptx)"}</span>
          </button>
        </div>
      </header>

      {/* 2. Main Slide Display Area (16:9 Aspect Ratio) */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 md:p-8">
        <div className="w-full max-w-5xl aspect-[16/9] bg-[#111111] rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-[0_10px_50px_rgba(0,0,0,0.9)] overflow-hidden relative flex flex-col">
          
          {/* ========================================================= */}
          {/* SLIDE 1: PORTADA                                          */}
          {/* ========================================================= */}
          {currentSlide === 1 && (
            <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-12 bg-neutral-950 overflow-hidden select-none animate-fadeIn">
              {/* Consultation background image with dark overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={polHeroImg}
                  alt="NutriBaen"
                  className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
              </div>

              {/* Top Logo */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-lg bg-[#008037]/80 text-[#8FFF00] font-black text-sm tracking-wider uppercase border border-[#8FFF00]/40">
                    NB
                  </div>
                  <span className="text-white/80 font-bold text-xs tracking-widest uppercase">
                    NutriBaen
                  </span>
                </div>
              </div>

              {/* Big Typography */}
              <div className="relative z-10 my-auto text-left max-w-2xl">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight leading-none mb-3">
                  RETORN A LA
                </h1>
                <div>
                  <span className="inline-block bg-[#008037] text-white px-5 sm:px-8 py-1.5 sm:py-2.5 rounded-xl font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-wider shadow-2xl">
                    VITALITAT
                  </span>
                </div>
              </div>

              {/* Bottom Right Attribution */}
              <div className="relative z-10 flex items-end justify-end">
                <span className="text-xs sm:text-sm font-semibold text-neutral-300 tracking-wide uppercase bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm">
                  NutriBaen & Sïmma Lleida
                </span>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SLIDE 2: FULL DE RUTA                                     */}
          {/* ========================================================= */}
          {currentSlide === 2 && (
            <div className="relative w-full h-full bg-[#111111] p-6 sm:p-10 flex flex-col justify-between overflow-hidden select-none animate-fadeIn">
              {/* Slide Title */}
              <div className="text-center pt-2">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-[#8FFF00] tracking-tight flex items-center justify-center gap-3">
                  <span>❯❯❯</span>
                  <span>FULL DE RUTA</span>
                  <span>❮❮❮</span>
                </h2>
              </div>

              {/* Timeline Connector Line & Nodes */}
              <div className="my-auto w-full">
                {/* Horizontal line on larger screens, vertical on small */}
                <div className="hidden sm:block relative">
                  <div className="absolute top-1/2 left-[8%] right-[8%] h-1 bg-[#8FFF00] -translate-y-1/2 z-0" />
                  
                  <div className="grid grid-cols-5 gap-2 relative z-10">
                    {/* Node 1 */}
                    <div className="flex flex-col items-center text-center">
                      <div className="h-28 flex flex-col justify-end pb-3 text-left">
                        <span className="text-[10px] text-neutral-400 font-light leading-tight">
                          Validació del perfil abans de començar. El mètode és exigent, així que ens hem d'assegurar que estem en la mateixa pàgina.
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#8FFF00] text-black font-black flex items-center justify-center border-4 border-[#111111] shadow-lg text-sm">
                        💻
                      </div>
                      <div className="pt-3">
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Consulta Inicial</h4>
                      </div>
                    </div>

                    {/* Node 2 */}
                    <div className="flex flex-col items-center text-center">
                      <div className="h-28 flex flex-col justify-end pb-3">
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Accés App</h4>
                        <span className="text-[10px] text-neutral-400 font-light leading-tight mt-1">
                          Tindràs accés a la teva plataforma personalitzada.
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#8FFF00] text-black font-black flex items-center justify-center border-4 border-[#111111] shadow-lg text-sm">
                        📱
                      </div>
                      <div className="pt-3">
                        <span className="text-[10px] text-neutral-500 uppercase font-semibold">Fase 2</span>
                      </div>
                    </div>

                    {/* Node 3 (Main) */}
                    <div className="flex flex-col items-center text-center">
                      <div className="h-28 flex flex-col justify-end pb-3">
                        <span className="text-[10px] text-neutral-400 font-light leading-tight">
                          Rebràs el teu protocol adaptat a les teves necessitats i context.
                        </span>
                      </div>
                      <div className="w-14 h-14 rounded-full bg-white text-black font-black flex items-center justify-center border-4 border-[#8FFF00] shadow-[0_0_15px_rgba(143,255,0,0.5)] text-base">
                        👤
                      </div>
                      <div className="pt-3">
                        <h4 className="text-xs sm:text-sm font-extrabold text-[#8FFF00] leading-tight">
                          Protocol Individualitzat
                        </h4>
                      </div>
                    </div>

                    {/* Node 4 */}
                    <div className="flex flex-col items-center text-center">
                      <div className="h-28 flex flex-col justify-end pb-3">
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Feedback setmanal</h4>
                        <span className="text-[10px] text-neutral-400 font-light leading-tight mt-1">
                          Revisem dades, sensacions i energia.
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#8FFF00] text-black font-black flex items-center justify-center border-4 border-[#111111] shadow-lg text-sm">
                        💬
                      </div>
                      <div className="pt-3">
                        <span className="text-[10px] text-neutral-500 uppercase font-semibold">Fase 4</span>
                      </div>
                    </div>

                    {/* Node 5 */}
                    <div className="flex flex-col items-center text-center">
                      <div className="h-28 flex flex-col justify-end pb-3 text-left">
                        <span className="text-[10px] text-neutral-400 font-light leading-tight">
                          Consultes presencials per analitzar el progrés i fer els canvis necessaris per seguir evolucionant.
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#8FFF00] text-black font-black flex items-center justify-center border-4 border-[#111111] shadow-lg text-sm">
                        ⚖️
                      </div>
                      <div className="pt-3">
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">Sessió d'Ajust i Mesures</h4>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile list view */}
                <div className="sm:hidden space-y-2 text-xs">
                  <div className="p-2.5 bg-neutral-900 rounded-lg border-l-4 border-[#8FFF00]">
                    <div className="font-bold text-white">1. Consulta Inicial</div>
                    <div className="text-[11px] text-neutral-400">Validació del perfil abans de començar.</div>
                  </div>
                  <div className="p-2.5 bg-neutral-900 rounded-lg border-l-4 border-[#8FFF00]">
                    <div className="font-bold text-white">2. Accés App</div>
                    <div className="text-[11px] text-neutral-400">Plataforma personalitzada.</div>
                  </div>
                  <div className="p-2.5 bg-neutral-900 rounded-lg border-l-4 border-[#8FFF00]">
                    <div className="font-bold text-[#8FFF00]">3. Protocol Individualitzat</div>
                    <div className="text-[11px] text-neutral-300">Adaptat al teu context i metabolisme.</div>
                  </div>
                  <div className="p-2.5 bg-neutral-900 rounded-lg border-l-4 border-[#8FFF00]">
                    <div className="font-bold text-white">4. Feedback setmanal</div>
                    <div className="text-[11px] text-neutral-400">Revisem dades, sensacions i energia.</div>
                  </div>
                  <div className="p-2.5 bg-neutral-900 rounded-lg border-l-4 border-[#8FFF00]">
                    <div className="font-bold text-white">5. Sessió d'Ajust i Mesures</div>
                    <div className="text-[11px] text-neutral-400">Consultes presencials per analitzar el progrés.</div>
                  </div>
                </div>
              </div>

              <div className="text-right text-[10px] text-neutral-500 pb-1">
                NutriBaen • Slide 2/5
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SLIDE 3: EL TEU VIATGE (COMPARATIVA)                      */}
          {/* ========================================================= */}
          {currentSlide === 3 && (
            <div className="relative w-full h-full bg-[#111111] grid grid-cols-1 md:grid-cols-12 overflow-hidden select-none animate-fadeIn">
              {/* Left Green Section */}
              <div className="md:col-span-5 bg-[#9BF52D] text-black p-6 sm:p-10 flex flex-col justify-center">
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none mb-6">
                  EL TEU VIATGE
                </h2>
                <div className="space-y-4 text-xs sm:text-sm font-medium leading-relaxed">
                  <p>
                    El programa està dividit en dues fases segons el teu context. Inici{" "}
                    <strong>Protocol Trimestral + tres mesos més de seguiment</strong>.
                  </p>
                  <p>
                    D'aquesta forma, els beneficis per mantenir un canvi sostingut en el temps, és d'un{" "}
                    <strong className="underline decoration-black">valor incalculable</strong>.
                  </p>
                </div>
              </div>

              {/* Right Table Section */}
              <div className="md:col-span-7 bg-[#141416] p-4 sm:p-8 flex flex-col justify-center">
                <div className="border border-neutral-800 rounded-xl overflow-hidden shadow-xl bg-[#18181c]">
                  <div className="grid grid-cols-2 text-center border-b border-neutral-800 font-extrabold text-[11px] sm:text-xs">
                    <div className="p-2 sm:p-2.5 bg-neutral-900 text-neutral-400 uppercase">
                      SESSIÓ ÚNICA
                    </div>
                    <div className="p-2 sm:p-2.5 bg-[#8FFF00]/15 text-[#8FFF00] uppercase border-l border-neutral-800">
                      PROGRAMA 6 MESOS
                    </div>
                  </div>

                  <div className="divide-y divide-neutral-800 text-[10px] sm:text-[11px] leading-snug">
                    <div className="grid grid-cols-2">
                      <div className="p-2 text-neutral-400">Entrega d'un PDF genèric i "fins al mes que ve".</div>
                      <div className="p-2 text-white font-medium border-l border-neutral-800">Acompanyament diari a través de l'App.</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="p-2 text-neutral-400">Resultats temporals que es perden per falta d'hàbits.</div>
                      <div className="p-2 text-white font-medium border-l border-neutral-800">Transformació de la salut a llarg termini.</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="p-2 text-neutral-400">Menú que acaba oblidat a la porta de la nevera sense seguiment.</div>
                      <div className="p-2 text-white font-medium border-l border-neutral-800">Suport estratègic setmanal i pre-competició.</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="p-2 text-neutral-400">Sense educació nutricional.</div>
                      <div className="p-2 text-white font-medium border-l border-neutral-800">Canvi d'identitat total. Aprens a menjar per sempre.</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="p-2 text-neutral-400">Sense dades setmanals, no es pot avaluar l'evolució.</div>
                      <div className="p-2 text-white font-medium border-l border-neutral-800">Dades, seguiment i control mensual, sense excuses.</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="p-2 text-neutral-500 italic">Es tracta el símptoma.</div>
                      <div className="p-2 text-[#8FFF00] font-bold border-l border-neutral-800 uppercase tracking-wide">Es tracta la biologia.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SLIDE 4: PROPERS PASSOS                                   */}
          {/* ========================================================= */}
          {currentSlide === 4 && (
            <div className="relative w-full h-full bg-[#111311] p-6 sm:p-10 flex flex-col justify-between overflow-hidden select-none animate-fadeIn">
              {/* Top Accent shape */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8FFF00]/10 rounded-bl-full pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto">
                {/* Left Badge */}
                <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="border-4 border-white px-6 py-4 rounded-3xl bg-black inline-block shadow-2xl">
                    <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#8FFF00] tracking-tight leading-none">
                      PROPERS PASSOS
                    </h2>
                  </div>
                  <div className="mt-4 flex gap-2 text-[#8FFF00] text-xl">
                    <span>↘</span>
                    <span>↓</span>
                    <span>↙</span>
                  </div>
                </div>

                {/* Right Step List */}
                <div className="md:col-span-8 space-y-3 sm:space-y-4">
                  {/* Step 1 */}
                  <div>
                    <div className="inline-block bg-[#8FFF00] text-black px-3 py-0.5 rounded-md font-bold text-xs sm:text-sm">
                      Sol·licita la teva cita:
                    </div>
                    <div className="mt-1 text-xs sm:text-sm text-neutral-300 font-light pl-2">
                      • Contacta directament a través del WhatsApp corporatiu -{" "}
                      <strong className="text-white font-bold underline cursor-pointer" onClick={() => window.open("https://wa.me/34640775160", "_blank")}>
                        640 77 51 60
                      </strong>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div>
                    <div className="inline-block bg-[#8FFF00] text-black px-3 py-0.5 rounded-md font-bold text-xs sm:text-sm">
                      Valoració Inicial i Protocol:
                    </div>
                    <div className="mt-1 text-xs sm:text-sm text-neutral-300 font-light pl-2">
                      • Ens veiem a la consulta de SÏMMA per analitzar la teva biotipologia, salut digestiva i objectius. Dissenyem junts el teu protocol nutricional.
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div>
                    <div className="inline-block bg-[#8FFF00] text-black px-3 py-0.5 rounded-md font-bold text-xs sm:text-sm">
                      Realitza el pagament:
                    </div>
                    <div className="mt-1 text-xs sm:text-sm text-neutral-300 font-light pl-2">
                      • Els programes es contracten i s'abonen a la primera sessió. Un cop pagat, rebràs l'accés a l'App i el protocol.
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div>
                    <div className="inline-block bg-[#8FFF00] text-black px-3 py-0.5 rounded-md font-bold text-xs sm:text-sm">
                      Planificació del procés:
                    </div>
                    <div className="mt-1 text-xs sm:text-sm text-neutral-300 font-light pl-2">
                      • Abans de sortir de la consulta, deixarem tancada la data de la teva segona visita presencial a un mes vista.
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right text-[10px] text-neutral-500">
                NutriBaen & Sïmma Lleida • Slide 4/5
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SLIDE 5: RECUPERA LA TEVA SALUT                           */}
          {/* ========================================================= */}
          {currentSlide === 5 && (
            <div className="relative w-full h-full bg-[#9BF52D] text-black p-6 sm:p-12 flex flex-col justify-between items-center text-center overflow-hidden select-none animate-fadeIn">
              {/* Diagonal accent stripes top left */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-black/10 -rotate-45 pointer-events-none" />

              {/* Title */}
              <div className="pt-2 z-10">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight italic flex flex-wrap items-center justify-center gap-3">
                  <span>RECUPERA LA TEVA</span>
                  <span className="bg-white text-black px-4 py-1 rounded-lg not-italic font-black">
                    SALUT
                  </span>
                </h2>
              </div>

              {/* Circular Photo */}
              <div className="my-auto z-10">
                <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-black shadow-2xl bg-black mx-auto">
                  <img
                    src={polHeroImg}
                    alt="Pol Barrot"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Contact direct link */}
              <div className="z-10 pb-2">
                <button
                  onClick={() => window.open("https://wa.me/34640775160", "_blank")}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-[#8FFF00] font-black text-xs sm:text-sm hover:scale-105 transition-transform shadow-xl"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Corporatiu: 640 77 51 60</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* 3. PowerPoint Slide Navigator & Presentation Toolbar */}
      <footer className="bg-[#121216] border-t border-neutral-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 print:hidden z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Diapositiva anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <span className="text-xs font-bold text-neutral-300 px-2 min-w-[75px] text-center">
            {currentSlide} / {totalSlides}
          </span>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Diapositiva següent"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Thumbnail Selector */}
        <div className="hidden sm:flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentSlide(num)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                currentSlide === num
                  ? "bg-[#8FFF00] text-black scale-105"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
              }`}
            >
              Diapo {num}
            </button>
          ))}
        </div>

        {/* Download PPTX Direct CTA */}
        <div>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-[#8FFF00]" />
            <span>Descarregar PPTX</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
