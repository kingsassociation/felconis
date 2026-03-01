import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import PartnerSettingsForm from "./SettingsForm";

export default async function PartnerSettingsPage() {
  const session = await getSession();
  if (!session || session.role !== "PARTNER") {
    redirect("/portal/login");
  }

  const partner = await prisma.partner.findUnique({
    where: { id: session.id },
  });

  if (!partner) {
    redirect("/portal/login");
  }

  return <PartnerSettingsForm partner={partner} />;
}
