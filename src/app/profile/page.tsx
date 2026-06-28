"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { fetchSettings, saveSetting } from "@/lib/api";

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconSun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);
const IconMoon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);
const IconLogOut = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);
const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// ── Toggle component ──────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0"
      style={{ background: checked ? "var(--accent)" : "var(--line)" }}
    >
      <div
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
        style={{ transform: checked ? "translateX(22px)" : "translateX(4px)" }}
      />
    </button>
  );
}

// ── Section card wrapper ──────────────────────────────────────────────────────
function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-background border border-line rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-line flex items-center gap-2.5">
        <span className="text-accent">{icon}</span>
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ── Row inside a card ─────────────────────────────────────────────────────────
function SettingRow({ label, description, action }: { label: string; description?: string; action: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const notifSetting = await fetchSettings('notifications');
        const emailSetting = await fetchSettings('emailUpdates');
        if (notifSetting && notifSetting.value !== null) {
          setNotifications(Boolean(notifSetting.value));
        }
        if (emailSetting && emailSetting.value !== null) {
          setEmailUpdates(Boolean(emailSetting.value));
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    }
    loadSettings();
  }, []);

  if (!user) return null;

  const username = user.email?.split("@")[0] ?? "User";
  const domain = user.email?.split("@")[1] ?? "";
  const initials = username.slice(0, 2).toUpperCase();
  const joinDate = "June 2025"; // placeholder

  const handleSave = async () => {
    try {
      await Promise.all([
        saveSetting('notifications', notifications),
        saveSetting('emailUpdates', emailUpdates)
      ]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save settings:", err);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto space-y-6 px-2 sm:px-0">

        {/* ── Page title ── */}
        <div className="pb-4 border-b border-line">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account settings and preferences.</p>
        </div>

        {/* ── Avatar + name card ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-background border border-line rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5"
        >
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 select-none"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-alt))" }}
          >
            {initials}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h2 className="text-xl font-bold text-foreground">{username}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
                <IconShield /> Admin
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-bg-soft text-muted-foreground text-xs font-medium rounded-full border border-line">
                Joined {joinDate}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Account info ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
          <Card title="Account" icon={<IconUser />}>
            <div className="space-y-0 divide-y divide-line">
              <SettingRow
                label="Email address"
                description="Your login email"
                action={
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconMail />
                    <span className="truncate max-w-[180px]">{user.email}</span>
                  </div>
                }
              />
              <SettingRow
                label="Password"
                description="Last changed: never"
                action={
                  <button className="text-xs font-semibold text-accent hover:underline flex items-center gap-1.5">
                    <IconLock /> Change
                  </button>
                }
              />
              <SettingRow
                label="Account role"
                action={
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                    Administrator
                  </span>
                }
              />
            </div>
          </Card>
        </motion.div>

        {/* ── Appearance ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <Card title="Appearance" icon={theme === "dark" ? <IconMoon /> : <IconSun />}>
            <SettingRow
              label="Theme"
              description="Choose between light and dark mode"
              action={
                <div className="flex items-center gap-2 rounded-xl border border-line p-1 bg-bg-soft">
                  <button
                    onClick={() => setTheme("light")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: theme === "light" ? "var(--background)" : "transparent",
                      color: theme === "light" ? "var(--accent)" : "var(--muted)",
                      boxShadow: theme === "light" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    }}
                  >
                    <IconSun /> Light
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: theme === "dark" ? "var(--panel-strong)" : "transparent",
                      color: theme === "dark" ? "var(--accent)" : "var(--muted)",
                      boxShadow: theme === "dark" ? "0 1px 3px rgba(0,0,0,0.3)" : "none",
                    }}
                  >
                    <IconMoon /> Dark
                  </button>
                </div>
              }
            />
          </Card>
        </motion.div>

        {/* ── Notifications ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
          <Card title="Notifications" icon={<IconBell />}>
            <div className="space-y-0 divide-y divide-line">
              <SettingRow
                label="Push notifications"
                description="Get alerts for sprint updates and task reminders"
                action={<Toggle checked={notifications} onChange={() => setNotifications(v => !v)} />}
              />
              <SettingRow
                label="Email digest"
                description="Receive a weekly summary via email"
                action={<Toggle checked={emailUpdates} onChange={() => setEmailUpdates(v => !v)} />}
              />
            </div>
          </Card>
        </motion.div>

        {/* ── Danger zone ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <div className="bg-background border border-rose-500/20 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-rose-500/20 flex items-center gap-2.5">
              <IconLogOut />
              <h2 className="text-sm font-semibold text-rose-500">Danger Zone</h2>
            </div>
            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Sign out of your account</p>
                <p className="text-xs text-muted-foreground mt-0.5">You will need to sign in again to access your dashboard.</p>
              </div>
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 transition-colors flex-shrink-0"
              >
                <IconLogOut /> Sign out
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Save button ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="flex justify-end pb-8"
        >
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: saved ? "#10B981" : "var(--accent)" }}
          >
            {saved && <IconCheck />}
            {saved ? "Saved!" : "Save changes"}
          </button>
        </motion.div>

      </div>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={logout}
        variant="danger"
        title="Sign Out"
        description="Are you sure you want to sign out? You'll need to log in again to access your dashboard."
        confirmText="Sign Out"
        cancelText="Cancel"
      />
    </>
  );
}
