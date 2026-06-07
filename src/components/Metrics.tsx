"use client";

import React from 'react';
import { useSprintStore } from '@/store/useSprintStore';
import { Zap, Shield, BarChart3, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export function Metrics() {
  const { dailyTracking, getSprintIntegrity } = useSprintStore();
  
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayData = dailyTracking.find(d => d.date === todayStr);
  const dailyScore = todayData?.score || 0;

  const integrity = getSprintIntegrity();
  const currentStreak = calculateStreak(dailyTracking);

  const stats = [
    { label: 'Integrity', value: `${integrity}%`, icon: Shield, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Streak', value: currentStreak, icon: Zap, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Today', value: `${dailyScore}%`, icon: Activity, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="space-y-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="glass-card p-5 flex items-center justify-between group"
        >
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">{stat.label}</p>
            <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
          </div>
          <div className={cn("p-3 rounded-xl transition-all duration-300", stat.bg, stat.color)}>
            <stat.icon className="h-5 w-5" />
          </div>
        </div>
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
