import prisma from "@/lib/prisma";
import TeamContent from "./TeamContent";

export default async function TeamPage() {
  const team = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' }
  });

  return <TeamContent team={team} />;
}
