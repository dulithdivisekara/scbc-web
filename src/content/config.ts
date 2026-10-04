import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const announcements = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/announcements" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Academic', 'Sports', 'Religious', 'Notice']),
    summary: z.string(),
    pinned: z.boolean().optional(),
  }),
});

export const collections = {
  announcements,
};
