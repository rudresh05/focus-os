"use client";

import React, { useState } from 'react';
import { useSprintStore } from '@/store/useSprintStore';
import { format, differenceInDays, parseISO } from 'date-fns';
import { Target, Clock, ShieldAlert, Cpu, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

export function SprintDashboard() {
  const { activeSprint, completeSprint } = useSprintStore();
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);

  const handleTerminateConfirm = async () => {
    await completeSprint();
    toast.info("MISSION ABORTED");
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
        className="glass-card p-8 md:p-10 border-line relative group overflow-hidden"
      >
        {/* Tactical Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent opacity-20 group-hover:opacity-60 transition-opacity" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent opacity-20 group-hover:opacity-60 transition-opacity" />

        <div className="flex flex-col gap-10 relative z-10">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-4 min-w-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-2 py-0.5 bg-accent/5 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-widest rounded shadow-[0_0_10px_rgba(var(--accent),0.1)]">
                   <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                   Active mission protocol
                </div>
                <div className="h-[1px] w-8 bg-line" />
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground italic">Node_Alpha_01</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black heading-modern tracking-tighter uppercase italic text-foreground leading-[0.8] break-words">
                {activeSprint.name}
              </h2>
              
              <div className="flex items-start gap-4 text-muted-foreground font-bold text-sm md:text-base border-l-2 border-accent/20 pl-6 py-1">
                <div className="space-y-1">
                   <p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent/60">Primary Target objective</p>
                   <p className="break-words leading-tight text-foreground/80">{activeSprint.goal}</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsTerminateModalOpen(true)} 
              className="px-5 py-2 bg-foreground/5 hover:bg-rose-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest rounded border border-line shrink-0"
            >
              Abort
            </button>
          </div>

          {/* HUD Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-line pt-10">
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

            <div className="text-right space-y-2">
              <div className="flex items-center justify-end gap-2">
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
    </>
  );
}
