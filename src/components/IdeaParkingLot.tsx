"use client";

import React, { useState } from 'react';
import { useIdeaStore } from '@/store/useIdeaStore';
import { useSprintStore } from '@/store/useSprintStore';
import { Plus, Trash2, Tag, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const CATEGORIES = ["Project", "System", "Protocol", "Other"];

export function IdeaParkingLot() {
  const { ideas, addIdea, deleteIdea } = useIdeaStore();
  const { activeSprint } = useSprintStore();
  const [newIdea, setNewIdea] = useState('');
  const [category, setCategory] = useState("Other");
  const [error, setError] = useState("");

  const handleAddIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdea.trim()) {
      setError("Concept name is required");
      return;
    }
    await addIdea({ title: newIdea, category });
    setNewIdea('');
    setError("");
    toast.success("Idea archived successfully.");
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="glass-card p-6 space-y-5 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-foreground">Archive Idea</h3>
        </div>
        
        <form onSubmit={handleAddIdea} className="space-y-4" noValidate>
          <div className="space-y-2">
            <input 
              placeholder="Enter a new concept..." 
              value={newIdea}
              onChange={(e) => {
                setNewIdea(e.target.value);
                if (error) setError("");
              }}
              className={cn(
                "w-full bg-background border rounded-xl p-3 text-sm transition-all outline-none",
                error ? "border-rose-500 focus:ring-1 focus:ring-rose-500" : "border-line focus:border-accent focus:ring-1 focus:ring-accent"
              )}
            />
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 text-rose-500 ml-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-bold">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all",
                    category === cat ? "bg-accent text-white border-accent" : "border-line text-muted-foreground hover:bg-bg-soft"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button 
              type="submit" 
              className="p-2.5 bg-accent text-white hover:opacity-90 transition-all rounded-xl shadow-sm"
            >
              <Plus className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {(!Array.isArray(ideas) || ideas.length === 0) ? (
            <div className="py-12 border-2 border-dashed border-line rounded-2xl flex flex-col items-center justify-center opacity-40">
              <p className="text-xs font-medium text-muted-foreground">Your parking lot is empty.</p>
            </div>
          ) : (
            ideas.map((idea, index) => (
              <motion.div 
                layout
                key={idea.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-4 group relative"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-3 w-3 text-accent/60" />
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{idea.category}</span>
                    </div>
                    <button 
                      onClick={() => deleteIdea(idea.id)}
                      className="opacity-0 group-hover:opacity-100 transition-all text-muted-foreground hover:text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-foreground tracking-tight break-words">{idea.title}</span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
