import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://felconis.com';

  // Core static pages
  const routes = [
    '',
    '/about',
    '/services',
    '/work',
    '/team',
    '/blog',
    '/careers',
    '/contact',
    '/partner',
    '/legal/privacy',
    '/legal/terms',
    '/legal/guidelines',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Dynamic Blog Posts
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    const blogRoutes = posts.map((post: { slug: string; updatedAt: Date }) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Dynamic Work Case Studies
    const projects = await prisma.caseStudy.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    const workRoutes = projects.map((project: { slug: string; updatedAt: Date }) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

     // Dynamic Services
     const services = await prisma.service.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      });
  
      const serviceRoutes = services.map((service: { slug: string; updatedAt: Date }) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));

    return [...routes, ...blogRoutes, ...workRoutes, ...serviceRoutes];
  } catch (error) {
    console.error('Error generating dynamic sitemap routes:', error);
    return routes;
  }
}
