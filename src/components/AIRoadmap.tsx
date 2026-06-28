"use client";

import { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STORAGE_KEY = "ai_roadmap_progress";

// ─── Inline SVG Icons ──────────────────────────────────────────────────────────
const IconTrophy = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const IconMap = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" x2="9" y1="3" y2="18" /><line x1="15" x2="15" y1="6" y2="21" />
  </svg>
);

const IconBook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const IconCopy = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const IconCheck = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconLink = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);

const IconX = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

// Target / Crosshair — header logo
const IconTarget = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

// Lightbulb — prompt hint footer
const IconLightbulb = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" /><path d="M10 22h4" />
  </svg>
);

// Arrow up — empty state
const IconArrowUp = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="19" y2="5" /><polyline points="5 12 12 5 19 12" />
  </svg>
);

const IconBrain = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
);

// ─── Stage SVG Icons ──────────────────────────────────────────────────────────
// 1. Python — snake/code
const IconPython = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8 2 6 4 6 7v2h6v1H5c-2 0-3 1.5-3 4s1 5 3 5h1v-2.5c0-1.5 1-2.5 2.5-2.5h5c1.5 0 2.5-1 2.5-2.5V7c0-3-2-5-4-5z" />
    <path d="M12 22c4 0 6-2 6-5v-2h-6v-1h7c2 0 3-1.5 3-4s-1-5-3-5h-1v2.5c0 1.5-1 2.5-2.5 2.5h-5C9 10 8 11 8 12.5V17c0 3 2 5 4 5z" />
    <circle cx="9" cy="6" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="15" cy="18" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

// 2. Data Science — bar chart with data points
const IconDataScience = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" />
    <polyline points="3 8 7 5 11 9 15 6 20 8" />
  </svg>
);

// 3. Machine Learning — cpu/chip
const IconML = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="7" width="10" height="10" rx="1" />
    <path d="M9 7V4M12 7V4M15 7V4M9 20v-3M12 20v-3M15 20v-3M7 9H4M7 12H4M7 15H4M20 9h-3M20 12h-3M20 15h-3" />
  </svg>
);

// 4. Deep Learning — brain/network
const IconDeepLearning = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="6" r="1.5" /><circle cx="5" cy="12" r="1.5" /><circle cx="5" cy="18" r="1.5" />
    <circle cx="12" cy="4" r="1.5" /><circle cx="12" cy="10" r="1.5" /><circle cx="12" cy="16" r="1.5" />
    <circle cx="19" cy="8" r="1.5" /><circle cx="19" cy="15" r="1.5" />
    <line x1="6.5" y1="6" x2="10.5" y2="4.5" /><line x1="6.5" y1="6.5" x2="10.5" y2="9.5" />
    <line x1="6.5" y1="12" x2="10.5" y2="10.5" /><line x1="6.5" y1="12.5" x2="10.5" y2="15.5" />
    <line x1="6.5" y1="18" x2="10.5" y2="16.5" />
    <line x1="13.5" y1="4.5" x2="17.5" y2="7.5" /><line x1="13.5" y1="10" x2="17.5" y2="8.5" />
    <line x1="13.5" y1="10.5" x2="17.5" y2="14.5" /><line x1="13.5" y1="16" x2="17.5" y2="15.5" />
  </svg>
);

// 5. GenAI / LLMs — sparkle/wand
const IconGenAI = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4M22 5h-4" />
  </svg>
);

// 6. DSA — bolt/lightning
const IconDSA = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// 7. System Design — layers/architecture
const IconSystemDesign = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>
);

