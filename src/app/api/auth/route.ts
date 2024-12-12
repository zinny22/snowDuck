import pool from "@/src/lib/db";
import { getSingleRow } from "@/src/utils/getSingleRow";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

/**
 * 회원가입 진행 (bg_id && nick_name 저장)
 * @param req : NextRequest
 * @returns
 */
export async function POST(req: NextRequest) {
  try {
    // 1. 쿠키에서 액세스 토큰 추출 (TODO: 클라이언트에서 401에러가 오면 로그인 화면으로 처리 필요)
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json({
        status: 401,
        success: false,
        error: "엑세스토큰이 없습니다.",
      });
    }

    // 2. 토큰 검증 및 유저 정보 추출
    const secret = process.env.JWT_SECRET_KEY || "__next_private_export_map__"; // JWT 시크릿
    let decoded;

    try {
      decoded = jwt.verify(token, secret) as { id: string };
    } catch {
      return NextResponse.json({
        status: 401,
        success: false,
        error: "엑세스토큰이 없습니다.",
      });
    }

    // 3.req에서 정보 추출
    const body = await req.json();
    const { nickname, bgId } = body;

    if (!nickname || !bgId) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: "닉네임과 배경ID는 필수값 입니다.",
      });
    }

    // 4. DB 조회 및 업데이트
    const getUser = await getSingleRow("SELECT * FROM users WHERE id = ?", [
      decoded.id,
    ]);
    if (!getUser) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: "유저를 찾을 수 없습니다.",
      });
    }

    // 저장
    await pool.query("UPDATE users SET nick_name = ?, bg_id = ? WHERE id = ?", [
      nickname,
      bgId,
      decoded.id,
    ]);

    return NextResponse.json({
      status: 200,
      success: true,
      message: "회원가입이 완료되었습니다.",
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
