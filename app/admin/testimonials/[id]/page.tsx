import prisma from "@/lib/prisma";
import TestimonialForm from "../TestimonialForm";

export default async function AdminTestimonialEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const testimonial = isNew 
    ? null 
    : await prisma.testimonial.findUnique({ where: { id: params.id } });

  if (!isNew && !testimonial) {
    return <div>Experience record not found in system archives.</div>;
  }

  return <TestimonialForm testimonial={testimonial} />;
}
