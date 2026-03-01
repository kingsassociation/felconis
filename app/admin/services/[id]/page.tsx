import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ServiceForm from "./ServiceForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  
  if (id === "new") {
    return (
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">DEPLOY <span className="text-brand">NODE.</span></h1>
           <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">INITIALIZE A NEW GROWTH CAPABILITY</p>
        </div>
        <ServiceForm />
      </div>
    );
  }

  const service = await prisma.service.findUnique({
    where: { id }
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
         <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">CONFIGURE <span className="text-brand">NODE.</span></h1>
         <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">SYNCING DATA: {service.title}</p>
      </div>
      <ServiceForm initialData={service} />
    </div>
  );
}
