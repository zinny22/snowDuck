import Image from "next/image";
import GradientLayout from "../GradientLayout/GradientLayout";
import ContentLayout from "../ContentLayout/ContentLayout";
import { useState } from "react";
import clsx from "clsx";

const BgEnum = {
  1: "지붕에 눈오리 군단",
  2: "담벼락에 눈오리 군단",
  3: "자동차에 눈오리 군단",
};

interface Props {
  onClickSignUp: (bgId: number) => void;
}
function SingUpStep1({ onClickSignUp }: Props) {
  const [swiper, setSwiper] = useState([
    { idx: 3, title: BgEnum[3] },
    { idx: 1, title: BgEnum[1] },
    { idx: 2, title: BgEnum[2] },
    { idx: 3, title: BgEnum[3] },
    { idx: 1, title: BgEnum[1] },
  ]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  const onClickSide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (index === 3) {
      setTranslateX(-212);
      setTimeout(() => {
        const newArray = swiper.slice(1, 5);
        const newIdx = newArray[3].idx + 1 > 3 ? 1 : newArray[3].idx + 1;
        const newItem = {
          idx: newIdx,
          title: BgEnum[newIdx as keyof typeof BgEnum],
        };
        setSwiper([...newArray, newItem]);

        setIsAnimating(false);
        setTranslateX(0);
      }, 300);
    }

    if (index === 1) {
      setTranslateX(212);

      setTimeout(() => {
        const newArray = swiper.slice(0, 4);
        const newIdx = newArray[0].idx - 1 === 0 ? 3 : newArray[0].idx - 1;
        const newItem = {
          idx: newIdx,
          title: BgEnum[newIdx as keyof typeof BgEnum],
        };
        setSwiper([newItem, ...newArray]);

        setIsAnimating(false);
        setTranslateX(0);
      }, 300);
    }
  };

  return (
    <GradientLayout>
      <ContentLayout>
        <div className="flex justify-between items-center h-[88px] bg-white p-5 z-10">
          <Image
            src="/svgs/arrow.svg"
            alt="Snowflake Icon"
            width={24}
            height={24}
          />
          <h1 className="text-2xl leading-9">배경 고르기</h1>
          <div />
        </div>
        <div>
          <div className="w-full overflow-x-hidden absolute top-[70px] z-20">
            <div
              className={
                isAnimating
                  ? "flex items-center gap-x-3 justify-center  transition-transform duration-300"
                  : "flex items-center gap-x-3 justify-center  "
              }
              style={{
                transform: `translateX(${translateX}px)`,
              }}
            >
              {swiper.map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "flex flex-col border-[1.5px] rounded-[20px]",
                    index !== 2 ? "border-[#878787]" : "border-[#393939]"
                  )}
                  style={{
                    height: index === 2 ? "124px" : "108px",
                  }}
                >
                  <Image
                    src={`/bg/${item.idx}.png`}
                    alt="배경"
                    width={200}
                    height={index === 2 ? 80 : 64}
                    className="object-cover cursor-pointer rounded-t-[20px]"
                    onClick={() => onClickSide(index)}
                    style={{
                      minWidth: "200px",
                      height: index === 2 ? "80px" : "64px",
                    }}
                  />

                  <p
                    className={clsx(
                      "bg-white font-normal size-4 h-[44px] text-center flex items-center justify-center w-full rounded-b-[20px] border-t-[1.5px] ",
                      index !== 2
                        ? "border-[#878787] text-[#878787]"
                        : "border-[#393939] text-[#393939]"
                    )}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Image
            src={`/bg/${swiper[2].idx}.png`}
            alt="배경"
            fill
            className="object-cover pt-[88px]"
          />
        </div>

        <div className="px-5 py-8 z-10 flex flex-col gap-y-4 items-center">
          <button
            className="w-full h-[52px] rounded-full border-[1.5px] border-[#393939] bg-[#DADCFF] font-pretendard text-base text-[#393939] font-semibold"
            onClick={() => onClickSignUp(swiper[2].idx)}
          >
            완료
          </button>
        </div>
      </ContentLayout>
    </GradientLayout>
  );
}

export default SingUpStep1;
