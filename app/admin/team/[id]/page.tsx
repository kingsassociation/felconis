import prisma from "@/lib/prisma";
import TeamForm from "../TeamForm";

export default async function AdminTeamEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const member = isNew 
    ? null 
    : await prisma.teamMember.findUnique({ where: { id: params.id } });

  if (!isNew && !member) {
    return <div>Leadership node not found in system archives.</div>;
  }

  return <TeamForm member={member} />;
}
