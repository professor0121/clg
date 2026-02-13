import { NextResponse } from "next/server"
import { cookieConfig } from "@/config"

export async function POST() {
  const response = NextResponse.json({ success: true ,message:"Loged Out successfully !"})

  response.cookies.delete(cookieConfig.accessToken.name)
  response.cookies.delete(cookieConfig.refreshToken.name)


  return response
}
