"use client";

import { useSprintStore } from "@/store/useSprintStore";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO } from "date-fns";
import { History, Target, ShieldCheck, Clock } from "lucide-react";

export default function HistoryPage() {
  const { sprints } = useSprintStore();
  const sortedSprints = [...sprints].sort((a, b) => b.startDate.localeCompare(a.startDate));

  return (
    <div className="max-w-4xl mx-auto space-y-8 lg:space-y-12 px-2 sm:px-0">
      {/* Page Header */}
      <div className="pb-6 border-b border-line text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Mission History</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Review your past strategic deployments and results.</p>
      </div>

      {/* Mission Log Timeline */}
      <div className="space-y-4 sm:space-y-6">
        <AnimatePresence mode="popLayout">
          {sortedSprints.length === 0 ? (
            <div className="py-16 sm:py-20 text-center border-2 border-dashed border-line rounded-2xl opacity-40">
              <History className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Your archive is currently empty.</p>
            </div>
          ) : (
            sortedSprints.map((sprint, i) => (
              <motion.div
                key={sprint.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="glass-card group overflow-hidden border-line"
              >
                <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                  <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                    <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${sprint.isActive ? 'bg-accent/10 text-accent' : 'bg-bg-soft text-muted-foreground'}`}>
                      {sprint.isCompleted ? <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" /> : <Clock className="h-5 w-5 sm:h-6 sm:w-6" />}
                    </div>
                    
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <h3 className="text-base sm:text-lg font-bold text-foreground truncate max-w-[150px] sm:max-w-none">{sprint.name}</h3>
                        {sprint.isActive && (
                          <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 bg-accent/10 text-accent rounded-full uppercase tracking-wider">Active</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-medium truncate">
                        <Target className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                        <span className="truncate">{sprint.goal}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-8 shrink-0 md:text-right border-t md:border-t-0 border-line pt-4 md:pt-0">
                    <div className="space-y-0.5">
                      <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Duration</p>
                      <p className="text-xs sm:text-sm font-semibold text-foreground">
                        {format(parseISO(sprint.startDate), 'MMM dd')} — {format(parseISO(sprint.endDate), 'yy')}
                      </p>
                    </div>
                    
                    <div className="space-y-0.5 text-right">
                      <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</p>
                      <p className={`text-xs sm:text-sm font-bold ${sprint.isCompleted ? 'text-emerald-500' : (sprint.isActive ? 'text-accent' : 'text-muted-foreground')}`}>
                        {sprint.isCompleted ? 'Completed' : (sprint.isActive ? 'In Progress' : 'Aborted')}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <footer className="pt-8 text-center opacity-40">
        <p className="text-[10px] sm:text-xs font-medium text-muted-foreground italic">End of mission logs.</p>
      </footer>
    </div>
  );
}
