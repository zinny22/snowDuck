"use client";

import { useState } from "react";
import SignUpStep0 from "../templates/SignUp/SingUpStep0";
import SingUpStep1 from "../templates/SignUp/SingUpStep1";

function SignUpPage() {
  const [step, setStep] = useState(0);

  return (
    <>
      {step === 0 && <SignUpStep0 setStep={setStep} />}
      {step === 1 && <SingUpStep1 />}
    </>
  );
}

export default SignUpPage;
