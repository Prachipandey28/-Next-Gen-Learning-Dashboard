"use client";

import React from "react";
import { AlertCircle, RefreshCw, Layers } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <article className="flex-1 max-w-[600px] mx-auto my-12 p-8 glass-card border-glow-orange rounded-3xl text-center relative overflow-hidden">
      <div className="mesh-bg mesh-orange" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Glowing Orange Warning Ring */}
        <div className="w-16 h-16 rounded-2xl bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center text-accent-orange mb-6 shadow-[0_0_20px_rgba(249,115,22,0.15)] animate-pulse">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h2 className="font-display font-bold text-2xl text-white tracking-tight">
          Connection Interrupted
        </h2>
        <p className="text-gray-400 text-sm mt-3 max-w-sm leading-relaxed">
          {message || "We encountered a network error while retrieving your adaptive dashboard data. Please try again."}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={onRetry}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-orange to-red-500 hover:from-accent-orange hover:to-red-600 text-white text-sm font-semibold transition-all shadow-lg shadow-accent-orange/25 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Reconnect Database
          </button>
          
          <button
            onClick={onRetry}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4 text-accent-cyan" /> Load Local Sandbox
          </button>
        </div>

        {/* Tip / Footer */}
        <div className="mt-8 pt-6 border-t border-white/5 w-full text-xs text-gray-500">
          Tip: You can use the local sandbox mode if you haven't configured the Supabase PostgreSQL table yet.
        </div>
      </div>
    </article>
  );
}
