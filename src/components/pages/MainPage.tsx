"use client";

import axios from "axios";
import GradientLayout from "../templates/GradientLayout/GradientLayout";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

function MainPage() {
  const params = useParams();

  const initUserData = async () => {
    const response = await axios.get(`/api/users/${params.id}`);
    console.log(response);
  };

  useEffect(() => {
    initUserData();
  }, []);

  return (
    <GradientLayout>
      <div>홈화면?</div>
    </GradientLayout>
  );
}

export default MainPage;
