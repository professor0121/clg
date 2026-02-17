import { createChildLogger, logHttpRequest ,logHttpResponse} from "@/logger";
import { getPageController, createPageController } from "@/modules/page";
import { NextRequest, NextResponse } from "next/server";

const pageLogger = createChildLogger({ module: "Page" });
export async function POST(req: NextRequest) {
  const start = Date.now();
  logHttpRequest(req);

  try {
    const data = await createPageController(req); // ✅ await

    pageLogger.info(
      { userId: data.authorId },
      "Page created successfully"
    );

    logHttpResponse(req, 200, Date.now() - start);

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal error",
      },
      { status: 500 }
    );
  }
}

