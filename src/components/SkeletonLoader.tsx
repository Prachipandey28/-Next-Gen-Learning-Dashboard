import React from "react";

export default function SkeletonLoader() {
  return (
    <section className="flex-1 w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Skeleton Banner */}
      <div className="h-16 w-full rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between px-6 animate-pulse-skeleton">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04]" />
          <div className="space-y-2">
            <div className="h-3 w-36 bg-white/[0.06] rounded-md" />
            <div className="h-2.5 w-64 bg-white/[0.04] rounded-md" />
          </div>
        </div>
        <div className="h-8 w-24 bg-white/[0.04] rounded-xl" />
      </div>

      {/* Skeleton Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Hero Card Placeholder */}
        <div className="md:col-span-2 h-[220px] rounded-3xl bg-white/[0.01] border border-white/[0.04] p-6 lg:p-8 flex flex-col justify-between animate-pulse-skeleton">
          <div className="space-y-3">
            <div className="h-5 w-40 bg-white/[0.05] rounded-full" />
            <div className="h-8 w-72 bg-white/[0.06] rounded-md" />
            <div className="h-3.5 w-96 bg-white/[0.04] rounded-md" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="h-14 bg-white/[0.03] rounded-2xl border border-white/[0.04]" />
            <div className="h-14 bg-white/[0.03] rounded-2xl border border-white/[0.04]" />
          </div>
        </div>

        {/* Activity Card Placeholder */}
        <div className="col-span-1 md:row-span-2 h-[360px] rounded-3xl bg-white/[0.01] border border-white/[0.04] p-6 flex flex-col justify-between animate-pulse-skeleton">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04]" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-28 bg-white/[0.05] rounded-md" />
              <div className="h-3 w-40 bg-white/[0.04] rounded-md" />
            </div>
          </div>
          
          <div className="h-32 bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 my-6 space-y-2">
            <div className="h-3 w-24 bg-white/[0.04] rounded-md" />
            <div className="grid grid-cols-7 gap-2.5">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className="aspect-square bg-white/[0.04] rounded-sm" />
              ))}
            </div>
          </div>

          <div className="h-20 bg-white/[0.02] border border-white/[0.04] rounded-xl" />
        </div>

        {/* Dynamic Course Card Placeholders */}
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="h-[170px] rounded-3xl bg-white/[0.01] border border-white/[0.04] p-6 flex flex-col justify-between animate-pulse-skeleton"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            <div className="flex justify-between items-center">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04]" />
              <div className="h-5 w-20 bg-white/[0.04] rounded-full" />
            </div>
            
            <div className="h-5 w-44 bg-white/[0.05] rounded-md mt-4" />
            
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-white/[0.03] rounded-md" />
                <div className="h-3 w-8 bg-white/[0.04] rounded-md" />
              </div>
              <div className="h-2 w-full bg-white/[0.03] rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
