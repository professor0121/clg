import { z } from "zod";
import { createPostSchema, updatePostSchema } from "./post.schema";

export type UpdatePostInput = z.infer<typeof updatePostSchema>;

export type CreatePostBody = z.infer<typeof createPostSchema>;


export type CreatePostInput = CreatePostBody & {
  authorId: string;
};