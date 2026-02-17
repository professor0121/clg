import * as pageDAO from "@/dao/page";
import { CreatePageInput } from "./page.schema";

/**
 * Create page with hierarchy & versioning
 */
export const createPageService = async (
  input: CreatePageInput & { authorId: string }
) => {
  let fullSlug = input.slug;

  if (input.parentId) {
    const parent = await pageDAO.findParentPageSlug(input.parentId);

    if (!parent) {
      throw new Error("Parent page not found");
    }

    fullSlug = `${parent.fullSlug}/${input.slug}`;
  }

  return pageDAO.createPage({
    slug: input.slug,
    fullSlug,
    status: input.status ?? "DRAFT",
    author: {
      connect: { id: input.authorId },
    },
    parent: input.parentId
      ? { connect: { id: input.parentId } }
      : undefined,
    versions: {
      create: {
        title: input.title,
        content: input.content,
        version: 1,
        isPublished: input.status === "PUBLISHED",
        createdBy: {
          connect: { id: input.authorId },
        },
      },
    },
  });
};

/**
 * Resolve page for routing
 */
export const getPageBySlug = async (fullSlug: string) => {
  const page = await pageDAO.findPageByFullSlug(fullSlug);
  console.warn(page)
  if (!page || page.status !== "PUBLISHED") {
    return null;
  }

  return page;
};



export const getHomePage = async () => {
  const page = await pageDAO.getHomePage();

  if (!page?.homePage) {
    return null;
  }

  const publishedVersion = page.homePage.versions.find(
    (v:any) => v.isPublished
  );

  if (!publishedVersion) {
    return null;
  }

  return publishedVersion;
};
