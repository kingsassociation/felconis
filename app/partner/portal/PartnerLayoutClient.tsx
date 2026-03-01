"use client";

import MobileDashboardHeader from "@/app/components/MobileDashboardHeader";
import PartnerSidebar from "@/app/components/PartnerSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PartnerLayoutClient({ 
  children,
  partner 
}: { 
  children: React.ReactNode,
  partner: { name: string }
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col lg:flex-row">
      <MobileDashboardHeader 
        onMenuClick={() => setIsSidebarOpen(true)} 
        title="FELCONIS"
        subtitle="PARTNER HUB"
      />
      
      <PartnerSidebar 
        partnerName={partner.name} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-12 overflow-y-auto mt-16 lg:mt-0">
         {children}
      </main>
    </div>
  );
}
