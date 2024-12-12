"use client";

import { useState } from "react";
import SignUpStep0 from "../templates/SignUp/SingUpStep0";
import SingUpStep1 from "../templates/SignUp/SingUpStep1";
import axios from "axios";
import { useRouter } from "next/navigation";

function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [request, setRequest] = useState({ nickname: "", bgId: 0 });

  const onClickNext = (nickname: string) => {
    setRequest((prev) => ({ ...prev, nickname }));
    setStep(1);
  };

  const onClickSignUp = async (bgId: number) => {
    try {
      await axios.post(
        "/api/auth",
        JSON.stringify({ nickname: request.nickname, bgId })
      );
      router.replace("/main");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {step === 0 && <SignUpStep0 onClickNext={onClickNext} />}
      {step === 1 && <SingUpStep1 onClickSignUp={onClickSignUp} />}
    </>
  );
}

export default SignUpPage;
