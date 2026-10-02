import React, { useEffect } from "react";
import { Download, ArrowLeft, CheckCircle2 } from "lucide-react";

interface FullDeRutaPageProps {
  onBack?: () => void;
}

export default function FullDeRutaPage({ onBack }: FullDeRutaPageProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Full_de_Ruta_NutriBaen.pdf";
    link.download = "Full_de_Ruta_NutriBaen.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Automatically trigger the download when entering this page
    handleDownload();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-[#00FF66] selection:text-black">
      <div className="max-w-md w-full bg-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 flex items-center justify-center mx-auto mb-6 text-[#00FF66]">
          <Download className="h-8 w-8 animate-bounce" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
          Full de Ruta
        </h1>
        <p className="text-xs uppercase tracking-widest text-[#00FF66] font-bold mb-4">
          NutriBaen & Sïmma Lleida
        </p>

        <p className="text-sm text-neutral-400 mb-8 leading-relaxed font-light">
          La descàrrega del document PDF s'ha iniciat automàticament. Si no comença en uns segons, fes clic al botó inferior:
        </p>

        <button
          onClick={handleDownload}
          className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#00FF66] hover:bg-[#00e65c] text-black font-black text-sm tracking-wide shadow-[0_0_30px_rgba(0,255,102,0.25)] transition-all active:scale-98 mb-5"
          id="btn-trigger-download-pdf"
        >
          <Download className="h-5 w-5 stroke-[2.5]" />
          <span>Descarregar PDF</span>
        </button>

        <div>
          {onBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Tornar a la web</span>
            </button>
          ) : (
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Tornar a la web</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
