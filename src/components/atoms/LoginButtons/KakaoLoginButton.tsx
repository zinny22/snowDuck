"use client";

import { useEffect } from "react";

const redirectUri = `http://localhost:3000/auth/kakao`;

function KakaoLoginButton() {
  const onClickLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri,
    });
    console.log("Kakao Logining");
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        const kakaoApiKey = process.env.NEXT_PUBLIC_JS_API_KEY;
        if (kakaoApiKey) {
          window.Kakao.init(kakaoApiKey);
        } else {
          console.error("Kakao JavaScript API key is missing");
        }
      }
    }
  }, []);

  return <button onClick={onClickLogin}>카카오 로그인</button>;
}

export default KakaoLoginButton;
