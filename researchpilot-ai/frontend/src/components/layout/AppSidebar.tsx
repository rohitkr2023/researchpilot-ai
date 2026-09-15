"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpenText, 
  LayoutDashboard, 
  FolderKanban, 
  Files, 
  SplitSquareVertical, 
  Network, 
  Lightbulb, 
  NotebookPen, 
  Quote, 
  Settings, 
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Research Projects", href: "/projects", icon: FolderKanban },
  { name: "Paper Library", href: "/papers", icon: Files },
  { name: "Compare Papers", href: "/compare", icon: SplitSquareVertical },
  { name: "Research Gaps", href: "/research-gaps", icon: Network },
  { name: "Idea Generator", href: "/research-ideas", icon: Lightbulb },
  { name: "Research Notes", href: "/notes", icon: NotebookPen },
  { name: "Citations", href: "/citations", icon: Quote },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 h-screen sticky top-0">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
          <BookOpenText className="h-4 w-4" />
        </div>
        <span className="font-semibold text-slate-900 tracking-tight">
          ResearchPilot <span className="text-blue-600">AI</span>
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-blue-600" : "text-slate-400")} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Bottom Grounding Badge */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <div className="text-[11px] leading-tight text-slate-600">
            <p className="font-semibold text-slate-900">Academic Guardrail</p>
            <p className="text-slate-500 mt-0.5">Strict page verification active.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}