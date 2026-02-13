import { NextRequest, NextResponse } from "next/server"
import { registerController } from "@/modules/auth"
import { createChildLogger ,logHttpRequest, logHttpResponse} from "@/logger"

const authLogger = createChildLogger({ module: "auth" })

export async function POST(req: NextRequest) {
  const start = Date.now()

  logHttpRequest(req)

  try {
    const body = await req.json()

    authLogger.info({ email: body.email }, "Register attempt")

    const result = await registerController(body)

    authLogger.info({ userId: result.user.id }, "User registered successfully")

    logHttpResponse(req, 201, Date.now() - start)

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 }
    )
  } catch (error: any) {
    authLogger.error(
      {
        error: error?.message,
      },
      "Register failed"
    )

    logHttpResponse(req, 400, Date.now() - start)

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Registration failed",
      },
      { status: 400 }
    )
  }
}
