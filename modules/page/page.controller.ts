import { NextRequest, NextResponse } from "next/server";
import { getPageBySlug,createPageService } from "./page.service";
import { createPageSchema } from "./page.schema";

export async function createPageController(req:NextRequest) {
  const input=createPageSchema.parse(req.body)
  const authorId=req.user.id
  return createPageService({...input,authorId});
}

export async function getPageController(
  req: NextRequest,
  params: { slug: string[] }
) {
  const fullSlug = params.slug.join("/");

  const page = await getPageBySlug(fullSlug);

  if (!page) {
    return NextResponse.json(
      { message: "Page not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(page);
}
