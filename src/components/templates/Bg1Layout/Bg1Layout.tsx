import Image from "next/image";
import SnowDuckWithBubble from "../../atoms/SnowDuckWithBubble/SnowDuckWithBubble";
import { useEffect, useState } from "react";
import { Message } from "@/src/schema/message.schema";
import axios from "axios";
import { useParams } from "next/navigation";
import { snowDuck } from "@/src/constants/snowDuck";
import { useModal } from "@/src/contexts/Modal.context/Modal.Context";
import MsgModal from "../../mocules/MsgModal";

function Bg1Layout() {
  const params = useParams();
  const { open } = useModal();

  const itemsPerPage = 18;

  const [messageList, setMessageList] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = messageList?.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(messageList.length / itemsPerPage); // 전체 페이지 수

  const initUserData = async () => {
    try {
      const _messageList = await axios.get(`/api/messages/user/${params.id}`);
      setMessageList(_messageList?.data?.response);
    } catch (err) {
      console.log(err);
    }
  };

  const calculatePosition = (idx: number) => {
    if (idx >= 0 && idx < 4) {
      return {
        top: "26%",
        left: `${20 + idx * 14}%`,
      };
    } else if (idx >= 4 && idx < 9) {
      return {
        top: "36%",
        left: `${14 + (idx - 4) * 14}%`,
      };
    } else if (idx >= 9 && idx < 12) {
      return {
        top: "62%",
        left: `${30 + (idx - 9) * 14}%`,
      };
    } else {
      return {
        bottom: "0",
        left: `${20 + (idx - 12) * 10}%`,
      };
    }
  };

  useEffect(() => {
    initUserData();
  }, []);

  return (
    <div className="h-[78%] relative">
      {currentPage > 1 && (
        <button
          className="absolute left-3 w-8 h-8 rounded-full border border-[#000000] bg-[#DADCFF] top-[50%] flex items-center justify-center"
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <Image
            src="/svgs/chevron.svg"
            alt="왼쪽"
            width={16}
            height={16}
            className="rotate-180"
          />
        </button>
      )}

      {currentData?.map((msg, idx) => {
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
              bottom: calculatePosition(idx).bottom,
              zIndex: idx,
            }}
            onClick={() => open(<MsgModal msg={msg} />)}
          >
            <div className="relative">
              <SnowDuckWithBubble
                label={msg.message_text}
                color={bgColor?.includes("li") ? "white" : (bgColor as string)}
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

      {currentPage < totalPages && (
        <button
          className="absolute right-3 w-8 h-8 rounded-full border border-[#000000] bg-[#DADCFF] top-[50%] flex items-center justify-center"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <Image src="/svgs/chevron.svg" alt="오른쪽" width={16} height={16} />
        </button>
      )}
    </div>
  );
}

export default Bg1Layout;
