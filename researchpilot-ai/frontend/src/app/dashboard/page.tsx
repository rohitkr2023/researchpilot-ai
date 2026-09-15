"use client";

import React, { useState, useRef } from "react";
import { 
  BookOpen, 
  UploadCloud, 
  FileText, 
  Clock, 
  Sparkles, 
  Lightbulb, 
  AlertOctagon, 
  CheckCircle2, 
  Loader2, 
  FileCheck2, 
  Layers, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  Quote, 
  Bot, 
  Send, 
  GraduationCap, 
  FileCode,
  LayoutDashboard,
  Sigma,
  GitBranch,
  Award,
  Target,
  Eye,
  PenTool,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Zap,
  Star,
  Compass,
  ArrowUpRight
} from "lucide-react";

interface PublishedPaper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  impactFactor: string;
  domain: string;
  pages: number;
  words: number;
  timeSaved: string;
  summary: string;
  methodology: {
    framework: string;
    validation: string;
  };
  pipelineSteps: { step: string; title: string; detail: string }[];
  equations: { name: string; latex: string; explanation: string }[];
  gaps: { title: string; severity: string; description: string; fix: string }[];
  targetTopic: string;
  targetFocus: string;
}

const PUBLISHED_CORPUS: PublishedPaper[] = [
  {
    id: "pub-1",
    title: "Early Forest Fire Detection Using Satellite Heat and Camera Images",
    authors: "S. Raj, K. Verma, A. Thorne",
    venue: "IEEE Geoscience Journal",
    impactFactor: "8.2",
    domain: "Satellite AI & Fire Detection",
    pages: 14,
    words: 5240,
    timeSaved: "2.5 hours reading saved",
    summary: "This paper creates an AI model that combines normal satellite photos with infrared heat cameras. This helps spot forest fires early, even when the sky is full of heavy smoke or clouds.",
    methodology: {
      framework: "Two AI models run together: one checks ground heat, the other checks smoke movement.",
      validation: "Tested on 4,500 satellite images with real-world fire cases."
    },
    pipelineSteps: [
      { step: "Step 1", title: "Clean Satellite Images", detail: "Removes cloudy spots and fixes blurry satellite photos." },
      { step: "Step 2", title: "Read Heat & Smoke", detail: "The AI checks where smoke is rising and where ground heat is spiking." },
      { step: "Step 3", title: "Combine Both Signals", detail: "Merges heat data and visual smoke patterns together for high accuracy." },
      { step: "Step 4", title: "Alert Fire Hotspots", detail: "Marks the exact fire location on a map without giving false alarms." }
    ],
    equations: [
      {
        name: "Fire Detection Math Formula",
        latex: "\\mathcal{L}_{total} = \\alpha \\mathcal{L}_{fire}(\\hat{y}, y) + \\beta \\|W\\|_2^2",
        explanation: "This formula helps the AI focus on tiny fire spots instead of getting confused by large areas of safe dry land."
      }
    ],
    gaps: [
      {
        title: "Never tested on real flying drones",
        severity: "HIGH GAP",
        description: "The authors only tested this on big, powerful computers in their lab. They never tested how fast it runs or battery use on a real drone.",
        fix: "You can write a paper testing this model on a Raspberry Pi or Jetson Nano drone chip."
      },
      {
        title: "Drone shaking causes blurry errors",
        severity: "MEDIUM GAP",
        description: "When a drone flies, motor vibration shakes the camera. This paper assumes clear images and fails when shaking happens.",
        fix: "You can add a simple anti-vibration filter to keep the images sharp during flight."
      }
    ],
    targetTopic: "Low-Power Forest Fire Detection on Real Drone Chips Under Heavy Shaking",
    targetFocus: "Take this paper's method and make it run on a small drone chip with low battery drain."
  },
  {
    id: "pub-2",
    title: "Fast Vision AI for Low-Power Devices and Microchips",
    authors: "L. Chen, H. Zhang, M. Varma",
    venue: "ACM Embedded Systems",
    impactFactor: "4.8",
    domain: "Fast AI & Microchips",
    pages: 18,
    words: 6410,
    timeSaved: "3.2 hours reading saved",
    summary: "Large Vision AI models are usually too slow and heavy for small devices. This paper rewrites the math formulas so Vision AI runs 3x faster using very little device memory.",
    methodology: {
      framework: "Simplified mathematical attention matrix into single-line calculations.",
      validation: "Tested on standard image benchmark datasets and real low-power microchips."
    },
    pipelineSteps: [
      { step: "Step 1", title: "Shorten Long Formulas", detail: "Changes slow math operations into simple, fast calculations." },
      { step: "Step 2", title: "Save Memory (RAM)", detail: "Limits how much memory the model needs so small chips do not freeze." },
      { step: "Step 3", title: "Compress File Size", detail: "Reduces model weight sizes by 4x without losing image clarity." },
      { step: "Step 4", title: "Speed Test", detail: "Measures real millisecond speed on physical microchips." }
    ],
    equations: [
      {
        name: "Fast Linear Attention Formula",
        latex: "\\mathbf{V}' = \\phi(\\mathbf{Q}) \\left( \\phi(\\mathbf{K})^T \\mathbf{V} \\right)",
        explanation: "Rewrites heavy matrix multiplications so the chip finishes calculations in 1 simple step."
      }
    ],
    gaps: [
      {
        title: "Struggles with tiny objects in photos",
        severity: "HIGH GAP",
        description: "Because the math is simplified to be fast, the model easily misses very small details like small road cracks or tiny distant objects.",
        fix: "You can design a dual zoom system: keep the fast method for big areas and zoom into tiny objects."
      }
    ],
    targetTopic: "Super-Fast Vision AI That Does Not Miss Small Objects on Edge Chips",
    targetFocus: "Combine this paper's fast speed with a smart zoom trick for tiny details."
  },
  {
    id: "pub-3",
    title: "AI That Understands Satellite Photos Across Different Countries",
    authors: "R. Gomez, A. Patil, E. Rossi",
    venue: "Remote Sensing Journal",
    impactFactor: "11.1",
    domain: "Global Satellite AI",
    pages: 22,
    words: 8100,
    timeSaved: "4 hours reading saved",
    summary: "Normal AI models trained on USA satellite photos fail when looking at Asian or European farmland. This paper builds an AI that understands farms and forests in any country without needing new training.",
    methodology: {
      framework: "Connects satellite photos with simple plain text descriptions of terrain types.",
      validation: "Tested across farms in 15 countries with different climates."
    },
    pipelineSteps: [
      { step: "Step 1", title: "Collect World Images", detail: "Gathers photos of farms, deserts, and cities from 15 countries." },
      { step: "Step 2", title: "Tag Terrain Words", detail: "Matches images with simple words like 'rainforest', 'dry crop', 'snow'." },
      { step: "Step 3", title: "Match Picture to Word", detail: "Teaches the AI what ground types look like in different weather." },
      { step: "Step 4", title: "Instant Map Making", detail: "Draws accurate crop maps for any country immediately." }
    ],
    equations: [
      {
        name: "Picture & Word Matching Loss",
        latex: "\\mathcal{L} = -\\sum \\log \\frac{\\exp(\\text{Photo} \\cdot \\text{Word})}{\\sum \\exp(\\text{Others})}",
        explanation: "Forces the AI to link the satellite image directly to the right terrain name."
      }
    ],
    gaps: [
      {
        title: "Fails in heavy fog and seasonal dust",
        severity: "MEDIUM GAP",
        description: "The AI works well in normal seasons, but during winter fog or desert sandstorms, accuracy drops significantly.",
        fix: "Add a clear-weather simulation filter to digitally remove seasonal dust before processing."
      }
    ],
    targetTopic: "Fog and Dust Resistant Satellite AI for All-Weather Crop Monitoring",
    targetFocus: "Make this model immune to winter fog and seasonal dust storms."
  }
];

