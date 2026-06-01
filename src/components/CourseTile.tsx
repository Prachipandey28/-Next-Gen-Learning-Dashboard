"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Course } from "@/lib/supabase";

interface CourseTileProps {
  course: Course;
  index: number;
}

// Icon mappings based on db text string
const iconMap: Record<string, React.ComponentType<any>> = {
  Atom: LucideIcons.Atom,
  Cpu: LucideIcons.Cpu,
  Palette: LucideIcons.Palette,
  Database: LucideIcons.Database,
  BookOpen: LucideIcons.BookOpen,
};

// Design configuration maps
const themeMap: Record<string, {
  borderGlow: string;
  meshClass: string;
  iconBg: string;
  iconColor: string;
  progressBar: string;
  glowColor: string;
}> = {
  Atom: {
    borderGlow: "border-glow-purple",
    meshClass: "mesh-purple",
    iconBg: "bg-accent-purple/10 border border-accent-purple/20",
    iconColor: "text-accent-purple",
    progressBar: "bg-gradient-to-r from-accent-purple to-accent-blue shadow-[0_0_10px_rgba(139,92,246,0.3)]",
    glowColor: "rgba(139, 92, 246, 0.4)",
  },
  Cpu: {
    borderGlow: "border-glow-emerald",
    meshClass: "mesh-emerald",
    iconBg: "bg-accent-emerald/10 border border-accent-emerald/20",
    iconColor: "text-accent-emerald",
    progressBar: "bg-gradient-to-r from-accent-emerald to-accent-cyan shadow-[0_0_10px_rgba(16,185,129,0.3)]",
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
  Palette: {
    borderGlow: "border-glow-cyan",
    meshClass: "mesh-cyan",
    iconBg: "bg-accent-cyan/10 border border-accent-cyan/20",
    iconColor: "text-accent-cyan",
    progressBar: "bg-gradient-to-r from-accent-cyan to-accent-blue shadow-[0_0_10px_rgba(6,182,212,0.3)]",
    glowColor: "rgba(6, 182, 212, 0.4)",
  },
  Database: {
    borderGlow: "border-glow-orange",
    meshClass: "mesh-orange",
    iconBg: "bg-accent-orange/10 border border-accent-orange/20",
    iconColor: "text-accent-orange",
    progressBar: "bg-gradient-to-r from-accent-orange to-accent-pink shadow-[0_0_10px_rgba(249,115,22,0.3)]",
    glowColor: "rgba(249, 115, 22, 0.4)",
  },
};

export default function CourseTile({ course, index }: CourseTileProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Set the animated progress bar to animate from 0% on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(course.progress);
    }, 200 + index * 100);
    return () => clearTimeout(timer);
  }, [course.progress, index]);

  const IconComponent = iconMap[course.icon_name] || LucideIcons.BookOpen;
  const theme = themeMap[course.icon_name] || themeMap.Atom;

  return (
    <motion.article
      className={`glass-card ${theme.borderGlow} relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between min-h-[170px] select-none`}
      whileHover={{ scale: 1.018 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background Gradient Mesh */}
      <div className={`mesh-bg ${theme.meshClass}`} />
      
      {/* Background Grain/Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* Card Content Header */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        {/* Dynamic Icon Wrapper */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme.iconBg}`}>
          <IconComponent className={`w-6 h-6 ${theme.iconColor}`} />
        </div>
        
        {/* Course Index / XP Bubble */}
        <span className="text-[10px] uppercase font-bold text-gray-500 bg-[#0f1218] border border-white/5 px-2.5 py-1 rounded-full">
          Core Module
        </span>
      </div>

      {/* Title */}
      <div className="relative z-10 mt-4 text-left">
        <h3 className="font-display font-semibold text-lg text-white leading-snug group-hover:text-accent-purple transition-colors">
          {course.title}
        </h3>
      </div>

      {/* Progress Section */}
      <div className="relative z-10 mt-5 w-full">
        <div className="flex justify-between items-center text-xs text-gray-400 font-semibold mb-2">
          <span>Module Progress</span>
          <span className="text-white">{course.progress}%</span>
        </div>
        
        {/* Animated Custom Progress Bar */}
        <div className="w-full h-2 bg-[#090b0e] border border-white/[0.03] rounded-full overflow-hidden">
          <div
            className={`progress-fill h-full rounded-full ${theme.progressBar}`}
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
      </div>
    </motion.article>
  );
}
