import { getSingleRow } from "@/src/utils/getSingleRow";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

/**
 * 유저 정보 가져오기
 * @param req : NextRequest
 * @method GET
 * @returns
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json({
        status: 401,
        success: false,
        error: "엑세스토큰이 없습니다.",
      });
    }

    // 2. 토큰 검증 및 유저 정보 추출
    const secret = process.env.JWT_SECRET_KEY || "__next_private_export_map__";
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

    const query = "SELECT * FROM users WHERE id = ?";
    const getUser = await getSingleRow(query, [decoded.id]);

    if (!getUser) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: "유저를 찾을 수 없습니다.",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "유저정보 가져오기 성공",
      response: getUser,
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
