"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  BarChart3,
  Box,
  ChevronDown,
  ChevronRight,
  Code2,
  Cpu,
  Layers,
  Layout,
  Menu,
  Palette,
  Search,
  Share2,
  Target,
  TrendingUp,
  Video,
  X,
  Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const services = [
  {
    category: "Software & Web",
    icon: Code2,
    items: [
      { name: "Custom Enterprise Systems", href: "/services/software", icon: Cpu },
      { name: "SaaS & Web Platforms", href: "/services/web", icon: Layout },
      { name: "E-commerce Solutions", href: "/services/web", icon: Box },
      { name: "API & Cloud Architecture", href: "/services/software", icon: Share2 },
    ]
  },
  {
    category: "Marketing & Strategy",
    icon: TrendingUp,
    items: [
      { name: "SEO & Content Strategy", href: "/services/marketing", icon: Search },
      { name: "Social Media Marketing", href: "/services/marketing", icon: Target },
      { name: "Data Driven Growth", href: "/services/marketing", icon: BarChart3 },
    ]
  },
  {
    category: "Design & Creative",
    icon: Palette,
    items: [
      { name: "UI/UX Design Systems", href: "/services/design", icon: Layout },
      { name: "Corporate Identity", href: "/services/design", icon: Zap },
      { name: "Marketing Graphics", href: "/services/design", icon: Layers },
      { name: "Corporate Video", href: "/services/video", icon: Video },
    ]
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    
    // Hide on scroll down, show on scroll up
    if (latest > lastScrollY && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(latest);
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isVisible) {
      root.style.setProperty('--navbar-offset', '4rem'); // 16 * 0.25rem = 4rem (h-16)
    } else {
      root.style.setProperty('--navbar-offset', '0px');
    }
  }, [isVisible]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [pathname]);

  return (
    <>
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md border-b border-stroke shadow-sm" : "bg-transparent"
      )}
      onMouseLeave={() => setIsMegaMenuOpen(false)}
    >
      <div className="container-max h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 relative z-[60] hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        
        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-8">
          <div 
            className="relative h-16 flex items-center"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
          >
            <button 
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors",
                isMegaMenuOpen || pathname.startsWith("/services") ? "text-brand" : "text-text-primary hover:text-brand"
              )}
            >
              Services <ChevronDown size={10} className={cn("transition-transform", isMegaMenuOpen && "rotate-180")} />
            </button>

            {/* MEGA MENU */}
            <AnimatePresence>
              {isMegaMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 w-[850px] bg-white border border-stroke rounded-xl shadow-xl p-8 z-50"
                >
                  <div className="grid grid-cols-3 gap-8">
                    {services.map((section) => (
                      <div key={section.category} className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-stroke">
                          <section.icon size={14} className="text-brand/60" />
                          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{section.category}</h3>
                        </div>
                        <ul className="space-y-0.5">
                          {section.items.map((item) => (
                            <li key={item.name}>
                              <Link 
                                href={item.href} 
                                className="group/item flex items-center gap-3 p-2.5 -mx-2.5 rounded-lg hover:bg-surface transition-all"
                              >
                                <div className="w-7 h-7 rounded-md bg-surface border border-stroke flex items-center justify-center group-hover/item:border-brand/20 transition-all">
                                  <item.icon size={12} className="text-text-muted group-hover/item:text-brand transition-colors" />
                                </div>
                                <span className="text-[11px] font-bold text-text-primary tracking-tight transition-colors group-hover/item:text-brand">{item.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-4 border-t border-stroke text-center">
                    <Link 
                      href="/services" 
                      className="text-[9px] font-bold uppercase tracking-widest text-text-muted hover:text-brand transition-colors inline-flex items-center gap-2"
                    >
                      Browse Professional Capabilities <ChevronRight size={10} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href="/work" 
            className={cn(
              "text-[10px] font-bold uppercase tracking-widest transition-colors",
              pathname === "/work" ? "text-brand" : "text-text-primary hover:text-brand"
            )}
          >
            Work
          </Link>

          <Link 
            href="/partner" 
            className={cn(
              "text-[10px] font-bold uppercase tracking-widest transition-colors",
              pathname === "/partner" ? "text-brand" : "text-text-primary hover:text-brand"
            )}
          >
            Partner
          </Link>
          
          <div className="relative h-16 flex items-center group/company">
            <button 
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors",
                ["/about", "/blog", "/careers"].some(p => pathname.startsWith(p)) ? "text-brand" : "text-text-primary hover:text-brand"
              )}
            >
              Company <ChevronDown size={10} className="group-hover/company:rotate-180 transition-transform" />
            </button>

            <div className="absolute top-16 right-0 pt-0 opacity-0 invisible group-hover/company:opacity-100 group-hover/company:visible transition-all duration-300 translate-y-2 group-hover/company:translate-y-0 z-50">
              <div className="w-56 bg-white border border-stroke rounded-lg shadow-xl p-3 space-y-0.5">
                {[
                  { name: "About Organization", href: "/about" },
                  { name: "Insights & Strategy", href: "/blog" },
                  { name: "Career Opportunities", href: "/careers" },
                  { name: "Institutional Contact", href: "/contact" }
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="flex items-center justify-between p-3 rounded-md hover:bg-surface group/link transition-all"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-primary group-hover/link:text-brand transition-colors">{item.name}</span>
                    <ChevronRight size={10} className="text-brand opacity-0 group-hover/link:opacity-100 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/contact" className="btn-primary h-10 px-6">
            Consultation
          </Link>
        </div>

        {/* MOBILE TRIGGER */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden relative z-[90] p-3 text-text-primary bg-surface border border-stroke rounded-xl"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </motion.nav>

    {/* MOBILE MENU OVERLAY */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm lg:hidden"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-[240px] z-[100] bg-white border-l border-stroke shadow-2xl p-6 pt-20 overflow-y-auto lg:hidden"
          >
            <div className="space-y-10">
              {services.map((section) => (
                <div key={section.category} className="space-y-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted border-b border-stroke pb-2">{section.category}</p>
                  <div className="flex flex-col gap-3">
                    {section.items.map((item) => (
                      <Link 
                        key={item.name} 
                        href={item.href}
                        className="text-[11px] font-bold text-text-primary hover:text-brand transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="pt-6 border-t border-stroke flex flex-col gap-4">
                {["Work", "Partner Program", "About Organization", "Insights", "Careers", "Contact"].map((label) => (
                  <Link 
                    key={label}
                    href={`/${label.toLowerCase().includes('partner') ? 'partner' : label.toLowerCase().includes('about') ? 'about' : label.toLowerCase().includes('insights') ? 'blog' : label.toLowerCase().split(' ')[0]}`}
                    className="text-[11px] font-bold uppercase tracking-widest text-text-primary hover:text-brand transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
);
}
