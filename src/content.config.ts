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

const articlesCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/articles" }),
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    title_si: z.string(),
    lead: z.string(),
    lead_si: z.string(),
    sections: z.array(
      z.object({
        heading: z.string(),
        heading_si: z.string(),
        body: z.string(),
        body_si: z.string(),
      })
    ),
  }),
});

const bi = z.object({ en: z.string(), si: z.string() });

const pagesCollection = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/pages" }),
  schema: z.object({
    intro: bi.optional(),
    sections: z.array(
      z.object({
        layout: z.enum(["cards", "facilities"]),
        heading: bi.optional(),
        items: z.array(
          z.object({
            icon: z.enum(["BookOpen", "Globe", "MonitorPlay", "Microscope"]),
            tint: z.enum(["teal", "orange", "purple"]),
            title: bi,
            body: bi,
          })
        ),
      })
    ).optional(),
    procedure_heading: bi.optional(),
    steps: z.array(z.object({ title: bi, body: bi })).optional(),
    download: z.object({ heading: bi, body: bi, button: bi, file: z.string() }).optional(),
    actions: z.object({ call: bi, email: bi, map: bi }).optional(),
    map_note: bi.optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
  announcements: announcementsCollection,
  leadership: leadershipCollection,
  articles: articlesCollection,
};
