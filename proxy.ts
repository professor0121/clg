import { NextRequest } from "next/server";
import { authProxy } from "@/proxies/auth.proxy";

export const config = {
  matcher: ["/api/page/:path*"],
};

export function proxy(req: NextRequest) {
  return authProxy(req);
}
