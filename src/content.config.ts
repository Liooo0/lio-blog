import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: 'src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    tech: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    status: z.enum(['completed', 'in-progress', 'planned']).default('completed'),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
