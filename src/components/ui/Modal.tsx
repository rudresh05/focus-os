"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, ShieldAlert, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "info" | "success";
}

export function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "info"
}: ModalProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const icons = {
    danger: <ShieldAlert className="h-10 w-10 text-rose-500" />,
    info: <AlertTriangle className="h-10 w-10 text-accent-alt" />,
    success: <CheckCircle2 className="h-10 w-10 text-accent" />
  };

  const buttonStyles = {
    danger: "bg-rose-500 hover:bg-rose-600 text-white",
    info: "bg-foreground text-background hover:opacity-90",
    success: "bg-accent hover:bg-accent/90 text-background"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg glass p-10 shadow-[0_0_100px_rgba(0,0,0,0.5)] border-line z-10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 text-muted-foreground hover:text-foreground transition-all rounded-full hover:bg-foreground/5"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-8">
              <div className="p-4 bg-foreground/[0.03] border border-line rounded-3xl">
                {icons[variant]}
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl font-black heading-modern uppercase tracking-tighter italic text-foreground">
                  {title}
                </h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-[280px] mx-auto uppercase tracking-wider opacity-60">
                  {description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
                <button 
                  onClick={onClose}
                  className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.4em] border border-line hover:bg-foreground/5 transition-all rounded-xl text-muted-foreground"
                >
                  {cancelText}
                </button>
                {onConfirm && (
                  <button 
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className={cn(
                      "flex-[1.5] py-4 text-[10px] font-black uppercase tracking-[0.4em] rounded-xl transition-all shadow-xl",
                      buttonStyles[variant]
                    )}
                  >
                    {confirmText}
                  </button>
                )}
              </div>
            </div>

            {/* Footer decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-line to-transparent opacity-20" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
