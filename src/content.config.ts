import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const Meta = z
  .object({
    name: z.string().optional(),
    property: z.string().optional(),
    content: z.string(),
  })
  .refine((data) => data.name !== undefined || data.property !== undefined, {
    message: "Either 'name' or 'property' must be provided.",
  });

export type Meta = z.infer<typeof Meta>;

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    meta: z.array(Meta),
  }),
});

export const collections = {
  projects,
};
