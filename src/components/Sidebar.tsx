"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Calendar, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  LogOut,
  GraduationCap
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "analytics", label: "Performance", icon: BarChart3 },
  { id: "schedule", label: "Timeline", icon: Calendar },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Automatically collapse sidebar on tablet viewports (768px - 1024px)
    const mediaQuery = window.matchMedia("(min-width: 768px) and (max-width: 1024px)");
    
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Initial check
    handleMediaChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <motion.aside
        className={`hidden md:flex flex-col h-screen sticky top-0 bg-[#0a0c10] border-r border-[#1a1e26] z-30 select-none ${
          isCollapsed ? "w-20" : "w-64"
        }`}
        animate={{ width: isCollapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header logo / branding */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#1a1e26]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2.5 bg-gradient-to-tr from-accent-purple to-accent-pink rounded-xl text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <GraduationCap className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <motion.span
                className="font-display font-bold text-lg bg-gradient-to-r from-white via-[#d8b4fe] to-[#818cf8] bg-clip-text text-transparent truncate"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Aetheria
              </motion.span>
            )}
          </div>
          
          {/* Collapse button - Hidden on tablet/auto collapsed */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg border border-[#222733] hover:border-accent-purple/50 bg-[#12161f] text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 flex flex-col justify-between">
          <ul className="space-y-1.5 list-none p-0 m-0">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors relative cursor-pointer group ${
                      isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {/* Active Sliding Background Highlight (layoutId animation) */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-accent-blue/5 border border-accent-purple/20 rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    
                    <div className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-accent-purple" : "text-gray-400 group-hover:text-gray-200"}`}>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                    </div>

                    {!isCollapsed && (
                      <motion.span
                        className="truncate"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Footer user badge */}
          <div className="pt-6 border-t border-[#1a1e26] space-y-3">
            <div className="flex items-center gap-3 px-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-purple to-accent-cyan flex-shrink-0 flex items-center justify-center font-bold text-white shadow-lg">
                PP
              </div>
              {!isCollapsed && (
                <motion.div 
                  className="flex flex-col text-left overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="text-sm font-semibold text-white truncate">Prachi Pandey</span>
                  <span className="text-xs text-gray-500 truncate flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-accent-purple" /> Intern Explorer
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </nav>
      </motion.aside>

      {/* Mobile Floating Glass Dock (Bottom Navigation Bar) */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 h-16 glass-card rounded-2xl flex items-center justify-around px-4 z-40 shadow-2xl">
        <ul className="flex items-center justify-around w-full list-none p-0 m-0">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id} className="relative flex items-center justify-center">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium cursor-pointer relative ${
                    isActive ? "text-accent-purple" : "text-gray-400"
                  }`}
                >
                  {/* Sliding active dot or highlight on mobile */}
                  {isActive && (
                    <motion.div
                      layoutId="mobile-sidebar-active"
                      className="absolute inset-0 bg-accent-purple/10 border border-accent-purple/20 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 font-medium">{item.label.split(" ")[0]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
