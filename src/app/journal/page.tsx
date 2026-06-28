"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { fetchJournals, saveJournal, deleteJournal, fetchAIAnalysis } from "@/lib/api";
import { toast } from "sonner";
import { supabaseAdmin } from "@/lib/supabase";

// ─── Inline SVG Icons ──────────────────────────────────────────────────────────
const IconArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconBook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconHistory = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" /><path d="M12 7v5l4 2" />
  </svg>
);

const IconTrash = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const IconSave = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
  </svg>
);

const IconCopy = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconReset = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
);

const IconBrain = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
);

const IconPython = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" />
  </svg>
);

const IconDataScience = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" />
    <path d="M3 20h18" />
  </svg>
);

const IconML = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
  </svg>
);

const IconGenAI = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
  </svg>
);

const IconDSA = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconSystemDesign = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="3" width="6" height="6" rx="1" />
    <rect x="9" y="15" width="6" height="6" rx="1" />
    <path d="M6 9v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9M12 14v1" />
  </svg>
);

const IconOutput = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconWins = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 11 11 13 15 9" />
  </svg>
);

const IconLeaks = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconTarget = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const IconMetrics = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" /><line x1="2" x2="22" y1="20" y2="20" />
  </svg>
);

const IconTomorrow = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 5.5C4 22 6 21 7.5 19.5M12 2C6 2 2 6 2 12c0 2.5 1 4.5 2.5 6l13.5-13.5C16.5 3 14.5 2 12 2z" /><path d="M22 2l-6 6M12 12l2 2" />
  </svg>
);

const IconLesson = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" />
  </svg>
);

const IconTime = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconGym = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 6.5h11M6.5 17.5h11M18 4v16M6 4v16M3 8v8M21 8v8" />
  </svg>
);

const IconEnergy = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2" /><line x1="22" y1="11" x2="22" y2="13" /><line x1="6" y1="12" x2="14" y2="12" />
  </svg>
);

const IconMoodBurnedOut = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M8 15h8" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const IconMoodFlat = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const IconMoodOkay = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const IconMoodFocused = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="1" />
  </svg>
);

const IconMoodZone = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

type JournalData = {
  stage: string;
  topic: string;
  work: string;
  learned: string;
  built: string;
  recall: string;
  dsaAttempted: string;
  dsaSolved: string;
  dsaTopic: string;
  wins: string;
  waste: string;
  avoided: string;
  stuck: string;
  standard: string;
  holding: string;
  deepWork: string;
  gym: string;
  dsa: string;
  topics: string;
  energy: string;
  mood: string;
  tomorrow: string;
  obj1: string;
  obj2: string;
  obj3: string;
  lesson: string;
  pattern: string;
  honest: string;
};

const STAGES = [
  { label: "Python", icon: IconPython },
  { label: "Data Science", icon: IconDataScience },
  { label: "ML", icon: IconML },
  { label: "Deep Learning", icon: IconBrain },
  { label: "GenAI", icon: IconGenAI },
  { label: "DSA", icon: IconDSA },
  { label: "System Design", icon: IconSystemDesign }
];

const MOODS = [
  { label: "Burned out", icon: IconMoodBurnedOut },
  { label: "Flat", icon: IconMoodFlat },
  { label: "Okay", icon: IconMoodOkay },
  { label: "Focused", icon: IconMoodFocused },
  { label: "In the zone", icon: IconMoodZone }
];

const todayStr = () => new Date().toISOString().slice(0, 10);

const initialJournalData: JournalData = {
  stage: "Python",
  topic: "",
  work: "",
  learned: "",
  built: "",
  recall: "",
  dsaAttempted: "",
  dsaSolved: "",
  dsaTopic: "",
  wins: "",
  waste: "",
  avoided: "",
  stuck: "",
  standard: "",
  holding: "",
  deepWork: "",
  gym: "",
  dsa: "",
  topics: "",
  energy: "",
  mood: "",
  tomorrow: "",
  obj1: "",
  obj2: "",
  obj3: "",
  lesson: "",
  pattern: "",
  honest: ""
};

const TRACKED_FIELDS: Array<keyof JournalData> = [
  "topic", "work", "learned", "built", "wins", 
  "waste", "avoided", "stuck", "standard", "holding", 
  "tomorrow", "obj1", "obj2", "obj3", "lesson", 
  "pattern", "honest", "dsaTopic", "deepWork"
];

