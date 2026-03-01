import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CaseStudyForm from "../CaseStudyForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCaseStudyPage({ params }: Props) {
  const { id } = await params;
  
  if (id === "new") {
    return (
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">RECORD <span className="text-brand">IMPACT.</span></h1>
           <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">INITIALIZE A NEW STRATEGIC CASE STUDY</p>
        </div>
        <CaseStudyForm />
      </div>
    );
  }

  const study = await prisma.caseStudy.findUnique({
    where: { id }
  });

  if (!study) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
         <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">CONFIGURE <span className="text-brand">IMPACT.</span></h1>
         <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">SYNCING DATA: {study.title}</p>
      </div>
      <CaseStudyForm initialData={study} />
    </div>
  );
}
