import { Code } from "@/src/schema/code.schema";
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
  try {
    const token = req.cookies.get("accessToken")?.value;
    const query = "SELECT * FROM users WHERE id = ?";
    const getUser = await getSingleRow(query, [params.id]);

    // 비 로그인 유저의 요청
    if (!token) {
      return NextResponse.json({
        status: 200,
        success: true,
        message: "유저정보 가져오기 성공",
        response: { ...getUser, isMe: false },
      });
    }

    // 유저 정보가 없는 경우
    if (!getUser) {
      return NextResponse.json({
        status: 400,
        success: false,
        code: Code.NOT_FOUND,
        error: "유저를 찾을 수 없습니다",
      });
    }

    const secret = process.env.JWT_SECRET_KEY || "__next_private_export_map__";
    let decoded;

    try {
      decoded = jwt.verify(token, secret) as { id: string };
    } catch {
      // 엑세스 토큰이 없거나 만료된 경우
      return NextResponse.json({
        status: 401,
        success: false,
        code: Code.LOGOUT,
        error: "엑세스토큰이 없습니다.",
      });
    }

    // 로그인 유저랑 홈화면에서 링크된 유저가 같은지 여부를 체크해 내 홈인지 아닌지 판별
    const isMe = decoded.id === params.id ? true : false;
    return NextResponse.json({
      status: 200,
      success: true,
      message: "유저정보 가져오기 성공",
      response: { ...getUser, isMe },
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
