import { User } from "@/src/schema/user.schema";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface Props {
  userInfo: User | undefined;
}
function HomeButton({ userInfo }: Props) {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    if (userInfo?.isMe) {
      return console.log("링크 복사");
    }
    router.replace(`/main/${params.id}/write?bg=${userInfo?.bg_id}`);
  };
  return (
    <button className="pb-8 items-center flex justify-center" onClick={onClick}>
      <Image
        src={`/svgs/${
          userInfo?.isMe ? "showSnowDuckButton" : "makingSnowDuckButton"
        }.svg`}
        alt="닉네임"
        width={216}
        height={78}
      />
    </button>
  );
}

export default HomeButton;
