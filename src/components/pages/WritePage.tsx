"use client";

import ContentLayout from "@/src/components/templates/ContentLayout/ContentLayout";
import GradientLayout from "@/src/components/templates/GradientLayout/GradientLayout";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import SelectSnowDuck from "../templates/SelectSnowDuck";
import WriteSnowDuck from "../templates/WriteSnowDuck";

function WritePage() {
  const params = useParams();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [selectedDuck, setSelectedDuck] = useState(1);
  const [message, setMessage] = useState("");

  const onClickButton = () => {
    if (step === 0) return setStep(1);
  };

  const onClickBackArrow = () => {
    if (step === 0) return router.back();

    setStep(0);
  };

  return (
    <GradientLayout>
      <ContentLayout>
        <div className="flex justify-between items-center h-16 bg-white p-5 z-10">
          <button onClick={onClickBackArrow}>
            <Image
              src="/svgs/arrow.svg"
              alt="뒤로가기"
              width={24}
              height={24}
            />
          </button>
          <h1 className="text-2xl leading-9">
            {step === 0 ? "눈오리 고르기" : "편지 작성하기"}
          </h1>
          <div />
        </div>

        {step === 0 && (
          <SelectSnowDuck
            bgId={(params?.id as string) || "1"}
            setSelectedDuck={setSelectedDuck}
          />
        )}

        {step === 1 && (
          <WriteSnowDuck selectedDuck={selectedDuck} setMessage={setMessage} />
        )}

        <div className="px-5 py-8 z-10 flex flex-col gap-y-4 items-center">
          <button
            onClick={onClickButton}
            className="w-full h-[52px] rounded-full border-[1.5px] border-[#393939] bg-[#DADCFF] font-pretendard text-base text-[#393939] font-semibold"
          >
            {step === 0 ? "다음" : "눈오리 완성"}
          </button>
        </div>
      </ContentLayout>
    </GradientLayout>
  );
}

export default WritePage;
