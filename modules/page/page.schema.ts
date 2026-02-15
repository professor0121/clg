import { z } from "zod";
import { PageSlug, PageStatus } from "./page.type";

/**
 * SINGLE slug segment
 * ❌ no slashes here
 */
export const pageSlugSchema = z
  .string()
  .min(1)
  .max(100)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase, hyphen-separated"
  );

/**
 * Create branded slug
 */
export function createPageSlug(value: string): PageSlug {
  return pageSlugSchema.parse(value) as PageSlug;
}

/**
 * Status aligned with Prisma enum
 */
export const pageStatusSchema = z.enum([
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);

/**
 * Create page input (client-facing)
 */
export const createPageSchema = z.object({
  title: z.string().min(3).max(150),

  slug: pageSlugSchema,

  content: z.string().min(1),

  /**
   * Optional parent (for nested pages)
   */
  parentId: z.string().uuid().optional(),

  /**
   * Optional explicit status (admin only)
   */
  status: pageStatusSchema.optional(),
});

export type CreatePageInput = z.infer<typeof createPageSchema>;
