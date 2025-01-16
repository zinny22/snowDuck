"use client";

import { snowDuck } from "@/src/constants/snowDuck";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface Props {
  selectedDuck: number;
  setMessage: Dispatch<SetStateAction<string>>;
  setDuckName: Dispatch<SetStateAction<string>>;
}

const today = new Date();

function WriteSnowDuck({ selectedDuck, setMessage, setDuckName }: Props) {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");

  const bgColor = snowDuck.find((duck) => duck.id === selectedDuck)?.color;

  const onChangeMsg = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const _value = e.currentTarget.value;
    setValue(_value);
    setMessage(_value);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const _value = e.currentTarget.value;
    setName(_value);
    setDuckName(_value);
  };
  return (
    <div className="px-5 flex flex-col gap-y-3">
      <div className="border border-[#000000] rounded-[50px] px-6 py-[18px] bg-white flex items-center gap-x-1 relative">
        <Image
          src={`/duck/${selectedDuck}.svg`}
          alt=""
          width={56}
          height={56}
          className="absolute bottom-[38px]"
        />
        <p className="font-normal text-sm">눈오리</p>
        <input
          value={name}
          onChange={onChangeName}
          placeholder="이름을 써주세요"
          className="font-normal text-sm placeholder:text-[#999999] text-[#393939]"
        />
      </div>

      <div
        className={`border border-[#000000] rounded-[25px] px-7 py-12 `}
        style={{ background: bgColor }}
      >
        <textarea
          value={value}
          onChange={onChangeMsg}
          placeholder="여기에 편지를 작성해주세요"
          className="h-[300px] w-full bg-transparent font-normal text-[16px] placeholder:text-[#999999] text-[#393939]"
        />

        <p>
          {today.getFullYear().toString().slice(2, 4)}년 {today.getMonth() + 1}
          월 {today.getDate()}일
        </p>
      </div>
    </div>
  );
}

export default WriteSnowDuck;
