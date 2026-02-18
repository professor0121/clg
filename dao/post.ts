import { prisma } from "@/lib/prisma";
import { CreatePostInput, UpdatePostInput } from "@/modules/post";

export const postDAO = {
  create(data: CreatePostInput) {
    return prisma.post.create({ data });
  },

  findAll() {
    return prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  findById(id: number) {
    return prisma.post.findUnique({
      where: { id },
    });
  },

  update(data: UpdatePostInput) {
    const { id, ...rest } = data;
    return prisma.post.update({
      where: { id },
      data: rest,
    });
  },

  delete(id: number) {
    return prisma.post.delete({
      where: { id },
    });
  },
};
