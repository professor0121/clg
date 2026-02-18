import { NextRequest, NextResponse } from "next/server";
import { createPostSchema, updatePostSchema } from "./post.schema";
import { postService } from "./post.service";

export const postController = {
  async create(req: NextRequest) {
    try {
      const body = await req.json();
      const data = createPostSchema.parse(body);

      const userHeader = req.headers.get("x-user");
      console.log("this is a user header",userHeader)
      if (!userHeader) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const user = JSON.parse(userHeader);
      console.log(user)
      const post = await postService.create({
        ...data,
        authorId: user.id,
      });

      return NextResponse.json(post, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  },

  async getAll() {
    const posts = await postService.getAll();
    return NextResponse.json(posts);
  },

  async update(req: NextRequest) {
    try {
      const body = await req.json();
      const data = updatePostSchema.parse(body);

      const post = await postService.update(data);

      return NextResponse.json(post);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  },

  async remove(req: NextRequest) {
    try {
      const { id } = await req.json();

      await postService.remove(Number(id));

      return NextResponse.json({ success: true });
    } catch {
      return NextResponse.json({ error: "Delete failed" }, { status: 400 });
    }
  },
};
