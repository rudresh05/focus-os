"use client";

import { Metrics } from "@/components/Metrics";
import { motion } from "framer-motion";
import { useSprintStore } from "@/store/useSprintStore";
import { 
  format, 
  startOfYear, 
  endOfYear, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek,
  isBefore,
  startOfDay,
  isSameWeek,
  subDays,
  isSameDay
} from "date-fns";
import { TrendingUp, Calendar, Zap, AlertCircle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useMemo, useState } from "react";

export default function AnalyticsPage() {
  const { dailyTracking } = useSprintStore();
  const today = startOfDay(new Date());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentWeekRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Define range: Current Calendar Year (January to December)
  const startDate = startOfWeek(startOfYear(today));
  const endDate = endOfWeek(endOfYear(today));
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  const getScoreForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayData = dailyTracking.find(d => d.date === dateStr);
    return dayData?.score || 0;
  };

  // Group days by week
  const weeks: Date[][] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  // Calculate real Growth Velocity data
  const velocityData = useMemo(() => {
    const last24Days = Array.from({ length: 24 }).map((_, i) => subDays(today, 23 - i));
    return last24Days.map(date => ({
      date: format(date, 'MMM dd'),
      score: getScoreForDate(date)
    }));
  }, [dailyTracking, today]);

  // Auto-scroll to current week on mount
  useEffect(() => {
    if (mounted && currentWeekRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const element = currentWeekRef.current;
      const scrollPos = element.offsetLeft - container.offsetWidth / 2 + element.offsetWidth / 2;
      container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 lg:space-y-12 px-2 sm:px-0">
      {/* Page Header */}
      <div className="pb-6 border-b border-line text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">Performance intelligence and annual protocol analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Metrics />
        </div>
        
        <div className="lg:col-span-3 space-y-8">
          {/* Horizontal Weekly Breakdown Heatmap */}
          <div className="glass-card p-6 sm:p-8 border-line overflow-hidden">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-accent/60" />
                <h3 className="text-base font-bold text-foreground">Annual Efficiency Breakdown</h3>
              </div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-bg-soft px-3 py-1 rounded-full">
                Calendar Year: {format(today, 'yyyy')}
              </div>
            </div>
            
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto custom-scrollbar pb-6"
            >
              <div className="inline-flex gap-4">
                {/* Week Legend */}
                <div className="flex flex-col gap-2 pt-10 shrink-0 sticky left-0 bg-background/50 backdrop-blur-md z-20 pr-2">
                  {dayLabels.map((label, i) => (
                    <div key={i} className="h-6 flex items-center justify-end">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Weekly Columns */}
                {weeks.map((week, wIdx) => {
                  const scores = week.map(day => getScoreForDate(day));
                  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / 7);
                  const isCurrentWeek = isSameWeek(week[0], today);

                  return (
                    <motion.div 
                      key={wIdx}
                      ref={isCurrentWeek ? currentWeekRef : null}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0 }}
                      className={cn(
                        "flex flex-col gap-2 p-3 rounded-xl transition-all duration-300 border shrink-0",
                        isCurrentWeek ? "bg-accent/[0.05] border-accent/40 shadow-lg shadow-accent/5 scale-105 z-10" : "bg-bg-soft/30 border-line/5"
                      )}
                    >
                      {/* Week Header */}
                      <div className="text-center mb-2 space-y-1">
                        <p className={cn(
                          "text-[8px] font-black uppercase tracking-tighter",
                          isCurrentWeek ? "text-accent" : "text-muted-foreground"
                        )}>
                          {isCurrentWeek ? 'Current' : format(week[0], 'MMM dd')}
                        </p>
                        <div className={cn(
                          "text-sm font-black tracking-tight",
                          avg > 80 ? "text-accent" : "text-foreground/60"
                        )}>
                          {avg}%
                        </div>
                      </div>

                      {/* Day Nodes */}
                      <div className="flex flex-col gap-2">
                        {week.map((day, dIdx) => {
                          const score = getScoreForDate(day);
                          const isPast = isBefore(day, today);
                          const isFailed = isPast && score < 80;
                          const todayIsCurrent = isSameDay(day, today);

                          return (
                            <div 
                              key={dIdx}
                              title={`${format(day, 'EEEE, MMM dd')}: ${score}%`}
                              className={cn(
                                "w-6 h-6 rounded-md transition-all hover:scale-110 cursor-help border border-line/5 flex items-center justify-center relative group/item",
                                score === 0 && !isFailed ? "bg-bg-soft" : "",
                                todayIsCurrent ? "ring-2 ring-accent ring-offset-2 ring-offset-background z-10" : ""
                              )}
                              style={{ 
                                backgroundColor: isFailed ? 'var(--rose)' :
                                                 score >= 80 ? 'var(--accent)' : 
                                                 score > 0 ? 'color-mix(in srgb, var(--accent) 50%, transparent)' :
                                                 undefined
                              }}
                            >
                              <span className="text-[7px] font-bold text-background opacity-0 group-hover/item:opacity-100 transition-opacity">
                                {score}
                              </span>
                              <div className="absolute left-full ml-3 px-2 py-1 bg-foreground text-background text-[10px] font-bold rounded shadow-xl opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                <div className="flex items-center gap-2">
                                  {isFailed && <AlertCircle className="h-3 w-3 text-rose-500" />}
                                  <span>{format(day, 'MMM d')}: {score}% {todayIsCurrent && '(Today)'}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-bg-soft border border-line rounded-sm" />
                  <span>Rest/Future</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent shadow-sm rounded-sm" />
                  <span>Fulfilled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-rose-500 shadow-sm rounded-sm" />
                  <span>Missed</span>
                </div>
              </div>
              <p className="text-[10px] font-medium text-muted-foreground italic uppercase tracking-widest opacity-40">System automatically points to today on load</p>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="glass-card p-6 sm:p-8 border-line group">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">Growth Velocity</p>
                <TrendingUp className="h-4 w-4 text-accent/40 group-hover:text-accent transition-colors" />
              </div>
              <div className="h-20 sm:h-24 flex items-end gap-1.5 px-1">
                {velocityData.map((day, i) => (
                  <div 
                    key={i} 
                    title={`${day.date}: ${day.score}%`}
                    className={cn(
                      "flex-1 transition-all rounded-t-sm cursor-help",
                      day.score >= 80 ? "bg-accent" : 
                      day.score > 0 ? "bg-accent/40" : 
                      "bg-foreground/10"
                    )} 
                    style={{ height: `${Math.max(5, day.score)}%` }} 
                  />
                ))}
              </div>
            </div>
            
            <div className="glass-card p-6 sm:p-8 border-line group">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">Neural Link</p>
                <Zap className="h-4 w-4 text-purple-400/40 group-hover:text-purple-400 transition-colors" />
              </div>
              <div className="h-20 sm:h-24 flex items-center justify-center">
                 <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-foreground tracking-tight italic uppercase">Optimal</p>
                    <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">Consistency Index</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
