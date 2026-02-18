import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  slug: z.string().min(3),
  status: z.enum(["DRAFT", "PUBLISH", "PRIVATE"]).default("DRAFT"),
  postType: z.enum(["POST", "PAGE"]).default("POST"),
});

export const updatePostSchema = z.object({
  id: z.number(),
  title: z.string().min(3).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISH", "PRIVATE"]).optional(),
});
