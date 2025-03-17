// Modal.js
import { snowDuck } from "@/src/constants/snowDuck";
import { useModal } from "@/src/contexts/Modal.context/Modal.Context";
import { Message } from "@/src/schema/message.schema";
import Image from "next/image";
import React from "react";

interface Props {
  msg: Message;
}
function MsgModal({ msg }: Props) {
  const { close } = useModal();

  const bgColor = snowDuck.find(
    (duck) => duck.id === Number(msg.duck_id)!
  )?.color;

  return (
    <div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50" />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[51] max-w-[420px] min-w-[320px] w-full px-5">
        <div className="flex flex-col gap-y-3 ">
          <div className="relative rounded-[50px] border border-black px-6 py-[18px] bg-white">
            <div>
              <Image
                src={`/duck/${msg.duck_id}.svg`}
                alt=""
                width={56}
                height={56}
                className="absolute -top-[44px]"
              />
            </div>
            <p className="font-leeSeoyun">{msg.duck_name}로 부터온 편지</p>
          </div>

          <div
            className="border border-black rounded-[50px] px-6 min-h-[442px] pt-[48px]"
            style={{
              background: bgColor,
            }}
          >
            <div className="h-[300px]">
              <p>{msg.message_text}</p>
            </div>

            <p className="pt-8">{msg.created_at?.toString()}</p>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="h-[50px] bg-[#282828] w-[150px] text-white font-leeSeoyun border border-black rounded-[50px]"
              onClick={close}
            >
              닫기
            </button>

            <div className="flex items-center gap-x-5">
              <button className="bg-white border border-black rounded-full p-3">
                <Image
                  src="/svgs/chevron.svg"
                  alt="왼쪽"
                  width={16}
                  height={16}
                  className="rotate-180"
                />
              </button>
              <button className="bg-white border border-black rounded-full p-3">
                <Image
                  src="/svgs/chevron.svg"
                  alt="오른쪽"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MsgModal;
