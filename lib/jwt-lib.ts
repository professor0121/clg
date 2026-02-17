import jwt, { SignOptions } from "jsonwebtoken"
import {
  JWT_ACCESS_EXPIRES,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES,
} from "@/env"

export function generateAccessToken(payload: object) {
  const options: SignOptions = {
    expiresIn: JWT_ACCESS_EXPIRES as SignOptions["expiresIn"],
  }

  return jwt.sign(payload, JWT_ACCESS_SECRET, options)
}

export function generateRefreshToken(payload: object) {
  const options: SignOptions = {
    expiresIn: JWT_REFRESH_EXPIRES as SignOptions["expiresIn"],
  }

  return jwt.sign(payload, JWT_REFRESH_SECRET, options)
}
