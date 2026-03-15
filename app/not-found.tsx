"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-text-primary selection:bg-brand selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-grow grain relative overflow-hidden flex items-center justify-center py-24 md:py-32">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/[0.02] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/[0.01] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 -z-10" />

        <div className="container-max relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            {/* Minimalist 404 Header */}
            <div className="relative inline-block">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                className="text-[12rem] md:text-[20rem] font-black text-brand/5 leading-none select-none"
              >
                404
              </motion.span>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="space-y-4"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand">Error 404</p>
                  <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                    PAGE <br /> <span className="text-brand">NOT FOUND.</span>
                  </h1>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-8"
            >
              <p className="text-text-secondary text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
                The page you are looking for has been relocated or does not exist within our current architecture.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <Link
                  href="/"
                  className="h-16 px-10 bg-brand text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand/90 hover:scale-[0.98] transition-all flex items-center gap-3 shadow-xl shadow-brand/10 group"
                >
                  <Home size={14} />
                  Return Home
                </Link>
                <Link
                  href="/services"
                  className="h-16 px-10 bg-white border border-stroke text-[10px] font-black uppercase tracking-widest rounded-2xl hover:border-brand/40 hover:scale-[0.98] transition-all flex items-center gap-3 shadow-sm group"
                >
                  <Search size={14} className="group-hover:text-brand transition-colors" />
                  Explore Services
                </Link>
              </div>

              <div className="pt-12 border-t border-stroke max-w-[120px] mx-auto opacity-40">
                <button
                  onClick={() => window.history.back()}
                  className="text-[9px] font-bold uppercase tracking-widest text-text-muted hover:text-brand transition-colors flex items-center gap-2 mx-auto"
                >
                  <ArrowLeft size={10} />
                  Go Back
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
