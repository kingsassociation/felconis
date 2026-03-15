import { Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stroke pt-16 pb-6 px-6 grain relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/[0.01] rounded-full blur-[100px] -z-10" />
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-x-12 gap-y-12 mb-16">
          <div className="md:col-span-4 lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-2 group origin-left">
              <Logo />
            </Link>
            <p className="text-text-muted text-base leading-relaxed max-w-sm font-medium">
              A professional digital engineering firm delivering high-precision software solutions and strategic design for global organizations.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/felconis"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
                    window.fbq('trackCustom', 'SocialClick', { platform: 'LinkedIn' });
                  }
                }}
                className="w-10 h-10 bg-white border border-stroke rounded-lg flex items-center justify-center text-text-muted hover:text-brand hover:border-brand/40 transition-all shadow-sm group/social"
              >
                <Linkedin size={18} strokeWidth={1.5} className="group-hover/social:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com/felconis"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.fbq && localStorage.getItem('felconis_cookie_consent') === 'allowed') {
                    window.fbq('trackCustom', 'SocialClick', { platform: 'Facebook' });
                  }
                }}
                className="w-10 h-10 bg-white border border-stroke rounded-lg flex items-center justify-center text-text-muted hover:text-brand hover:border-brand/40 transition-all shadow-sm group/social"
              >
                <Facebook size={18} strokeWidth={1.5} className="group-hover/social:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Capabilities</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-[10px] font-black text-text-muted hover:text-brand transition-colors uppercase tracking-widest block">
                Engineering
              </Link></li>
              <li><Link href="/work" className="text-[10px] font-black text-text-muted hover:text-brand transition-colors uppercase tracking-widest block">
                Case Archive
              </Link></li>
              <li><Link href="/blog" className="text-[10px] font-black text-text-muted hover:text-brand transition-colors uppercase tracking-widest block">
                Intelligence
              </Link></li>
              <li><Link href="/about" className="text-[10px] font-black text-text-muted hover:text-brand transition-colors uppercase tracking-widest block">
                Organization
              </Link></li>
              <li><Link href="/team" className="text-[10px] font-black text-text-muted hover:text-brand transition-colors uppercase tracking-widest block">
                Executive Team
              </Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Ecosystem</h4>
            <ul className="space-y-4">
              <li><Link href="/careers" className="text-[10px] font-black text-text-muted hover:text-brand transition-colors uppercase tracking-widest block">
                Careers
              </Link></li>
              <li><Link href="/partner" className="text-[10px] font-black text-text-muted hover:text-brand transition-colors uppercase tracking-widest block">
                Partnerships
              </Link></li>
              <li><Link href="/partner/portal" className="text-[10px] font-black text-text-muted hover:text-brand transition-colors uppercase tracking-widest block">
                Partner Portal
              </Link></li>
              <li><Link href="/admin" className="text-[10px] font-black text-text-muted hover:text-brand transition-colors uppercase tracking-widest block">
                Executive Hub
              </Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/legal/privacy" className="text-[10px] font-black text-text-muted hover:text-brand transition-colors uppercase tracking-widest block">
                Privacy Policy
              </Link></li>
              <li><Link href="/legal/terms" className="text-[10px] font-black text-text-muted hover:text-brand transition-colors uppercase tracking-widest block">
                Terms of Use
              </Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Contact</h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-text-primary uppercase tracking-widest">Inquiries</p>
                <a
                  href="mailto:hello@felconis.com"
                  className="text-[11px] font-black text-brand hover:underline tracking-tight block"
                >
                  HELLO@FELCONIS.COM
                </a>
              </div>
              <Link href="/contact" className="text-[10px] font-black text-text-muted hover:text-brand transition-colors uppercase tracking-widest block">
                Contact Form
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-stroke flex justify-center">
          <p className="text-[8px] text-text-muted font-bold uppercase tracking-widest opacity-60">© 2026 Felconis Global Hub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
