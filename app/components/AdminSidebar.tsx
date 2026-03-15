"use client";

import { getCloudinaryUrl } from "@/lib/cloudinary";
import { logout } from "@/lib/logout";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  Mail,
  Quote,
  Settings,
  UserPlus,
  Users,
  X,
  Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminSidebarProps {
  adminName: string;
  adminImage?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ adminName, adminImage, isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("admin-sidebar-collapsed");
    if (stored) setIsCollapsed(JSON.parse(stored));
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("admin-sidebar-collapsed", JSON.stringify(newState));
  };

  const NAV_ITEMS = [
    { icon: LayoutDashboard, label: "Overview", href: "/admin" },
    { icon: Zap, label: "Services", href: "/admin/services" },
    { icon: FileText, label: "Blog", href: "/admin/blog" },
    { icon: BarChart3, label: "Work Archive", href: "/admin/work" },
    { icon: Briefcase, label: "Careers", href: "/admin/careers" },
    { icon: Users, label: "Team", href: "/admin/team" },
    { icon: Quote, label: "Testimonials", href: "/admin/testimonials" },
    { icon: Mail, label: "Leads", href: "/admin/leads" },
    { icon: UserPlus, label: "Applications", href: "/admin/applications" },
    { icon: Globe, label: "Partners", href: "/admin/partners" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  if (!isMounted) return <aside className="hidden lg:flex w-80 bg-white border-r border-stroke h-screen sticky top-0" />;

  const sidebarContent = (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 100 : 200 }}
      className="bg-white border-r border-stroke flex flex-col h-full overflow-hidden relative"
    >
      <div className="p-8 border-b border-stroke flex items-center justify-between relative">
        <Link href="/admin" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 shrink-0 group-hover:scale-105 transition-transform duration-300">
            <Zap size={22} fill="currentColor" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <p className="text-xl font-brand leading-none text-text-primary tracking-tight">FELCONIS</p>
            </motion.div>
          )}
        </Link>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-stroke rounded-full items-center justify-center text-text-muted hover:text-brand hover:border-brand shadow-sm z-50 transition-all hover:scale-110"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Mobile Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-text-muted hover:text-brand bg-surface border border-stroke rounded-lg"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-grow p-5 space-y-1.5 overflow-y-auto custom-scrollbar no-scrollbar py-8">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onClose?.()}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group overflow-hidden ${isActive
                ? "text-white bg-brand shadow-xl shadow-brand/20 scale-[1.02]"
                : "text-text-muted hover:text-brand hover:bg-surface"
                }`}
            >
              <item.icon size={18} className={`shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative z-10"
                >
                  {item.label}
                </motion.span>
              )}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-gradient-to-r from-brand to-brand-light opacity-10 pointer-events-none"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-5 border-t border-stroke mt-auto">
        <button
          onClick={() => logout()}
          className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-[9px] font-bold uppercase tracking-[0.15em] text-red-500 hover:bg-red-50 transition-all duration-300 group ${isCollapsed ? 'justify-center' : ''}`}
          title="Sign Out"
        >
          <LogOut size={18} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Sign Out
            </motion.span>
          )}
        </button>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col h-screen sticky top-0 relative">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[70] lg:hidden w-[200px]"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
