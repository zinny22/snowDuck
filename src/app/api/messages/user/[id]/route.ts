import pool from "@/src/lib/db";
import { NextResponse } from "next/server";

/**
 * 유저 아이디와 매칭되는 messageList 가져오기
 * @param req : NextRequest
 * @returns
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const query = "SELECT * FROM message WHERE user_id = ?";
    const [rows] = await pool.query(query, [id]);

    return NextResponse.json({
      status: 200,
      success: true,
      message: "messageList 가져오기!",
      response: rows,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "서버 에러",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
