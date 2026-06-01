"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Course } from "@/lib/supabase";
import HeroTile from "./HeroTile";
import ActivityTile from "./ActivityTile";
import CourseTile from "./CourseTile";
import { Database, AlertTriangle, Cpu, Terminal, Compass, Layers } from "lucide-react";

interface BentoGridProps {
  courses: Course[];
  isDemo: boolean;
  error: string | null;
}

// Staggered layout variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

export default function BentoGrid({ courses, isDemo, error }: BentoGridProps) {
  return (
    <section className="flex-1 w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Sandbox Demo banner */}
      {isDemo && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-r from-accent-purple/10 via-accent-blue/10 to-accent-cyan/10 border border-accent-purple/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-accent-purple/5"
        >
          {/* Decorative mesh background inside banner */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          
          <div className="flex items-center gap-3 relative z-10 text-left">
            <div className="w-10 h-10 rounded-xl bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center text-accent-purple animate-pulse">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm flex items-center gap-1.5">
                Aetheria Sandbox Active
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-accent-purple/20 text-accent-purple border border-accent-purple/30 uppercase tracking-wider">Demo Mode</span>
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                {error ? `DB Notice: ${error}` : "Displaying local mock courses. Provide Supabase env variables to fetch live PostgreSQL rows."}
              </p>
            </div>
          </div>

          <div className="flex gap-2 relative z-10">
            <a 
              href="https://supabase.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5" /> Setup Supabase
            </a>
          </div>
        </motion.div>
      )}

      {/* Grid container with staggered entry */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Row 1, Col 1-2: Hero Greetings */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <HeroTile />
        </motion.div>

        {/* Row 1-2, Col 3: Learning Metrics / Activity */}
        <motion.div variants={itemVariants} className="col-span-1 md:row-span-2">
          <ActivityTile />
        </motion.div>

        {/* Remaining cells filled with courses */}
        {courses.map((course, idx) => (
          <motion.div key={course.id} variants={itemVariants} className="col-span-1">
            <CourseTile course={course} index={idx} />
          </motion.div>
        ))}

        {/* Bonus Tile: Futuristic Quick Tips / System Status */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 glass-card border-glow-cyan relative overflow-hidden rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 min-h-[140px]">
          <div className="mesh-bg mesh-cyan" />
          <div className="w-14 h-14 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan flex-shrink-0">
            <Layers className="w-7 h-7" />
          </div>
          <div className="text-left relative z-10">
            <h3 className="font-display font-semibold text-white">Adaptive Learning Recommendation</h3>
            <p className="text-sm text-gray-400 mt-1 max-w-xl">
              Based on your study of <strong className="text-white">React Patterns</strong>, we recommend reviewing <strong className="text-white">System Architectures</strong>. Completing it awards a <strong className="text-accent-cyan">Double XP Multiplier</strong>.
            </p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
