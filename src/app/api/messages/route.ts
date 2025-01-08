import pool from "@/src/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export interface WriteMessageDto {
  userId: string;
  duckId: string;
  duckName: string;
  message: string;
}
/**
 * 메세지 작성
 * @param req : WriteMessageDto
 * @method POST
 * @returns
 */

export async function POST(req: NextRequest, res: NextApiResponse) {
  const body = await req.json();
  const { userId, message, duckId, duckName } = body;

  if (!userId || !duckId || !message || !duckName) {
    return NextResponse.json({
      status: 400,
      success: false,
      message: "필수 값이 없습니다.",
    });
  }

  const query =
    "INSERT INTO message (user_id, duck_id, message_text, duck_name) VALUES (?, ?, ?, ?)";

  try {
    const [rows] = await pool.query(query, [userId, duckId, message, duckName]);

    return NextResponse.json({
      status: 200,
      success: true,
      response: rows,
      message: "저장에 성공했습니다.",
    });
  } catch (error) {
    const err = {
      status: 500,
      success: false,
      message: "서버에러",
      error: error instanceof Error ? error.message : String(error),
    };

    return NextResponse.json(err);
  }
}
