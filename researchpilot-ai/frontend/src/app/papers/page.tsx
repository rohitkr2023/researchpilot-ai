"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { useAuth } from "@/context/AuthContext";
import { FileText, Layers, Loader2, Search, ChevronRight, BookOpen, X } from "lucide-react";

export default function PaperLibraryPage() {
  const { token } = useAuth();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);

  const fetchDocuments = async () => {
    const activeToken = token || localStorage.getItem("researchpilot_token");
    if (!activeToken) return;
    try {
      const res = await fetch("http://localhost:5001/api/documents", {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      const data = await res.json();
      if (res.ok) setDocuments(data.documents || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDocuments(); }, [token]);

  const handleInspect = async (id: string) => {
    const activeToken = token || localStorage.getItem("researchpilot_token");
    if (!activeToken) return;
    try {
      const res = await fetch(`http://localhost:5001/api/documents/${id}`, {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
      const data = await res.json();
      if (res.ok) setSelectedDoc(data.document);
    } catch (err) { console.error(err); }
  };

  const filtered = documents.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader title="Research Paper Library" />
        <main className="p-8 space-y-6 flex-1 overflow-y-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Ingested Academic Corpus</h2>
              <p className="text-xs text-slate-500">Inspect segmented text chunks and verify page citations.</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-slate-400"><Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-blue-600" /> Loading corpus...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-slate-200 rounded-xl bg-white">
              <BookOpen className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">No research papers found</p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase">
                  <tr>
                    <th className="px-6 py-3.5">Document Details</th>
                    <th className="px-6 py-3.5">Pages</th>
                    <th className="px-6 py-3.5">Semantic Chunks</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/60">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <div>
                            <div className="font-semibold text-slate-900">{doc.title}</div>
                            <div className="text-[11px] text-slate-400">{doc.originalName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{doc.pageCount} Pages</td>
                      <td className="px-6 py-4"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">{doc._count?.chunks || 0} Chunks</span></td>
                      <td className="px-6 py-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 uppercase font-semibold text-[10px]">{doc.status}</span></td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleInspect(doc.id)} className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 cursor-pointer">
                          Inspect Chunks <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col border-l border-slate-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{selectedDoc.title}</h3>
                <p className="text-xs text-slate-500">{selectedDoc.chunks?.length || 0} Extracted Chunks</p>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {selectedDoc.chunks?.map((chk: any) => (
                <div key={chk.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-500 border-b border-slate-100 pb-2">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Page {chk.pageNumber}</span>
                    <span>Chunk #{chk.chunkIndex + 1}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{chk.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