// ─── Stage icon map ────────────────────────────────────────────────────────────
const stageIcons: Record<number, (props: { className?: string }) => JSX.Element> = {
  1: IconPython,
  2: IconDataScience,
  3: IconML,
  4: IconDeepLearning,
  5: IconGenAI,
  6: IconDSA,
  7: IconSystemDesign,
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const stages = [
  {
    id: 1, title: "Python Fundamentals", duration: "Months 1–4",
    color: "#3B82F6",
    desc: "Core Python — variables, OOP, file handling, error handling",
    resources: [
      { label: "CS50P (Free)", url: "https://cs50.harvard.edu/python" },
      { label: "Python Docs", url: "https://docs.python.org/3/tutorial/" },
      { label: "Apna College YT", url: "https://www.youtube.com/@ApnaCollegeOfficial" },
    ],
    topics: [
      "Variables & Data Types", "Conditionals & Loops", "Functions & Scope",
      "Lists, Dicts, Sets, Tuples", "OOP (Classes, Inheritance)", "File Handling",
      "Error Handling (try/except)", "Modules & Libraries",
    ],
    prompt: `You are my personal Python tutor. I am a developer who knows programming basics but is new to Python. My goal is to become an AI/ML Engineer.\n\nToday's topic: {TOPIC}\n\nTeach me in this exact structure:\n1. Simple explanation with a real-world analogy\n2. Basic code example (clean, well-commented)\n3. A practical example related to AI or backend use cases\n4. 2–3 practice problems for me to solve myself (don't solve them for me)\n\nRules:\n- Do NOT give full solutions immediately — make me attempt first\n- If I'm stuck, give a hint only (not the full answer)\n- At the end, ask me to explain the concept back in my own words to test understanding\n\nStart now with: {TOPIC}`,
  },
  {
    id: 2, title: "Data Science Basics", duration: "Months 3–5",
    color: "#06B6D4",
    desc: "Numpy, Pandas, Matplotlib — data handling & visualization",
    resources: [
      { label: "Kaggle Learn (Free)", url: "https://www.kaggle.com/learn" },
      { label: "CampusX Hindi ML", url: "https://www.youtube.com/@campusx-official" },
      { label: "Pandas Docs", url: "https://pandas.pydata.org/docs/" },
    ],
    topics: [
      "Numpy Arrays & Operations", "Pandas DataFrames", "Data Cleaning & Preprocessing",
      "Data Visualization (Matplotlib)", "Statistics & Probability",
      "Exploratory Data Analysis (EDA)", "Feature Engineering", "Handling Missing Data",
    ],
    prompt: `You are my Data Science tutor. I know Python basics and am learning to become an AI/ML Engineer.\n\nToday's topic: {TOPIC}\n\nTeach me in this structure:\n1. What this is and why data scientists use it\n2. Core functions/methods I must know (with clean code examples)\n3. A real dataset example — show messy data → cleaned/analyzed\n4. Common mistakes beginners make with this\n5. A hands-on mini task: give me a small dataset problem to solve myself\n\nAfter I attempt it, review my code and suggest improvements.\n\nStart with: {TOPIC}`,
  },
  {
    id: 3, title: "Machine Learning", duration: "Months 5–9",
    color: "#10B981",
    desc: "Supervised, Unsupervised, model evaluation — sklearn",
    resources: [
      { label: "Andrew Ng ML Course", url: "https://www.coursera.org/learn/machine-learning" },
      { label: "Scikit-learn Docs", url: "https://scikit-learn.org/stable/" },
      { label: "CampusX Hindi ML", url: "https://www.youtube.com/@campusx-official" },
    ],
    topics: [
      "How ML works (intuition)", "Linear Regression", "Logistic Regression",
      "Decision Trees & Random Forest", "SVM (Support Vector Machine)", "K-Means Clustering",
      "Model Evaluation (Precision, Recall, F1)", "Bias/Variance Tradeoff",
      "Feature Selection & Scaling", "Cross Validation",
    ],
    prompt: `You are my Machine Learning tutor. I have solid Python and data science basics and want to understand ML deeply.\n\nToday's topic: {TOPIC}\n\nStructure:\n1. Intuitive explanation — use analogies, explain like I'm smart but new to ML\n2. The math behind it — show key equations and explain what each part means (don't skip this)\n3. Implement it from scratch using only numpy — so I understand the core logic\n4. Then show the scikit-learn version and compare\n5. Real-world use case — when and why would you use this in production?\n\nAfter explaining:\n- Ask me 3 conceptual questions about this topic\n- Wait for my answers before giving feedback\n\nI want to truly understand, not just memorize. Start with: {TOPIC}`,
  },
  {
    id: 4, title: "Deep Learning", duration: "Months 9–13",
    color: "#F59E0B",
    desc: "Neural networks, CNN, RNN, Transformers, TensorFlow/Keras",
    resources: [
      { label: "fast.ai (Free)", url: "https://www.fast.ai" },
      { label: "TensorFlow Tutorials", url: "https://www.tensorflow.org/tutorials" },
      { label: "3Blue1Brown Neural Nets", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi" },
    ],
    topics: [
      "Perceptron & Neural Network basics", "Backpropagation & Gradient Descent",
      "Activation Functions", "CNN (Convolutional Neural Networks)", "RNN & LSTM",
      "Transformer Architecture", "TensorFlow & Keras basics", "Transfer Learning",
      "Model Training & Overfitting", "GPU Training basics",
    ],
    prompt: `You are my Deep Learning tutor. I understand ML algorithms well and now want to go deeper into neural networks.\n\nToday's topic: {TOPIC}\n\nStructure:\n1. Intuition first — what problem does this solve that simpler ML can't?\n2. How it works internally — describe step by step (use text diagrams if helpful)\n3. The math — key equations explained clearly (don't oversimplify)\n4. Build it in TensorFlow/Keras with a real runnable example\n5. Where is this used in real AI products? (LLMs, image recognition, etc.)\n\nThen give me a mini coding challenge:\n- Build something small using {TOPIC}\n- I'll share my code and you review + suggest improvements\n\nStart with: {TOPIC}`,
  },
  {
    id: 5, title: "GenAI & LLMs", duration: "Months 6–10",
    color: "#8B5CF6",
    desc: "OpenAI APIs, RAG, LangChain, Agentic AI — production pipelines",
    resources: [
      { label: "OpenAI Docs", url: "https://platform.openai.com/docs" },
      { label: "LangChain Docs", url: "https://python.langchain.com/docs/get_started/introduction" },
      { label: "Prompt Engineering Guide", url: "https://www.promptingguide.ai" },
    ],
    topics: [
      "How LLMs work (internals)", "OpenAI API (chat completions)", "Prompt Engineering",
      "Embeddings & Vector Databases", "RAG (Retrieval Augmented Generation)",
      "LangChain basics", "Agentic AI & Tool Calling", "Fine-tuning basics",
      "Building AI Pipelines", "Multimodal AI (vision + text)",
    ],
    prompt: `You are my GenAI/LLM engineering mentor. I want to build production-grade AI systems.\n\nToday's topic: {TOPIC}\n\nTeach me with:\n1. What it is and what problem it solves\n2. How it works internally (go deep — I can handle technical depth)\n3. A working Python code example I can actually run\n4. How this is used in real production AI pipelines\n5. Common mistakes engineers make with this in production\n\nThen give me a mini project task:\n- Build a working implementation of {TOPIC} from scratch\n- I'll share my code for your review\n\nDon't just explain — make me build something real. Start with: {TOPIC}`,
  },
  {
    id: 6, title: "DSA", duration: "Year 2+ (daily)",
    color: "#EF4444",
    desc: "Data structures & algorithms — non-negotiable for top tech companies",
    resources: [
      { label: "Striver A2Z Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
      { label: "takeUforward YT", url: "https://www.youtube.com/@takeUforward" },
      { label: "LeetCode", url: "https://leetcode.com" },
    ],
    topics: [
      "Arrays & Strings", "Linked Lists", "Recursion & Backtracking", "Binary Search",
      "Stacks & Queues", "Trees (Binary, BST)", "Graphs (BFS, DFS)",
      "Dynamic Programming", "Heaps & Priority Queue", "Tries & Greedy",
    ],
    prompt: `You are my DSA interview coach. My target is top tech company roles (Google, Amazon, etc.).\n\nToday's problem/topic: {TOPIC}\n\nFollow this exact process:\n1. Explain the problem/concept clearly with examples\n2. Ask me: "What's your first instinct? Think out loud." — Wait for my response\n3. Guide me with questions (Socratic method) — do NOT give the answer directly\n4. Give me time to code the solution myself\n5. After I share my code:\n   - Analyze time & space complexity\n   - What's good about my approach\n   - What can be improved\n   - Show optimal solution if mine isn't optimal, explain why\n\nAfter solving, give me 1 similar problem as follow-up.\n\nRules:\n- NEVER give the full solution before I attempt\n- If I'm completely stuck → hint about the approach only, not code\n- Always ask for my complexity analysis before sharing yours\n\nStart with: {TOPIC}`,
  },
  {
    id: 7, title: "System Design", duration: "Year 2–3",
    color: "#F97316",
    desc: "Scalable systems, databases, caching — senior interview prep",
    resources: [
      { label: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
      { label: "ByteByteGo YT", url: "https://www.youtube.com/@ByteByteGo" },
      { label: "Designing Data-Intensive Apps", url: "https://dataintensive.net" },
    ],
    topics: [
      "HTTP, REST & API Design", "SQL vs NoSQL Databases", "Caching (Redis)",
      "Load Balancing", "Microservices Architecture", "Message Queues (Kafka)",
      "Design URL Shortener", "Design Chat Application",
      "Design AI Pipeline System", "Rate Limiting & API Gateway",
    ],
    prompt: `You are my System Design mentor. I'm targeting top tech companies and want to master designing scalable systems.\n\nToday's topic: {TOPIC}\n\nStructure:\n1. Core concept — what it is and why it matters at scale\n2. How it works technically — use ASCII diagrams where helpful\n3. Real example — how companies like Google/Netflix/Amazon actually use this\n4. Trade-offs — when to use this vs alternatives\n5. Interview simulation:\n   - Give me a design question based on {TOPIC}\n   - I'll walk through my solution\n   - You act as the interviewer — ask clarifying questions, probe my reasoning, point out gaps\n\nStart with: {TOPIC}`,
  },
];

const getTotalTopics = () => stages.reduce((acc, s) => acc + s.topics.length, 0);

export function AIRoadmap() {
  const [selectedStage, setSelectedStage] = useState<typeof stages[0] | null>(stages[0]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"roadmap" | "resources">("roadmap");
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  
  // Interactive AI Tutor States
  const [chatting, setChatting] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "assistant"; text: string }>>([]);
  const [userInput, setUserInput] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProgress(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    // Reset chat session when changing topic or stage
    setChatting(false);
    setChatHistory([]);
  }, [selectedTopic, selectedStage, customTopic]);

  const saveProgress = (np: Record<string, boolean>) => {
    setProgress(np);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(np)); } catch {}
  };

  const toggleTopic = (stageId: number, topic: string) => {
    const key = `${stageId}__${topic}`;
    saveProgress({ ...progress, [key]: !progress[key] });
  };

  const isDone = (stageId: number, topic: string) => !!progress[`${stageId}__${topic}`];

  const stageProgress = (stage: typeof stages[0]) => {
    const done = stage.topics.filter(t => isDone(stage.id, t)).length;
    return { done, total: stage.topics.length, pct: Math.round((done / stage.topics.length) * 100) };
  };

  const totalDone = Object.values(progress).filter(Boolean).length;
  const totalTopics = getTotalTopics();
  const overallPct = Math.round((totalDone / totalTopics) * 100);

  const activeTopic = selectedStage?.topics.includes(selectedTopic) ? selectedTopic : customTopic;

  const getFinalPrompt = () => {
    if (!selectedStage || !activeTopic) return "";
    return selectedStage.prompt.replace(/{TOPIC}/g, activeTopic);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFinalPrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startAISession = async () => {
    const initialPrompt = getFinalPrompt();
    if (!initialPrompt) return;

    setChatting(true);
    setLoadingChat(true);
    
    const initialHistory = [{ role: "user" as const, text: initialPrompt }];
    setChatHistory(initialHistory);

    try {
      const res = await fetch("/api/focus-os/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: initialHistory })
      });
      const data = await res.json();
      if (data.error) {
        toast.error("Failed to start AI session", { description: data.error });
        setChatting(false);
      } else {
        setChatHistory([...initialHistory, { role: "assistant" as const, text: data.text }]);
      }
    } catch (err) {
      toast.error("Network Error", { description: "Failed to connect to AI server." });
      setChatting(false);
    } finally {
      setLoadingChat(false);
    }
  };

  const sendChatMessage = async () => {
    if (!userInput.trim() || loadingChat) return;

    const userMessage = { role: "user" as const, text: userInput };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    setUserInput("");
    setLoadingChat(true);

    try {
      const res = await fetch("/api/focus-os/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: updatedHistory })
      });
      const data = await res.json();
      if (data.error) {
        toast.error("Failed to get response", { description: data.error });
      } else {
        setChatHistory([...updatedHistory, { role: "assistant" as const, text: data.text }]);
      }
    } catch (err) {
      toast.error("Network Error", { description: "Failed to send message." });
    } finally {
      setLoadingChat(false);
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">

      {/* ── LEFT PANEL ────────────────────────────────────────────── */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-line overflow-hidden bg-background">

        {/* Header */}
        <div className="px-5 py-5 border-b border-line flex-shrink-0">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
              <IconTarget className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-black text-sm text-foreground tracking-tight">AI/ML Roadmap</h1>
              <p className="text-[10px] text-muted-foreground">7 stages · {totalTopics} topics</p>
            </div>
          </div>

          {/* Overall progress */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-1">
                <IconTrophy className="w-3 h-3" /> Progress
              </span>
              <span className="text-[10px] font-bold text-foreground">{overallPct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-alt))' }}
                initial={{ width: 0 }}
                animate={{ width: `${overallPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="text-[9px] text-muted-foreground mt-1">{totalDone}/{totalTopics} topics complete</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-3 py-3 border-b border-line flex gap-1 flex-shrink-0">
          {([
            { id: "roadmap", label: "Roadmap", Icon: IconMap },
            { id: "resources", label: "Resources", Icon: IconBook },
          ] as const).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold transition-all duration-200",
                activeTab === id
                  ? "bg-accent text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-bg-soft"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Stage / Resource list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-3 space-y-1.5 bg-background">

          {/* ROADMAP LIST */}
          {activeTab === "roadmap" && stages.map((stage) => {
            const StageIcon = stageIcons[stage.id];
            const isSelected = selectedStage?.id === stage.id;
            const { done, total, pct } = stageProgress(stage);
            return (
              <button
                key={stage.id}
                onClick={() => { setSelectedStage(stage); setSelectedTopic(""); setCustomTopic(""); }}
                className={cn(
                  "w-full text-left p-3 rounded-xl border transition-all duration-200",
                  isSelected ? "bg-bg-soft" : "border-line hover:bg-bg-soft"
                )}
                style={isSelected ? { borderColor: stage.color + "66" } : {}}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ background: stage.color + "18", color: stage.color }}>
                    <StageIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs font-semibold truncate", isSelected ? "text-foreground" : "text-muted-foreground")}>
                      {stage.title}
                    </p>
                    <p className="text-[9px] text-muted-foreground/60 mt-0.5">{stage.duration}</p>
                  </div>
                  <span className="text-[10px] font-bold flex-shrink-0"
                    style={{ color: done === total && total > 0 ? '#10B981' : 'var(--muted)' }}>
                    {done}/{total}
                  </span>
                </div>
                <div className="h-1 bg-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: stage.color }} />
                </div>
              </button>
            );
          })}

          {/* RESOURCES LIST */}
          {activeTab === "resources" && stages.map((stage) => {
            const StageIcon = stageIcons[stage.id];
            return (
              <div key={stage.id} className="mb-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] px-1 mb-1.5 flex items-center gap-1.5"
                  style={{ color: stage.color }}>
                  <StageIcon className="w-3 h-3" />
                  {stage.title}
                </p>
                {stage.resources.map((r) => (
                  <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] text-muted-foreground hover:text-foreground hover:bg-bg-soft border border-transparent hover:border-line transition-all group mb-1">
                    <span style={{ color: stage.color }}>→</span>
                    <span className="flex-1 truncate">{r.label}</span>
                    <IconLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            );
          })}
        </div>
      </aside>

      {/* ── RIGHT PANEL ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background">
        {!selectedStage ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground/30 text-sm">
            ← Select a stage to begin
          </div>
        ) : (() => {
          const StageIcon = stageIcons[selectedStage.id];
          return (
            <>
              {/* Right panel header */}
              <div className="px-8 py-5 border-b border-line flex-shrink-0 flex items-center justify-between">
                <div>
                  <h2 className="font-black text-xl text-foreground flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: selectedStage.color + "18", color: selectedStage.color }}>
                      <StageIcon className="w-4.5 h-4.5" />
                    </div>
                    {selectedStage.title}
                  </h2>
                  <p className="text-[11px] text-muted-foreground mt-1 ml-10">{selectedStage.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Duration</p>
                  <p className="text-xs font-semibold text-foreground mt-0.5">{selectedStage.duration}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="px-8 py-6 space-y-6">

                  {/* Topics Grid */}
                  <section>
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-3">
                      Topics — select one to generate a prompt
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedStage.topics.map((topic) => {
                        const isActive = selectedTopic === topic;
                        const done = isDone(selectedStage.id, topic);
                        return (
                          <div key={topic} className="flex items-stretch">
                            <button
                              onClick={() => { setSelectedTopic(topic); setCustomTopic(""); }}
                              className={cn(
                                "px-3 py-1.5 text-xs font-semibold border transition-all duration-150",
                                done ? "rounded-l-lg" : "rounded-lg",
                                done && "line-through"
                              )}
                              style={{
                                borderColor: isActive ? selectedStage.color : done ? selectedStage.color + "55" : "var(--line)",
                                background: isActive ? selectedStage.color + "20" : done ? selectedStage.color + "10" : "var(--bg-soft)",
                                color: isActive ? selectedStage.color : done ? selectedStage.color + "AA" : "var(--text)",
                                opacity: done ? 0.6 : 1,
                              }}
                            >
                              {topic}
                            </button>
                            {done && (
                              <button
                                onClick={() => toggleTopic(selectedStage.id, topic)}
                                className="px-2 rounded-r-lg border border-l-0 transition-all flex items-center"
                                style={{
                                  borderColor: selectedStage.color + "44",
                                  background: selectedStage.color + "18",
                                  color: selectedStage.color,
                                }}
                              >
                                <IconCheck className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Mark done + custom input row */}
                  <div className="flex flex-wrap items-center gap-3">
                    {selectedTopic && (
                      <button
                        onClick={() => toggleTopic(selectedStage.id, selectedTopic)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-all"
                        style={{
                          borderColor: isDone(selectedStage.id, selectedTopic) ? "#10B981" : "var(--line)",
                          background: isDone(selectedStage.id, selectedTopic) ? "#10B98118" : "var(--bg-soft)",
                          color: isDone(selectedStage.id, selectedTopic) ? "#10B981" : "var(--text)",
                        }}
                      >
                        <IconCheck className="w-3.5 h-3.5" />
                        {isDone(selectedStage.id, selectedTopic) ? "Marked Done" : "Mark as Done"}
                      </button>
                    )}
                    <div className="flex-1 min-w-[220px]">
                      <input
                        placeholder="Or type a custom topic..."
                        value={customTopic}
                        onChange={(e) => { setCustomTopic(e.target.value); setSelectedTopic(""); }}
                        className="w-full bg-bg-soft border border-line rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    {selectedTopic && (
                      <button
                        onClick={() => setSelectedTopic("")}
                        className="p-1.5 rounded-lg border border-line text-muted-foreground hover:text-foreground transition-all"
                      >
                        <IconX className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Prompt Output / Chat Interface */}
                  <AnimatePresence mode="wait">
                    {activeTopic && !chatting && (
                      <motion.section
                        key="prompt"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-xl border overflow-hidden"
                        style={{ borderColor: selectedStage.color + "44" }}
                      >
                        {/* Prompt header */}
                        <div className="flex items-center justify-between px-5 py-3 border-b flex-wrap gap-2"
                          style={{ borderColor: selectedStage.color + "33", background: selectedStage.color + "0A" }}>
                          <div className="flex items-center gap-2" style={{ color: selectedStage.color }}>
                            <StageIcon className="w-3.5 h-3.5 flex-shrink-0" />
                            <p className="text-xs font-bold">
                              Prompt — &quot;{activeTopic}&quot;
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleCopy}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-white transition-all cursor-pointer"
                              style={{ background: copied ? "#10B981" : selectedStage.color }}
                            >
                              {copied ? <IconCheck className="w-3 h-3" /> : <IconCopy className="w-3 h-3" />}
                              {copied ? "Copied!" : "Copy Prompt"}
                            </button>
                            <button
                              onClick={startAISession}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-white transition-all bg-accent cursor-pointer"
                            >
                              <IconBrain className="w-3 h-3" />
                              Start AI Session
                            </button>
                          </div>
                        </div>

                        {/* Prompt body */}
                        <pre className="px-5 py-4 text-[12px] text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono custom-scrollbar overflow-y-auto bg-bg-soft"
                          style={{ maxHeight: "340px" }}>
                          {getFinalPrompt()}
                        </pre>

                        {/* Prompt footer */}
                        <div className="px-5 py-3 border-t flex items-center gap-2 text-[10px] text-muted-foreground/60"
                          style={{ borderColor: selectedStage.color + "22" }}>
                          <IconLightbulb className="w-3.5 h-3.5 flex-shrink-0" />
                          Start AI Session directly or copy prompt to external tutor models.
                        </div>
                      </motion.section>
                    )}

                    {activeTopic && chatting && (
                      <motion.section
                        key="chat"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-xl border flex flex-col overflow-hidden bg-bg-soft/40"
                        style={{ borderColor: selectedStage.color + "44", height: "450px" }}
                      >
                        {/* Chat Header */}
                        <div className="flex items-center justify-between px-5 py-3 border-b flex-shrink-0"
                          style={{ borderColor: selectedStage.color + "33", background: selectedStage.color + "0A" }}>
                          <div className="flex items-center gap-2" style={{ color: selectedStage.color }}>
                            <IconBrain className="w-4 h-4" />
                            <p className="text-xs font-bold">
                              Interactive AI Session — &quot;{activeTopic}&quot;
                            </p>
                          </div>
                          <button
                            onClick={() => setChatting(false)}
                            className="text-xs text-muted-foreground hover:text-foreground font-semibold px-2 py-1 border border-line rounded-lg bg-background cursor-pointer"
                          >
                            Exit Session
                          </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-background/20">
                          {chatHistory.slice(1).map((msg, index) => {
                            const isUser = msg.role === "user";
                            return (
                              <div key={index} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                                <div
                                  className={cn(
                                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed",
                                    isUser 
                                      ? "bg-accent text-white rounded-tr-none" 
                                      : "bg-bg-soft border border-line text-foreground rounded-tl-none prose prose-invert"
                                  )}
                                >
                                  {isUser ? (
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                  ) : (
                                    /* Render MD lines cleanly */
                                    msg.text.split("\n").map((line, idx) => {
                                      if (line.startsWith("###")) {
                                        return <h4 key={idx} className="font-bold text-foreground mt-2 mb-1 border-b border-line/20 pb-0.5">{line.replace("###", "").trim()}</h4>;
                                      }
                                      if (line.startsWith("##")) {
                                        return <h3 key={idx} className="font-black text-foreground mt-3 mb-1.5">{line.replace("##", "").trim()}</h3>;
                                      }
                                      if (line.startsWith("*") || line.startsWith("-")) {
                                        return <div key={idx} className="flex items-start gap-1.5 ml-1 mt-0.5"><span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" /><span>{line.replace(/^[*+-]\s*/, "")}</span></div>;
                                      }
                                      return <p key={idx} className="mt-1 whitespace-pre-wrap">{line}</p>;
                                    })
                                  )}
                                </div>
                              </div>
                            );
                          })}

                          {loadingChat && (
                            <div className="flex justify-start">
                              <div className="bg-bg-soft border border-line rounded-2xl rounded-tl-none px-4 py-3 text-xs text-muted-foreground flex items-center gap-2">
                                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                                <span className="ml-1 text-[10px]">Tutor is writing...</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Chat Input */}
                        <div className="p-3 border-t border-line bg-bg-soft/60 flex gap-2 flex-shrink-0">
                          <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                            placeholder="Type your response or question..."
                            disabled={loadingChat}
                            className="flex-1 bg-background border border-line rounded-xl px-4 py-2 text-xs text-foreground outline-none focus:border-accent"
                          />
                          <button
                            onClick={sendChatMessage}
                            disabled={loadingChat || !userInput.trim()}
                            className="bg-accent text-white px-4 py-2 rounded-xl text-xs font-bold hover:opacity-95 transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer"
                          >
                            Send
                          </button>
                        </div>
                      </motion.section>
                    )}
                  </AnimatePresence>

                  {/* Empty state */}
                  {!activeTopic && (
                    <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground/30">
                      <IconArrowUp className="w-10 h-10 mb-3" />
                      <p className="text-sm">Select a topic above to generate your AI tutor prompt</p>
                    </div>
                  )}

                </div>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}
