import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const announcementsCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/announcements" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Academic', 'Sports', 'Religious', 'Notice']),
    summary: z.string(),
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
    bio: z.string(),
  }),
});

export const collections = {
  announcements: announcementsCollection,
  leadership: leadershipCollection,
};
