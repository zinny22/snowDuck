import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/src/schema/user.schema";
import { getSingleRow } from "@/src/utils/getSingleRow";
import { RowDataPacket } from "mysql2";
import { serialize } from "cookie";
import axios from "axios";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  try {
    // 1. 구글 액세스 토큰 요청
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("====", tokenResponse.data);

    const access_token = tokenResponse.data.access_token;

    // 2. 구글 유저 정보 요청
    const userInfoRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const googleUserInfo = userInfoRes.data;

    // 3. 해당 구글 이메일로 사용자 조회
    const query = "SELECT * FROM users WHERE google_id = ?";
    const getUser = await getSingleRow<User & RowDataPacket>(query, [
      googleUserInfo.id,
    ]);

    let user: User;
    let message = "";
    let isNewUser = false;

    // 신규 유저
    if (!getUser) {
      // INSERT 쿼리 실행 후 새로 생성된 유저 정보 조회
      await getSingleRow("INSERT INTO users (google_id) VALUES (?)", [
        googleUserInfo.id,
      ]);

      // 새로 생성된 유저 정보 조회
      const newUser = await getSingleRow<User & RowDataPacket>(
        "SELECT * FROM users WHERE google_id = ?",
        [googleUserInfo.id]
      );

      if (!newUser) {
        return NextResponse.json({
          status: 500,
          success: false,
          message: "유저정보를 저장하는데 실패하였습니다.",
        });
      }

      user = newUser;
      isNewUser = true;
      message = "회원가입 성공";
    } else {
      // 기존 유저
      user = getUser;
      message = "로그인 완료";
    }

    // JWT 토큰 생성
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

    // 쿠키 설정
    const cookie = serialize("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });
    _response.headers.set("Set-Cookie", cookie);

    return _response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "서버에러",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
