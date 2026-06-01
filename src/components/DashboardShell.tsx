"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import BentoGrid from "./BentoGrid";
import CourseTile from "./CourseTile";
import { Course } from "@/lib/supabase";
import ErrorState from "./ErrorState";
import { 
  Sparkles, 
  Settings as SettingsIcon, 
  BarChart3, 
  Calendar, 
  BookOpen, 
  Database,
  ArrowRight,
  Shield,
  HelpCircle,
  AlertCircle,
  AlertTriangle
} from "lucide-react";

interface DashboardShellProps {
  courses: Course[];
  isDemo: boolean;
  error: string | null;
}

export default function DashboardShell({ courses, isDemo, error }: DashboardShellProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [simulateError, setSimulateError] = useState(false);
  const [userName, setUserName] = useState("Prachi");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        if (simulateError) {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            >
              <ErrorState 
                message="Supabase query exception: PostgreSQL pool timeout. Toggled via dashboard sandbox simulation." 
                onRetry={() => setSimulateError(false)} 
              />
            </motion.div>
          );
        }
        return <BentoGrid courses={courses} isDemo={isDemo} error={error} userName={userName} />;
      
      case "courses":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 text-left space-y-6"
          >
            <div className="flex justify-between items-end pb-4 border-b border-white/5">
              <div>
                <h1 className="text-3xl font-display font-bold text-white tracking-tight">Active Curriculum</h1>
                <p className="text-sm text-gray-400 mt-1">Manage and launch your dynamic courses</p>
              </div>
              <div className="text-xs bg-[#0f1218] border border-white/5 px-4 py-2 rounded-xl text-gray-400 font-medium">
                Total Modules: <strong className="text-white">{courses.length}</strong>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, idx) => (
                <CourseTile key={course.id} course={course} index={idx} />
              ))}
            </div>
          </motion.div>
        );

      case "analytics":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-[800px] mx-auto p-4 sm:p-6 lg:p-8 text-center space-y-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue mx-auto shadow-[0_0_20px_rgba(59,130,246,0.15)] animate-bounce">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-display font-bold text-white tracking-tight">Performance Deep-Dive</h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                Unlock granular metrics, speed ratios, and adaptive AI suggestions by completing three active courses in your core curriculum list.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("dashboard")}
              className="px-5 py-3 rounded-xl bg-accent-blue hover:bg-accent-blue/80 text-white text-xs font-bold transition-all shadow-lg hover:scale-105 cursor-pointer flex items-center justify-center gap-2 mx-auto"
            >
              Back to Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        );

      case "schedule":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-[800px] mx-auto p-4 sm:p-6 lg:p-8 text-center space-y-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent-pink/10 border border-accent-pink/20 flex items-center justify-center text-accent-pink mx-auto shadow-[0_0_20px_rgba(236,72,153,0.15)] animate-bounce">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-display font-bold text-white tracking-tight">Study Planner & Timeline</h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                Connect your external calendar to sync live study sessions, exam schedules, and group coding peer challenges.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("dashboard")}
              className="px-5 py-3 rounded-xl bg-accent-pink hover:bg-accent-pink/80 text-white text-xs font-bold transition-all shadow-lg hover:scale-105 cursor-pointer flex items-center justify-center gap-2 mx-auto"
            >
              Back to Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        );

      case "settings":
        return (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-[700px] mx-auto p-4 sm:p-6 lg:p-8 text-left space-y-8"
          >
            <div>
              <h2 className="text-3xl font-display font-bold text-white tracking-tight">Preferences & Credentials</h2>
              <p className="text-sm text-gray-400 mt-1">Configure your environment integration settings</p>
            </div>

            {/* Profile Panel */}
            <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent-purple" /> User Account Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Display Nickname</label>
                  <input 
                    type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-[#0a0c10] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-purple/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Role Classification</label>
                  <input 
                    type="text" 
                    defaultValue="Frontend Intern Explorer" 
                    disabled
                    className="w-full bg-[#0a0c10]/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Supabase connection details info panel */}
            <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-accent-cyan" /> Database Integration State
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                This dashboard uses an advanced Next.js Server Components setup that connects securely to your Supabase PostgreSQL.
              </p>
              
              <div className="p-4 bg-[#0a0c10] border border-white/5 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Connection Mode:</span>
                  <span className={`font-bold px-2 py-0.5 rounded-full ${isDemo ? "bg-accent-orange/10 text-accent-orange border border-accent-orange/20" : "bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20"}`}>
                    {isDemo ? "Sandbox Fallback (Local)" : "Live Supabase Database"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">PostgreSQL Status:</span>
                  <span className={`font-bold px-2 py-0.5 rounded-full ${isDemo ? "bg-white/5 text-gray-400 border border-white/10" : "bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20"}`}>
                    {isDemo ? "Disconnected" : "Connected & Fetched"}
                  </span>
                </div>
              </div>
            </div>

            {/* Error State Simulation Panel */}
            <div className="glass-card rounded-2xl border border-white/5 p-6 space-y-4">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-accent-orange" /> Error Recovery Testing
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Test and verify our custom database error handling page. Toggling this simulation will temporarily mock a database offline exception.
              </p>
              <button
                onClick={() => {
                  setSimulateError(true);
                  setActiveTab("dashboard");
                }}
                className="px-4 py-2.5 rounded-xl bg-accent-orange/10 border border-accent-orange/20 hover:bg-accent-orange/20 text-accent-orange text-xs font-bold transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
              >
                <AlertTriangle className="w-4 h-4 animate-pulse" /> Simulate Database Connection Failure
              </button>
            </div>
          </motion.div>
        );
      
      default:
        return <BentoGrid courses={courses} isDemo={isDemo} error={error} />;
    }
  };

  return (
    <div className="flex min-h-screen w-full relative">
      {/* Sidebar - Collapsible & Left aligned */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Panel Content Area */}
      <main className="flex-1 min-h-screen overflow-y-auto pb-24 md:pb-8 flex flex-col">
        {/* Futuristic global background effects */}
        <div className="absolute inset-0 bg-[#060709] bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-purple/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Staggered transition container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 flex-1 flex flex-col"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
