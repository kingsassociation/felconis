import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import PartnerForm from "./PartnerForm";

export default async function EditPartnerPage({ params }: { params: { id: string } }) {
  const partner = await prisma.partner.findUnique({
    where: { id: params.id }
  });

  if (!partner) {
    notFound();
  }

  return <PartnerForm partner={partner} />;
}
