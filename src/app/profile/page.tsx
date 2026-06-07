"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { motion } from "framer-motion";
import { Shield, Terminal, LogOut, Cpu, Activity, User } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [hudOpacity, setHudOpacity] = useState(70);
  const [notifications, setNotifications] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-8 lg:space-y-12 px-2 sm:px-0">
        {/* Header */}
        <div className="pb-6 border-b border-line">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-accent font-bold text-2xl sm:text-3xl shadow-xl shadow-accent/5 rounded-2xl">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Personnel Profile</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium truncate">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Security Module */}
          <div className="lg:col-span-1 glass-card p-6 sm:p-8 space-y-6 sm:space-y-8 border-line">
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-accent-alt" />
              <h3 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider">Account Identity</h3>
            </div>
            
            <div className="space-y-6">
              <div className="pb-6 border-b border-line">
                <label className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Email Address</label>
                <div className="text-sm sm:text-base font-semibold text-foreground truncate">{user.email}</div>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Access Privileges</label>
                <div className="flex items-center gap-3 text-[10px] sm:text-xs font-bold text-accent-alt bg-accent-alt/5 p-2.5 sm:p-3 border border-accent-alt/20 rounded-xl">
                  <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Administrative Operator
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Module */}
          <div className="lg:col-span-2 glass-card p-6 sm:p-8 space-y-6 sm:space-y-8 border-line">
            <div className="flex items-center gap-3">
              <Cpu className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              <h3 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider">Workstation Setup</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">HUD Translucency</p>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Interface visual gain</p>
                  </div>
                  <span className="text-xs font-bold text-accent">{hudOpacity}%</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={hudOpacity} 
                  onChange={(e) => setHudOpacity(parseInt(e.target.value))}
                  className="w-full h-1.5 sm:h-1 bg-bg-soft rounded-full appearance-none cursor-pointer accent-accent border border-line"
                />
              </div>

              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">System Alerts</p>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Notification Protocol</p>
                  </div>
                  <button 
                    onClick={() => setNotifications(!notifications)}
                    className={`w-10 h-5.5 sm:w-11 sm:h-6 rounded-full transition-all flex items-center px-1 ${notifications ? 'bg-accent' : 'bg-line'}`}
                  >
                    <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white shadow-sm transition-all ${notifications ? 'translate-x-4.5 sm:translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
                <p className="text-[11px] sm:text-xs text-muted-foreground font-medium leading-relaxed">
                  Toggle critical mission updates via the neural dashboard link.
                </p>
              </div>
            </div>
          </div>

          {/* Actions Module */}
          <div className="lg:col-span-3 glass-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 border-line">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="p-3.5 sm:p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              </div>
              <div className="text-center md:text-left min-w-0">
                <p className="text-sm font-bold text-foreground">Sync Integrity: 100%</p>
                <p className="text-[11px] sm:text-xs font-medium text-muted-foreground mt-1 truncate">Data is synchronized with the core database.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-4 sm:px-6 py-2.5 btn-secondary text-[11px] sm:text-xs font-semibold rounded-xl">
                Clear Cache
              </button>
              <button 
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex-[1.5] md:flex-none px-4 sm:px-6 py-2.5 bg-rose-500 text-white text-[11px] sm:text-xs font-bold rounded-xl hover:bg-rose-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-500/10"
              >
                <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={logout}
        variant="danger"
        title="Sign Out"
        description="Are you sure you want to end your current session? You will need to re-verify your identity to access the dashboard."
        confirmText="Sign Out"
        cancelText="Cancel"
      />
    </>
  );
}
