import { prisma } from "@/lib";
import { Prisma, PageStatus } from "@prisma/client";

/**
 * Find page by full slug
 */
export const findPageByFullSlug = (fullSlug: string) => {
  return prisma.page.findUnique({
    where: { fullSlug },
    include: {
      author: true,
      meta: true,
      versions: true,
    },
  });
};

/**
 * Find parent page (only what service needs)
 */
export const findParentPageSlug = (id: string) => {
  return prisma.page.findUnique({
    where: { id },
    select: { fullSlug: true },
  });
};

/**
 * Create page (raw Prisma input)
 */
export const createPage = (data: Prisma.PageCreateInput) => {
  return prisma.page.create({ data, include: {
      versions: true,
      parent: true,
      author: true,
    },
   });
};

/**
 * Publish page
 */
export const publishPage = (id: string) => {
  return prisma.page.update({
    where: { id },
    data: { status: PageStatus.PUBLISHED },
  });
};

/**
 * Get published pages
 */
export const getPublishedPages = () => {
  return prisma.page.findMany({
    where: { status: PageStatus.PUBLISHED },
    orderBy: { createdAt: "desc" },
  });
};
