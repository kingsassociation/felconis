import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import PartnerLayoutClient from "./PartnerLayoutClient";

export default async function PartnerLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.role !== "PARTNER") {
    redirect("/portal/login");
  }

  const partner = await prisma.partner.findUnique({
    where: { id: session.id },
    select: { name: true }
  });

  if (!partner) {
    redirect("/portal/login");
  }

  return (
    <PartnerLayoutClient partner={{ name: partner.name }}>
      {children}
    </PartnerLayoutClient>
  );
}
