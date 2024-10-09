import { defineCollection, reference, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      image: image().refine((img) => img.width < 1200, {
        message: 'Image width must be less than 1200px',
      }),

      // author: z.string(),
      author: reference('author'),

      tags: z.array(z.string()),

      isDraft: z.boolean().default(false),
    }),
});

const authorCollection = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      twitter: z.string(),
      linkedIn: z.string().url(),
      github: z.string().url(),
      bio: z.string(),
      subtitle: z.string(),
    }),
});

export const collections = {
  blog: blogCollection,
  author: authorCollection,
};
