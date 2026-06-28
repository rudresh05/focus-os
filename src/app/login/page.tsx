"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  LayoutDashboard, 
  AlertCircle, 
  ChevronRight, 
  Target, 
  Zap, 
  History,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

const features = [
  { icon: Target, title: "Precision Planning", desc: "Design high-impact sprints with custom objectives." },
  { icon: Zap, title: "Performance Intel", desc: "Track your growth velocity with advanced analytics." },
  { icon: History, title: "Mission Archives", desc: "Access a detailed timeline of your past executions." },
];

export default function LoginPage() {
  const router = useRouter();
  const { user, isAdmin, loading, configured, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, loading, router, user]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!validate()) return;

    setBusy(true);
    try {
      await login(email.trim(), password);
      router.replace("/");
    } catch {
      setError("Login failed. Please check your credentials.");
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-background flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Side: Hero / Landing Content */}
      <section className="relative flex-1 hidden lg:flex flex-col justify-between p-16 xl:p-24 bg-bg-soft overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
           <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-accent/20 blur-[140px] rounded-full animate-pulse" />
           <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent-alt/10 blur-[120px] rounded-full" />
           <div className="absolute inset-0 bg-mesh opacity-30" />
        </div>

        <div className="relative z-10">
           <div className="flex items-center gap-3 mb-16">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white shadow-lg">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">Focus OS</span>
           </div>

           <div className="max-w-2xl space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-accent text-[10px] font-bold uppercase tracking-widest mb-6">
                  <Sparkles className="h-3 w-3" /> System Version 2.0
                </div>
                <h1 className="text-6xl xl:text-7xl font-bold text-foreground tracking-tighter leading-[0.9]">
                   Master your time. <br/>
                   <span className="text-accent">Execute</span> your goals.
                </h1>
                <p className="text-lg xl:text-xl text-muted-foreground mt-8 leading-relaxed max-w-lg">
                   The high-performance workstation for strategic planning, daily execution, and advanced behavioral analysis.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="grid grid-cols-1 gap-8 pt-12"
              >
                {features.map((f, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-accent group-hover:border-accent">
                      <f.icon className="h-6 w-6 text-accent transition-all group-hover:scale-110" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-foreground text-lg">{f.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
           </div>
        </div>

        <div className="relative z-10 flex items-center gap-8 text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">
           <span>Precision Crafted</span>
           <div className="w-8 h-[1px] bg-foreground/20" />
           <span>Continuous Delivery</span>
        </div>
      </section>

      {/* Right Side: Professional Auth Panel */}
      <section className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-24 relative bg-background">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile Logo Only */}
          <div className="lg:hidden flex flex-col items-center mb-12">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white mb-4 shadow-lg">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Focus OS</h2>
          </div>

          <div className="space-y-2 mb-10">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Sign in</h2>
            <p className="text-muted-foreground font-medium">Access your personalized mission dashboard.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6" noValidate>
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-xl text-sm font-semibold flex items-center gap-3"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {!configured && (
              <div className="bg-accent/10 border border-accent/20 text-accent p-4 rounded-xl text-xs font-semibold">
                Configuration missing. Check your environment variables.
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground ml-1 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                  }}
                  placeholder="name@example.com"
                  className={cn(
                    "w-full bg-bg-soft border rounded-2xl p-4 text-sm transition-all outline-none",
                    errors.email ? "border-rose-500 ring-1 ring-rose-500" : "border-line focus:border-accent focus:ring-1 focus:ring-accent"
                  )}
                />
                {errors.email && <p className="text-[10px] font-bold text-rose-500 ml-1 uppercase tracking-widest">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">Password</label>
                  <button type="button" className="text-[10px] font-bold text-accent hover:underline uppercase tracking-widest">Forgot?</button>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                  }}
                  placeholder="••••••••"
                  className={cn(
                    "w-full bg-bg-soft border rounded-2xl p-4 text-sm transition-all outline-none",
                    errors.password ? "border-rose-500 ring-1 ring-rose-500" : "border-line focus:border-accent focus:ring-1 focus:ring-accent"
                  )}
                />
                {errors.password && <p className="text-[10px] font-bold text-rose-500 ml-1 uppercase tracking-widest">{errors.password}</p>}
              </div>
            </div>

            <button 
              disabled={busy || !configured} 
              className="w-full h-14 bg-accent hover:opacity-90 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 text-base disabled:opacity-50 shadow-xl shadow-accent/20 mt-4 group"
            >
              {busy ? "Opening Portal..." : "Sign in to System"}
              {!busy && <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-line flex flex-col gap-6">
            <p className="text-center text-xs text-muted-foreground font-medium italic">
               Join the high-integrity execution network.
            </p>
            <Link href="https://rudreshp.me" className="inline-flex items-center justify-center gap-3 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Return to landing page
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
