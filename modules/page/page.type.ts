export type PageStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

/**
 * Single slug segment only
 * example: "web-development"
 */
export type PageSlug = string & { readonly __brand: "PageSlug" };

/**
 * Full hierarchical path
 * example: "services/web-development"
 */
export type PageFullSlug = string & { readonly __brand: "PageFullSlug" };


export interface Page {
  readonly id: string;
  readonly slug: PageSlug;
  readonly title: string;
  readonly content: string;
  readonly status: PageStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
