"use client";

import { useState, useEffect, JSX, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { pythonProjects, PythonProject, Library, QuizQuestion } from "./pythonProjectsData";
import { pythonProjectDetails } from "./pythonProjectDetailsData";

const STORAGE_KEY_AIML = "ai_roadmap_progress";
const STORAGE_KEY_PYTHON_COMPLETED = "python_roadmap_completed";
const STORAGE_KEY_PYTHON_FEATURES = "python_roadmap_features";
const STORAGE_KEY_PYTHON_QUIZZES = "python_roadmap_quizzes";
const STORAGE_KEY_PYTHON_ORDER = "python_roadmap_order";
const STORAGE_KEY_ACTIVE_PATH = "active_roadmap_path";

// ─── Inline SVG Icons ──────────────────────────────────────────────────────────
interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

const IconTrophy = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const IconMap = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" x2="9" y1="3" y2="18" /><line x1="15" x2="15" y1="6" y2="21" />
  </svg>
);

const IconBook = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const IconCopy = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const IconCheck = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconLink = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);

const IconX = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

const IconTarget = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const IconLightbulb = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" /><path d="M10 22h4" />
  </svg>
);

const IconArrowUp = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="19" y2="5" /><polyline points="5 12 12 5 19 12" />
  </svg>
);

const IconBrain = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
);

const IconLock = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconShield = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconReceipt = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
    <path d="M16 8H8" /><path d="M16 12H8" /><path d="M13 16H8" />
  </svg>
);

const IconCloudSun = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="M20 12h2" /><path d="m19.07 4.93-1.41 1.41" />
    <path d="M15.9 16A6 6 0 1 0 5 16H3a8 8 0 1 1 15.9-4h.1a5 5 0 0 1 0 10h-3Z" />
  </svg>
);

const IconFolderGit = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    <circle cx="12" cy="13" r="2" /><path d="M12 15v3" />
  </svg>
);

const IconConnect = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    <path d="M2 10h4" /><path d="M18 10h4" />
  </svg>
);

const IconLink2 = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 0 1 0 10h-2" /><line x1="8" x2="16" y1="12" y2="12" />
  </svg>
);

const IconBot = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="10" x="3" y="11" rx="2" />
    <circle cx="12" cy="5" r="2" /><path d="M12 7v4" />
    <line x1="8" x2="8" y1="16" y2="16" /><line x1="16" x2="16" y1="16" y2="16" />
  </svg>
);

const IconTrendingUp = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
  </svg>
);

const IconGitBranch = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" x2="6" y1="3" y2="15" />
    <circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);

const IconServer = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6" y1="6" y2="6" /><line x1="6" x2="6" y1="18" y2="18" />
  </svg>
);

// ─── Stage SVG Icons ──────────────────────────────────────────────────────────
const IconPython = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8 2 6 4 6 7v2h6v1H5c-2 0-3 1.5-3 4s1 5 3 5h1v-2.5c0-1.5 1-2.5 2.5-2.5h5c1.5 0 2.5-1 2.5-2.5V7c0-3-2-5-4-5z" />
    <path d="M12 22c4 0 6-2 6-5v-2h-6v-1h7c2 0 3-1.5 3-4s-1-5-3-5h-1v2.5c0 1.5-1 2.5-2.5 2.5h-5C9 10 8 11 8 12.5V17c0 3 2 5 4 5z" />
    <circle cx="9" cy="6" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="15" cy="18" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const IconDataScience = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" />
    <polyline points="3 8 7 5 11 9 15 6 20 8" />
  </svg>
);

const IconML = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="7" width="10" height="10" rx="1" />
    <path d="M9 7V4M12 7V4M15 7V4M9 20v-3M12 20v-3M15 20v-3M7 9H4M7 12H4M7 15H4M20 9h-3M20 12h-3M20 15h-3" />
  </svg>
);

const IconDeepLearning = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

const IconGenAI = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4M22 5h-4" />
  </svg>
);

const IconDSA = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconSystemDesign = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>
);

// ─── Stage icon map ────────────────────────────────────────────────────────────
const stageIcons: Record<number, (props: IconProps) => JSX.Element> = {
  1: IconPython,
  2: IconDataScience,
  3: IconML,
  4: IconDeepLearning,
  5: IconGenAI,
  6: IconDSA,
  7: IconSystemDesign,
};

// ─── Career Path (AI/ML) Stages Data ───────────────────────────────────────────
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


// Accent configurations per difficulty level
const difficultyStyles = {
  Beginner: {
    color: "#10B981", // Emerald
    bg: "rgba(16, 185, 129, 0.08)",
    glow: "rgba(16, 185, 129, 0.2)",
    border: "rgba(16, 185, 129, 0.25)"
  },
  Intermediate: {
    color: "#3B82F6", // Blue
    bg: "rgba(59, 130, 246, 0.08)",
    glow: "rgba(59, 130, 246, 0.2)",
    border: "rgba(59, 130, 246, 0.25)"
  },
  Advanced: {
    color: "#8B5CF6", // Purple/Violet
    bg: "rgba(139, 92, 246, 0.08)",
    glow: "rgba(139, 92, 246, 0.2)",
    border: "rgba(139, 92, 246, 0.25)"
  },
  Expert: {
    color: "#F43F5E", // Rose
    bg: "rgba(244, 63, 94, 0.08)",
    glow: "rgba(244, 63, 94, 0.2)",
    border: "rgba(244, 63, 94, 0.25)"
  }
};

const phaseIcons: Record<string, (props: IconProps) => JSX.Element> = {
  "Phase 1 — Python Engineering": IconPython,
  "Phase 2 — Data Engineering": IconDataScience,
  "Phase 3 — Machine Learning": IconML,
  "Phase 4 — Deep Learning": IconDeepLearning,
  "Phase 5 — Computer Vision": IconTarget,
  "Phase 6 — NLP": IconBook,
  "Phase 7 — Reinforcement Learning": IconDSA,
  "Phase 8 — LLM Engineering": IconBrain,
  "Phase 9 — Agentic AI": IconBot,
  "Phase 10 — Generative AI": IconLightbulb,
  "Phase 11 — MLOps": IconServer,
  "Phase 12 — Distributed Systems": IconConnect,
  "Phase 13 — System Design": IconSystemDesign,
  "Phase 14 — Research Reproduction": IconTrophy
};

