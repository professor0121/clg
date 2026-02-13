import { NextRequest, NextResponse } from "next/server";
import { registerController } from "@/modules/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await registerController(body);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Registration failed",
      },
      { status: 400 },
    );
  }
}
