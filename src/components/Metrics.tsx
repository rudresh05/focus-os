"use client";

import React from 'react';
import { useSprintStore } from '@/store/useSprintStore';
import { Zap, Shield, Activity, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export function Metrics() {
  const { dailyTracking, getSprintIntegrity } = useSprintStore();
  
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayData = dailyTracking.find(d => d.date === todayStr);
  const dailyScore = todayData?.score || 0;

  const integrity = getSprintIntegrity();
  const currentStreak = calculateStreak(dailyTracking);

  const stats = [
    { 
      label: 'Integrity', 
      value: `${integrity}%`, 
      sub: 'Sprint consistency', 
      icon: Shield, 
      color: 'text-accent border-accent/20 bg-accent/5', 
      glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]',
      desc: 'Based on finished daily objectives.'
    },
    { 
      label: 'Streak', 
      value: `${currentStreak} Days`, 
      sub: '80%+ Target days', 
      icon: Zap, 
      color: 'text-amber-500 border-amber-500/20 bg-amber-500/5', 
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
      desc: 'Consecutive high productivity days.'
    },
    { 
      label: 'Today', 
      value: `${dailyScore}%`, 
      sub: 'Task completion', 
      icon: Activity, 
      color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5', 
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
      desc: 'Progress on active task checklist.'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className={cn(
            "glass-card p-5 flex items-center justify-between border-line relative overflow-hidden group hover:border-accent/30 hover:scale-[1.01] transition-all duration-300",
            stat.glow
          )}
        >
          {/* Tactical Indicators */}
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-line opacity-20 group-hover:opacity-60 transition-opacity" />
          
          <div className="space-y-1 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
            <h3 className="text-2xl font-black heading-modern text-foreground italic">{stat.value}</h3>
            <p className="text-[9px] text-muted-foreground/60 leading-normal">{stat.sub}</p>
          </div>
          
          <div className={cn(
            "p-3 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0 relative z-10", 
            stat.color
          )}>
            <stat.icon className="h-5 w-5" />
          </div>

          {/* Micro Background Glow */}
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-foreground/[0.01] rounded-full group-hover:bg-foreground/[0.03] transition-colors" />
        </motion.div>
      ))}
    </div>
  );
}

function calculateStreak(tracking: any[]) {
  let streak = 0;
  const sorted = [...tracking].sort((a, b) => b.date.localeCompare(a.date));
  for (const day of sorted) {
    if (day.score >= 80) streak++;
    else break;
  }
  return streak;
}
