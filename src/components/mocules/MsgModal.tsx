// Modal.js
import { useModal } from "@/src/contexts/Modal.context/Modal.Context";
import React from "react";

function MsgModal() {
  const { close } = useModal();

  return (
    <div className="absolute  bg-white top-[50%] z-50">
      <h2>모달 제목</h2>
      <p>이것은 Context API로 만든 모달입니다!</p>
      <button onClick={close}>닫기</button>
    </div>
  );
}

export default MsgModal;
