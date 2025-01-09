"use client";

import axios from "axios";
import GradientLayout from "../templates/GradientLayout/GradientLayout";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/src/schema/user.schema";
import { Message } from "@/src/schema/message.schema";
import SnowDuckWithBubble from "../atoms/SnowDuckWithBubble/SnowDuckWithBubble";
import { snowDuck } from "@/src/constants/snowDuck";

function MainPage() {
  const router = useRouter();
  const params = useParams();

  const [userInfo, setUserInfo] = useState<User>({ bg_id: 1 });
  const [messageList, setMessageList] = useState<Message[]>([]);

  const initUserData = async () => {
    try {
      const _userInfo = await axios.get(`/api/users/${params.id}`);
      const _messageList = await axios.get(`/api/messages/user/${params.id}`);
      setUserInfo(_userInfo?.data?.response);
      setMessageList(_messageList?.data?.response);
    } catch (err) {
      console.log(err);
    }
  };

  const calculatePosition = (idx: number) => {
    if (idx >= 0 && idx < 4) {
      return {
        top: "30%",
        left: `${20 + idx * 14}%`,
      };
    } else if (idx >= 4 && idx < 9) {
      return {
        top: "38%",
        left: `${14 + (idx - 4) * 14}%`,
      };
    } else if (idx >= 9 && idx < 12) {
      return {
        top: "58%",
        left: `${30 + (idx - 9) * 14}%`,
      };
    } else {
      return {
        top: "79%",
        left: `${20 + (idx - 12) * 10}%`,
      };
    }
  };

  useEffect(() => {
    initUserData();
  }, []);

  return (
    <GradientLayout>
      <Image
        src={`/bg/${userInfo?.bg_id}.png`}
        alt="배경"
        fill
        className="object-cover"
      />

      <section className="absolute top-0 bottom-0 right-0 left-0">
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center gap-x-3 p-5">
            <div className="h-12 bg-white border border-[#2F2F2F] text-center w-full rounded-xl flex items-center px-4">
              <Image
                src="/svgs/location.svg"
                alt="닉네임"
                height={20}
                width={20}
              />

              <p className="font-normal text-lg">
                {userInfo?.nick_name}님의{" "}
                {userInfo?.bg_id === 1
                  ? "담벼락"
                  : userInfo?.bg_id === 2
                  ? "지붕"
                  : "눈 앞 벤치"}
              </p>
            </div>

            {!userInfo?.isMe && (
              <button className="bg-[#DADCFF] h-12 w-12 border border-[#2F2F2F] flex items-center justify-center rounded-xl">
                <Image
                  src="/svgs/home.svg"
                  alt="닉네임"
                  height={20}
                  width={20}
                />
              </button>
            )}
          </div>

          <div className="h-[80%]">
            {messageList?.map((msg, idx) => {
              const bgColor = snowDuck.find(
                (duck) => duck.id === Number(msg.duck_id)!
              )?.color;

              return (
                <button
                  key={msg.id}
                  className="absolute"
                  style={{
                    top: calculatePosition(idx).top,
                    left: calculatePosition(idx).left,
                    zIndex: idx,
                  }}
                  onClick={() => console.log(123)}
                >
                  <div className="relative">
                    <SnowDuckWithBubble
                      label={msg.message_text}
                      color={
                        bgColor?.includes("li") ? "white" : (bgColor as string)
                      }
                    />
                    <Image
                      src={`/duck/${msg.duck_id}.svg`}
                      alt=""
                      width={56}
                      height={56}
                      className="relative z-10"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <button
            className="pb-8 items-center flex justify-center"
            onClick={() =>
              router.replace(`/main/${params.id}/write?bg=${userInfo?.bg_id}`)
            }
          >
            <Image
              src={`/svgs/${
                userInfo?.isMe ? "showSnowDuckButton" : "makingSnowDuckButton"
              }.svg`}
              alt="닉네임"
              width={216}
              height={78}
            />
          </button>
        </div>
      </section>
    </GradientLayout>
  );
}

export default MainPage;
