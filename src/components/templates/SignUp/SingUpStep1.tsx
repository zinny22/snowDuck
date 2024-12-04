import SnowfallEffect from "@/src/components/atoms/SnowFallEffect/SnowFallEffect";
import Image from "next/image";
import { useState } from "react";
import GradientLayout from "../GradientLayout/GradientLayout";
import ContentLayout from "../ContentLayout/ContentLayout";

function SingUpStep1() {
  const [selectedImage, setSelectedImage] = useState({});

  return (
    <GradientLayout>
      <ContentLayout>
        <div />

        <div className="flex flex-col gap-6 items-center z-10">
          <h1 className="text-2xl leading-9">배경 고르기</h1>
        </div>

        <div className="px-5 py-8 z-10 flex flex-col gap-y-4 items-center">
          {selectedImage ? (
            <button className="w-full h-[52px] rounded-full border-[1.5px] border-[#393939] bg-[#DADCFF] font-pretendard text-base text-[#393939] font-semibold">
              완료
            </button>
          ) : (
            <div className="h-[52px]" />
          )}
        </div>

        <Image
          src="/svgs/bottomSnow.svg"
          alt="bottomSnow"
          width={320}
          height={63}
          className="absolute bottom-0 w-full"
        />
      </ContentLayout>
      <SnowfallEffect />
    </GradientLayout>
  );
}

export default SingUpStep1;
