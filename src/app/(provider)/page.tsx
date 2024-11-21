import KakaoLoginButton from "@/src/components/atoms/LoginButtons/KakaoLoginButton";

function HomePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>랜딩 페이지</h1>
      <KakaoLoginButton />
    </div>
  );
}

export default HomePage;
