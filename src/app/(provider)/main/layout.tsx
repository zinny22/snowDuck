"use client";

import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  // TODO: 로그인 유저인지 체크를 여기서 하면 어떤지? 스토어 생성후 isLoggedIn 처리 필요해보임
  return <>{children}</>;
}

export default AuthLayout;
