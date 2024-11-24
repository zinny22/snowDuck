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

    if (response.data.status === 200) {
      if (response.data.isNewUser) {
        route.replace("/signup");
      } else {
        route.replace("/main");
      }
    } else {
      console.log(response.data.message);
    }
  };

  useEffect(() => {
    if (authCode) {
      login();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCode]);

  return <div>카카오 redirectUrl 위치</div>;
}

export default AuthKakaoPage;
