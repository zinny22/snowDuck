import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import pool from "@/src/lib/db";
import { User } from "@/src/schema/user.schema";

/**
 * 카카오 로그인 요청
 * @param req : NextRequest
 * @returns
 */
export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  // 1. 카카오 토큰 요청
  try {
    const response = await axios(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=http://localhost:3000/auth/kakao&code=${code}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const access_token = response.data.access_token;

    // 2. 카카오 유저 정보 요청
    const userInfoRes = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const kakaoUserInfo = userInfoRes.data;

    // 3. 해당 카카오 ID로 사용자 조회
    const [rows] = await pool.query("SELECT * FROM users WHERE kakao_id = ?", [
      kakaoUserInfo.id,
    ]);

    // 4. 사용자가 존재하지 않으면 새로운 사용자로 등록
    let user: User;
    if (!Array.isArray(rows) || rows.length === 0) {
      const [result] = await pool.query(
        "INSERT INTO users (kakao_id) VALUES (?)",
        [kakaoUserInfo.id]
      );
      user = {
        id: (result as User[])[0].id,
        kakao_id: (result as User[])[0].kakao_id,
      };

      // 5. 회원가입 성공 응답
      return NextResponse.json({
        status: 200,
        success: true,
        isNewUser: true,
        userInfo: user,
        message: "회원가입 성공",
      });
    } else {
      user = rows[0] as User;
    }

    // 6. JWT 토큰 생성
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_KEY || "__next_private_export_map__",
      {
        expiresIn: "1h",
      }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      accessToken: token,
      userInfo: user,
      message: "로그인 성공",
    });
  } catch (error) {
    const err = {
      status: 400,
      success: false,
      message: "카카오 로그인 요청에 실패하였습니다.",
      error: error instanceof Error ? error.message : String(error),
    };

    return NextResponse.json(err);
  }
}
