"use client";

import { useSprintStore } from '@/store/useSprintStore';
import { useIdeaStore } from '@/store/useIdeaStore';
import { SprintDashboard } from '@/components/SprintDashboard';
import { DailyTracker } from '@/components/DailyTracker';
import { Metrics } from '@/components/Metrics';
import { IdeaParkingLot } from '@/components/IdeaParkingLot';
import { CreateSprintForm } from '@/components/CreateSprintForm';
import { WeeklyReview } from '@/components/WeeklyReview';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { motion } from 'framer-motion';
import { Shield, Clock, Power, Cpu, Activity, User, BookOpen } from 'lucide-react';
import { format } from 'date-fns';

export default function Home() {
  const { user } = useAuth();
  const { activeSprint, syncData, dailyTracking } = useSprintStore();
  const { syncIdeas } = useIdeaStore();
  const [mounted, setMounted] = useState(false);
  const [timeStr, setTimeStr] = useState("");
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    setMounted(true);
    if (user) {
      syncData();
      syncIdeas();
    }
  }, [syncData, syncIdeas, user]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(format(now, 'HH:mm:ss'));
      const hour = now.getHours();
      if (hour < 12) setGreeting("Good morning");
      else if (hour < 17) setGreeting("Good afternoon");
      else setGreeting("Good evening");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted || !user) return null;

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayData = dailyTracking.find(d => d.date === todayStr);
  const completedTasksCount = todayData?.tasks?.filter((t: any) => t.isCompleted).length || 0;
  const totalTasksCount = todayData?.tasks?.length || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[1280px] mx-auto space-y-8 lg:space-y-10 px-0 sm:px-6 lg:px-8 py-2"
    >
      {/* Visual Ambient Backlight */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Redesigned Glassmorphic Welcome Banner */}
      <div className="glass-card p-5 sm:p-8 border-line relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-accent opacity-35 group-hover:opacity-75 transition-opacity" />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-accent opacity-35 group-hover:opacity-75 transition-opacity" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-accent/10 text-accent">
                <Cpu className="w-3.5 h-3.5 animate-pulse" />
              </span>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-accent/80">Command Terminal Established</p>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black heading-modern uppercase tracking-tighter italic text-foreground leading-tight break-all sm:break-normal">
              {greeting}, <span className="bg-gradient-to-r from-accent to-accent-alt bg-clip-text text-transparent">{user.displayName || user.email?.split('@')[0] || "Agent"}</span>
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
              Welcome back to Focus OS. Your neural connection is synchronized. {activeSprint ? "Execute daily tactical objectives to maintain sprint integrity." : "Awaiting database briefing. Initialize a new mission sequence to start tracking."}
            </p>
          </div>

          {/* HUD Metric Block */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:flex md:items-center md:gap-6 border-t md:border-t-0 md:border-l border-line pt-4 md:pt-0 md:pl-8 w-full md:w-auto">
            <div className="space-y-1 min-w-0 md:min-w-[100px]">
              <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-accent-alt" /> Temporal Sync
              </p>
              <p className="text-xs sm:text-xl font-black font-mono text-foreground italic tabular-nums truncate">{timeStr || "00:00:00"}</p>
            </div>

            <div className="space-y-1 min-w-0 md:min-w-[100px]">
              <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1">
                <Activity className="w-2.5 h-2.5 text-success" /> System Status
              </p>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success/5 border border-success/20 text-[9px] font-bold text-success uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
                  Optimized
                </span>
              </div>
            </div>

            {activeSprint && (
              <div className="space-y-1 min-w-0 md:min-w-[120px]">
                <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5 text-accent" /> Task Coverage
                </p>
                <p className="text-[10px] sm:text-xs font-black text-foreground uppercase tracking-widest leading-normal truncate">
                  {completedTasksCount}/{totalTasksCount} Built
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.03] pointer-events-none" />
      </div>

      {!activeSprint ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
        >
          {/* Mission Briefing Guidelines */}
          <div className="lg:col-span-7 flex flex-col justify-between glass-card p-8 border-line relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-line opacity-30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-line opacity-30" />
            
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-amber-500/10 text-amber-500">
                  <Power className="w-4 h-4" />
                </span>
                <h2 className="text-xs font-extrabold uppercase tracking-[0.25em] text-muted-foreground">Operational Protocol Required</h2>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight italic">Initiate High-Velocity Sprints</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Focus OS runs on goal-oriented sprint execution paths. By initiating a sprint, you establish a primary mission directive, define structured daily objectives, and activate tactical metric tracking.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-line/60 bg-bg-soft/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-accent">
                    <Shield className="w-3.5 h-3.5" />
                    <p className="text-[10px] font-extrabold uppercase tracking-wider">Sprint Integrity</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">Maintains focus accuracy. Score tracks how consistently you finish daily task queues.</p>
                </div>

                <div className="p-4 rounded-xl border border-line/60 bg-bg-soft/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-accent-alt">
                    <Activity className="w-3.5 h-3.5" />
                    <p className="text-[10px] font-extrabold uppercase tracking-wider">Dynamic Feedback</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">AI Advisor analysis tracks task outlines, providing architectural and execution coaching.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-line mt-6 flex items-center justify-between text-muted-foreground">
              <span className="text-[9px] font-mono uppercase tracking-widest flex items-center gap-1.5">
                <User className="w-3 h-3 text-accent" /> Commander: {user.email}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-accent-alt" /> Status: Offline
              </span>
            </div>
          </div>

          {/* Create Sprint Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <CreateSprintForm />
          </div>
        </motion.div>
      ) : (
        /* Dynamic Dual-Column Dashboard Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Hub (Left Column - 7/12 width) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8 lg:space-y-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.25em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Active Mission Protocol
                </h2>
              </div>
              <SprintDashboard />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.25em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-alt" />
                  Daily Execution list
                </h2>
              </div>
              <DailyTracker />
            </div>
          </div>

          {/* System Monitor (Right Column - 5/12 width) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8 lg:space-y-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.25em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-action" />
                  Performance Analytics
                </h2>
              </div>
              <Metrics />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.25em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                  Sprint Action Retros
                </h2>
              </div>
              <div className="glass-card p-2 rounded-2xl border-line">
                <WeeklyReview />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.25em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                  Concept Parking Lot
                </h2>
              </div>
              <IdeaParkingLot />
            </div>
          </div>
        </div>
      )}

      {/* Footer System Status */}
      <footer className="pt-8 pb-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest">
          Focus OS v2.1.0 • Node Operational Link Established
        </p>
        <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest">
          Synchronized: {format(new Date(), 'dd MMM yyyy').toUpperCase()}
        </p>
      </footer>
    </motion.div>
  );
}
