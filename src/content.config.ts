import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const announcementsCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/announcements" }),
  schema: z.object({
    title: z.string(),
    title_si: z.string().optional(),
    date: z.coerce.date(),
    category: z.enum(['Academic', 'Sports', 'Religious', 'Notice']),
    category_si: z.string().optional(),
    summary: z.string(),
    summary_si: z.string().optional(),
    pinned: z.boolean().optional(),
  }),
});

const leadershipCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/leadership" }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    order: z.number(),
    image: z.string(),
    fallbackImage: z.string().optional(),
    bio: z.string(),
  }),
});

export const collections = {
  announcements: announcementsCollection,
  leadership: leadershipCollection,
};
