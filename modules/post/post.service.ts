import { postDAO } from "@/dao";
import { CreatePostInput, UpdatePostInput } from "./post.types";

export const postService = {
  async create(input: CreatePostInput) {
    const posts = await postDAO.findAll();
    if (posts.some((p: { slug: string; }) => p.slug === input.slug)) {
      throw new Error("Slug already exists");
    }

    return postDAO.create(input);
  },

  async getAll() {
    return postDAO.findAll();
  },

  async update(input: UpdatePostInput) {
    return postDAO.update(input);
  },

  async remove(id: number) {
    return postDAO.delete(id);
  },
};
