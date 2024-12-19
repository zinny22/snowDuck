import pool from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * 메세지 작성
 * @param req : NextRequest
 * @method POST
 * @returns
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
}
