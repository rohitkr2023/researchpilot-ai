import Link from "next/link";
import { BookOpenText, ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            <BookOpenText className="h-5 w-5" />
          </div>
          <span className="font-semibold text-lg text-slate-900 tracking-tight">
            ResearchPilot <span className="text-blue-600 font-bold">AI</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
          <Link href="#workflow" className="hover:text-blue-600 transition-colors">Academic Workflow</Link>
          <Link href="#grounding" className="hover:text-blue-600 transition-colors">Evidence Grounding</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition-colors"
          >
            Launch App
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}