export default function JournalPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState(todayStr());
  const [journalData, setJournalData] = useState<JournalData>(initialJournalData);
  const [activePanel, setActivePanel] = useState<"form" | "history" | "audit">("form");
  const [historyEntries, setHistoryEntries] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [aiAnalysisText, setAiAnalysisText] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, router, user]);

  const loadEntries = async () => {
    try {
      const items = await fetchJournals();
      if (Array.isArray(items)) {
        setHistoryEntries(items);
        
        const currentEntry = items.find((item: any) => item.date === selectedDate);
        if (currentEntry) {
          setJournalData({
            ...initialJournalData,
            ...currentEntry.data,
            stage: currentEntry.data?.stage || "Python"
          });
        } else {
          setJournalData({ ...initialJournalData });
        }
      } else {
        console.error("fetchJournals returned non-array:", items);
        setHistoryEntries([]);
        if (items && items.error) {
          toast.error("Database Error", {
            description: items.error
          });
        }
      }
    } catch (err: any) {
      console.error("Failed to load journals:", err);
      setHistoryEntries([]);
    }
  };

  useEffect(() => {
    if (user) {
      loadEntries();
    }
  }, [user, selectedDate]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setJournalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStageSelect = (stage: string) => {
    setJournalData((prev) => ({ ...prev, stage }));
  };

  const handleMoodSelect = (mood: string) => {
    setJournalData((prev) => ({ ...prev, mood: prev.mood === mood ? "" : mood }));
  };

  const handleRecallSelect = (recall: string) => {
    setJournalData((prev) => ({ ...prev, recall: prev.recall === recall ? "" : recall }));
  };

  const saveEntry = async () => {
    if (!journalData.topic && !journalData.learned) {
      toast.error("Validation error", {
        description: "Please fill in at least the 'Topic studied' and 'What I learned' fields."
      });
      return;
    }

    const toastId = toast.loading("Saving your daily ledger entry...");
    try {
      setBusy(true);
      await saveJournal({ date: selectedDate, data: journalData as any });
      
      toast.success("Daily ledger saved to database", { id: toastId });
      
      const items = await fetchJournals();
      setHistoryEntries(items || []);
    } catch (error) {
      console.error("Failed to save entry:", error);
      toast.error("Failed to save entry", {
        id: toastId,
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    } finally {
      setBusy(false);
    }
  };

  const deleteEntry = async (id: string, dateStr: string) => {
    const toastId = toast.loading("Deleting journal entry...");
    try {
      const res = await deleteJournal(id);
      if (res.error) throw new Error(res.error);
      
      toast.success(`Entry for ${dateStr} deleted`, { id: toastId });
      loadEntries();
    } catch (err: any) {
      toast.error("Deletion failed", {
        id: toastId,
        description: err.message
      });
    }
  };

  const resetForm = () => {
    setJournalData({ ...initialJournalData });
    toast.info("Form reset");
  };

  const runAIWorkAudit = async () => {
    setAiLoading(true);
    try {
      const res = await fetchAIAnalysis();
      if (res.error) {
        toast.error("AI Audit Failed", {
          description: res.error
        });
      } else {
        setAiAnalysisText(res.analysis || "");
        toast.success("AI Work Audit Complete!");
      }
    } catch (err: any) {
      console.error("AI analysis trigger failed:", err);
      toast.error("Network Error", {
        description: "Failed to trigger AI audit connection."
      });
    } finally {
      setAiLoading(false);
    }
  };

  const filledCount = useMemo(() => {
    return TRACKED_FIELDS.filter((key) => {
      const val = journalData[key];
      return val && val.trim().length > 0;
    }).length;
  }, [journalData]);

  const completionPct = Math.round((filledCount / TRACKED_FIELDS.length) * 100);

  const markdownString = useMemo(() => {
    const d = journalData;
    return `# AI/ML Journal — ${selectedDate}
**Stage:** ${d.stage} | **Mood:** ${d.mood} | **Recall:** ${d.recall}

## Output
**Topic:** ${d.topic}
**Work done:** ${d.work}
**Learned:** ${d.learned}
**Built:** ${d.built}

## DSA
- Attempted: ${d.dsaAttempted} | Solved: ${d.dsaSolved}
- Topic: ${d.dsaTopic}

## Wins
${d.wins}

## Leaks
**Time waste:** ${d.waste}
**Avoided:** ${d.avoided}
**Stuck on:** ${d.stuck}

## Reality Check
**Google-standard:** ${d.standard}
**Holding pattern:** ${d.holding}

## Metrics
Deep work: ${d.deepWork}h | Gym: ${d.gym} | DSA: ${d.dsa} problems | Energy: ${d.energy}/10

## Tomorrow
${d.tomorrow}
1. ${d.obj1}
2. ${d.obj2}
3. ${d.obj3}

## Lesson
${d.lesson}

## Pattern
${d.pattern}

## Honest note
${d.honest}
`;
  }, [journalData, selectedDate]);

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(markdownString);
    setCopied(true);
    toast.success("Journal copied as Markdown!");
    window.setTimeout(() => setCopied(false), 1400);
  };

  if (loading || !user) return null;

  return (
    <div className="max-w-[1200px] mx-auto min-h-screen pb-16 pt-8 flex flex-col lg:flex-row gap-8 px-2 sm:px-0 bg-background text-foreground">
      
      {/* ─── SIDEBAR ─── */}
      <aside className="w-full lg:w-[280px] flex flex-col gap-5 lg:sticky lg:top-8 lg:h-[calc(100vh-6rem)] overflow-y-auto pr-1">
        <div className="bg-background border border-line rounded-2xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3 pb-3 border-b border-line">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white text-base">
              <IconBrain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground leading-tight">AI/ML Journal</h2>
              <p className="text-[10px] text-muted-foreground mt-0.5">Daily proof of work</p>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-bg-soft border border-line rounded-xl px-3 py-2 text-xs text-foreground outline-none cursor-pointer"
            />
          </div>

          {/* Today's Stage Chips */}
          <div className="border-t border-line pt-4">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-2.5">Today's stage</label>
            <div className="flex flex-wrap gap-1.5">
              {STAGES.map((s) => {
                const isSelected = journalData.stage === s.label;
                const IconComponent = s.icon;
                return (
                  <button
                    key={s.label}
                    onClick={() => handleStageSelect(s.label)}
                    className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                      isSelected 
                        ? "bg-accent border-accent text-white" 
                        : "border-line text-muted-foreground hover:border-accent/40"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="border-t border-line pt-4">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-2">Session progress</label>
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="text-muted-foreground">Fields filled</span>
              <span className="font-mono text-foreground">{filledCount}/{TRACKED_FIELDS.length}</span>
            </div>
            <div className="h-1 bg-line rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300" 
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>

          {/* Panel Selector Tabs */}
          <nav className="flex flex-col gap-1 border-t border-line pt-4">
            <button
              onClick={() => setActivePanel("form")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                activePanel === "form" 
                  ? "bg-accent/10 text-accent" 
                  : "text-muted-foreground hover:bg-bg-soft hover:text-foreground"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activePanel === "form" ? "bg-accent" : "bg-muted-foreground"}`} />
              Today's entry
            </button>
            <button
              onClick={() => setActivePanel("history")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                activePanel === "history" 
                  ? "bg-accent/10 text-accent" 
                  : "text-muted-foreground hover:bg-bg-soft hover:text-foreground"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activePanel === "history" ? "bg-accent" : "bg-muted-foreground"}`} />
              History logs
            </button>
            <button
              onClick={() => setActivePanel("audit")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                activePanel === "audit" 
                  ? "bg-accent/10 text-accent" 
                  : "text-muted-foreground hover:bg-bg-soft hover:text-foreground"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activePanel === "audit" ? "bg-accent" : "bg-muted-foreground"}`} />
              AI Work Audit
            </button>
          </nav>

          {/* Actions */}
          <div className="flex flex-col gap-2 border-t border-line pt-4">
            <button
              onClick={saveEntry}
              disabled={busy}
              className="w-full bg-accent text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all hover:opacity-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <IconSave className="w-4 h-4" /> Save entry
            </button>
            <button
              onClick={copyMarkdown}
              className="w-full border border-line bg-background text-foreground py-2 px-4 rounded-xl text-xs font-bold transition-all hover:bg-bg-soft flex items-center justify-center gap-2"
            >
              <IconCopy className="w-4 h-4" /> Copy markdown
            </button>
            <button
              onClick={resetForm}
              className="w-full border border-line bg-background text-foreground py-2 px-4 rounded-xl text-xs font-bold transition-all hover:bg-bg-soft flex items-center justify-center gap-2"
            >
              <IconReset className="w-4 h-4" /> Reset form
            </button>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 min-w-0">
        
        {activePanel === "form" ? (
          <div className="space-y-6">
            
            {/* Form Header */}
            <div>
              <span className="text-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-5 h-[1px] bg-accent" /> Daily Ledger
              </span>
              <h1 className="text-3xl font-black tracking-tight text-foreground mt-2 leading-none">
                Audit today. <span className="text-accent">Build tomorrow.</span>
              </h1>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Raw, structured proof of what you actually did. No performance. No spin.
              </p>
            </div>

            {/* 1. OUTPUT SECTION */}
            <section className="bg-background border border-line rounded-2xl p-5 sm:p-6 space-y-5">
              <div className="flex items-center gap-3 pb-3.5 border-b border-line">
                <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <IconOutput className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-accent font-bold uppercase tracking-wider block">Output</span>
                  <h3 className="text-base font-bold text-foreground">What did I actually do today?</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-bg-soft/40 border border-line rounded-xl p-4 flex flex-col">
                  <span className="text-xs font-bold text-foreground">Topic studied</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">Specific concept or problem — not just "Python"</span>
                  <input
                    type="text"
                    name="topic"
                    value={journalData.topic}
                    onChange={handleInputChange}
                    placeholder="e.g. RAG pipeline, Binary Search, Pandas groupby..."
                    className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent"
                  />
                </div>
                <div className="bg-bg-soft/40 border border-line rounded-xl p-4 flex flex-col">
                  <span className="text-xs font-bold text-foreground">Work / office tasks</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">AI pipeline tasks, features shipped, PRs done</span>
                  <textarea
                    name="work"
                    value={journalData.work}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="What did you build, fix or deploy at work today?"
                    className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent resize-none min-h-[70px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-bg-soft/40 border border-line rounded-xl p-4 flex flex-col">
                  <span className="text-xs font-bold text-foreground">What I learned</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">Key concepts that clicked today</span>
                  <textarea
                    name="learned"
                    value={journalData.learned}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="The insight, the aha moment, the concept that makes sense now..."
                    className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent resize-none min-h-[70px]"
                  />
                </div>
                <div className="bg-bg-soft/40 border border-line rounded-xl p-4 flex flex-col">
                  <span className="text-xs font-bold text-foreground">What I built / coded</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">Code written, scripts, mini-projects, experiments</span>
                  <textarea
                    name="built"
                    value={journalData.built}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Functions, classes, pipelines, API integrations..."
                    className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent resize-none min-h-[70px]"
                  />
                </div>
              </div>

              {/* Recall Check */}
              <div className="bg-bg-soft/40 border border-line rounded-xl p-4">
                <span className="text-xs font-bold text-foreground block">Coded from memory?</span>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">Did you write any code without copy-pasting from AI or docs? (Our most important habit)</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
                  {[
                    { value: "Yes — wrote from memory", color: "green" },
                    { value: "Partially — needed some hints", color: "amber" },
                    { value: "No — relied on AI/docs fully", color: "red" }
                  ].map((item) => {
                    const isActive = journalData.recall === item.value;
                    let styleClasses = "border-line text-muted-foreground hover:border-accent/40";
                    if (isActive) {
                      if (item.color === "green") styleClasses = "bg-emerald-500/10 border-emerald-500 text-emerald-500";
                      else if (item.color === "amber") styleClasses = "bg-amber-500/10 border-amber-500 text-amber-500";
                      else styleClasses = "bg-rose-500/10 border-rose-500 text-rose-500";
                    }
                    return (
                      <button
                        key={item.value}
                        onClick={() => handleRecallSelect(item.value)}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${styleClasses}`}
                      >
                        {item.value}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 2. DSA SECTION */}
            <section className="bg-background border border-line rounded-2xl p-5 sm:p-6 space-y-5">
              <div className="flex items-center gap-3 pb-3.5 border-b border-line">
                <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <IconDSA className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-accent font-bold uppercase tracking-wider block">DSA</span>
                  <h3 className="text-base font-bold text-foreground">Striver sheet progress</h3>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-bg-soft/40 border border-line rounded-xl p-4 text-center">
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold block mb-2">Problems attempted</label>
                  <input
                    type="number"
                    name="dsaAttempted"
                    value={journalData.dsaAttempted}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                    className="bg-background border border-line rounded-lg px-3 py-1.5 text-sm font-bold text-center text-foreground outline-none focus:border-accent"
                  />
                </div>
                <div className="flex-1 bg-bg-soft/40 border border-line rounded-xl p-4 text-center">
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold block mb-2">Problems solved</label>
                  <input
                    type="number"
                    name="dsaSolved"
                    value={journalData.dsaSolved}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                    className="bg-background border border-line rounded-lg px-3 py-1.5 text-sm font-bold text-center text-accent outline-none focus:border-accent"
                  />
                </div>
                <div className="flex-[2] bg-bg-soft/40 border border-line rounded-xl p-4">
                  <span className="text-xs font-bold text-foreground">DSA topic / problem</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">What pattern or problem set</span>
                  <input
                    type="text"
                    name="dsaTopic"
                    value={journalData.dsaTopic}
                    onChange={handleInputChange}
                    placeholder="e.g. Two Pointer, Arrays — Kadane's Algorithm..."
                    className="mt-2.5 w-full bg-background border border-line rounded-lg px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent"
                  />
                </div>
              </div>
            </section>

            {/* 3. WINS SECTION */}
            <section className="bg-background border border-line rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3.5 border-b border-line">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <IconWins className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider block">Wins</span>
                  <h3 className="text-base font-bold text-foreground">What moved me closer today?</h3>
                </div>
              </div>

              <div className="bg-bg-soft/40 border border-line rounded-xl p-4 flex flex-col">
                <span className="text-xs font-bold text-foreground">Win log</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Record exact actions, not feelings. "I understood backpropagation math" not "I felt productive"</span>
                <textarea
                  name="wins"
                  value={journalData.wins}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="The specific actions that compounded today — however small..."
                  className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent resize-none min-h-[90px]"
                />
              </div>
            </section>

            {/* 4. LEAKS SECTION */}
            <section className="bg-background border border-line rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3.5 border-b border-line">
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
                  <IconLeaks className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider block">Leaks</span>
                  <h3 className="text-base font-bold text-foreground">Where did I waste time?</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-bg-soft/40 border border-line rounded-xl p-4 flex flex-col">
                  <span className="text-xs font-bold text-foreground">Time waste</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">Apps, scrolling, distraction loops</span>
                  <textarea
                    name="waste"
                    value={journalData.waste}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="What diverted my focus today?"
                    className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent resize-none min-h-[70px]"
                  />
                </div>
                <div className="bg-bg-soft/40 border border-line rounded-xl p-4 flex flex-col">
                  <span className="text-xs font-bold text-foreground">Avoided task</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">The uncomfortable thing I kept skipping</span>
                  <textarea
                    name="avoided"
                    value={journalData.avoided}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="What did I keep pushing to tomorrow?"
                    className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent resize-none min-h-[70px]"
                  />
                </div>
              </div>

              <div className="bg-bg-soft/40 border border-line rounded-xl p-4 flex flex-col">
                <span className="text-xs font-bold text-foreground">Stuck on</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Concepts still unclear, bugs unresolved, things to revisit</span>
                <textarea
                  name="stuck"
                  value={journalData.stuck}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="What's still blocked? Write it here so tomorrow-you can tackle it directly..."
                  className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent resize-none min-h-[50px]"
                />
              </div>
            </section>

            {/* 5. REALITY CHECK */}
            <section className="bg-background border border-line rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3.5 border-b border-line">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <IconTarget className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block">Reality Check</span>
                  <h3 className="text-base font-bold text-foreground">Am I behaving like the engineer I want to be?</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-bg-soft/40 border border-line rounded-xl p-4 flex flex-col">
                  <span className="text-xs font-bold text-foreground">Google-standard check</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">Honest audit against your 4-year goal</span>
                  <textarea
                    name="standard"
                    value={journalData.standard}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Did today's effort match where you want to be in 4 years? Be honest."
                    className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent resize-none min-h-[90px]"
                  />
                </div>
                <div className="bg-bg-soft/40 border border-line rounded-xl p-4 flex flex-col">
                  <span className="text-xs font-bold text-foreground">Holding pattern</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">Habit or behavior slowing you down</span>
                  <textarea
                    name="holding"
                    value={journalData.holding}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="What behavior is holding you back from being the engineer you want to be?"
                    className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent resize-none min-h-[90px]"
                  />
                </div>
              </div>
            </section>

            {/* 6. METRICS */}
            <section className="bg-background border border-line rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3.5 border-b border-line">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <IconMetrics className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-purple-500 font-bold uppercase tracking-wider block">Metrics</span>
                  <h3 className="text-base font-bold text-foreground">Track the daily scoreboard</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                <div className="bg-bg-soft/40 border border-line rounded-xl p-3 text-center flex flex-col items-center">
                  <IconTime className="w-5 h-5 text-accent mt-0.5" />
                  <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider mt-1.5 mb-2">Deep work (hrs)</div>
                  <input
                    type="number"
                    name="deepWork"
                    value={journalData.deepWork}
                    onChange={handleInputChange}
                    min="0"
                    max="12"
                    step="0.5"
                    placeholder="0"
                    className="text-center font-mono font-bold text-xs bg-background border border-line rounded-lg px-2 py-1 text-foreground w-full"
                  />
                </div>
                <div className="bg-bg-soft/40 border border-line rounded-xl p-3 text-center flex flex-col items-center">
                  <IconGym className="w-5 h-5 text-accent mt-0.5" />
                  <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider mt-1.5 mb-2">Gym</div>
                  <input
                    type="text"
                    name="gym"
                    value={journalData.gym}
                    onChange={handleInputChange}
                    placeholder="Done / Skip"
                    className="text-center font-bold text-xs bg-background border border-line rounded-lg px-2 py-1 text-foreground w-full"
                  />
                </div>
                <div className="bg-bg-soft/40 border border-line rounded-xl p-3 text-center flex flex-col items-center">
                  <IconDSA className="w-5 h-5 text-accent mt-0.5" />
                  <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider mt-1.5 mb-2">DSA solved</div>
                  <input
                    type="number"
                    name="dsa"
                    value={journalData.dsa}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                    className="text-center font-mono font-bold text-xs bg-background border border-line rounded-lg px-2 py-1 text-foreground w-full"
                  />
                </div>
                <div className="bg-bg-soft/40 border border-line rounded-xl p-3 text-center flex flex-col items-center">
                  <IconBrain className="w-5 h-5 text-accent mt-0.5" />
                  <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider mt-1.5 mb-2">Topics done</div>
                  <input
                    type="number"
                    name="topics"
                    value={journalData.topics}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                    className="text-center font-mono font-bold text-xs bg-background border border-line rounded-lg px-2 py-1 text-foreground w-full"
                  />
                </div>
                <div className="bg-bg-soft/40 border border-line rounded-xl p-3 text-center flex flex-col items-center">
                  <IconEnergy className="w-5 h-5 text-accent mt-0.5" />
                  <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider mt-1.5 mb-2">Energy (1-10)</div>
                  <input
                    type="number"
                    name="energy"
                    value={journalData.energy}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    placeholder="7"
                    className="text-center font-mono font-bold text-xs bg-background border border-line rounded-lg px-2 py-1 text-foreground w-full"
                  />
                </div>
              </div>

              {/* Mood chips */}
              <div className="bg-bg-soft/40 border border-line rounded-xl p-4 mt-3">
                <span className="text-xs font-bold text-foreground block">Mood today</span>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">Be accurate, not aspirational</span>
                <div className="flex flex-wrap gap-2 mt-3.5">
                  {MOODS.map((mood) => {
                    const isActive = journalData.mood === mood.label;
                    const MoodIcon = mood.icon;
                    return (
                      <button
                        key={mood.label}
                        onClick={() => handleMoodSelect(mood.label)}
                        className={`text-xs font-semibold py-1.5 px-3.5 rounded-full border transition-all flex items-center gap-2 ${
                          isActive
                            ? "bg-accent border-accent text-white"
                            : "border-line text-muted-foreground hover:border-accent/40"
                        }`}
                      >
                        <MoodIcon className="w-4 h-4" />
                        {mood.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 7. TOMORROW */}
            <section className="bg-background border border-line rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3.5 border-b border-line">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                  <IconTomorrow className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-wider block">Tomorrow</span>
                  <h3 className="text-base font-bold text-foreground">Non-negotiables for tomorrow</h3>
                </div>
              </div>

              <div className="bg-bg-soft/40 border border-line rounded-xl p-4 flex flex-col">
                <span className="text-xs font-bold text-foreground">Tomorrow's topic / plan</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Specific — not "study Python" but "complete OOP section + 2 LeetCode mediums"</span>
                <input
                  type="text"
                  name="tomorrow"
                  value={journalData.tomorrow}
                  onChange={handleInputChange}
                  placeholder="Exact next step — what will you open first tomorrow morning?"
                  className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent"
                />
              </div>

              <div className="bg-bg-soft/40 border border-line rounded-xl p-4">
                <span className="text-xs font-bold text-foreground block">3 non-negotiables</span>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">These must happen no matter what</span>
                
                <div className="space-y-3 mt-4">
                  {[
                    { key: "obj1", num: 1 },
                    { key: "obj2", num: 2 },
                    { key: "obj3", num: 3 }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-accent text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {item.num}
                      </div>
                      <input
                        type="text"
                        name={item.key}
                        value={journalData[item.key as keyof JournalData]}
                        onChange={handleInputChange}
                        placeholder={`Objective ${item.num}...`}
                        className="flex-1 bg-background border border-line rounded-lg px-3 py-1.5 text-xs text-foreground outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 8. LESSON + FINAL NOTE */}
            <section className="bg-background border border-line rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3.5 border-b border-line">
                <div className="w-7 h-7 rounded-lg bg-bg-soft flex items-center justify-center text-foreground">
                  <IconLesson className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Lesson + Final note</span>
                  <h3 className="text-base font-bold text-foreground">What should future me remember?</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-bg-soft/40 border border-line rounded-xl p-4 flex flex-col">
                  <span className="text-xs font-bold text-foreground">Key lesson</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">One practical insight you'd want to re-read in 6 months</span>
                  <textarea
                    name="lesson"
                    value={journalData.lesson}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="The one takeaway from today that actually mattered..."
                    className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent resize-none min-h-[90px]"
                  />
                </div>
                <div className="bg-bg-soft/40 border border-line rounded-xl p-4 flex flex-col">
                  <span className="text-xs font-bold text-foreground">Pattern identified</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">A code pattern, algorithm pattern, or behavior pattern noticed</span>
                  <textarea
                    name="pattern"
                    value={journalData.pattern}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="e.g. Sliding window always works when you need a contiguous subarray of size k..."
                    className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent resize-none min-h-[90px]"
                  />
                </div>
              </div>

              <div className="bg-bg-soft border border-line rounded-xl p-5 mt-4">
                <span className="text-xs font-bold text-foreground block">One brutally honest sentence</span>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">No performance. No validation. Just the raw truth about today.</span>
                <textarea
                  name="honest"
                  value={journalData.honest}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Write the one sentence future you needs to hear about today's effort..."
                  className="mt-3 bg-background border border-line rounded-lg px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-accent resize-none min-h-[60px]"
                />
              </div>
            </section>

          </div>
        ) : activePanel === "history" ? (
          /* ─── HISTORY LOGS PANEL ─── */
          <div className="space-y-6">
            <div>
              <span className="text-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-5 h-[1px] bg-accent" /> Archive
              </span>
              <h1 className="text-3xl font-black tracking-tight text-foreground mt-2 leading-none">History logs</h1>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                All your saved daily proof-of-work entries.
              </p>
            </div>

            <div className="space-y-4">
              {historyEntries.length === 0 ? (
                <div className="py-16 text-center border-2 border-dashed border-line rounded-2xl opacity-40">
                  <IconBook className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-xs font-medium text-muted-foreground">No entries saved yet.</p>
                </div>
              ) : (
                historyEntries.map((e) => (
                  <div key={e.id} className="bg-bg-soft/40 border border-line rounded-2xl p-5 flex flex-col gap-3 relative group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-bold font-mono text-muted-foreground">{e.date}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-accent/15 text-accent rounded-full">
                          {e.data?.stage || "Python"}
                        </span>
                        {e.data?.mood && (
                          <span className="text-xs font-semibold text-muted-foreground bg-bg-soft border border-line rounded-full px-2 py-0.5">
                            {e.data.mood}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => deleteEntry(e.id, e.date)}
                        className="p-1.5 text-muted-foreground hover:text-rose-500 rounded-lg hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                        title="Delete entry"
                      >
                        <IconTrash className="w-4 h-4" />
                      </button>
                    </div>

                    {e.data?.topic && (
                      <div className="text-sm font-bold text-foreground">{e.data.topic}</div>
                    )}

                    {e.data?.learned && (
                      <div className="text-xs text-muted-foreground leading-normal">
                        <strong className="text-emerald-500 font-bold mr-1">Learned:</strong>
                        {e.data.learned.length > 200 ? `${e.data.learned.substring(0, 200)}...` : e.data.learned}
                      </div>
                    )}

                    {e.data?.dsaSolved && (
                      <div className="text-[11px] text-muted-foreground">
                        <strong className="text-accent font-bold mr-1">DSA:</strong>
                        {e.data.dsaSolved} solved / {e.data.dsaAttempted || "0"} attempted
                      </div>
                    )}

                    {e.data?.recall && (
                      <div className="text-[11px] text-muted-foreground">
                        <strong className="text-foreground font-bold mr-1">Memory coding:</strong>
                        {e.data.recall}
                      </div>
                    )}

                    {e.data?.honest && (
                      <div className="mt-2 pt-2 border-t border-line text-xs italic text-muted-foreground leading-relaxed">
                        "{e.data.honest.length > 150 ? `${e.data.honest.substring(0, 150)}...` : e.data.honest}"
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* ─── AI WORK AUDIT PANEL ─── */
          <div className="space-y-6">
            <div>
              <span className="text-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-5 h-[1px] bg-accent" /> Intelligence
              </span>
              <h1 className="text-3xl font-black tracking-tight text-foreground mt-2 leading-none">AI Work Audit</h1>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Antigravity performance coaching audit compiled using your weekly logs.
              </p>
            </div>

            <div className="bg-bg-soft/40 border border-line rounded-2xl p-6 space-y-6">
              {!aiAnalysisText && !aiLoading && (
                <div className="text-center py-10 space-y-4 max-w-md mx-auto">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto">
                    <IconBrain className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">Execute Weekly Performance Audit</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Antigravity will analyze your daily topic logs, deep work velocity, Wins, and Leaks from the past 7 days to evaluate if your output matches your standard.
                  </p>
                  <button
                    onClick={runAIWorkAudit}
                    className="bg-accent text-white py-2.5 px-6 rounded-xl text-xs font-bold hover:opacity-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    Run AI Audit
                  </button>
                </div>
              )}

              {aiLoading && (
                <div className="text-center py-16 space-y-6 max-w-sm mx-auto">
                  <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                  <div className="space-y-2 animate-pulse">
                    <p className="text-xs font-bold text-accent uppercase tracking-widest">Accessing neural cores...</p>
                    <p className="text-[10px] text-muted-foreground">Analyzing daily topic logs and calculating weekly consistency...</p>
                  </div>
                </div>
              )}

              {aiAnalysisText && !aiLoading && (
                <div className="space-y-6">
                  <div className="prose prose-invert max-w-none text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-4 font-normal">
                    {aiAnalysisText.split("\n").map((line, idx) => {
                      if (line.startsWith("###")) {
                        return <h4 key={idx} className="text-sm font-bold text-foreground mt-6 mb-2 border-b border-line pb-1.5">{line.replace("###", "").trim()}</h4>;
                      }
                      if (line.startsWith("##")) {
                        return <h3 key={idx} className="text-base font-bold text-foreground mt-8 mb-3">{line.replace("##", "").trim()}</h3>;
                      }
                      if (line.startsWith("#")) {
                        return <h2 key={idx} className="text-lg font-black text-foreground mt-8 mb-4">{line.replace("#", "").trim()}</h2>;
                      }
                      if (line.startsWith("*") || line.startsWith("-")) {
                        return (
                          <div key={idx} className="flex items-start gap-2.5 ml-2 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            <span>{line.replace(/^[*+-]\s*/, "")}</span>
                          </div>
                        );
                      }
                      if (line.trim().match(/^\d+\.\s/)) {
                        const content = line.replace(/^\d+\.\s/, "");
                        const number = line.match(/^\d+/)?.[0];
                        return (
                          <div key={idx} className="flex items-start gap-2.5 ml-2 mt-2">
                            <span className="font-mono text-accent font-bold text-xs mt-0.5">{number}.</span>
                            <span>{content}</span>
                          </div>
                        );
                      }
                      if (line.trim() === "") {
                        return <div key={idx} className="h-2" />;
                      }
                      return <p key={idx} className="mt-2">{line}</p>;
                    })}
                  </div>

                  <div className="border-t border-line pt-5 flex justify-end">
                    <button
                      onClick={runAIWorkAudit}
                      className="border border-line bg-background text-foreground py-2 px-5 rounded-xl text-xs font-bold hover:bg-bg-soft transition-all cursor-pointer"
                    >
                      Run audit again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
