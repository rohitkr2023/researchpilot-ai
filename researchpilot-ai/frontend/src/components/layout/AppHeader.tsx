import { Bell, Search, UserCircle2 } from "lucide-react";

export function AppHeader({ title }: { title: string }) {
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-30">
      <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search papers, methods, gaps..."
            className="w-64 rounded-lg border border-slate-200 pl-9 pr-4 py-1.5 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
          />
        </div>
        <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
          <Bell className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <UserCircle2 className="h-7 w-7 text-slate-400" />
          <div className="text-xs text-left leading-tight hidden sm:block">
            <p className="font-semibold text-slate-800">Scholar Workspace</p>
            <p className="text-slate-400">Researcher</p>
          </div>
        </div>
      </div>
    </header>
  );
}