import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import { User } from "@/src/schema/user.schema";
import { getSingleRow } from "@/src/utils/getSingleRow";
import { RowDataPacket } from "mysql2";
import { serialize } from "cookie";

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
    const query = "SELECT * FROM users WHERE kakao_id = ?";
    const getUser = await getSingleRow<User & RowDataPacket>(query, [
      kakaoUserInfo.id,
    ]);

    let user: User;
    let message = "";
    let isNewUser = false;

    // 신규 유저
    if (!getUser) {
      // users 테이블에 user 객체 생성
      const newUser = await getSingleRow<User & RowDataPacket>(
        "INSERT INTO users (kakao_id) VALUES (?)",
        [kakaoUserInfo.id]
      );

      if (!newUser) {
        const err = {
          status: 500,
          success: false,
          message: "유저정보를 저장하는데 실패하였습니다.",
        };

        return NextResponse.json(err);
      }

      user = {
        id: newUser.id,
        kakao_id: newUser.kakao_id,
        nick_name: "",
        bg_id: null,
      };

      isNewUser = true;
      message = "회원가입 성공";
    } else {
      if (getUser.nick_name === "") {
        // 이전에 회원가입 이력 O, 닉네임 & 배경화면 선택 안한 경우
        user = getUser;
        message = "회원가입 완료";
        isNewUser = true;
      } else {
        // 기존 유저
        user = getUser;
        message = "로그인 완료";
      }
    }

    if (!user) {
      const err = {
        status: 500,
        success: false,
        message: "유저정보를 저장하는데 실패하였습니다.",
      };

      return NextResponse.json(err);
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_KEY || "__next_private_export_map__",
      { expiresIn: "1h" }
    );

    const _response = NextResponse.json({
      status: 200,
      success: true,
      isNewUser,
      response: user,
      message,
    });

    const cookie = serialize("accessToken", token, {
      httpOnly: true, // 클라이언트에서 JavaScript로 쿠키를 접근할 수 없게 설정
      secure: process.env.NODE_ENV === "production", // HTTPS에서만 쿠키 전송
      maxAge: 60 * 60 * 24 * 7, // 7일 동안 쿠키 유지
      path: "/", // 모든 경로에서 쿠키를 사용 가능하게 설정
      sameSite: "lax", // 같은 사이트에서만 쿠키 전송
    });
    _response.headers.set("Set-Cookie", cookie);

    return _response;
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
