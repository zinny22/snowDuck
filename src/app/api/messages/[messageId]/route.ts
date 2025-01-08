import pool from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * 메세지 한개 가져오기
 * @param req : NextRequest
 * @method : GET
 * @return
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
}

/**
 * 메세지 작성
 * @param req : NextRequest
 * @method POST
 * @returns
 */
export async function POST(req: NextRequest) {
  console.log("req????", req);
}
