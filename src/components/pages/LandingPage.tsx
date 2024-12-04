import GradientLayout from "../templates/GradientLayout/GradientLayout";
import GoogleLoginButton from "@/src/components/atoms/LoginButtons/GoogleLoginButton";
import KakaoLoginButton from "@/src/components/atoms/LoginButtons/KakaoLoginButton";
import SnowDuckFallEffect from "@/src/components/atoms/SnowFallEffect/SnowDuckFallEffect";
import SnowfallEffect from "@/src/components/atoms/SnowFallEffect/SnowFallEffect";
import Image from "next/image";
import Title from "../atoms/Title/Title";
import ContentLayout from "../templates/ContentLayout/ContentLayout";

function LandingPage() {
  return (
    <GradientLayout>
      <ContentLayout>
        <div className="py-20" />

        <div className="flex flex-col gap-y-8 items-center z-20">
          <Title label={`우리 집 앞에\n 눈오리 만들어 줄 사람!`} />

          <Image
            src="/svgs/bigSnowDuck.svg"
            alt="우리 집 앞에 눈오리 만들어 줄 사람!"
            width={113}
            height={113}
          />
        </div>

        <div className="py-20 flex flex-col gap-y-4 px-5 z-20">
          <KakaoLoginButton />
          <GoogleLoginButton />
        </div>
      </ContentLayout>

      <SnowfallEffect />
      <SnowDuckFallEffect />
    </GradientLayout>
  );
}

export default LandingPage;
