"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("felconis_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (agreed: boolean) => {
    localStorage.setItem("felconis_cookie_consent", agreed ? "allowed" : "declined");

    // Trigger Analytics if agreed
    if (agreed) {
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'ad_storage': 'granted',
          'analytics_storage': 'granted'
        });
        window.gtag('event', 'page_view');
      }
    }

    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:w-[400px] z-[100]"
        >
          <div className="bg-white border border-stroke rounded-2xl shadow-premium p-6 space-y-6 relative overflow-hidden grain">
            <div className="absolute top-0 right-0 p-2">
              <button onClick={() => setIsVisible(false)} className="text-text-muted hover:text-brand transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand/5 border border-brand/10 rounded-xl flex items-center justify-center text-brand">
                <Cookie size={20} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Cookie Protocol</h4>
                <p className="text-[11px] font-bold text-brand uppercase tracking-tighter">Strategic Optimization</p>
              </div>
            </div>

            <p className="text-[11px] font-medium text-text-muted leading-relaxed">
              This ecosystem utilizes cookies to optimize technical performance and strategic analytics. By continuing, you acknowledge our <Link href="/legal/privacy" className="text-brand hover:underline">Privacy Protocol</Link>.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => handleConsent(true)}
                className="flex-1 h-10 bg-brand text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:shadow-lg hover:shadow-brand/20 transition-all"
              >
                Allow Protocol
              </button>
              <button
                onClick={() => handleConsent(false)}
                className="flex-1 h-10 bg-surface border border-stroke text-text-muted text-[9px] font-black uppercase tracking-widest rounded-lg hover:border-brand/40 transition-all"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
