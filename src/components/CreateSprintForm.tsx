"use client";

import React, { useState } from 'react';
import { useSprintStore } from '@/store/useSprintStore';
import { Button } from '@/components/ui/Button';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Target, Clock, Shield, Plus, Trash2, Zap, AlertCircle, ChevronRight } from 'lucide-react';

export function CreateSprintForm() {
  const { startSprint } = useSprintStore();
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState('14');
  
  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Custom Protocols (Tasks)
  const [tasks, setTasks] = useState<string[]>([
    "Deep Work",
    "Physical Exercise",
    "Skill Learning"
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
      setErrors(prev => ({ ...prev, tasks: "" }));
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Sprint name is required";
    if (!goal.trim()) newErrors.goal = "Primary goal is required";
    if (tasks.length === 0) newErrors.tasks = "At least one daily objective is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const startDate = format(new Date(), 'yyyy-MM-dd');
    const endDate = format(addDays(new Date(), parseInt(duration)), 'yyyy-MM-dd');
    await startSprint({ name, goal, startDate, endDate, tasks });
    toast.success("New sprint initialized successfully.");
  };

  const ErrorDisplay = ({ message }: { message?: string }) => (
    <AnimatePresence>
      {message && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-1.5 text-rose-500 mt-2 ml-1"
        >
          <AlertCircle className="h-3.5 w-3.5" />
          <span className="text-[11px] font-bold">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto px-2 sm:px-0"
    >
      <div className="bg-background border border-line rounded-3xl p-6 sm:p-10 lg:p-16 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative z-10">
          
          {/* Left Column: Mission Core */}
          <div className="space-y-8 sm:space-y-12">
            <div className="space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/20">
                <Rocket className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">New Sprint</h2>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">Design your mission parameters.</p>
              </div>
            </div>

            <div className="space-y-8 sm:space-y-10">
              <div className="space-y-3">
                <label className="text-xs font-bold text-foreground ml-1">Sprint Name</label>
                <input 
                  placeholder="e.g. Q3 Launch" 
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                  }}
                  className={cn(
                    "w-full bg-background border rounded-2xl p-3 sm:p-4 outline-none transition-all text-lg sm:text-xl font-bold tracking-tight",
                    errors.name ? "border-rose-500 focus:ring-1 focus:ring-rose-500" : "border-line focus:border-accent focus:ring-1 focus:ring-accent"
                  )}
                />
                <ErrorDisplay message={errors.name} />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-foreground ml-1">Primary Goal</label>
                <textarea 
                  placeholder="What is the one thing you must achieve?" 
                  value={goal}
                  onChange={(e) => {
                    setGoal(e.target.value);
                    if (errors.goal) setErrors(prev => ({ ...prev, goal: "" }));
                  }}
                  className={cn(
                    "w-full bg-background border rounded-2xl p-3 sm:p-4 outline-none transition-all text-sm sm:text-base font-medium resize-none h-24 sm:h-32",
                    errors.goal ? "border-rose-500 focus:ring-1 focus:ring-rose-500" : "border-line focus:border-accent focus:ring-1 focus:ring-accent"
                  )}
                />
                <ErrorDisplay message={errors.goal} />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-foreground ml-1">Duration</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {[7, 14, 30, 90].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d.toString())}
                      className={cn(
                        "h-10 sm:h-12 rounded-xl border font-bold text-xs transition-all",
                        duration === d.toString() 
                          ? "bg-accent text-white border-accent shadow-lg shadow-accent/10" 
                          : "border-line text-muted-foreground hover:bg-bg-soft"
                      )}
                    >
                      {d} Days
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Protocol Design */}
          <div className="space-y-8 sm:space-y-10">
            <div className="space-y-3 sm:space-y-4">
              <label className="text-xs font-bold text-foreground ml-1 flex items-center gap-2">
                Daily Objectives
              </label>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                Add the recurring tasks you will track every day during this sprint.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-2 sm:gap-3">
                <input 
                  placeholder="e.g. Read 20 pages" 
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  className="flex-1 bg-background border border-line rounded-xl p-2.5 sm:p-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent text-xs sm:text-sm font-medium transition-all min-w-0"
                />
                <button 
                  onClick={addTask}
                  type="button"
                  className="p-2.5 sm:p-3 bg-accent text-white rounded-xl hover:opacity-90 transition-all shadow-sm shrink-0"
                >
                  <Plus className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </div>

              <div className="space-y-2 sm:space-y-3 max-h-[300px] sm:max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {tasks.map((task, index) => (
                    <motion.div
                      layout
                      key={task + index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between p-3 sm:p-4 bg-bg-soft border border-line rounded-xl group transition-all hover:border-accent/40"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-foreground truncate mr-2">{task}</span>
                      <button 
                        onClick={() => removeTask(index)}
                        className="p-1.5 text-muted-foreground hover:text-rose-500 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {tasks.length === 0 && (
                  <div className="py-8 sm:py-12 border-2 border-dashed border-line rounded-2xl flex flex-col items-center justify-center opacity-40">
                    <ErrorDisplay message={errors.tasks} />
                    <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mt-2 text-center px-4">Add at least one objective.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4 sm:pt-6">
              <button 
                onClick={handleSubmit}
                className="w-full h-14 sm:h-16 bg-accent text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-accent/10 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                Launch Sprint
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