const getTotalTopics = () => stages.reduce((acc, s) => acc + s.topics.length, 0);

export function AIRoadmap() {
  // Roadmap path: "aiml" (original 7-stages) or "python" (10 gamified projects)
  const [currentPath, setCurrentPath] = useState<"aiml" | "python">("aiml");

  // original AI/ML states
  const [selectedStage, setSelectedStage] = useState<typeof stages[0] | null>(stages[0]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"roadmap" | "resources">("roadmap");
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  // Python Project Roadmap states
  const [selectedPythonId, setSelectedPythonId] = useState<number>(1);
  const [pythonCompleted, setPythonCompleted] = useState<number[]>([]);
  const [pythonFeatures, setPythonFeatures] = useState<Record<number, boolean[]>>({});
  const [pythonQuizzes, setPythonQuizzes] = useState<Record<number, { q1: number; q2: number }>>({});
  const [enforcePythonOrder, setEnforcePythonOrder] = useState<boolean>(true);
  const [pythonDifficulty, setPythonDifficulty] = useState<"All" | "Beginner" | "Intermediate" | "Advanced" | "Expert">("All");
  const [pythonDetailTab, setPythonDetailTab] = useState<"overview" | "blueprint" | "mentor" | "quiz">("overview");
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(0);
  const [tempQuizAnswers, setTempQuizAnswers] = useState<Record<string, number>>({});
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({ "Phase 1 — Python Engineering": true });

  useEffect(() => {
    setActiveStepIndex(0);
  }, [selectedPythonId]);
  
  // Interactive AI Tutor States
  const [chatting, setChatting] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "assistant"; text: string }>>([]);
  const [userInput, setUserInput] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    try {
      // original path load
      const savedPath = localStorage.getItem(STORAGE_KEY_ACTIVE_PATH);
      if (savedPath === "aiml" || savedPath === "python") {
        setCurrentPath(savedPath);
      }

      const savedAiml = localStorage.getItem(STORAGE_KEY_AIML);
      if (savedAiml) setProgress(JSON.parse(savedAiml));

      // python path loads
      const savedPyCompleted = localStorage.getItem(STORAGE_KEY_PYTHON_COMPLETED);
      if (savedPyCompleted) setPythonCompleted(JSON.parse(savedPyCompleted));

      const savedPyFeatures = localStorage.getItem(STORAGE_KEY_PYTHON_FEATURES);
      if (savedPyFeatures) setPythonFeatures(JSON.parse(savedPyFeatures));

      const savedPyQuizzes = localStorage.getItem(STORAGE_KEY_PYTHON_QUIZZES);
      if (savedPyQuizzes) setPythonQuizzes(JSON.parse(savedPyQuizzes));

      const savedPyOrder = localStorage.getItem(STORAGE_KEY_PYTHON_ORDER);
      if (savedPyOrder !== null) setEnforcePythonOrder(JSON.parse(savedPyOrder));

    } catch {}
  }, []);

  // Reset chat session when changing topic or project or path
  useEffect(() => {
    setChatting(false);
    setChatHistory([]);
  }, [selectedTopic, selectedStage, customTopic, selectedPythonId, currentPath]);


  // Sync state helpers
  const saveAimlProgress = (np: Record<string, boolean>) => {
    setProgress(np);
    try { localStorage.setItem(STORAGE_KEY_AIML, JSON.stringify(np)); } catch {}
  };

  const savePythonState = (
    completed: number[],
    features: Record<number, boolean[]>,
    quizzes: Record<number, { q1: number; q2: number }>,
    order: boolean
  ) => {
    setPythonCompleted(completed);
    setPythonFeatures(features);
    setPythonQuizzes(quizzes);
    setEnforcePythonOrder(order);
    try {
      localStorage.setItem(STORAGE_KEY_PYTHON_COMPLETED, JSON.stringify(completed));
      localStorage.setItem(STORAGE_KEY_PYTHON_FEATURES, JSON.stringify(features));
      localStorage.setItem(STORAGE_KEY_PYTHON_QUIZZES, JSON.stringify(quizzes));
      localStorage.setItem(STORAGE_KEY_PYTHON_ORDER, JSON.stringify(order));
    } catch {}
  };

  // Confetti Particle System
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      gravity: number;
      alpha: number;
      decay: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 3;
        this.color = `hsl(${Math.random() * 360}, 90%, 60%)`;
        this.speedX = Math.random() * 10 - 5;
        this.speedY = Math.random() * -12 - 5;
        this.gravity = 0.3;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.alpha -= this.decay;
      }
      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const particles: Particle[] = [];
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(startX, startY));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        if (p.alpha > 0) {
          p.update();
          p.draw(ctx);
          alive = true;
        }
      }
      if (alive) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  // AI/ML Progress helpers
  const toggleTopic = (stageId: number, topic: string) => {
    const key = `${stageId}__${topic}`;
    saveAimlProgress({ ...progress, [key]: !progress[key] });
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
    const pText = currentPath === "aiml" ? getFinalPrompt() : getPythonPrompt();
    navigator.clipboard.writeText(pText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Python Progress helpers
  const visiblePythonProjects = pythonProjects.filter(
    p => pythonDifficulty === "All" || p.level === pythonDifficulty
  );

  const selectedPythonProject = pythonProjects.find(p => p.id === selectedPythonId) || visiblePythonProjects[0] || pythonProjects[0];

  useEffect(() => {
    if (selectedPythonProject) {
      setExpandedPhases(prev => ({ ...prev, [selectedPythonProject.phase]: true }));
    }
  }, [selectedPythonId, selectedPythonProject]);

  useEffect(() => {
    if (visiblePythonProjects.length > 0 && !visiblePythonProjects.some(p => p.id === selectedPythonId)) {
      setSelectedPythonId(visiblePythonProjects[0].id);
    }
  }, [pythonDifficulty]);

  const isPythonProjectUnlocked = (id: number) => {
    if (!enforcePythonOrder) return true;
    const visibleIndex = visiblePythonProjects.findIndex(p => p.id === id);
    if (visibleIndex <= 0) return true;
    const prevProject = visiblePythonProjects[visibleIndex - 1];
    return pythonCompleted.includes(prevProject.id);
  };

  const getPythonPrompt = () => {
    return selectedPythonProject ? selectedPythonProject.aiPrompt : "";
  };

  const calculatePythonXp = () => {
    return pythonCompleted.reduce((total, id) => {
      const proj = pythonProjects.find(p => p.id === id);
      return total + (proj ? proj.xp : 0);
    }, 0);
  };

  const pythonXp = calculatePythonXp();
  const currentPythonLevel = (() => {
    const pyLevels = [
      { name: "Python Hatchling", minXp: 0, Icon: IconPython, desc: "Welcome to Python! You are taking your first steps." },
      { name: "Scripting Apprentice", minXp: 2000, Icon: IconFolderGit, desc: "You write solid scripts and understand OOP fundamentals." },
      { name: "Automation Squire", minXp: 8000, Icon: IconServer, desc: "You automate systems and interact with web APIs." },
      { name: "API Craftsman", minXp: 18000, Icon: IconLink2, desc: "You build web APIs and concurrency-based servers." },
      { name: "Data & AI Conjurer", minXp: 30000, Icon: IconBrain, desc: "You parse data, build ML dashboards, and chat with PDFs." },
      { name: "Python Archmage", minXp: 40000, Icon: IconTrophy, desc: "You build production-grade architectures and complex systems." }
    ];
    let activeLevel = pyLevels[0];
    for (const lvl of pyLevels) {
      if (pythonXp >= lvl.minXp) {
        activeLevel = lvl;
      }
    }
    return activeLevel;
  })();

  const togglePythonFeature = (projectId: number, index: number) => {
    const featState = { ...pythonFeatures };
    if (!featState[projectId]) {
      featState[projectId] = new Array(pythonProjects.find(p => p.id === projectId)?.features.length || 0).fill(false);
    }
    featState[projectId][index] = !featState[projectId][index];
    savePythonState(pythonCompleted, featState, pythonQuizzes, enforcePythonOrder);
  };

  const submitPythonQuiz = () => {
    if (tempQuizAnswers.q1 === undefined || tempQuizAnswers.q2 === undefined) return;
    
    const isQ1Correct = tempQuizAnswers.q1 === selectedPythonProject.quiz.q1.correct;
    const isQ2Correct = tempQuizAnswers.q2 === selectedPythonProject.quiz.q2.correct;

    if (isQ1Correct && isQ2Correct) {
      const nextCompleted = [...pythonCompleted];
      if (!nextCompleted.includes(selectedPythonProject.id)) {
        nextCompleted.push(selectedPythonProject.id);
      }
      const nextQuizzes = { ...pythonQuizzes, [selectedPythonProject.id]: { q1: tempQuizAnswers.q1, q2: tempQuizAnswers.q2 } };
      savePythonState(nextCompleted, pythonFeatures, nextQuizzes, enforcePythonOrder);
      triggerConfetti();
      toast.success("Skill check-in passed!", { description: `Earned +${selectedPythonProject.xp} XP!` });
      setTempQuizAnswers({});
    } else {
      toast.error("Incorrect answers", { description: "Please review the concepts and try again." });
    }
  };

  const resetAllProgress = () => {
    if (currentPath === "aiml") {
      saveAimlProgress({});
      setSelectedStage(stages[0]);
      setSelectedTopic("");
      setCustomTopic("");
      toast.success("Career path progress reset.");
    } else {
      savePythonState([], {}, {}, true);
      setSelectedPythonId(1);
      setTempQuizAnswers({});
      toast.success("Python projects progress reset.");
    }
  };

  // AI Chat session trigger
  const startAISession = async () => {
    const initialPrompt = currentPath === "aiml" ? getFinalPrompt() : getPythonPrompt();
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

  const getTotalTopicsCount = () => {
    return stages.reduce((acc, s) => acc + s.topics.length, 0);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-background relative">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 w-full h-full" />

      {/* ── LEFT PANEL ────────────────────────────────────────────── */}
      <aside className={cn(
        "w-full lg:w-80 flex-shrink-0 flex flex-col border-r border-line overflow-hidden bg-background",
        mobileView === "list" ? "flex" : "hidden lg:flex"
      )}>

        {/* Path Selector */}
        <div className="px-4 pt-4 pb-2 border-b border-line flex-shrink-0">
          <div className="flex bg-bg-soft border border-line p-0.5 rounded-lg gap-0.5">
            <button
              onClick={() => {
                setCurrentPath("aiml");
                localStorage.setItem(STORAGE_KEY_ACTIVE_PATH, "aiml");
                setMobileView("list");
              }}
              className={cn(
                "flex-1 py-1.5 rounded-md text-[10px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer",
                currentPath === "aiml"
                  ? "bg-accent text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Career Path
            </button>
            <button
              onClick={() => {
                setCurrentPath("python");
                localStorage.setItem(STORAGE_KEY_ACTIVE_PATH, "python");
                setMobileView("list");
              }}
              className={cn(
                "flex-1 py-1.5 rounded-md text-[10px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer",
                currentPath === "python"
                  ? "bg-accent text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Python Projects
            </button>
          </div>
        </div>

        {/* Header Stats */}
        <div className="px-5 py-4 border-b border-line flex-shrink-0">
          {currentPath === "aiml" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
                  <IconTarget className="w-4 h-4" />
                </div>
                <div>
                  <h1 className="font-black text-sm text-foreground tracking-tight">AI/ML Roadmap</h1>
                  <p className="text-[10px] text-muted-foreground">7 stages · {totalTopics} topics</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-1">
                    <IconTrophy className="w-3 h-3" /> Progress
                  </span>
                  <span className="text-[10px] font-bold text-foreground">{overallPct}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden bg-line">
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
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #10B981, #3b82f6)" }}>
                  {(() => {
                    const LevelIcon = currentPythonLevel.Icon;
                    return <LevelIcon className="w-4.5 h-4.5" />;
                  })()}
                </div>
                <div>
                  <h1 className="font-black text-sm text-foreground tracking-tight">Python Projects</h1>
                  <p className="text-[10px] text-muted-foreground">{currentPythonLevel.name}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-1">
                    <IconTrophy className="w-3 h-3" /> XP: {pythonXp} / {pythonProjects.reduce((acc, p) => acc + p.xp, 0)}
                  </span>
                  <span className="text-[10px] font-bold text-foreground">
                    {visiblePythonProjects.length > 0
                      ? Math.round((visiblePythonProjects.filter(p => pythonCompleted.includes(p.id)).length / visiblePythonProjects.length) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden bg-line">
                  <motion.div
                    className="h-full rounded-full bg-success"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        visiblePythonProjects.length > 0
                          ? Math.round((visiblePythonProjects.filter(p => pythonCompleted.includes(p.id)).length / visiblePythonProjects.length) * 100)
                          : 0
                      }%`
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[9px] text-muted-foreground">
                    {visiblePythonProjects.filter(p => pythonCompleted.includes(p.id)).length}/{visiblePythonProjects.length} projects built
                  </p>
                  <button
                    onClick={() => {
                      const nextOrder = !enforcePythonOrder;
                      savePythonState(pythonCompleted, pythonFeatures, pythonQuizzes, nextOrder);
                      toast.success(nextOrder ? "Chronological lock activated" : "Free-form path activated");
                    }}
                    className={cn(
                      "text-[9px] font-bold flex items-center gap-0.5 px-1.5 py-0.5 rounded border transition-colors cursor-pointer",
                      enforcePythonOrder ? "border-success/30 text-success bg-success/5" : "border-line text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <IconLock className="w-2.5 h-2.5" /> Link Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Controls / Tabs */}
        {currentPath === "aiml" ? (
          <div className="px-3 py-3 border-b border-line flex gap-1 flex-shrink-0">
            {([
              { id: "roadmap", label: "Roadmap", Icon: IconMap },
              { id: "resources", label: "Resources", Icon: IconBook },
            ] as const).map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold transition-all duration-200 cursor-pointer",
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
        ) : (
          <div className="px-3 py-2 border-b border-line flex flex-wrap gap-1 flex-shrink-0 bg-bg-soft/20">
            {(["All", "Beginner", "Intermediate", "Advanced", "Expert"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setPythonDifficulty(level)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[10px] font-semibold transition-colors cursor-pointer",
                  pythonDifficulty === level
                    ? "bg-accent text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-bg-soft"
                )}
              >
                {level}
              </button>
            ))}
          </div>
        )}

        {/* Scrollable Content list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-3 space-y-1.5 bg-background">
          {currentPath === "aiml" ? (
            <>
              {activeTab === "roadmap" && stages.map((stage) => {
                const StageIcon = stageIcons[stage.id];
                const isSelected = selectedStage?.id === stage.id;
                const { done, total, pct } = stageProgress(stage);
                return (
                  <button
                    key={stage.id}
                    onClick={() => { setSelectedStage(stage); setSelectedTopic(""); setCustomTopic(""); setMobileView("detail"); }}
                    className={cn(
                      "w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer",
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
            </>
          ) : (
            (() => {
              const phases = Array.from(new Set(visiblePythonProjects.map(p => p.phase)));
              return phases.map((phase) => {
                const phaseProjects = visiblePythonProjects.filter(p => p.phase === phase);
                if (phaseProjects.length === 0) return null;

                const isExpanded = !!expandedPhases[phase];
                const phaseCompletedCount = phaseProjects.filter(p => pythonCompleted.includes(p.id)).length;
                const phaseTotalCount = phaseProjects.length;

                return (
                  <div key={phase} className="mb-2 border border-line/50 rounded-xl overflow-hidden bg-bg-soft/10">
                    <button
                      onClick={() => setExpandedPhases(prev => ({ ...prev, [phase]: !prev[phase] }))}
                      className="w-full flex items-center justify-between p-3 bg-bg-soft/40 hover:bg-bg-soft/70 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-extrabold tracking-wider uppercase text-foreground/80 truncate">
                          {phase}
                        </p>
                        <p className="text-[9px] text-muted-foreground/60 mt-0.5">
                          {phaseCompletedCount}/{phaseTotalCount} completed
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 ml-2">
                        <span className="text-[10px] font-bold text-success/80">
                          {Math.round((phaseCompletedCount / phaseTotalCount) * 100)}%
                        </span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform duration-200", isExpanded && "rotate-180")}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-2 space-y-1 bg-background/30 border-t border-line/30">
                        {phaseProjects.map((proj) => {
                          const isCompleted = pythonCompleted.includes(proj.id);
                          const isLocked = !isPythonProjectUnlocked(proj.id);
                          const isSelected = selectedPythonId === proj.id;
                          
                          // Features complete calculations
                          const totalF = proj.features.length;
                          const completedF = (pythonFeatures[proj.id] || []).filter(Boolean).length;
                          
                          // Accents configuration
                          const accent = difficultyStyles[proj.level];
                          const ProjIcon = phaseIcons[proj.phase] || IconPython;

                          return (
                            <button
                              key={proj.id}
                              disabled={isLocked && enforcePythonOrder}
                              onClick={() => { if (!isLocked || !enforcePythonOrder) { setSelectedPythonId(proj.id); setMobileView("detail"); } }}
                              className={cn(
                                "w-full text-left p-3 rounded-lg border transition-all duration-200 cursor-pointer flex flex-col relative",
                                isSelected ? "bg-bg-soft/70 shadow-sm" : "border-line bg-gradient-to-br from-bg-soft/10 to-background hover:bg-bg-soft/30",
                                isLocked && enforcePythonOrder && "opacity-45 cursor-not-allowed"
                              )}
                              style={isSelected ? { borderColor: accent.color, boxShadow: `0 0 10px ${accent.glow}` } : {}}
                            >
                              <div className="flex items-center gap-2 mb-1.5">
                                <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all"
                                  style={{
                                    background: isCompleted ? "rgba(16, 185, 129, 0.1)" : isLocked && enforcePythonOrder ? "var(--line)" : accent.bg,
                                    color: isCompleted ? "#10B981" : isLocked && enforcePythonOrder ? "var(--text-muted)" : accent.color
                                  }}>
                                  {isCompleted ? <IconCheck className="w-3 h-3" /> : 
                                    isLocked && enforcePythonOrder ? <IconLock className="w-2.5 h-2.5" /> : <ProjIcon className="w-3 h-3" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={cn("text-[11px] font-bold truncate", isSelected ? "text-foreground" : "text-muted-foreground")}>
                                    {proj.id}. {proj.title}
                                  </p>
                                  <p className="text-[8px] text-muted-foreground/60 flex items-center gap-1.5">
                                    <span className="font-semibold" style={{ color: accent.color }}>{proj.level}</span>
                                    <span className="opacity-40">&bull;</span>
                                    <span>+{proj.xp} XP</span>
                                  </p>
                                </div>
                              </div>
                              
                              <div className="w-full bg-border rounded-full h-0.5 mt-0.5 overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-500"
                                  style={{ 
                                    width: `${Math.round((completedF / totalF) * 100)}%`, 
                                    background: isCompleted ? "#10B981" : accent.color 
                                  }} 
                                />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              });
            })()
          )}
        </div>

        {/* Left Panel Footer Reset */}
        <div className="p-3 border-t border-line flex-shrink-0 bg-bg-soft/10">
          <button
            onClick={resetAllProgress}
            className="w-full py-2 border border-line rounded-lg text-[10px] text-muted-foreground hover:text-danger hover:border-danger/30 hover:bg-danger/5 transition-all font-bold tracking-wider uppercase cursor-pointer"
          >
            Reset Path Data
          </button>
        </div>
      </aside>

      {/* ── RIGHT PANEL ───────────────────────────────────────────── */}
      <div className={cn(
        "flex-1 flex-col overflow-hidden bg-background",
        mobileView === "detail" ? "flex" : "hidden lg:flex"
      )}>
        
        {/* RIGHT PANEL HEADER */}
        {currentPath === "aiml" ? (
          !selectedStage ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground/30 text-sm">
              ← Select a stage to begin
            </div>
          ) : (() => {
            const StageIcon = stageIcons[selectedStage.id];
            return (
              <>
                <div className="px-5 sm:px-8 py-5 border-b border-line flex-shrink-0 flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <button
                      onClick={() => setMobileView("list")}
                      className="lg:hidden mr-3 p-2 border border-line rounded-xl bg-bg-soft text-muted-foreground hover:text-foreground cursor-pointer flex-shrink-0"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                      </svg>
                    </button>
                    <div>
                      <h2 className="font-black text-lg sm:text-xl text-foreground flex items-center gap-2.5 truncate">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 hidden sm:flex"
                          style={{ background: selectedStage.color + "18", color: selectedStage.color }}>
                          <StageIcon className="w-4.5 h-4.5" />
                        </div>
                        {selectedStage.title}
                      </h2>
                      <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-1 sm:ml-10 truncate max-w-[200px] sm:max-w-md">{selectedStage.desc}</p>
                    </div>
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
                                  "px-3 py-1.5 text-xs font-semibold border transition-all duration-150 cursor-pointer",
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
                                  className="px-2 rounded-r-lg border border-l-0 transition-all flex items-center cursor-pointer"
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
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer"
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
                          className="p-1.5 rounded-lg border border-line text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                        >
                          <IconX className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Chat Prompt box */}
                    {activeTopic && (
                      <div className="space-y-6">
                        {renderChatPromptUI()}
                      </div>
                    )}

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
          })()
        ) : (
          /* PYTHON PROJECTS ROADMAP DETAILS VIEW */
          (() => {
            const isCompleted = pythonCompleted.includes(selectedPythonProject.id);
            const isLocked = !isPythonProjectUnlocked(selectedPythonProject.id);
            const hasPassedQuiz = pythonQuizzes[selectedPythonProject.id] !== undefined;
            const accent = difficultyStyles[selectedPythonProject.level];

            return (
              <>
                <div className="px-5 sm:px-8 py-5 border-b border-line flex-shrink-0 flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <button
                      onClick={() => setMobileView("list")}
                      className="lg:hidden mr-3 p-2 border border-line rounded-xl bg-bg-soft text-muted-foreground hover:text-foreground cursor-pointer flex-shrink-0"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                      </svg>
                    </button>
                    <div>
                      <h2 className="font-black text-lg sm:text-xl text-foreground flex items-center gap-2.5 truncate">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 hidden sm:flex"
                          style={{ background: accent.bg, color: accent.color }}>
                          {(() => {
                            const ProjIcon = phaseIcons[selectedPythonProject.phase] || IconPython;
                            return <ProjIcon className="w-4.5 h-4.5" />;
                          })()}
                        </div>
                        {selectedPythonProject.id}. {selectedPythonProject.title}
                      </h2>
                      <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-1 sm:ml-10 flex items-center gap-1.5 truncate">
                        <span className="font-bold uppercase tracking-wider text-[9px]" style={{ color: accent.color }}>
                          {selectedPythonProject.level} Project
                        </span>
                        <span className="opacity-30">&bull;</span>
                        <span className="truncate max-w-[200px] sm:max-w-md">{selectedPythonProject.desc}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Reward</p>
                    <p className="text-xs font-black text-success mt-0.5">+{selectedPythonProject.xp} XP</p>
                  </div>
                </div>

                {/* Sub-tab navigation in Right Panel */}
                <div className="px-5 sm:px-8 border-b border-line flex gap-4 bg-bg-soft/10 flex-shrink-0 overflow-x-auto custom-scrollbar whitespace-nowrap">
                  {([
                    { id: "overview", label: "Project Brief" },
                    { id: "blueprint", label: "Execution Blueprint" },
                    { id: "mentor", label: "AI Chat" },
                    { id: "quiz", label: "Skill Quiz" }
                  ] as const).map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setPythonDetailTab(id)}
                      className={cn(
                        "py-3 text-[11px] font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex-shrink-0",
                        pythonDetailTab === id
                          ? "text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      )}
                      style={pythonDetailTab === id ? { borderBottomColor: accent.color } : {}}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Scrollable details view */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <div className="px-6 sm:px-8 py-6">
                    {pythonDetailTab === "overview" && (
                      <div className="space-y-6">
                        {/* Brief */}
                        <div className="p-4 border border-line bg-gradient-to-br from-bg-soft/10 to-background rounded-xl">
                          <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-muted-foreground mb-2 flex items-center gap-1.5">
                            <IconTarget className="w-3.5 h-3.5" style={{ color: accent.color }} /> Project Overview & Objective
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{selectedPythonProject.desc}</p>
                        </div>

                        {/* Architecture and Under the hood */}
                        <div className="p-4 border border-line bg-gradient-to-br from-bg-soft/10 to-background rounded-xl">
                          <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-muted-foreground mb-3 flex items-center gap-1.5">
                            <IconTarget className="w-3.5 h-3.5" style={{ color: accent.color }} /> System Architecture & Flow
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 p-3.5 bg-background border border-line rounded-xl overflow-x-auto text-[10px] font-mono text-accent py-2.5">
                            <span className="text-muted-foreground flex-shrink-0">Pipeline:</span>
                            {selectedPythonProject.architecture.split(" -> ").map((step, idx, arr) => (
                              <div key={idx} className="flex items-center gap-2 flex-shrink-0">
                                <span className="px-2.5 py-1 rounded-md bg-bg-soft text-foreground border border-line">{step}</span>
                                {idx < arr.length - 1 && <span className="text-muted-foreground">&rarr;</span>}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Monospace Directory File Structure */}
                        <div className="p-4 border border-line bg-gradient-to-br from-bg-soft/10 to-background rounded-xl">
                          <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-muted-foreground mb-2.5 flex items-center gap-1.5">
                            <IconBook className="w-3.5 h-3.5" style={{ color: accent.color }} /> Suggested File Layout
                          </h4>
                          <div className="border border-line rounded-xl overflow-hidden shadow-sm bg-[#0B0F19]">
                            <div className="flex items-center justify-between px-4 py-2 bg-background border-b border-line flex-shrink-0">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                                <span className="w-2 h-2 rounded-full bg-green-500/80" />
                              </div>
                              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Workspace Structure</span>
                              <div className="w-12" />
                            </div>
                            <pre className="p-4 text-[10px] font-mono text-emerald-400 leading-relaxed overflow-x-auto">
                              {selectedPythonProject.fileStructure}
                            </pre>
                          </div>
                        </div>

                        {/* Concepts */}
                        <div>
                          <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-muted-foreground mb-2.5 flex items-center gap-1.5">
                            <IconBook className="w-3.5 h-3.5" style={{ color: accent.color }} /> Core Concepts Taught
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedPythonProject.concepts.map((concept, i) => (
                              <span key={i} className="text-[10px] font-bold bg-bg-soft border border-line/60 px-2.5 py-1 rounded-md text-foreground/80 hover:border-accent/40 hover:text-foreground transition-all duration-200">
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Checklist */}
                        <div>
                          {(() => {
                            const totalF = selectedPythonProject.features.length;
                            const completedF = (pythonFeatures[selectedPythonProject.id] || []).filter(Boolean).length;
                            return (
                              <>
                                <div className="flex justify-between items-center mb-2.5">
                                  <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-muted-foreground flex items-center gap-1.5">
                                    <IconCheck className="w-3.5 h-3.5" style={{ color: accent.color }} /> Features Checklist
                                  </h4>
                                  <span className="text-[10px] font-bold text-muted-foreground">{completedF} / {totalF} completed</span>
                                </div>
                                <div className="space-y-2">
                                  {selectedPythonProject.features.map((feat, index) => {
                                    const checked = !!(pythonFeatures[selectedPythonProject.id] || [])[index];
                                    return (
                                      <button
                                        key={index}
                                        onClick={() => togglePythonFeature(selectedPythonProject.id, index)}
                                        className="w-full flex items-start gap-3 p-3 rounded-lg border border-line bg-bg-soft/20 hover:bg-bg-soft/40 transition-all text-left cursor-pointer"
                                      >
                                        <div className={cn(
                                          "w-4 h-4 rounded border border-line flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                                          checked ? "bg-success border-success text-white" : "bg-background"
                                        )}>
                                          {checked && <IconCheck className="w-2.5 h-2.5" />}
                                        </div>
                                        <span className={cn(
                                          "text-xs leading-relaxed transition-all",
                                          checked ? "line-through text-muted-foreground/60" : "text-muted-foreground hover:text-foreground"
                                        )}>
                                          {feat}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </>
                            );
                          })()}
                        </div>

                        {/* Libraries */}
                        <div>
                          <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-muted-foreground mb-2.5 flex items-center gap-1.5">
                            <IconLink className="w-3.5 h-3.5" style={{ color: accent.color }} /> Key Third-party Libraries
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {selectedPythonProject.libraries.map((lib, i) => (
                              <div key={i} className="p-4 border border-line bg-gradient-to-br from-bg-soft/10 to-background rounded-xl hover:border-accent/30 transition-all duration-200 group relative">
                                <div className="flex items-center justify-between mb-1.5">
                                  <p className="text-[10px] font-bold text-accent font-mono">pip install {lib.name}</p>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(`pip install ${lib.name}`);
                                      toast.success(`Copied "pip install ${lib.name}"`);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-bg-soft border border-line transition-all text-muted-foreground hover:text-foreground cursor-pointer absolute right-3 top-3"
                                  >
                                    <IconCopy className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                                <p className="text-[10px] text-muted-foreground leading-normal mt-1 pr-6">{lib.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {pythonDetailTab === "blueprint" && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-muted-foreground mb-3 flex items-center gap-1.5">
                            <IconMap className="w-3.5 h-3.5" style={{ color: accent.color }} /> Step-by-Step Blueprint Walkthrough
                          </h4>
                          <div className="space-y-3">
                            {(pythonProjectDetails[selectedPythonProject.id] || []).map((step, idx) => {
                              const isExpanded = activeStepIndex === idx;
                              return (
                                <div key={idx} className={cn(
                                  "border rounded-xl overflow-hidden transition-all duration-200",
                                  isExpanded ? "border-accent bg-bg-soft/5 shadow-sm" : "border-line bg-background hover:bg-bg-soft/20"
                                )}>
                                  <button
                                    onClick={() => setActiveStepIndex(isExpanded ? null : idx)}
                                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer select-none"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={cn(
                                        "w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0 transition-colors",
                                        isExpanded ? "bg-accent text-white" : "bg-bg-soft border border-line text-muted-foreground"
                                      )}
                                      style={isExpanded ? { backgroundColor: accent.color } : {}}>
                                        {idx + 1}
                                      </div>
                                      <div>
                                        <p className="text-xs font-bold text-foreground leading-tight">{step.title}</p>
                                        <p className="text-[9px] text-muted-foreground mt-0.5 max-w-sm truncate">{step.objective}</p>
                                      </div>
                                    </div>
                                    <svg
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200", isExpanded && "rotate-180")}
                                    >
                                      <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                  </button>

                                  {isExpanded && (
                                    <div className="px-4 pb-4 border-t border-line/50 pt-4 space-y-4 bg-background/5">
                                      <div>
                                        <h5 className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1.5">Step Objective</h5>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{step.objective}</p>
                                      </div>

                                      <div>
                                        <h5 className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1.5">Action Checklist</h5>
                                        <ul className="space-y-1.5">
                                          {step.tasks.map((task, tidx) => (
                                            <li key={tidx} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" style={{ backgroundColor: accent.color }} />
                                              <span>{task}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>

                                      <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg flex items-start gap-2.5">
                                        <IconLightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5 animate-pulse" />
                                        <div>
                                          <p className="text-[9px] font-extrabold text-amber-500 uppercase tracking-wider">Pro Tip</p>
                                          <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{step.proTip}</p>
                                        </div>
                                      </div>

                                      {step.codeSnippet && (
                                        <div>
                                          <div className="flex justify-between items-center mb-2">
                                            <h5 className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">Starter Code Reference</h5>
                                            <button
                                              onClick={() => {
                                                navigator.clipboard.writeText(step.codeSnippet);
                                                toast.success("Code snippet copied to clipboard");
                                              }}
                                              className="flex items-center gap-1 text-[9px] font-semibold px-2 py-1 border border-line rounded bg-background hover:bg-bg-soft text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                                            >
                                              <IconCopy className="w-2.5 h-2.5" />
                                              Copy Code
                                            </button>
                                          </div>
                                          <div className="border border-line rounded-lg overflow-hidden bg-[#0B0F19]">
                                            <pre className="p-3.5 text-[10px] font-mono text-emerald-400 leading-relaxed overflow-x-auto">
                                              {step.codeSnippet}
                                            </pre>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {pythonDetailTab === "mentor" && (
                      <div className="space-y-6">
                        {/* Prompt Output / Chat Interface */}
                        <div>
                          <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-muted-foreground mb-2 flex items-center gap-1.5">
                            <IconBrain className="w-3.5 h-3.5" style={{ color: accent.color }} /> Tutor prompt & Chat
                          </h4>
                          {renderChatPromptUI()}
                        </div>
                      </div>
                    )}

                    {pythonDetailTab === "quiz" && (
                      <div className="space-y-6">
                        {isLocked && enforcePythonOrder ? (
                          <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-line rounded-2xl bg-bg-soft/10">
                            <IconLock className="w-8 h-8 text-muted-foreground/40 mb-3" />
                            <h5 className="text-xs font-bold text-foreground">Assessment Locked</h5>
                            <p className="text-[10px] text-muted-foreground max-w-xs mt-1.5 leading-relaxed">
                              Complete the previous projects in order to unlock the skill check-in quiz for this project.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-5 border border-line bg-bg-soft/20 p-5 sm:p-6 rounded-2xl shadow-sm">
                            <div className="flex items-center justify-between border-b border-line pb-3 mb-2">
                              <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-muted-foreground flex items-center gap-1.5">
                                <IconTrophy className="w-3.5 h-3.5" style={{ color: accent.color }} /> Project Verification
                              </h4>
                              {isCompleted && (
                                <span className="text-[10px] font-bold text-success flex items-center gap-1">
                                  <IconCheck className="w-3 h-3" /> Passed
                                </span>
                              )}
                            </div>

                            {/* Q1 */}
                            <div>
                              <p className="text-xs font-bold text-foreground mb-2.5">
                                1. {selectedPythonProject.quiz.q1.question}
                              </p>
                              <div className="space-y-2">
                                {selectedPythonProject.quiz.q1.options.map((opt, idx) => {
                                  const isSelected = tempQuizAnswers.q1 === idx;
                                  const isSaved = hasPassedQuiz && pythonQuizzes[selectedPythonProject.id]?.q1 === idx;
                                  const isCorrect = idx === selectedPythonProject.quiz.q1.correct;

                                  return (
                                    <button
                                      key={idx}
                                      disabled={hasPassedQuiz}
                                      onClick={() => setTempQuizAnswers({ ...tempQuizAnswers, q1: idx })}
                                      className={cn(
                                        "w-full text-left p-3 rounded-xl border text-[11px] transition-all cursor-pointer",
                                        isSaved 
                                          ? isCorrect ? "border-success bg-success/5 text-success font-semibold" : "border-danger bg-danger/5 text-danger"
                                          : isSelected
                                            ? "border-accent bg-accent/5 text-accent font-semibold"
                                            : "border-line bg-bg-soft/30 text-muted-foreground hover:bg-bg-soft/75"
                                      )}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Q2 */}
                            <div>
                              <p className="text-xs font-bold text-foreground mb-2.5">
                                2. {selectedPythonProject.quiz.q2.question}
                              </p>
                              <div className="space-y-2">
                                {selectedPythonProject.quiz.q2.options.map((opt, idx) => {
                                  const isSelected = tempQuizAnswers.q2 === idx;
                                  const isSaved = hasPassedQuiz && pythonQuizzes[selectedPythonProject.id]?.q2 === idx;
                                  const isCorrect = idx === selectedPythonProject.quiz.q2.correct;

                                  return (
                                    <button
                                      key={idx}
                                      disabled={hasPassedQuiz}
                                      onClick={() => setTempQuizAnswers({ ...tempQuizAnswers, q2: idx })}
                                      className={cn(
                                        "w-full text-left p-3 rounded-xl border text-[11px] transition-all cursor-pointer",
                                        isSaved 
                                          ? isCorrect ? "border-success bg-success/5 text-success font-semibold" : "border-danger bg-danger/5 text-danger"
                                          : isSelected
                                            ? "border-accent bg-accent/5 text-accent font-semibold"
                                            : "border-line bg-bg-soft/30 text-muted-foreground hover:bg-bg-soft/75"
                                      )}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-2 border-t border-line flex flex-col gap-2.5">
                              {hasPassedQuiz ? (
                                <button
                                  disabled
                                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-success/10 border border-success/30 text-success flex items-center justify-center gap-1.5"
                                >
                                  <IconTrophy className="w-3.5 h-3.5" /> Project Passed & Unlocked +{selectedPythonProject.xp} XP
                                </button>
                              ) : (
                                <button
                                  disabled={tempQuizAnswers.q1 === undefined || tempQuizAnswers.q2 === undefined}
                                  onClick={submitPythonQuiz}
                                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-accent text-white hover:opacity-95 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <IconCheck className="w-3.5 h-3.5" /> Submit Assessment
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })()
        )}
      </div>
    </div>
  );

  // Helper function to render Prompt copying / Chat UI
  function renderChatPromptUI() {
    const activePrompt = currentPath === "aiml" ? getFinalPrompt() : getPythonPrompt();
    const activeColor = currentPath === "aiml" ? selectedStage?.color || "#3B82F6" : difficultyStyles[selectedPythonProject.level].color;
    const accent = currentPath === "aiml" ? { glow: "rgba(59,130,246,0.15)" } : difficultyStyles[selectedPythonProject.level];

    return (
      <AnimatePresence mode="wait">
        {activePrompt && !chatting && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border overflow-hidden shadow-sm"
            style={{ borderColor: activeColor + "44" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b flex-wrap gap-2"
              style={{ borderColor: activeColor + "33", background: activeColor + "0A" }}>
              <div className="flex items-center gap-2" style={{ color: activeColor }}>
                <IconBrain className="w-3.5 h-3.5 flex-shrink-0" />
                <p className="text-[10px] font-extrabold uppercase tracking-wider">
                  AI Mentor Prompt Context
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-bold text-white transition-all cursor-pointer"
                  style={{ background: copied ? "#10B981" : activeColor }}
                >
                  {copied ? <IconCheck className="w-3 h-3" /> : <IconCopy className="w-3 h-3" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={startAISession}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-bold text-white transition-all bg-accent cursor-pointer"
                >
                  <IconBrain className="w-3 h-3" />
                  Chat
                </button>
              </div>
            </div>

            {/* Prompt content */}
            <pre className="px-4 py-3.5 text-[11px] text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono custom-scrollbar overflow-y-auto bg-bg-soft/40"
              style={{ maxHeight: "250px" }}>
              {activePrompt}
            </pre>
          </motion.div>
        )}

        {activePrompt && chatting && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border flex flex-col overflow-hidden bg-bg-soft/10 shadow-sm"
            style={{ borderColor: activeColor + "44", height: "450px" }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b flex-shrink-0"
              style={{ borderColor: activeColor + "33", background: activeColor + "0A" }}>
              <div className="flex items-center gap-2" style={{ color: activeColor }}>
                <IconBrain className="w-3.5 h-3.5" />
                <p className="text-[10px] font-bold">
                  Interactive AI Tutor
                </p>
              </div>
              <button
                onClick={() => setChatting(false)}
                className="text-[10px] text-muted-foreground hover:text-foreground font-semibold px-2 py-0.5 border border-line rounded bg-background cursor-pointer"
              >
                Exit Chat
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar bg-background/10">
              {chatHistory.slice(1).map((msg, index) => {
                const isUser = msg.role === "user";
                return (
                  <div key={index} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3.5 py-2 text-[11px] leading-relaxed shadow-sm",
                        isUser 
                          ? "bg-accent text-white rounded-tr-none" 
                          : "bg-bg-soft border border-line text-foreground rounded-tl-none prose prose-invert"
                      )}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        msg.text.split("\n").map((line, idx) => {
                          if (line.startsWith("###")) {
                            return <h4 key={idx} className="font-bold text-foreground mt-2 mb-1 border-b border-line/20 pb-0.5">{line.replace("###", "").trim()}</h4>;
                          }
                          if (line.startsWith("##")) {
                            return <h3 key={idx} className="font-black text-foreground mt-3 mb-1.5">{line.replace("##", "").trim()}</h3>;
                          }
                          if (line.startsWith("*") || line.startsWith("-")) {
                            return <div key={idx} className="flex items-start gap-1.5 ml-1 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" /><span>{line.replace(/^[*+-]\s*/, "")}</span></div>;
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
                  <div className="bg-bg-soft border border-line rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs text-muted-foreground flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 text-[9px]">Tutor writing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-2.5 border-t border-line bg-bg-soft/40 flex gap-2 flex-shrink-0">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                placeholder="Talk to your project tutor..."
                disabled={loadingChat}
                className="flex-1 bg-background border border-line rounded-lg px-3 py-1.5 text-[11px] text-foreground outline-none focus:border-accent"
              />
              <button
                onClick={sendChatMessage}
                disabled={loadingChat || !userInput.trim()}
                className="bg-accent text-white px-3.5 py-1.5 rounded-lg text-[11px] font-bold hover:opacity-95 transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
}
