import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import JobForm from "./JobForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditJobPage({ params }: Props) {
  const { id } = await params;
  
  if (id === "new") {
    return (
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">DEPLOY <span className="text-brand">NODE.</span></h1>
           <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">INITIALIZE A NEW TALENT ACQUISITION NODE</p>
        </div>
        <JobForm />
      </div>
    );
  }

  const job = await prisma.job.findUnique({
    where: { id }
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
         <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">CONFIGURE <span className="text-brand">NODE.</span></h1>
         <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">SYNCING DATA: {job.title}</p>
      </div>
      <JobForm initialData={job} />
    </div>
  );
}
