"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function AuthKakaoPage() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const authCode = searchParams.get("code"); // 인가코드가 저장된다.

  const login = async () => {
    const response = await axios.post(`/api/auth/kakao?code=${authCode}`);
    const data = response.data.data;

    // TODO:받아온 엑세스토큰 처리 방법에 대한 고민 필요!
    if (data?.access_token) {
      route.replace("/main");
    }
  };

  useEffect(() => {
    if (authCode) {
      login();
    }
  }, [authCode]);

  return <div>카카오 redirectUrl 위치</div>;
}

export default AuthKakaoPage;
