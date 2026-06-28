"use client";

import { AIRoadmap } from "@/components/AIRoadmap";

export default function RoadmapPage() {
  return (
    <div className="fixed inset-0 lg:left-64 top-0 lg:top-0 pt-16 lg:pt-0 flex flex-col overflow-hidden bg-background">
      <AIRoadmap />
    </div>
  );
}
