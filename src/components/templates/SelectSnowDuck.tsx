"use client";

import { snowDuck } from "@/src/constants/snowDuck";
import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import SnowDuckWithBubble from "../atoms/SnowDuckWithBubble/SnowDuckWithBubble";

interface Props {
  bgId: string;
  setSelectedDuck: Dispatch<SetStateAction<number>>;
}
function SelectSnowDuck({ bgId, setSelectedDuck }: Props) {
  const [selectedId, setSelectedId] = useState(1);

  const bgColor = snowDuck.find((duck) => duck.id === selectedId)?.color;

  const onClickDuck = (id: number) => {
    setSelectedId(id);
    setSelectedDuck(id);
  };

  return (
    <div className="px-5 flex flex-col gap-y-8">
      <div className="w-full h-[200px] relative">
        <div className="overflow-hidden w-full h-[200px] rounded-[20px]">
          <Image
            src={`/bg/${bgId}.png`}
            alt="미리보기"
            fill
            className="object-cover w-full h-[200px] border border-[#000000] rounded-[20px]"
            style={{ objectPosition: "0% 44.2%" }}
          />

          <div className="absolute top-16 left-[50%] transform -translate-x-1/2">
            <div className="relative">
              <SnowDuckWithBubble
                label="나는눈오리"
                color={bgColor?.includes("li") ? "white" : (bgColor as string)}
              />
              <Image
                src={`/duck/${selectedId}.svg`}
                alt=""
                width={56}
                height={56}
                className="relative z-10"
              />
            </div>
          </div>
        </div>

        <div className="absolute w-16 h-6 border border-[#000000] rounded-[50px] bg-[#DADCFF] text-xs font-normal flex items-center justify-center -top-3 left-3">
          미리보기
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-[34px] gap-y-4">
        {snowDuck.map((duck) => (
          <button
            key={duck.id}
            className={clsx(
              "border-[#000000] p-[14px] rounded-xl flex justify-center",
              selectedId === duck.id ? "border-[2px]" : "border"
            )}
            style={{
              background:
                selectedId === duck.id
                  ? duck.color === ""
                    ? `linear-gradient(180deg, #DDDEF3 0%, #ECE7ED 100%)`
                    : duck.color
                  : "white",
            }}
            onClick={() => onClickDuck(duck.id)}
          >
            <Image src={`/duck/${duck.id}.svg`} alt="" width={56} height={56} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectSnowDuck;
