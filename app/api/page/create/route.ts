import { createChildLogger, logHttpRequest } from "@/logger";
import { getPageController, createPageController } from "@/modules/page";
import { NextRequest, NextResponse } from "next/server";

const pageLogger = createChildLogger({ module: "Page" });

export async function POST(req: NextRequest) {
  const start = Date.now();
  logHttpRequest(req);
  try {
    const result = createPageController(req);
    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: error,
      },
      {
        status: 500,
      },
    );
  }
}
