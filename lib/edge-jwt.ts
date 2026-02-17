import { jwtVerify } from "jose";
import { JWT_ACCESS_SECRET } from "@/env";

const secret = new TextEncoder().encode(JWT_ACCESS_SECRET);

export async function verifyAccessTokenEdge(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}
