"use client";

import { logout } from "@/lib/logout";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => logout()}
      className="w-full flex items-center gap-4 px-6 py-4 text-text-muted hover:text-red-500 hover:bg-red-50 transition-all group"
    >
      <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
        <LogOut size={18} />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest">Protocol Termination</span>
    </button>
  );
}
