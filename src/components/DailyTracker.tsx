"use client";

import React from 'react';
import { useSprintStore } from '@/store/useSprintStore';
import { format } from 'date-fns';
import { CheckCircle2, ChevronRight, Hash, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export function DailyTracker() {
  const { activeSprint, getDailyTracking, updateDailyTask } = useSprintStore();
  const today = format(new Date(), 'yyyy-MM-dd');
  const tracking = getDailyTracking(today);

  const handleToggle = async (taskId: string, currentStatus: boolean, taskName: string) => {
    const newStatus = !currentStatus;
    await updateDailyTask(today, taskId, newStatus);
    if (newStatus) {
      toast.success("VERIFIED", {
        description: taskName,
        icon: <CheckCircle2 className="h-4 w-4 text-accent" />
      });
    }
  };

  if (!activeSprint) return null;

  return (
    <div className="glass-card h-full flex flex-col overflow-hidden border-line group relative">
      {/* Tactical Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent opacity-20 group-hover:opacity-60 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent opacity-20 group-hover:opacity-60 transition-opacity" />

      <div className="p-5 sm:p-8 border-b border-line flex items-center justify-between bg-foreground/[0.01] shrink-0 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <Hash className="h-4 w-4 text-accent opacity-40" />
             <h3 className="text-2xl font-black heading-modern uppercase tracking-tighter italic text-foreground leading-none">Tactical List</h3>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-60">Neural Uplink • Daily Execution</p>
        </div>
        <div className="text-right flex items-center gap-4">
          <div className="space-y-1">
            <div className="text-3xl font-black heading-modern text-accent leading-none">
              {tracking.score}%
            </div>
            <div className="text-[8px] font-black uppercase tracking-widest opacity-20 italic flex items-center justify-end gap-1">
               <Activity className="h-2 w-2" /> Synced
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-line relative z-10">
        <AnimatePresence mode="popLayout">
          {Array.isArray(tracking.tasks) && tracking.tasks.map((task, index) => (
            <motion.div 
              layout
              key={task.id} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex items-center justify-between p-4 sm:p-6 px-4 sm:px-10 transition-all group/item",
                task.isCompleted ? "bg-accent/[0.01]" : "hover:bg-foreground/[0.02]"
              )}
            >
              <div 
                onClick={() => handleToggle(task.id, task.isCompleted, task.name)}
                className="flex items-start gap-4 sm:gap-8 cursor-pointer flex-1 min-w-0"
              >
                <div className="relative shrink-0 mt-1">
                   <div className={cn(
                     "w-7 h-7 border-2 flex items-center justify-center transition-all duration-700 rounded-lg",
                     task.isCompleted 
                       ? "bg-accent border-accent shadow-[0_0_20px_rgba(var(--accent),0.3)]" 
                       : "border-line group-hover/item:border-accent/40"
                   )}>
                     {task.isCompleted && <CheckCircle2 className="h-4 w-4 text-background" strokeWidth={4} />}
                   </div>
                   {/* Binary Index Marker */}
                   {!task.isCompleted && (
                     <span className="absolute -left-7 top-1/2 -translate-y-1/2 text-[10px] font-black font-mono text-muted-foreground/20 italic hidden sm:inline">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                     </span>
                   )}
                </div>
                
                <div className="space-y-1 min-w-0">
                  <span className={cn(
                    "text-xl font-bold transition-all duration-700 tracking-tight break-words pr-4",
                    task.isCompleted ? "text-muted-foreground/30 line-through italic" : "text-foreground/90 hover:text-foreground"
                  )}>
                    {task.name}
                  </span>
                </div>
              </div>
              
              <div className={cn(
                "flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] transition-all",
                task.isCompleted ? "text-accent" : "text-muted-foreground/20"
              )}>
                {task.isCompleted ? (
                   <>
                    Verified <div className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_10px_var(--accent)]" />
                   </>
                ) : (
                  <>
                    Pending <ChevronRight className="h-3 w-3" />
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Segmented Bottom Progress */}
      <div className="p-1.5 bg-foreground/5 relative z-10 flex gap-0.5 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-1 flex-1 transition-all duration-1000",
              (i / 50) * 100 < tracking.score ? "bg-accent" : "bg-foreground/10"
            )}
          />
        ))}
      </div>
    </div>
  );
}
