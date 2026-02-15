import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export function authMiddleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as AuthUser;

    const headers = new Headers(req.headers);
    headers.set("x-user", JSON.stringify(user));

    return NextResponse.next({
      request: { headers },
    });
  } catch {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
