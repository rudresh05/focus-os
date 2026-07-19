"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Dock } from "@/components/Dock";
import { Toaster } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { motion, AnimatePresence } from "framer-motion";

import { useSprintStore } from "@/store/useSprintStore";
import { useIdeaStore } from "@/store/useIdeaStore";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login";
  const isAuthenticated = !loading && user;
  const [mounted, setMounted] = useState(false);

  const syncSprints = useSprintStore(s => s.syncData);
  const syncIdeas = useIdeaStore(s => s.syncIdeas);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      syncSprints();
      syncIdeas();
    }
  }, [isAuthenticated, syncSprints, syncIdeas]);

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.replace("/login");
    }
  }, [user, loading, isLoginPage, router]);

  if ((loading || !mounted) && !isLoginPage) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
          <p className="text-xs font-medium text-muted-foreground animate-pulse">Loading OS</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-background">
      {/* Subtle background texture */}
      <div className="bg-mesh" />
      
      {!isLoginPage && isAuthenticated && <Dock />}

      <div className={cn(
        "relative flex flex-col min-h-screen transition-all duration-300 overflow-x-hidden",
        isAuthenticated && !isLoginPage ? "lg:pl-64 pt-16 lg:pt-0" : ""
      )}>
        <Toaster 
          position="top-right" 
          theme={theme as any}
          toastOptions={{
            style: {
              background: 'var(--panel)',
              border: '1px solid var(--line)',
              color: 'var(--text)',
              fontSize: '13px',
              borderRadius: '0.75rem',
              boxShadow: 'var(--shadow)',
            }
          }}
        />
        
        <main className={cn(
          "flex-1 w-full relative",
          isLoginPage ? "" : "p-3 sm:p-6 md:p-12 lg:p-16"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}
