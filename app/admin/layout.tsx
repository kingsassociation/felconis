import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/portal/login");
  }

  const admin = await prisma.user.findUnique({
    where: { id: session.id },
    select: { name: true, image: true }
  });

  if (!admin) {
    redirect("/portal/login");
  }

  return (
    <AdminLayoutClient admin={admin as any}>
      {children}
    </AdminLayoutClient>
  );
}
