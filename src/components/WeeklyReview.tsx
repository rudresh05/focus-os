"use client";

import React, { useState } from 'react';
import { useSprintStore } from '@/store/useSprintStore';
import { Button } from '@/components/ui/Button';
import { History, ArrowRight, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function WeeklyReview() {
  const { activeSprint, addWeeklyReview, weeklyReviews } = useSprintStore();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    whatWorked: '',
    whatFailed: '',
    biggestDistraction: '',
    nextWeekFocus: '',
  });

  const today = new Date();
  const isSunday = today.getDay() === 0;
  const lastReview = weeklyReviews[weeklyReviews.length - 1];
  const alreadyReviewed = lastReview && format(new Date(lastReview.date), 'yyyy-ww') === format(today, 'yyyy-ww');

  if (!activeSprint) return null;

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
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-background border border-line rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-10 relative">
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="absolute top-8 right-8 p-2 text-muted-foreground hover:text-foreground transition-all rounded-full hover:bg-bg-soft"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mb-10">
                  <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">Step {step} of 4</p>
                  <h4 className="text-2xl font-bold text-foreground">Weekly Reflection</h4>
                </div>

                <div className="min-h-[220px] flex flex-col justify-center">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <h5 className="text-lg font-semibold text-foreground">What went right this week?</h5>
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
                      <h5 className="text-lg font-semibold text-foreground">Where did you fall short?</h5>
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
                      <h5 className="text-lg font-semibold text-foreground">What was your biggest distraction?</h5>
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
                      <h5 className="text-lg font-semibold text-foreground">Next week's primary directive?</h5>
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

                <div className="flex gap-4 mt-12">
                  {step > 1 && (
                    <button 
                      onClick={() => setStep(step - 1)} 
                      className="flex-1 py-3 text-sm font-semibold border border-line hover:bg-bg-soft transition-all text-muted-foreground rounded-xl"
                    >
                      Back
                    </button>
                  )}
                  <button 
                    onClick={() => step < 4 ? setStep(step + 1) : handleSubmit()}
                    className="flex-[2] py-3 text-sm font-bold bg-accent text-white hover:opacity-90 transition-all rounded-xl shadow-lg shadow-accent/10 disabled:opacity-20"
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
