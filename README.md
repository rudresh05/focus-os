# Focus OS

Focus OS is a high-performance strategic execution workstation designed for professionals who demand precision in their goal tracking. Built with a premium SaaS aesthetic, it transforms abstract goals into actionable missions through structured sprints and advanced behavioral analytics.

## 🚀 Key Features

### 🎯 Strategic Mission Control
- **Mission Initialization:** Design high-impact sprints with custom primary targets and tactical daily protocols.
- **Tactical Daily Tracker:** A high-fidelity checklist for managing recurring daily objectives with real-time integrity syncing.
- **Strategic Reserve (Parking Lot):** Archive emergent ideas and concepts without breaking your current mission focus.

### 📊 Advanced Analytics HUD
- **Annual Efficiency Breakdown:** A comprehensive 52-week (January-December) tactical log showing daily fulfillment.
- **Growth Velocity:** Real-time momentum tracking based on your last 24 days of execution.
- **Neural Link Status:** Conceptual consistency index measuring how well you're aligned with your designed protocols.
- **Danger Protocol:** Visual indicators (Rose Red) for missed missions on past dates, ensuring absolute execution honesty.

### 🎨 Premium Interface
- **SaaS Landing Portal:** A high-impact entry point featuring split-screen hero content and integrated auth.
- **Hyper-Interactive UX:** 3D tilted panels, magnetic button interactions, and biometric-themed background HUD elements.
- **Solar & Stealth Modes:** Fully adaptive dual-theme system (Light/Dark) optimized for both daytime planning and deep-night execution.
- **Mobile Ready:** Intelligent responsive architecture that adapts the cockpit experience for smartphones and tablets.

## 🛠️ Technical Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend/Auth:** [Supabase](https://supabase.com/) / [Firebase](https://firebase.google.com/)
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)

## 🏁 Getting Started

### Prerequisites
- Node.js 18.x or later
- A Supabase or Firebase project for authentication and data persistence.

### Local Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/rudresh05/focus-os.git
   cd focus-os
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Launch the development server:
   ```bash
   npm run dev
   ```

### 🚢 Deployment (Vercel)
1. Push your code to GitHub.
2. Connect the repository to [Vercel](https://vercel.com/).
3. Add the environment variables from your `.env.local` to the Vercel project settings.
4. For custom subdomains (e.g., `focus.rudreshp.me`), configure the CNAME records in your DNS provider.

---
Built with ⚡ by [Rudresh](https://rudreshp.me)
