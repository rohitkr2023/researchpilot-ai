"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { useAuth } from "@/context/AuthContext";
import { FolderKanban, ArrowLeft, FileText, Network } from "lucide-react";

export default function ProjectsPage() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const activeToken = token || localStorage.getItem("researchpilot_token");
    if (!activeToken) return;

    fetch("http://localhost:5001/api/projects", {
      headers: { Authorization: `Bearer ${activeToken}` }
    })
      .then(res => res.json())
      .then(data => setProjects(data.projects || []))
      .catch(console.error);
  }, [token]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader title="Research Workspaces" />
        <main className="p-8 space-y-6">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((proj) => (
              <div key={proj.id} className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-sm text-slate-900">{proj.title}</h3>
                </div>
                <p className="text-xs text-slate-500">{proj.domainTopic || "Academic Domain"}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 border-t border-slate-100 pt-3">
                  <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> {proj._count?.documents || 0}</span>
                  <span className="flex items-center gap-1"><Network className="h-3.5 w-3.5" /> {proj._count?.gaps || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
