"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Sparkles, Trophy, CalendarDays, Clock } from "lucide-react";

export default function HeroTile() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <article className="glass-card border-glow-purple relative overflow-hidden rounded-3xl p-6 lg:p-8 flex flex-col justify-between h-full min-h-[220px]">
      {/* Background Gradient Mesh */}
      <div className="mesh-bg mesh-purple" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs font-semibold text-accent-purple mb-3 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <Sparkles className="w-3.5 h-3.5" />
            Adaptive Learning Active
          </div>
          
          <h1 className="font-display font-bold text-3xl lg:text-4xl text-white tracking-tight leading-tight">
            Welcome back, <span className="bg-gradient-to-r from-accent-purple via-accent-pink to-accent-orange bg-clip-text text-transparent">Prachi</span>!
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-md">
            You've completed <span className="text-white font-medium">85%</span> of your weekly goals. Ready to level up your frontend engineering craft?
          </p>
        </div>

        {/* Live Clock Card */}
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 text-xs">
          <Clock className="w-4 h-4 text-accent-cyan" />
          <span>Local Time: <strong className="text-white font-semibold">{time || "13:50"}</strong></span>
        </div>
      </div>

      {/* Footer Stats & Streak */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
        {/* Streak Indicator */}
        <div className="flex items-center gap-4 bg-white/[0.01] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.02] transition-colors group">
          <div className="relative">
            {/* Pulsing ring behind flame */}
            <motion.div
              className="absolute inset-0 bg-accent-orange/20 rounded-full blur-md"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-accent-orange to-red-500 flex items-center justify-center text-white shadow-lg shadow-accent-orange/30 group-hover:scale-105 transition-transform duration-300">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div className="text-left">
            <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
              <CalendarDays className="w-3 h-3" /> Streak Progress
            </div>
            <div className="text-lg font-display font-bold text-white leading-tight">
              7 Days Active
            </div>
            <div className="text-[10px] text-accent-orange font-semibold">
              +15% XP Boost Applied
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="flex items-center gap-4 bg-white/[0.01] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.02] transition-colors group">
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-accent-purple to-accent-blue flex items-center justify-center text-white shadow-lg shadow-accent-purple/30 group-hover:scale-105 transition-transform duration-300">
            <Trophy className="w-6 h-6" />
          </div>
          <div className="text-left flex-1">
            <div className="text-xs text-gray-500 font-medium">Rank & Level</div>
            <div className="text-lg font-display font-bold text-white leading-tight flex items-center gap-1.5">
              Level 14 <span className="text-xs font-normal text-gray-400">Elite</span>
            </div>
            {/* Micro progress bar */}
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-accent-purple to-accent-blue h-full rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
