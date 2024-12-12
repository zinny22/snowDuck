import SnowDuckFallEffect from "@/src/components/atoms/SnowFallEffect/SnowDuckFallEffect";
import SnowfallEffect from "@/src/components/atoms/SnowFallEffect/SnowFallEffect";
import GradientLayout from "@/src/components/templates/GradientLayout/GradientLayout";
import Image from "next/image";
import { useState } from "react";
import ContentLayout from "../ContentLayout/ContentLayout";

interface Props {
  onClickNext: (nickname: string) => void;
}

function SignUpStep0({ onClickNext }: Props) {
  const [isSelected, setIsSelected] = useState(false);
  const [nickName, setNickName] = useState("");

  return (
    <GradientLayout>
      <ContentLayout>
        <div />

        <div className="flex flex-col gap-6 items-center z-10">
          <h1 className="text-2xl leading-9">닉네임 만들기</h1>
          <div
            className="px-4 max-w-[420px] w-full min-w-[320px]"
            style={{
              background: `url('/svgs/inputImage.svg') no-repeat center center`,
              backgroundSize: "90% auto",
            }}
          >
            <input
              type="text"
              className="text-[#252525] font-pretendard border-none w-full outline-none px-6 py-6 bg-transparent"
              placeholder="최대 8글자"
              maxLength={8}
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
          </div>
        </div>

        <div className="px-5 py-8 z-10 flex flex-col gap-y-4 items-center">
          <div
            className="flex items-center gap-x-2 cursor-pointer"
            onClick={() => setIsSelected(!isSelected)}
          >
            <Image
              src={
                isSelected
                  ? "/svgs/selectedRadio.svg"
                  : "/svgs/notSelectedRadio.svg"
              }
              alt="Snowflake Icon"
              width={24}
              height={24}
            />

            <div className="flex items-center gap-x-1">
              <p className="font-pretendard text-base font-medium text-[#393939] leading-[19px]">
                이용약관동의
              </p>
              <Image
                src="/svgs/chevron.svg"
                alt="Snowflake Icon"
                width={16}
                height={16}
              />
            </div>
          </div>
          {isSelected && nickName.length > 0 ? (
            <button
              className="w-full h-[52px] rounded-full border-[1.5px] border-[#393939] bg-[#DADCFF] font-pretendard text-base text-[#393939] font-semibold"
              onClick={() => onClickNext(nickName)}
            >
              다음
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
      <SnowDuckFallEffect />
    </GradientLayout>
  );
}

export default SignUpStep0;
