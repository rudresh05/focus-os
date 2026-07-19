"use client";

import React, { useState } from 'react';
import { useSprintStore } from '@/store/useSprintStore';
import { format, differenceInDays, parseISO } from 'date-fns';
import { Target, Clock, ShieldAlert, Cpu, Activity, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

export function SprintDashboard() {
  const { activeSprint, completeSprint } = useSprintStore();
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);
  const [coachAdvice, setCoachAdvice] = useState("");
  const [loadingCoach, setLoadingCoach] = useState(false);
  const [copiedAdvice, setCopiedAdvice] = useState(false);

  const handleTerminateConfirm = async () => {
    await completeSprint();
    toast.info("MISSION ABORTED");
  };

  const fetchSprintAdvice = async () => {
    setIsCoachModalOpen(true);
    if (coachAdvice) return; // Don't fetch again if already loaded

    setLoadingCoach(true);
    try {
      const res = await fetch("/api/focus-os/ai-sprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: activeSprint?.name,
          goal: activeSprint?.goal,
          tasks: activeSprint?.tasks
        })
      });
      const data = await res.json();
      if (data.error) {
        toast.error("AI Coach Failed", { description: data.error });
        setIsCoachModalOpen(false);
      } else {
        setCoachAdvice(data.advice || "");
      }
    } catch (err) {
      toast.error("Connection Error", { description: "Failed to connect to AI coach." });
      setIsCoachModalOpen(false);
    } finally {
      setLoadingCoach(false);
    }
  };

  if (!activeSprint) return null;

  const startDate = parseISO(activeSprint.startDate);
  const endDate = parseISO(activeSprint.endDate);
  const today = new Date();
  const totalDays = differenceInDays(endDate, startDate) || 1;
  const daysPassed = differenceInDays(today, startDate);
  const daysRemaining = Math.max(0, differenceInDays(endDate, today));
  const progress = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 sm:p-8 md:p-10 border-line relative group overflow-hidden"
      >
        {/* Tactical Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent opacity-20 group-hover:opacity-60 transition-opacity" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent opacity-20 group-hover:opacity-60 transition-opacity" />

        <div className="flex flex-col gap-10 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-4 min-w-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-2 py-0.5 bg-accent/5 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-widest rounded shadow-[0_0_10px_rgba(var(--accent),0.1)]">
                   <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                   Active mission protocol
                </div>
                <div className="h-[1px] w-8 bg-line" />
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground italic">Node_Alpha_01</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black heading-modern tracking-tighter uppercase italic text-foreground leading-none break-all sm:break-normal">
                {activeSprint.name}
              </h2>
              
              <div className="flex items-start gap-4 text-muted-foreground font-bold text-sm md:text-base border-l-2 border-accent/20 pl-6 py-1">
                <div className="space-y-1">
                   <p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent/60">Primary Target objective</p>
                   <p className="break-words leading-tight text-foreground/80">{activeSprint.goal}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 shrink-0 w-full sm:w-auto justify-start sm:justify-end mt-2 sm:mt-0">
              <button 
                onClick={fetchSprintAdvice}
                className="px-4 py-2 bg-accent/10 hover:bg-accent text-accent hover:text-white transition-all text-[9px] font-black uppercase tracking-widest rounded border border-accent/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5" />
                AI Coach
              </button>
              <button 
                onClick={() => setIsTerminateModalOpen(true)} 
                className="px-4 py-2 bg-foreground/5 hover:bg-rose-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest rounded border border-line cursor-pointer"
              >
                Abort
              </button>
            </div>
          </div>

          {/* HUD Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 border-t border-line pt-8 md:pt-10">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                   <Activity className="h-3.5 w-3.5 text-accent opacity-40" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Integrity</span>
                </div>
                <span className="text-sm font-black text-foreground">{Math.round(progress)}%</span>
              </div>
              
              {/* Segmented Progress Bar */}
              <div className="flex gap-1 h-1.5">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex-1 rounded-sm transition-all duration-1000",
                      (i / 20) * 100 < progress ? "bg-accent shadow-[0_0_10px_var(--accent)]" : "bg-foreground/5"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                 <Clock className="h-3.5 w-3.5 text-orange-500 opacity-40" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Temporal Buffer</span>
              </div>
              <div className="text-4xl font-black heading-modern flex items-baseline gap-2 text-foreground italic">
                {daysRemaining} <span className="text-xs opacity-20 not-italic uppercase tracking-widest">Days remaining</span>
              </div>
            </div>

            <div className="md:text-right space-y-2">
              <div className="flex items-center md:justify-end gap-2">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">End log date</span>
                 <Zap className="h-3.5 w-3.5 text-purple-500 opacity-40" />
              </div>
              <div className="text-base font-black text-muted-foreground tracking-widest uppercase tabular-nums">
                {format(endDate, 'dd MMM yyyy')}
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorative Data */}
        <div className="absolute right-[-40px] bottom-[-40px] opacity-[0.03] pointer-events-none rotate-12">
          <Cpu className="w-80 h-80" />
        </div>
      </motion.div>

      <Modal 
        isOpen={isTerminateModalOpen}
        onClose={() => setIsTerminateModalOpen(false)}
        onConfirm={handleTerminateConfirm}
        variant="danger"
        title="Abort Mission"
        description="Terminating the current protocol is permanent. All progress will be finalized and archived."
        confirmText="Confirm Abort"
        cancelText="Remain Active"
      />

      {/* AI Coach Modal */}
      <AnimatePresence>
        {isCoachModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCoachModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-2xl glass p-6 sm:p-8 shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-line z-10 rounded-2xl flex flex-col max-h-[85vh] bg-background"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                <div className="flex items-center gap-2 text-accent">
                  <Cpu className="w-5 h-5" />
                  <h3 className="text-sm font-black uppercase tracking-widest leading-none mt-0.5">AI Mission Advisor</h3>
                </div>
                <button 
                  onClick={() => setIsCoachModalOpen(false)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-all rounded-full hover:bg-foreground/5 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto pr-1 text-left custom-scrollbar space-y-4">
                {loadingCoach ? (
                  <div className="py-16 flex flex-col items-center justify-center space-y-4">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent animate-pulse">Compiling tactical mission plan...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="prose prose-invert text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-4 font-normal">
                      {coachAdvice.split("\n").map((line, idx) => {
                        if (line.startsWith("###")) {
                          return <h4 key={idx} className="text-xs sm:text-sm font-bold text-foreground mt-4 mb-1 border-b border-line/20 pb-0.5">{line.replace("###", "").trim()}</h4>;
                        }
                        if (line.startsWith("##")) {
                          return <h3 key={idx} className="text-sm sm:text-base font-black text-foreground mt-6 mb-2">{line.replace("##", "").trim()}</h3>;
                        }
                        if (line.startsWith("#")) {
                          return <h2 key={idx} className="text-base sm:text-lg font-black text-foreground mt-6 mb-3">{line.replace("#", "").trim()}</h2>;
                        }
                        if (line.startsWith("*") || line.startsWith("-")) {
                          return (
                            <div key={idx} className="flex items-start gap-2 ml-1 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                              <span>{line.replace(/^[*+-]\s*/, "")}</span>
                            </div>
                          );
                        }
                        if (line.trim().match(/^\d+\.\s/)) {
                          const content = line.replace(/^\d+\.\s/, "");
                          const number = line.match(/^\d+/)?.[0];
                          return (
                            <div key={idx} className="flex items-start gap-2 ml-1 mt-1">
                              <span className="font-mono text-accent font-bold text-[11px] mt-0.5">{number}.</span>
                              <span>{content}</span>
                            </div>
                          );
                        }
                        if (line.trim() === "") {
                          return <div key={idx} className="h-1.5" />;
                        }
                        return <p key={idx} className="mt-1">{line}</p>;
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              {!loadingCoach && coachAdvice && (
                <div className="border-t border-line pt-4 mt-4 flex justify-end gap-3 flex-shrink-0">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(coachAdvice);
                      setCopiedAdvice(true);
                      toast.success("AI Blueprint copied!");
                      setTimeout(() => setCopiedAdvice(false), 1400);
                    }}
                    className="px-4 py-2 border border-line bg-background text-foreground hover:bg-bg-soft text-[10px] font-bold uppercase tracking-widest rounded transition-all cursor-pointer"
                  >
                    {copiedAdvice ? "Copied!" : "Copy Blueprint"}
                  </button>
                  <button
                    onClick={() => setIsCoachModalOpen(false)}
                    className="px-4 py-2 bg-accent text-white text-[10px] font-bold uppercase tracking-widest rounded hover:opacity-95 transition-all cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
