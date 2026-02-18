import { NextRequest, NextResponse } from "next/server";
import { verifyAccessTokenEdge } from "@/lib/edge-jwt";

export async function authProxy(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cookieToken = req.cookies.get("accessToken")?.value;

  let token: string | undefined;

  console.log(token)

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  } else if (cookieToken) {
    token = cookieToken;
  }

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await verifyAccessTokenEdge(token);

    const headers = new Headers(req.headers);
    console.log("this is a user header from middleware", headers);
    headers.set("x-user", JSON.stringify(user));

    return NextResponse.next({
      request: { headers },
    });
  } catch (err) {
    console.error("AUTH PROXY ERROR:", err);

    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
