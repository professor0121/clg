import { NextRequest,NextResponse } from "next/server";
import { authProxy } from "@/proxies/auth.proxy";

export const config = {
  matcher: ["/api/page/:path*","/api/posts/:path*"],
};

export function proxy(req: NextRequest) {
  return authProxy(req);
}


// ---- ROUTE RULES ----
const PUBLIC_ROUTES = [
  {
    path: "/api/posts",
    methods: ["GET"],
  },
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // ✅ Allow public routes
  for (const route of PUBLIC_ROUTES) {
    if (
      pathname.startsWith(route.path) &&
      route.methods.includes(method)
    ) {
      return NextResponse.next();
    }
  }

  // 🔒 Everything else is protected
  return authProxy(req);
}