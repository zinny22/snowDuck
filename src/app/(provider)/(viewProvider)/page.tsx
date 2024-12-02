import GoogleLoginButton from "@/src/components/atoms/LoginButtons/GoogleLoginButton";
import KakaoLoginButton from "@/src/components/atoms/LoginButtons/KakaoLoginButton";
import SnowDuckFallEffect from "@/src/components/atoms/SnowFallEffect/SnowDuckFallEffect";
import SnowfallEffect from "@/src/components/atoms/SnowFallEffect/SnowFallEffect";
import Image from "next/image";

function HomePage() {
  return (
    <>
      <div className="grid items-center justify-items-center min-h-screen bg-custom-gradient bg-white z-10">
        <section className="max-w-[420px]  w-full h-[100vh] flex flex-col justify-between z-50">
          <div className="py-20" />
          <div className="flex flex-col gap-y-8 items-center">
            <h1 className="text-2xl text-center leading-9 font-normal">
              우리 집 앞에
              <br />
              눈오리 만들어 줄 사람!
            </h1>
            <Image
              src="/svgs/bigSnowDuck.svg"
              alt="우리 집 앞에 눈오리 만들어 줄 사람!"
              width={113}
              height={113}
            />
          </div>

          <div className="py-20 flex flex-col gap-y-4">
            <KakaoLoginButton />
            <GoogleLoginButton />
          </div>
        </section>
      </div>

      <SnowfallEffect />
      <SnowDuckFallEffect />
    </>
  );
}

export default HomePage;
