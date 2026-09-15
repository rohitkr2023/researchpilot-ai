import { BookOpenText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <BookOpenText className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-slate-800">ResearchPilot AI</span>
          <span className="text-xs text-slate-400">| Academic Evidence Engine</span>
        </div>
        <p className="text-xs text-slate-500 text-center md:text-right">
          Strict Academic Grounding Policy: Does not generate speculative citations. All claims verify to source pages.
        </p>
      </div>
    </footer>
  );
}