"use client";

import { Menu, Zap } from "lucide-react";

interface MobileDashboardHeaderProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
}

export default function MobileDashboardHeader({ onMenuClick, title }: MobileDashboardHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-stroke z-40 lg:hidden flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white">
          <Zap size={18} fill="currentColor" />
        </div>
        <div>
          <p className="text-xl font-brand leading-none text-text-primary uppercase tracking-tight">{title}</p>
        </div>
      </div>
      
      <button 
        onClick={onMenuClick}
        className="p-2 text-text-muted hover:text-brand bg-surface border border-stroke rounded-xl"
      >
        <Menu size={20} />
      </button>
    </header>
  );
}
