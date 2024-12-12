"use client";

import KakaoPage from "@/src/components/pages/KakaoPage";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function AuthKakaoPage() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const authCode = searchParams.get("code");

  const login = async () => {
    const response = await axios.post(`/api/auth/kakao?code=${authCode}`);

    if (response.data.status === 200) {
      if (response.data.isNewUser) {
        route.replace("/sign-up");
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

  return <KakaoPage />;
}

export default AuthKakaoPage;
