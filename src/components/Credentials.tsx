import { CREDENTIALS } from "../data";
import { Award, GraduationCap, ClipboardCheck, Sparkles } from "lucide-react";

export default function Credentials() {
  // Helper to map logo strings to React icons
  const getIcon = (logo: string) => {
    switch (logo) {
      case "CoDiNuCat":
        return <Award className="h-5 w-5 text-brand-600" />;
      case "UdL":
        return <GraduationCap className="h-5 w-5 text-brand-600" />;
      case "ISAK":
        return <ClipboardCheck className="h-5 w-5 text-brand-600" />;
      default:
        return <Sparkles className="h-5 w-5 text-brand-600" />;
    }
  };

  return (
    <section className="bg-neutral-warm-50 py-10 border-y border-neutral-warm-200/50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-sans font-semibold text-[11px] text-neutral-warm-400 uppercase tracking-widest text-center mb-8">
          Formació i Acreditacions Professionals
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
          {CREDENTIALS.map((cred, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-xl bg-white border border-neutral-warm-200/40 hover:border-brand-200 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-sm group"
              id={`cred-item-${idx}`}
            >
              <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 transition-transform group-hover:scale-105 shrink-0">
                {getIcon(cred.logo)}
              </div>
              <div className="text-left">
                <div className="font-sans font-bold text-sm text-neutral-warm-900 leading-tight">
                  {cred.name}
                </div>
                <div className="font-sans text-xs text-neutral-warm-500 mt-1 leading-normal">
                  {cred.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
