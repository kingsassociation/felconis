import prisma from "@/lib/prisma";
import HomeContent from "./HomeContent";

export default async function Home() {
  const [services, testimonials, blogs] = await Promise.all([
    prisma.service.findMany({ take: 6 }),
    prisma.testimonial.findMany({ take: 3 }),
    prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: { category: true }
    })
  ]);

  return (
    <HomeContent 
      services={services} 
      testimonials={testimonials} 
      blogs={blogs} 
    />
  );
}
