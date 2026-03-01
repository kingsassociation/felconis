"use client";

import AdminSidebar from "@/app/components/AdminSidebar";
import MobileDashboardHeader from "@/app/components/MobileDashboardHeader";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Since it's a client component now, we'll need to fetch the session/admin info via an API or pass it from a server wrapper.
// But the original layout was an async server component. 
// To keep it simple, I'll make a layout_client and keep the layout as a server component that wraps it.
// OR I can use a stateful wrapper inside the layout.

export default function AdminLayout({ 
  children,
  admin 
}: { 
  children: React.ReactNode,
  admin: { name: string | null }
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col lg:flex-row">
      <MobileDashboardHeader 
        onMenuClick={() => setIsSidebarOpen(true)} 
        title="FELCONIS"
        subtitle="CONTROL HUB"
      />
      
      <AdminSidebar 
        adminName={admin.name || "Administrator"} 
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
