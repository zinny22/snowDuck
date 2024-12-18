"use client";

function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=email profile`;

    window.location.href = googleAuthUrl;
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="font-pretendard font-semibold text-[#414141] leading-4 bg-[white] h-[52px] rounded-full border-[1.5px] border-[#252525]"
    >
      구글로 계속하기
    </button>
  );
}

export default GoogleLoginButton;