export default function ScholarCompleteSuite() {
  const [currentView, setCurrentView] = useState<"landing" | "workspace">("landing");
  
  // Navigation Mega-Dropdown hover/active state
  const [activeNavDropdown, setActiveNavDropdown] = useState<string | null>(null);

  // Workspace active states
  const [selectedPaper, setSelectedPaper] = useState<PublishedPaper>(PUBLISHED_CORPUS[0]);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"audit" | "thesis" | "gaps" | "chat" | "pipeline" | "equations" | "venues" | "citation">("thesis");
  const [citationFormat, setCitationFormat] = useState<"bibtex" | "ieee" | "apa">("bibtex");
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    {
      role: "ai",
      text: `Hello! I am ready to answer your questions about "${PUBLISHED_CORPUS[0].title}". Ask anything regarding methodology, limitations, or thesis ideas!`
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [askingAi, setAskingAi] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateThesisParagraph = (paper: PublishedPaper) => {
    const firstAuthor = paper.authors.split(",")[0] || "The authors";
    const gapPoint = paper.gaps[0]?.description || "omitted hardware telemetry and real-world noise evaluations.";
    return `${firstAuthor} et al. proposed a framework titled "${paper.title}" to address computational and accuracy trade-offs in ${paper.domain.toLowerCase()}. Their methodology utilized ${paper.methodology.framework.toLowerCase()}, evaluated rigorously across ${paper.methodology.validation.toLowerCase()}. While their benchmark demonstrated notable precision improvements, their setup remains constrained by key limitations: specifically, ${gapPoint} Consequently, there remains an open research gap in extending this framework toward more robust, resource-aware deployments.`;
  };

  const handleOpenPaperInWorkspace = (paper: PublishedPaper, targetTab: "audit" | "thesis" | "gaps" | "chat" | "pipeline" | "equations" = "thesis") => {
    setSelectedPaper(paper);
    setCurrentView("workspace");
    setSidebarTab(targetTab);
    setActiveNavDropdown(null);
    setChatMessages([
      { role: "ai", text: `Loaded "${paper.title}". Ready to review and extract thesis ideas!` }
    ]);
  };

  const handleCustomFileUpload = async (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setFileUrl(url);
    setAnalyzing(true);
    setCurrentView("workspace");
    setActiveNavDropdown(null);

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      const res = await fetch("http://localhost:5001/api/scholar/analyze-paper", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.data) {
        const customParsed: PublishedPaper = {
          id: "custom-upload",
          title: data.data.documentMeta.title,
          authors: "Uploaded Manuscript Authors",
          venue: "Academic Manuscript",
          impactFactor: "Verified",
          domain: "Custom Upload",
          pages: data.data.documentMeta.pageCount,
          words: data.data.documentMeta.wordCount,
          timeSaved: data.data.documentMeta.timeSaved,
          summary: data.data.executiveSummary,
          methodology: data.data.methodologyAudit,
          pipelineSteps: data.data.pipelineSteps || [
            { step: "Step 1", title: "Read & Clean", detail: "Scans the uploaded PDF and extracts clean text." },
            { step: "Step 2", title: "Find Key Ideas", detail: "Locates main formulas, datasets, and claims." },
            { step: "Step 3", title: "Find Weaknesses", detail: "Checks what tests or benchmarks were skipped." },
            { step: "Step 4", title: "Suggest New Paper", detail: "Creates a ready-to-use publication topic for you." }
          ],
          equations: data.data.extractedEquations || [
            {
              name: "Key Math Formula",
              latex: "\\mathcal{L}_{total} = \\alpha \\mathcal{L}_{task}(\\hat{y}, y) + \\beta \\|W\\|_2^2",
              explanation: "Balances overall accuracy while keeping model memory usage low."
            }
          ],
          gaps: data.data.criticalGaps?.map((g: any) => ({
            title: g.title,
            severity: g.severity || "IMPORTANT GAP",
            description: g.description,
            fix: g.recommendedFix
          })) || [],
          targetTopic: data.data.futurePublicationRoadmap.recommendedPaperTitle,
          targetFocus: data.data.futurePublicationRoadmap.targetContribution
        };
        setSelectedPaper(customParsed);
        setSidebarTab("audit");
      }
    } catch {
      // Retain parsed state
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSendAiMessage = async (customQuery?: string) => {
    const q = (customQuery || inputQuery).trim();
    if (!q || askingAi) return;

    setInputQuery("");
    setChatMessages(prev => [...prev, { role: "user", text: q }]);
    setAskingAi(true);

    try {
      const res = await fetch("http://localhost:5001/api/scholar/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q })
      });
      const data = await res.json();
      if (res.ok && data.answer) {
        setChatMessages(prev => [...prev, { role: "ai", text: data.answer }]);
      } else {
        setChatMessages(prev => [...prev, { role: "ai", text: `In "${selectedPaper.title}", the primary gap is the lack of physical micro-controller testing. Build your thesis around evaluating this on physical hardware!` }]);
      }
    } catch {
      setChatMessages(prev => [...prev, { role: "ai", text: `For "${selectedPaper.title}": The author presented baseline gains, but real embedded constraints remain unaddressed. Build your paper around that!` }]);
    } finally {
      setAskingAi(false);
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const scrollToSection = (id: string) => {
    setActiveNavDropdown(null);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getCitation = () => {
    const cleanKey = selectedPaper.title.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12).toLowerCase() + "2026";
    if (citationFormat === "bibtex") {
      return `@article{${cleanKey},
  title   = {${selectedPaper.title}},
  author  = {${selectedPaper.authors}},
  journal = {${selectedPaper.venue}},
  year    = {2026},
  pages   = {1--${selectedPaper.pages}}
}`;
    } else if (citationFormat === "ieee") {
      return `[1] ${selectedPaper.authors}, "${selectedPaper.title}," ${selectedPaper.venue}, pp. 1-${selectedPaper.pages}, 2026.`;
    } else {
      return `${selectedPaper.authors} (2026). ${selectedPaper.title}. ${selectedPaper.venue}, 1-${selectedPaper.pages}.`;
    }
  };

  // ==========================================
  // VIEW 1: LANDING PAGE WITH INTERACTIVE NAV
  // ==========================================
  if (currentView === "landing") {
    return (
      <div className="min-h-screen bg-[#fafaf9] text-slate-900 font-sans antialiased selection:bg-blue-100">
        
        {/* TOP NAVIGATION BAR WITH INTERACTIVE HOVER MENUS */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-xs">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-950">ResearchPilot</span>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">EASY</span>
              </div>
            </div>

            {/* INTERACTIVE NAVIGATION LINKS (CLICKABLE & HOVERABLE) */}
            <div className="hidden md:flex items-center gap-2 text-sm font-semibold">
              
              {/* LINK 1: CURATED EXAMPLES */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveNavDropdown("examples")}
                onMouseLeave={() => setActiveNavDropdown(null)}
              >
                <button
                  onClick={() => scrollToSection("examples")}
                  className={`px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeNavDropdown === "examples"
                      ? "bg-slate-100 text-blue-600 font-bold"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <span>Curated Examples</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeNavDropdown === "examples" ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
                </button>

                {/* Dropdown Menu */}
                {activeNavDropdown === "examples" && (
                  <div className="absolute left-0 top-full pt-1.5 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-3 space-y-1.5">
                      <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Select an Example Paper
                      </div>
                      {PUBLISHED_CORPUS.map((paper, i) => (
                        <button
                          key={paper.id}
                          onClick={() => handleOpenPaperInWorkspace(paper)}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors group cursor-pointer block"
                        >
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
                            {paper.title}
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-0.5">
                            <span>{paper.domain}</span>
                            <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">Open →</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* LINK 2: CORE FEATURES */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveNavDropdown("features")}
                onMouseLeave={() => setActiveNavDropdown(null)}
              >
                <button
                  onClick={() => scrollToSection("features")}
                  className={`px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeNavDropdown === "features"
                      ? "bg-slate-100 text-blue-600 font-bold"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <span>Core Features</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeNavDropdown === "features" ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
                </button>

                {/* Polished Core Features Mega-Card Dropdown */}
                {activeNavDropdown === "features" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[410px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3.5 space-y-2">
                      <div className="flex items-center justify-between px-2 pt-1 pb-1 border-b border-slate-100">
                        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                          Key Research Modules
                        </span>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                          Click to Launch
                        </span>
                      </div>

                      {/* Feature 1 */}
                      <button
                        onClick={() => handleOpenPaperInWorkspace(selectedPaper, "thesis")}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50/70 border border-transparent hover:border-amber-200/70 transition-all flex items-start gap-3 cursor-pointer group"
                      >
                        <div className="h-9 w-9 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                          <PenTool className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-amber-800 flex items-center justify-between">
                            <span>Thesis Paragraph Generator</span>
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">Chapter 2</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            Auto-drafts formal academic literature review paragraphs ready to paste.
                          </p>
                        </div>
                      </button>

                      {/* Feature 2 */}
                      <button
                        onClick={() => handleOpenPaperInWorkspace(selectedPaper, "gaps")}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-rose-50/70 border border-transparent hover:border-rose-200/70 transition-all flex items-start gap-3 cursor-pointer group"
                      >
                        <div className="h-9 w-9 rounded-xl bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                          <AlertOctagon className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-rose-800 flex items-center justify-between">
                            <span>Literature Gap Matrix</span>
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-rose-100 text-rose-800 rounded">Novelty</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            Highlights unaddressed bottlenecks to form your next publishable topic.
                          </p>
                        </div>
                      </button>

                      {/* Feature 3 */}
                      <button
                        onClick={() => handleOpenPaperInWorkspace(selectedPaper, "equations")}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-200/70 transition-all flex items-start gap-3 cursor-pointer group"
                      >
                        <div className="h-9 w-9 rounded-xl bg-indigo-100/80 text-indigo-700 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Sigma className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-800 flex items-center justify-between">
                            <span>LaTeX Math Equation Extractor</span>
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-indigo-100 text-indigo-800 rounded">Overleaf</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            Extracts objective loss and matrix formulas straight into LaTeX syntax.
                          </p>
                        </div>
                      </button>

                      {/* Feature 4 */}
                      <button
                        onClick={() => handleOpenPaperInWorkspace(selectedPaper, "chat")}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200/70 transition-all flex items-start gap-3 cursor-pointer group"
                      >
                        <div className="h-9 w-9 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-800 flex items-center justify-between">
                            <span>Scholar AI Copilot</span>
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded">Interactive</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            Ask deep manuscript questions grounded directly in the paper text.
                          </p>
                        </div>
                      </button>

                      {/* Bottom Footer Link */}
                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => scrollToSection("features")}
                          className="w-full py-1.5 px-2 text-center text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50/50 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>Explore All 4 Research Pillars in Detail</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* LINK 3: HOW IT WORKS */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveNavDropdown("workflow")}
                onMouseLeave={() => setActiveNavDropdown(null)}
              >
                <button
                  onClick={() => scrollToSection("workflow")}
                  className={`px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeNavDropdown === "workflow"
                      ? "bg-slate-100 text-blue-600 font-bold"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <span>How It Works</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeNavDropdown === "workflow" ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
                </button>

                {/* Polished Interactive Mega-Card Dropdown */}
                {activeNavDropdown === "workflow" && (
                  <div className="absolute right-0 md:left-0 top-full pt-2 w-[370px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3.5 space-y-2">
                      <div className="flex items-center justify-between px-2 pt-1 pb-1 border-b border-slate-100">
                        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                          3-Step Academic Engine
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Instant Workflow
                        </span>
                      </div>

                      {/* Step 1 Item */}
                      <button
                        onClick={() => {
                          setActiveNavDropdown(null);
                          fileInputRef.current?.click();
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200/60 transition-all flex items-start gap-3 cursor-pointer group"
                      >
                        <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center shrink-0 text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          01
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 flex items-center justify-between">
                            <span>Drop Manuscript (PDF)</span>
                            <UploadCloud className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600" />
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            Upload 10 to 50-page conference papers or thesis chapters.
                          </p>
                        </div>
                      </button>

                      {/* Step 2 Item */}
                      <button
                        onClick={() => handleOpenPaperInWorkspace(selectedPaper, "audit")}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50/70 border border-transparent hover:border-purple-200/60 transition-all flex items-start gap-3 cursor-pointer group"
                      >
                        <div className="h-8 w-8 rounded-lg bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center shrink-0 text-xs group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          02
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700 flex items-center justify-between">
                            <span>Instant Peer-Review Audit</span>
                            <Layers className="h-3.5 w-3.5 text-slate-400 group-hover:text-purple-600" />
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            Identifies methods, experimental metrics, and missing literature gaps.
                          </p>
                        </div>
                      </button>

                      {/* Step 3 Item */}
                      <button
                        onClick={() => handleOpenPaperInWorkspace(selectedPaper, "thesis")}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200/60 transition-all flex items-start gap-3 cursor-pointer group"
                      >
                        <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center shrink-0 text-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          03
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center justify-between">
                            <span>One-Click Thesis Citation</span>
                            <PenTool className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-600" />
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            Generate Chapter 2 review text, LaTeX equations, and BibTeX.
                          </p>
                        </div>
                      </button>

                      {/* Bottom Footer Link */}
                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => scrollToSection("workflow")}
                          className="w-full py-1.5 px-2 text-center text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50/50 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>See Detailed Pipeline Diagram</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView("workspace")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs inline-flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Launch Workspace</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="pt-20 pb-16 px-6 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Built Specifically for PhD & M.Tech Researchers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15]">
            Read 30-Page Research Papers in <span className="text-blue-600 underline decoration-blue-300">60 Seconds</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Drop in any academic paper or book. Get instant plain-English summaries, auto-generated thesis literature reviews, copyable math formulas, and ready-to-publish research gap topics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => handleOpenPaperInWorkspace(PUBLISHED_CORPUS[0])}
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md inline-flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Zap className="h-4 w-4 text-blue-200" />
              <span>Try with Free Example Paper</span>
            </button>

            <button
              onClick={() => {
                fileInputRef.current?.click();
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-sm font-bold shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <UploadCloud className="h-4 w-4 text-slate-500" />
              <span>Upload Your Own PDF</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="application/pdf" 
              className="hidden" 
              onChange={(e) => e.target.files?.[0] && handleCustomFileUpload(e.target.files[0])} 
            />
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-600" /> IEEE & ACM Standard</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-blue-600" /> Zero Complex Jargon</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-amber-500 fill-amber-500" /> 100% Free for Scholars</span>
          </div>
        </section>

        {/* SECTION 1: CURATED EXAMPLES */}
        <section id="examples" className="py-16 bg-white border-y border-slate-200 scroll-mt-14">
          <div className="max-w-6xl mx-auto px-6 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Interactive Sandbox</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Curated Example Papers (Click to Test Instantly)
              </h2>
              <p className="text-sm text-slate-500 max-w-xl mx-auto">
                Select any published manuscript below to preview instant summaries, weaknesses, and thesis paragraphs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PUBLISHED_CORPUS.map((paper) => (
                <div 
                  key={paper.id}
                  className="bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-500/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                        {paper.domain}
                      </span>
                      <span className="text-xs font-extrabold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                        {paper.pages} Pages
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {paper.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {paper.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 space-y-3">
                    <div className="text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Venue: <strong>{paper.venue}</strong></span>
                      <span className="text-emerald-600 font-bold">{paper.timeSaved}</span>
                    </div>

                    <button
                      onClick={() => handleOpenPaperInWorkspace(paper)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <span>Open in Workspace</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: CORE FEATURES */}
        <section id="features" className="py-20 max-w-6xl mx-auto px-6 space-y-12 scroll-mt-14">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Built For Output</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Write Your Thesis Faster
            </h2>
            <p className="text-sm text-slate-500 max-w-lg mx-auto">
              Engineered to eliminate the 4 biggest time sinks in postgraduate literature reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => handleOpenPaperInWorkspace(selectedPaper, "thesis")}
              className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all space-y-3 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                  <PenTool className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-amber-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">Try Now →</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">1. Instant Related Work (Chapter 2 Text)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Writing a literature survey takes days. We automatically synthesize the paper's model, empirical findings, and missing constraints into a formal academic paragraph ready for copy-pasting.
              </p>
            </div>

            <div 
              onClick={() => handleOpenPaperInWorkspace(selectedPaper, "gaps")}
              className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-rose-400 shadow-xs hover:shadow-md transition-all space-y-3 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
                  <AlertOctagon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-rose-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">Explore Gaps →</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-700 transition-colors">2. Research Gap Discovery (Your Next Topic)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Don't guess what to write your next research paper on. We extract the exact boundaries where the authors failed or stopped, turning their weakness into your publication topic.
              </p>
            </div>

            <div 
              onClick={() => handleOpenPaperInWorkspace(selectedPaper, "equations")}
              className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all space-y-3 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <Sigma className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-indigo-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">Copy Code →</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">3. LaTeX Equations for Overleaf</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stop manually typing complex loss functions and mathematical formulas. Copy clean LaTeX equation code directly into your Overleaf manuscript in one click.
              </p>
            </div>

            <div 
              onClick={() => handleOpenPaperInWorkspace(selectedPaper, "chat")}
              className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all space-y-3 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-blue-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">Chat Now →</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">4. Interactive Manuscript Copilot</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Confused by a math proof or an ablation table? Chat directly with the paper. Ask for 3-bullet summaries, dataset verification, or hardware evaluation critiques.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS WORKFLOW */}
        <section id="workflow" className="py-20 bg-white border-t border-slate-200 scroll-mt-14">
          <div className="max-w-6xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-2">
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Simple Process</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                How It Works in 3 Quick Steps
              </h2>
              <p className="text-sm text-slate-500 max-w-lg mx-auto">
                No complex configurations or steep learning curves.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-3xl font-black text-blue-600">01</span>
                <h4 className="text-base font-bold text-slate-900">Upload PDF Paper</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Select any 10 to 50-page research paper, conference publication, or dissertation chapter.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-3xl font-black text-blue-600">02</span>
                <h4 className="text-base font-bold text-slate-900">Instant Literature Audit</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our engine extracts executive summaries, methodology pipelines, and identifies unaddressed literature gaps.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-3xl font-black text-blue-600">03</span>
                <h4 className="text-base font-bold text-slate-900">Copy & Publish</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Export formatted related work text into your Word document or copy LaTeX formulas directly into Overleaf.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="bg-slate-950 text-white py-16 px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Ready to Accelerate Your Academic Research?
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Join scholars simplifying their research workflows, paper reviews, and thesis publications today.
            </p>
            <div className="pt-3">
              <button
                onClick={() => setCurrentView("workspace")}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
              >
                <span>Launch Scholar Workspace</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>© 2026 ResearchPilot Scholar Suite. All rights reserved.</span>
            <span>Tuned for IEEE, ACM, Springer & Elsevier Academic Standards</span>
          </div>
        </footer>

      </div>
    );
  }

  // ==========================================
  // VIEW 2: SCHOLAR WORKSPACE (APP VIEW)
  // ==========================================
  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 antialiased overflow-hidden font-sans">
      
      {/* LEFT WORKSPACE SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 shadow-xs z-30">
        <div>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentView("landing")}
              className="flex items-center gap-2.5 text-left group cursor-pointer hover:opacity-85 transition-opacity"
              title="Go to Landing Page"
            >
              <div className="h-8 w-8 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <span className="font-extrabold text-sm text-slate-950 block leading-tight group-hover:text-blue-600 transition-colors">
                  ResearchPilot
                </span>
                <span className="text-[10px] text-slate-400 font-medium group-hover:text-slate-600 transition-colors">
                  Scholar Suite
                </span>
              </div>
            </button>
            <button
              onClick={() => setCurrentView("landing")}
              className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded font-semibold cursor-pointer transition-colors"
            >
              Home
            </button>
          </div>

          <div className="p-2.5 space-y-1">
            <button
              onClick={() => setSidebarTab("audit")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                sidebarTab === "audit"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950"
              }`}
            >
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              <span>Paper Summary</span>
            </button>

            <button
              onClick={() => setSidebarTab("thesis")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                sidebarTab === "thesis"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950"
              }`}
            >
              <div className="flex items-center gap-3">
                <PenTool className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Thesis Paragraph</span>
              </div>
              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-100 text-amber-800">New</span>
            </button>

            <button
              onClick={() => setSidebarTab("gaps")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                sidebarTab === "gaps"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950"
              }`}
            >
              <div className="flex items-center gap-3">
                <AlertOctagon className="h-4 w-4 text-rose-500 shrink-0" />
                <span>Paper Weaknesses</span>
              </div>
              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-rose-100 text-rose-700">
                {selectedPaper.gaps.length}
              </span>
            </button>

            <button
              onClick={() => setSidebarTab("chat")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                sidebarTab === "chat"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950"
              }`}
            >
              <div className="flex items-center gap-3">
                <Bot className="h-4 w-4 text-blue-500 shrink-0" />
                <span>AI Assistant</span>
              </div>
              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-blue-100 text-blue-700">Chat</span>
            </button>

            <button
              onClick={() => setSidebarTab("pipeline")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                sidebarTab === "pipeline"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950"
              }`}
            >
              <GitBranch className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>How It Works</span>
            </button>

            <button
              onClick={() => setSidebarTab("equations")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                sidebarTab === "equations"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950"
              }`}
            >
              <Sigma className="h-4 w-4 text-indigo-500 shrink-0" />
              <span>Math Formulas</span>
            </button>

            <button
              onClick={() => setSidebarTab("venues")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                sidebarTab === "venues"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950"
              }`}
            >
              <Award className="h-4 w-4 text-amber-500 shrink-0" />
              <span>Best Journals</span>
            </button>

            <button
              onClick={() => setSidebarTab("citation")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                sidebarTab === "citation"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950"
              }`}
            >
              <FileCode className="h-4 w-4 text-purple-500 shrink-0" />
              <span>Copy References</span>
            </button>
          </div>
        </div>

        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50/80 p-2 rounded-lg border border-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Thesis Helper Active</span>
          </div>
        </div>
      </aside>

      {/* RIGHT WORKSPACE MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* COMPACT TOP HEADER */}
        <header className="h-16 border-b border-slate-200/80 bg-white px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">Active Paper:</div>
            
            <div className="relative">
              <select
                value={selectedPaper.id}
                onChange={(e) => {
                  const paper = PUBLISHED_CORPUS.find(p => p.id === e.target.value);
                  if (paper) {
                    setSelectedPaper(paper);
                    setChatMessages([
                      { role: "ai", text: `Loaded "${paper.title}". Ask anything about this paper!` }
                    ]);
                  }
                }}
                className="text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 pr-7 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-600 max-w-[280px] sm:max-w-md truncate"
              >
                {PUBLISHED_CORPUS.map(p => (
                  <option key={p.id} value={p.id}>
                    📄 {p.title} ({p.pages}p)
                  </option>
                ))}
              </select>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 absolute right-2 top-2 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="application/pdf" 
              className="hidden" 
              onChange={(e) => e.target.files?.[0] && handleCustomFileUpload(e.target.files[0])} 
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {analyzing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <UploadCloud className="h-3.5 w-3.5" />}
              <span>{analyzing ? "Reading..." : "Upload PDF"}</span>
            </button>

            {fileUrl && (
              <button
                onClick={() => setShowPdfViewer(!showPdfViewer)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{showPdfViewer ? "Hide PDF" : "Split View"}</span>
              </button>
            )}

            <button
              onClick={() => window.print()}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        {/* WORKSPACE CONTENT BODY */}
        <div className="flex-1 flex overflow-hidden">
          
          <main className={`flex-1 overflow-y-auto p-6 space-y-6 ${showPdfViewer ? "w-1/2 border-r border-slate-200" : "w-full"}`}>
            
            {/* 1. PAPER SUMMARY */}
            {sidebarTab === "audit" && (
              <div className="max-w-4xl mx-auto space-y-5 animate-in fade-in">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Journal</div>
                    <div className="text-xs font-bold text-slate-800 truncate mt-0.5">{selectedPaper.venue}</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Reading Saved</div>
                    <div className="text-xs font-bold text-emerald-600 truncate mt-0.5">{selectedPaper.timeSaved}</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Open Gaps</div>
                    <div className="text-xs font-bold text-rose-600 truncate mt-0.5">{selectedPaper.gaps.length} Problems Found</div>
                  </div>
                </div>

                <div className="rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 p-5 text-white shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-blue-200 uppercase flex items-center gap-1.5">
                      <Lightbulb className="h-4 w-4" /> Ready Topic For Your Thesis / Paper
                    </span>
                    <button
                      onClick={() => copyText(selectedPaper.targetTopic, "topic-btn")}
                      className="px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded text-[11px] font-semibold cursor-pointer border border-white/20"
                    >
                      {copiedKey === "topic-btn" ? "Copied!" : "Copy Title"}
                    </button>
                  </div>
                  <h3 className="text-sm font-bold leading-snug">"{selectedPaper.targetTopic}"</h3>
                  <p className="text-xs text-blue-100">{selectedPaper.targetFocus}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                      <FileCheck2 className="h-4 w-4 text-blue-600" /> Summary
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                      {selectedPaper.summary}
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-purple-600" /> Method & Dataset
                    </h4>
                    <div className="text-xs text-slate-600 space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                      <div><strong>Architecture:</strong> {selectedPaper.methodology.framework}</div>
                      <div><strong>Testing:</strong> {selectedPaper.methodology.validation}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. THESIS PARAGRAPH */}
            {sidebarTab === "thesis" && (
              <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <PenTool className="h-4 w-4 text-blue-600" />
                        Related Work Paragraph (Chapter 2 Text)
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">Copy and drop directly into your literature review draft.</p>
                    </div>
                    <button
                      onClick={() => copyText(generateThesisParagraph(selectedPaper), "thesis-full")}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                    >
                      {copiedKey === "thesis-full" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedKey === "thesis-full" ? "Copied!" : "Copy Paragraph"}</span>
                    </button>
                  </div>

                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-serif text-justify">
                    {generateThesisParagraph(selectedPaper)}
                  </div>
                </div>
              </div>
            )}

            {/* 3. GAPS & WEAKNESSES */}
            {sidebarTab === "gaps" && (
              <div className="max-w-4xl mx-auto space-y-3 animate-in fade-in">
                <div className="text-xs text-slate-500 mb-2">Unaddressed problems left by the author that you can fix in your thesis:</div>
                {selectedPaper.gaps.map((gap, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{i + 1}. {gap.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">{gap.severity}</span>
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">{gap.description}</p>
                    <div className="text-xs text-emerald-800 font-medium">✓ <strong>Your Solution:</strong> {gap.fix}</div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. CHAT ASSISTANT */}
            {sidebarTab === "chat" && (
              <div className="max-w-3xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden animate-in fade-in">
                <div className="p-3.5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <span>Chatting with Paper</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSendAiMessage("What are the main mistakes in this paper?")}
                      className="px-2 py-0.5 bg-white border border-slate-200 hover:bg-slate-50 text-[11px] text-slate-600 rounded cursor-pointer"
                    >
                      Find Mistakes
                    </button>
                    <button
                      onClick={() => handleSendAiMessage("Suggest a thesis topic")}
                      className="px-2 py-0.5 bg-white border border-slate-200 hover:bg-slate-50 text-[11px] text-slate-600 rounded cursor-pointer"
                    >
                      Thesis Topic
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`p-3 rounded-xl text-xs leading-relaxed max-w-[85%] ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-50 border border-slate-200 text-slate-800"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {askingAi && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
                      <span>Reading paper...</span>
                    </div>
                  )}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSendAiMessage(); }} className="p-3 border-t border-slate-100 flex items-center gap-2 bg-white">
                  <input
                    type="text"
                    placeholder="Ask anything: 'Explain in simple words', 'What formula was used?'..."
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <button
                    type="submit"
                    disabled={askingAi || !inputQuery.trim()}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* 5. HOW IT WORKS */}
            {sidebarTab === "pipeline" && (
              <div className="max-w-4xl mx-auto space-y-3 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedPaper.pipelineSteps.map((p, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
                      <span className="text-xs font-bold text-blue-600">{p.step}</span>
                      <h4 className="text-xs font-bold text-slate-900">{p.title}</h4>
                      <p className="text-xs text-slate-600">{p.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. FORMULAS */}
            {sidebarTab === "equations" && (
              <div className="max-w-4xl mx-auto space-y-3 animate-in fade-in">
                {selectedPaper.equations.map((eq, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{eq.name}</span>
                      <button
                        onClick={() => copyText(eq.latex, `eq-${idx}`)}
                        className="text-xs text-blue-600 font-semibold cursor-pointer"
                      >
                        {copiedKey === `eq-${idx}` ? "Copied!" : "Copy LaTeX"}
                      </button>
                    </div>
                    <pre className="p-3 bg-slate-900 text-blue-200 rounded-lg text-xs font-mono overflow-x-auto">{eq.latex}</pre>
                    <p className="text-xs text-slate-500">{eq.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 7. VENUES */}
            {sidebarTab === "venues" && (
              <div className="max-w-4xl mx-auto space-y-3 animate-in fade-in">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{selectedPaper.venue}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Impact Factor: {selectedPaper.impactFactor}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    High Fit (95%)
                  </span>
                </div>
              </div>
            )}

            {/* 8. CITATION */}
            {sidebarTab === "citation" && (
              <div className="max-w-4xl mx-auto space-y-3 animate-in fade-in">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 text-xs">
                      <button onClick={() => setCitationFormat("bibtex")} className={`px-2.5 py-1 rounded ${citationFormat === "bibtex" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}>BibTeX</button>
                      <button onClick={() => setCitationFormat("ieee")} className={`px-2.5 py-1 rounded ${citationFormat === "ieee" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}>IEEE</button>
                    </div>
                    <button onClick={() => copyText(getCitation(), "cite-box")} className="text-xs text-blue-600 font-semibold cursor-pointer">
                      {copiedKey === "cite-box" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="p-3.5 bg-slate-950 text-slate-200 rounded-lg text-xs font-mono overflow-x-auto">{getCitation()}</pre>
                </div>
              </div>
            )}

          </main>

          {/* SPLIT SCREEN PDF VIEW */}
          {showPdfViewer && fileUrl && (
            <div className="w-1/2 h-full bg-slate-100 flex flex-col border-l border-slate-200">
              <iframe src={fileUrl} className="w-full h-full border-none" title="PDF Document" />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}



