"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Calendar, TrendingUp, Sparkles, BarChart2 } from "lucide-react";

type ViewMode = "weekly" | "monthly";

// Mock Grid Matrix Data (shades of purple)
// 0: empty, 1: light, 2: medium, 3: dense, 4: super dense
const CONTRIBUTION_MATRIX = [
  [1, 0, 3, 2, 1, 0, 0, 2, 4, 1, 0, 3],
  [0, 2, 1, 0, 4, 1, 3, 0, 1, 2, 1, 0],
  [2, 1, 0, 3, 2, 0, 1, 4, 0, 3, 2, 1],
  [3, 0, 2, 1, 0, 4, 2, 1, 3, 0, 1, 4],
  [1, 4, 0, 2, 3, 1, 0, 2, 1, 4, 0, 2],
  [0, 2, 3, 1, 0, 2, 4, 1, 0, 3, 1, 0],
  [2, 1, 4, 0, 2, 3, 1, 0, 3, 2, 4, 1],
];

const WEEKLY_HOURS = [2.5, 4.0, 1.8, 6.2, 5.0, 3.8, 7.5];
const WEEKLY_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTHLY_HOURS = [12, 18, 15, 24, 28, 22, 35, 40, 32, 28, 45, 52];
const MONTHLY_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function ActivityTile() {
  const [viewMode, setViewMode] = useState<ViewMode>("weekly");

  const chartData = viewMode === "weekly" ? WEEKLY_HOURS : MONTHLY_HOURS;
  const chartLabels = viewMode === "weekly" ? WEEKLY_DAYS : MONTHLY_LABELS;
  const maxHours = Math.max(...chartData);

  // Generate SVG path for area chart
  const getSvgPath = () => {
    const width = 500;
    const height = 120;
    const padding = 15;
    const chartHeight = height - padding * 2;
    const step = (width - padding * 2) / (chartData.length - 1);
    
    let path = `M ${padding} ${height - padding}`;
    let linePath = `M ${padding} ${padding + chartHeight - (chartData[0] / maxHours) * chartHeight}`;

    chartData.forEach((val, i) => {
      const x = padding + i * step;
      const y = padding + chartHeight - (val / maxHours) * chartHeight;
      path += ` L ${x} ${y}`;
      linePath += ` L ${x} ${y}`;
    });

    path += ` L ${padding + (chartData.length - 1) * step} ${height - padding} Z`;
    return { fillPath: path, strokePath: linePath };
  };

  const { fillPath, strokePath } = getSvgPath();

  const getCellColor = (level: number) => {
    switch (level) {
      case 1: return "bg-accent-purple/20 border border-accent-purple/30";
      case 2: return "bg-accent-purple/40 border border-accent-purple/50";
      case 3: return "bg-accent-purple/70 border border-accent-purple/80";
      case 4: return "bg-accent-purple/95 shadow-[0_0_12px_rgba(139,92,246,0.5)] border border-white/20";
      default: return "bg-white/[0.02] border border-white/[0.05]";
    }
  };

  return (
    <article className="glass-card border-glow-blue relative overflow-hidden rounded-3xl p-6 h-full flex flex-col justify-between min-h-[360px]">
      <div className="mesh-bg mesh-blue" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* Header section with toggle */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
            <Activity className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h2 className="font-display font-semibold text-white">Learning Metrics</h2>
            <p className="text-xs text-gray-400">Track and visualize study sessions</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#0f1218] border border-white/5 rounded-xl p-1 text-xs">
          <button
            onClick={() => setViewMode("weekly")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer relative ${
              viewMode === "weekly" ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {viewMode === "weekly" && (
              <motion.div
                layoutId="chart-tab"
                className="absolute inset-0 bg-accent-blue rounded-lg shadow-lg -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
            Weekly
          </button>
          <button
            onClick={() => setViewMode("monthly")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer relative ${
              viewMode === "monthly" ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {viewMode === "monthly" && (
              <motion.div
                layoutId="chart-tab"
                className="absolute inset-0 bg-accent-blue rounded-lg shadow-lg -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
            Monthly
          </button>
        </div>
      </div>

      {/* GitHub-style Contribution Grid */}
      <div className="relative z-10 mt-6 bg-[#090b0e]/50 border border-white/[0.03] rounded-2xl p-4 flex flex-col justify-center">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3.5">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent-purple" />
            12-Week Contribution Matrix
          </span>
          <span className="text-[10px] text-gray-400">Total Hours: 142 hrs</span>
        </div>
        
        {/* The Matrix */}
        <div className="flex flex-col gap-1.5 select-none overflow-x-auto pb-1">
          {CONTRIBUTION_MATRIX.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1.5 min-w-[280px]">
              {row.map((level, colIndex) => (
                <motion.div
                  key={colIndex}
                  className={`w-5 h-5 rounded-md flex-shrink-0 cursor-pointer ${getCellColor(level)}`}
                  whileHover={{ scale: 1.2, zIndex: 20 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  title={`Level ${level} activity`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-[9px] text-gray-500 mt-3">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-sm bg-white/[0.02]" />
            <div className="w-2.5 h-2.5 rounded-sm bg-accent-purple/20" />
            <div className="w-2.5 h-2.5 rounded-sm bg-accent-purple/40" />
            <div className="w-2.5 h-2.5 rounded-sm bg-accent-purple/70" />
            <div className="w-2.5 h-2.5 rounded-sm bg-accent-purple/95" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Gorgeous Area Chart */}
      <div className="relative z-10 mt-4 flex-1 flex flex-col justify-end">
        <div className="w-full h-[120px] relative">
          <svg
            className="w-full h-full"
            viewBox="0 0 500 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Filled Area Chart */}
            <motion.path
              key={`fill-${viewMode}`}
              d={fillPath}
              fill="url(#chartGlow)"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Glowing Border Line */}
            <motion.path
              key={`stroke-${viewMode}`}
              d={strokePath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Labels below chart */}
        <div className="flex justify-between px-2 text-[10px] text-gray-500 font-semibold mt-2.5 border-t border-white/5 pt-2">
          {chartLabels.map((lbl, idx) => (
            <span key={idx}>{lbl}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
