import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  try {
    const res = await axios(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=http://localhost:3000/auth/kakao&code=${code}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const data = res.data;
    return NextResponse.json({
      data: data,
    });
  } catch (e) {
    return NextResponse.json({
      data: "fail",
    });
  }
}
