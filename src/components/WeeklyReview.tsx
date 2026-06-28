"use client";

import React, { useState, useMemo } from 'react';
import { useSprintStore } from '@/store/useSprintStore';
import { Button } from '@/components/ui/Button';
import { History, ArrowRight, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, subDays, parseISO } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function WeeklyReview() {
  const { activeSprint, addWeeklyReview, weeklyReviews, dailyTracking } = useSprintStore();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    whatWorked: '',
    whatFailed: '',
    biggestDistraction: '',
    nextWeekFocus: '',
  });
  const [loadingAI, setLoadingAI] = useState(false);

  const today = new Date();
  const isSunday = today.getDay() === 0;

  const pastSevenDaysLogs = useMemo(() => {
    const todayObj = new Date();
    const sevenDaysAgo = subDays(todayObj, 7);
    return (dailyTracking || [])
      .filter((log) => {
        const logDate = parseISO(log.date);
        return (logDate >= sevenDaysAgo && logDate <= todayObj) || log.date === format(todayObj, 'yyyy-MM-dd');
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [dailyTracking]);
  const lastReview = weeklyReviews[weeklyReviews.length - 1];
  const alreadyReviewed = lastReview && format(new Date(lastReview.date), 'yyyy-ww') === format(today, 'yyyy-ww');

  if (!activeSprint) return null;

  const autocompleteWithAI = async () => {
    setLoadingAI(true);
    try {
      const res = await fetch("/api/focus-os/ai-weekly-draft");
      const data = await res.json();
      if (data.error) {
        toast.error("AI Draft Failed", { description: data.error });
      } else {
        setFormData({
          whatWorked: data.whatWorked || "",
          whatFailed: data.whatFailed || "",
          biggestDistraction: data.biggestDistraction || "",
          nextWeekFocus: data.nextWeekFocus || ""
        });
        toast.success("Reflection drafted from your journals!");
      }
    } catch (err) {
      toast.error("Connection Error", { description: "Failed to connect to AI draft generator." });
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmit = async () => {
    await addWeeklyReview({
      sprintId: activeSprint.id,
      weekNumber: Math.ceil((today.getTime() - new Date(activeSprint.startDate).getTime()) / (7 * 24 * 60 * 60 * 1000)),
      ...formData,
      date: format(today, 'yyyy-MM-dd'),
    });
    toast.success("Reflection saved successfully.");
    setIsOpen(false);
  };

  return (
    <>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-accent" />
          <h3 className="text-sm font-bold text-foreground">Weekly Reflection</h3>
        </div>
        
        <div className="p-4 rounded-xl bg-bg-soft border border-line">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Status</p>
          <div className="text-sm font-bold text-foreground flex items-center gap-2">
            {isSunday ? (alreadyReviewed ? 'Sync Completed' : 'Window Open') : 'Ready on Sunday'}
          </div>
        </div>
        
        <button 
          disabled={!isSunday || alreadyReviewed}
          onClick={() => setIsOpen(true)}
          className="w-full btn-glass py-3 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
        >
          {alreadyReviewed ? 'Reflection Archived' : 'Start Reflection'}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl bg-background border border-line rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-10 relative">
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="absolute top-8 right-8 p-2 text-muted-foreground hover:text-foreground transition-all rounded-full hover:bg-bg-soft cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-line">
                  {/* Left Questionnaire Column */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Step {step} of 4</p>
                        <h4 className="text-xl font-bold text-foreground">Weekly Reflection</h4>
                      </div>
                      <button
                        disabled={loadingAI}
                        onClick={autocompleteWithAI}
                        className="text-[10px] font-black uppercase tracking-widest bg-accent/10 text-accent border border-accent/20 px-3 py-1.5 rounded-lg hover:bg-accent hover:text-white transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1"
                      >
                        {loadingAI ? "Drafting..." : "AI Auto-Draft"}
                      </button>
                    </div>

                    <div className="min-h-[220px] flex flex-col justify-center">
                      {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                          <h5 className="text-sm font-semibold text-foreground">What went right this week?</h5>
                          <textarea 
                            autoFocus
                            className="w-full bg-bg-soft border border-line rounded-xl p-4 h-32 focus:border-accent outline-none transition-all text-foreground text-sm font-medium"
                            placeholder="List your wins and effective protocols..."
                            value={formData.whatWorked}
                            onChange={(e) => setFormData({...formData, whatWorked: e.target.value})}
                          />
                        </motion.div>
                      )}
                      {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                          <h5 className="text-sm font-semibold text-foreground">Where did you fall short?</h5>
                          <textarea 
                            autoFocus
                            className="w-full bg-bg-soft border border-line rounded-xl p-4 h-32 focus:border-accent outline-none transition-all text-foreground text-sm font-medium"
                            placeholder="Analyze protocol failures and bottlenecks..."
                            value={formData.whatFailed}
                            onChange={(e) => setFormData({...formData, whatFailed: e.target.value})}
                          />
                        </motion.div>
                      )}
                      {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                          <h5 className="text-sm font-semibold text-foreground">What was your biggest distraction?</h5>
                          <textarea 
                            autoFocus
                            className="w-full bg-bg-soft border border-line rounded-xl p-4 h-32 focus:border-accent outline-none transition-all text-foreground text-sm font-medium"
                            placeholder="Identify what pulled your focus away..."
                            value={formData.biggestDistraction}
                            onChange={(e) => setFormData({...formData, biggestDistraction: e.target.value})}
                          />
                        </motion.div>
                      )}
                      {step === 4 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                          <h5 className="text-sm font-semibold text-foreground">Next week's primary directive?</h5>
                          <textarea 
                            autoFocus
                            className="w-full bg-bg-soft border border-line rounded-xl p-4 h-32 focus:border-accent outline-none transition-all text-foreground text-sm font-medium"
                            placeholder="Define the one thing to rule them all..."
                            value={formData.nextWeekFocus}
                            onChange={(e) => setFormData({...formData, nextWeekFocus: e.target.value})}
                          />
                        </motion.div>
                      )}
                    </div>

                    <div className="flex gap-4 mt-8">
                      {step > 1 && (
                        <button 
                          onClick={() => setStep(step - 1)} 
                          className="flex-1 py-3 text-xs font-semibold border border-line hover:bg-bg-soft transition-all text-muted-foreground rounded-xl cursor-pointer"
                        >
                          Back
                        </button>
                      )}
                      <button 
                        onClick={() => step < 4 ? setStep(step + 1) : handleSubmit()}
                        className="flex-[2] py-3 text-xs font-bold bg-accent text-white hover:opacity-90 transition-all rounded-xl shadow-lg shadow-accent/10 disabled:opacity-20 cursor-pointer"
                        disabled={
                          (step === 1 && !formData.whatWorked) ||
                          (step === 2 && !formData.whatFailed) ||
                          (step === 3 && !formData.biggestDistraction) ||
                          (step === 4 && !formData.nextWeekFocus)
                        }
                      >
                        {step === 4 ? 'Complete Reflection' : 'Continue'}
                      </button>
                    </div>
                  </div>

                  {/* Right History Column */}
                  <div className="lg:col-span-5 lg:pl-8 pt-6 lg:pt-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Past 7 Days Logs</h5>
                      <span className="text-[9px] font-mono text-muted-foreground/60">{pastSevenDaysLogs.length} days active</span>
                    </div>

                    <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
                      {pastSevenDaysLogs.length === 0 ? (
                        <div className="py-8 text-center bg-bg-soft/20 border border-line/40 rounded-xl">
                          <p className="text-xs text-muted-foreground italic">No daily logs registered this week.</p>
                        </div>
                      ) : (
                        pastSevenDaysLogs.map((log) => (
                          <div key={log.date} className="p-3 bg-bg-soft/40 border border-line/50 rounded-xl space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-foreground">{format(parseISO(log.date), 'EEEE, MMM d')}</span>
                              <span className={cn(
                                "text-[9px] font-black px-2 py-0.5 rounded-full border",
                                log.score >= 80 
                                  ? "bg-accent/5 text-accent border-accent/15" 
                                  : "bg-muted-foreground/5 text-muted-foreground border-line/50"
                              )}>
                                Score: {log.score}%
                              </span>
                            </div>

                            {log.tasks && log.tasks.length > 0 ? (
                              <div className="space-y-1.5 pt-0.5">
                                {log.tasks.map((task) => (
                                  <div key={task.id} className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                    <div className={cn(
                                      "w-1.5 h-1.5 rounded-full",
                                      task.isCompleted ? "bg-accent" : "bg-line"
                                    )} />
                                    <span className={task.isCompleted ? "text-foreground font-medium" : "line-through opacity-50"}>
                                      {task.name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-[10px] text-muted-foreground italic">No protocols tracked.</p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
