"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { useAuth } from "@/context/AuthContext";
import { Network, Sparkles, Loader2, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function ResearchGapsPage() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [gaps, setGaps] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [synthesizing, setSynthesizing] = useState(false);

  const fetchData = async () => {
    const activeToken = token || localStorage.getItem("researchpilot_token");
    if (!activeToken) return;
    try {
      const [pRes, gRes] = await Promise.all([
        fetch("http://localhost:5001/api/projects", { headers: { Authorization: `Bearer ${activeToken}` } }),
        fetch("http://localhost:5001/api/gaps", { headers: { Authorization: `Bearer ${activeToken}` } }),
      ]);
      const pData = await pRes.json();
      const gData = await gRes.json();
      if (pRes.ok) {
        setProjects(pData.projects || []);
        if (pData.projects?.length > 0 && !selectedProjectId) setSelectedProjectId(pData.projects[0].id);
      }
      if (gRes.ok) setGaps(gData.gaps || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [token]);

  const handleSynthesize = async () => {
    const activeToken = token || localStorage.getItem("researchpilot_token");
    if (!selectedProjectId || !activeToken) return;
    setSynthesizing(true);
    try {
      const res = await fetch("http://localhost:5001/api/gaps/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${activeToken}` },
        body: JSON.stringify({ projectId: selectedProjectId }),
      });
      const data = await res.json();
      if (res.ok) await fetchData();
      else alert(data.error || "Synthesis failed");
    } catch (err: any) { alert(err.message); }
    finally { setSynthesizing(false); }
  };

  const currentProject = projects.find(p => p.id === selectedProjectId);
  const count = currentProject?._count?.documents || 0;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader title="Research Gap Synthesis" />
        <main className="p-8 space-y-8 flex-1 overflow-y-auto">
          <div className="rounded-xl border border-indigo-100 bg-white p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded"><Sparkles className="h-3 w-3" /> Synthesis Pipeline</span>
              <h2 className="text-base font-bold text-slate-900">Automated Gap Identification</h2>
              <p className="text-xs text-slate-600">Extracts unaddressed research questions from multiple ingested papers.</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.title} ({p._count?.documents || 0} papers)</option>
                ))}
              </select>
              <button
                onClick={handleSynthesize}
                disabled={synthesizing || count < 2}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
              >
                {synthesizing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Zap className="h-3.5 w-3.5" />}
                {synthesizing ? "Analyzing..." : "Synthesize Gaps"}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2"><Network className="h-4 w-4 text-blue-600" /> Synthesized Gaps ({gaps.length})</h3>
            {loading ? (
              <div className="p-12 text-center text-xs text-slate-400">Loading gaps...</div>
            ) : gaps.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-slate-200 rounded-xl bg-white">
                <Network className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">No candidate gaps synthesized yet</p>
                <p className="text-[11px] text-slate-400 mt-1">Select workspace with 2+ papers and click Synthesize.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {gaps.map((gap) => (
                  <div key={gap.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">{gap.category}</span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">{gap.title}</h4>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded inline-flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" /> {Math.round(gap.confidenceScore * 100)}% Confidence
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg">{gap.description}</p>
                    {gap.suggestedNextStep && (
                      <div className="flex items-center gap-2 text-xs text-indigo-700 bg-indigo-50/60 p-2.5 rounded-lg border border-indigo-100">
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                        <span><strong>Next Step:</strong> {gap.suggestedNextStep}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
