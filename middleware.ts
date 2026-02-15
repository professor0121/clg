import { NextRequest } from "next/server";
import { authMiddleware } from "@/middlewares/auth.middleware";

export const config = {
  matcher: ["/api/page/:path*"],
};

export function middleware(req: NextRequest) {
  return authMiddleware(req);
}
