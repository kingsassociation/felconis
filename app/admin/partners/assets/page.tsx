import AdminPartnerAssetsContent from "@/app/admin/partners/assets/AdminPartnerAssetsContent";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminPartnerAssetsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/portal/login");
  }

  const assets = await prisma.asset.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <AdminPartnerAssetsContent assets={assets} />;
}
