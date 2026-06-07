"use client";

import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Lightbulb, 
  BarChart2, 
  LogOut, 
  History as HistoryIcon,
  User,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/components/providers/auth-provider';
import { useTheme } from '@/components/providers/theme-provider';
import { Modal } from '@/components/ui/Modal';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Lightbulb, label: 'Parking Lot', href: '/parking-lot' },
  { icon: HistoryIcon, label: 'History', href: '/history' },
  { icon: BarChart2, label: 'Analytics', href: '/analytics' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function Dock() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (pathname === '/login' || (!loading && !user)) return null;

  const NavContent = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <div className={cn("flex items-center gap-3 px-2 mt-2", mobile ? "mb-8" : "mb-10")}>
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white shadow-sm">
           <LayoutDashboard className="h-5 w-5" />
        </div>
        <span className="font-bold text-lg tracking-tight text-foreground">Focus OS</span>
        {mobile && (
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="ml-auto p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Main Menu</p>
        {navItems.map((item) => {
          const isActive = item.href === pathname;
          return (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-accent/10 text-accent" 
                  : "text-muted-foreground hover:bg-bg-soft hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-4.5 w-4.5", isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground")} />
              {item.label}
              {isActive && (
                <motion.div layoutId="sidebar-active" className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="pt-4 mt-4 border-t border-line space-y-1">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">System</p>
        
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-bg-soft hover:text-foreground transition-all group"
        >
          {mounted && (theme === 'dark' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5 text-orange-500" />)}
          {!mounted && <div className="h-4.5 w-4.5" />}
          <span>{theme === 'dark' ? 'Stealth Mode' : 'Solar Mode'}</span>
        </button>

        <button 
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-500/5 transition-all group"
        >
          <LogOut className="h-4.5 w-4.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {user && (
        <div className="mt-4 p-3 bg-bg-soft rounded-xl flex items-center gap-3 border border-line">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">{user.email?.split('@')[0]}</p>
            <p className="text-[10px] text-muted-foreground truncate">Operator</p>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-line z-[100] flex-col p-4">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-line z-[90] flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white">
             <LayoutDashboard className="h-4 w-4" />
          </div>
          <span className="font-bold text-base tracking-tight text-foreground">Focus OS</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-background border-r border-line z-[120] flex flex-col p-4 shadow-2xl"
            >
              <NavContent mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Modal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={logout}
        variant="danger"
        title="Sign Out"
        description="Are you sure you want to sign out of your session?"
        confirmText="Sign Out"
        cancelText="Cancel"
      />
    </>
  );
}
