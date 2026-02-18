import { postController } from "@/modules/post/post.controller";

export async function POST(req: Request) {
  return postController.create(req as any);
}

export async function GET() {
  return postController.getAll();
}

export async function PATCH(req: Request) {
  return postController.update(req as any);
}

export async function DELETE(req: Request) {
  return postController.remove(req as any);
}
