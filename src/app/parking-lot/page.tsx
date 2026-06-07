"use client";

import { IdeaParkingLot } from "@/components/IdeaParkingLot";
import { motion } from "framer-motion";

export default function ParkingLotPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12 h-[calc(100vh-160px)] flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-4xl font-black heading-modern mb-2 uppercase italic text-center">Reserve</h2>
        <p className="text-muted text-[10px] font-bold uppercase tracking-[0.4em] text-center">Strategic Backlog • Concept Archive</p>
      </motion.div>

      <div className="flex-1 min-h-0">
        <IdeaParkingLot />
      </div>
    </div>
  );
}
