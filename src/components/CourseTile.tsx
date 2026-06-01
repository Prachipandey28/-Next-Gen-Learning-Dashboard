"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Course } from "@/lib/supabase";

interface CourseTileProps {
  course: Course;
  index: number;
}

// Design configuration maps with expanded fallback structures
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
  Compass: {
    borderGlow: "border-glow-blue",
    meshClass: "mesh-blue",
    iconBg: "bg-accent-blue/10 border border-accent-blue/20",
    iconColor: "text-accent-blue",
    progressBar: "bg-gradient-to-r from-accent-blue to-accent-cyan shadow-[0_0_10px_rgba(59,130,246,0.3)]",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  Layers: {
    borderGlow: "border-glow-pink",
    meshClass: "mesh-pink",
    iconBg: "bg-accent-pink/10 border border-accent-pink/20",
    iconColor: "text-accent-pink",
    progressBar: "bg-gradient-to-r from-accent-pink to-accent-purple shadow-[0_0_10px_rgba(236,72,153,0.3)]",
    glowColor: "rgba(236, 72, 153, 0.4)",
  },
};

export default function CourseTile({ course, index }: CourseTileProps) {
  // Dynamically lookup ANY Lucide icon component based on the DB string name.
  // Fallback to BookOpen if icon name doesn't match or is missing.
  const IconComponent = (LucideIcons as any)[course.icon_name] || LucideIcons.BookOpen;
  
  // Select matching theme or fallback gracefully to Purple (Atom) theme
  const theme = themeMap[course.icon_name] || themeMap.Atom;

  return (
    <motion.article
      className="glass-card relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between min-h-[170px] select-none border border-white/5"
      whileHover={{ 
        scale: 1.018,
        borderColor: theme.glowColor,
        boxShadow: `0 0 25px ${theme.glowColor}`
      }}
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
        
        {/* Animated Custom Progress Bar using GPU accelerated Framer Motion */}
        <div className="w-full h-2 bg-[#090b0e] border border-white/[0.03] rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${theme.progressBar}`}
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{
              duration: 1.2,
              delay: 0.1 + index * 0.08,
              ease: [0.25, 1, 0.5, 1]
            }}
          />
        </div>
      </div>
    </motion.article>
  );
}
