import { NextRequest, NextResponse } from "next/server";
import { createChildLogger, logHttpRequest, logHttpResponse } from "@/logger";
import { loginController } from "@/modules/auth";
import { cookieConfig } from "@/config";

const authLogger = createChildLogger({ module: "auth" });

export async function POST(req: NextRequest) {
  const start = Date.now();

  logHttpRequest(req);

  try {
    const body = await req.json();

    authLogger.info({ email: body.email }, "Login attempt");

    const result = await loginController(body);

    authLogger.info({ userId: result.user.id }, "User login successful");

    logHttpResponse(req, 200, Date.now() - start);

    const response=NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 },
    );

    response.cookies.set(
      cookieConfig.accessToken.name,
      result.accessToken,
      cookieConfig.accessToken.options,
    );

    response.cookies.set(
      cookieConfig.refreshToken.name,
      result.refreshToken,
      cookieConfig.refreshToken.options,
    );

    return response;
  } catch (error: any) {
    authLogger.error(
      {
        error: error?.message,
      },
      "Login failed",
    );

    logHttpResponse(req, 400, Date.now() - start);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Login failed",
      },
      { status: 400 },
    );
  }
}
