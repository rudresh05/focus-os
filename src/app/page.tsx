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

export default function Home() {
  const { user } = useAuth();
  const { activeSprint, syncData } = useSprintStore();
  const { syncIdeas } = useIdeaStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user) {
      syncData();
      syncIdeas();
    }
  }, [syncData, syncIdeas, user]);

  if (!mounted || !user) return null;

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-8 lg:space-y-12 px-2 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 pb-6 border-b border-line">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">Manage your active sprint and daily objectives.</p>
        </div>
        
        {activeSprint && (
          <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-accent/5 border border-accent/10 rounded-full self-center md:self-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-wider">Sprint Active</span>
          </div>
        )}
      </div>

      {!activeSprint ? (
        <div className="flex items-center justify-center py-8 md:py-12">
          <CreateSprintForm />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Content (Top on mobile) */}
          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
            <section className="space-y-4">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Active Mission</h2>
              <SprintDashboard />
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Objectives</h2>
              <DailyTracker />
            </section>
          </div>

          {/* Sidebar Left (Stats) */}
          <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            <section className="space-y-4">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Performance</h2>
              <Metrics />
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Quick Actions</h2>
              <div className="glass p-1 rounded-xl">
                 <WeeklyReview />
              </div>
            </section>
          </div>
          
          {/* Sidebar Right (Ideas) */}
          <div className="lg:col-span-3 space-y-8 order-3 lg:order-3">
             <section className="space-y-4 h-full">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Parking Lot</h2>
              <IdeaParkingLot />
            </section>
          </div>
        </div>
      )}

      <footer className="pt-8 pb-8 border-t border-line text-center">
        <p className="text-[10px] md:text-xs font-medium text-muted-foreground opacity-50">Focus OS • Operational Link Established</p>
      </footer>
    </div>
  );
}
