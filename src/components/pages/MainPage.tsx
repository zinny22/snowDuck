"use client";

import axios from "axios";
import GradientLayout from "../templates/GradientLayout/GradientLayout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/src/schema/user.schema";
import HomeButton from "../atoms/HomeButton/HomeButton";
import Bg1Layout from "../templates/Bg1Layout/Bg1Layout";

function MainPage() {
  const params = useParams();

  const [userInfo, setUserInfo] = useState<User>();

  const initUserData = async () => {
    try {
      const _userInfo = await axios.get(`/api/users/${params.id}`);
      setUserInfo(_userInfo?.data?.response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initUserData();
  }, []);

  return (
    <GradientLayout>
      <Image
        src={`/bg/${userInfo?.bg_id || 1}.png`}
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

          {userInfo?.bg_id === 1 && <Bg1Layout />}

          <HomeButton userInfo={userInfo} />
        </div>
      </section>
    </GradientLayout>
  );
}

export default MainPage;
