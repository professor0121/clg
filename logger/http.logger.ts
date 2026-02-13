import { NextRequest } from "next/server"
import { logger } from "./index"
import { HttpLogContext } from "./logger.types"

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  const realIp = req.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIp) {
    return realIp
  }

  return "unknown"
}

export function logHttpRequest(req: NextRequest) {
  const context: HttpLogContext = {
    method: req.method,
    url: req.nextUrl.pathname,
    ip: getClientIp(req),
  }

  logger.info(context, "Incoming request")
}

export function logHttpResponse(
  req: NextRequest,
  statusCode: number,
  durationMs: number
) {
  const context: HttpLogContext = {
    method: req.method,
    url: req.nextUrl.pathname,
    statusCode,
    durationMs,
    ip: getClientIp(req),
  }

  logger.info(context, "Request completed")
}
