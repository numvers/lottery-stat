import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserLottery from "../../../components/UserLottery";
import { api } from "../../../utils/api";

export default function List() {
  const router = useRouter();
  const query = api.lottery.findLottery.useQuery();

  // 스크롤 상태 state
  const [isScroll, setIsScroll] = useState(false);

  // top 버튼(페이지 상단으로 이동)
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  // 뒤로가기
  const handleClick = () => {
    router.back();
  };

  // 스크롤 감지
  useEffect(() => {
    const onScroll = () => {
      if (win.scrollY > 10) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    const win: Window = window;
    win.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <main className="pb-20 sm:w-screen  md:w-[22.5rem]">
        <div className="mb-[0.63rem] flex h-[3.75rem] items-center  pl-4">
          <Image
            src="/img/icon_left_arrow.svg"
            alt="img"
            width={10}
            height={20}
            className=" cursor-pointer"
            onClick={handleClick}
          />
        </div>
        <div className="relative px-[1.25rem]">
          <h1 className="mb-[1.25rem] flex items-center justify-between text-[1.375rem] font-semibold">
            실시간 우주 생성 번호
          </h1>
          {query.data?.map((v, i) => (
            <UserLottery
              key={i}
              numbers={[v.first, v.second, v.third, v.forth, v.fifth, v.sixth]}
              bonus={false}
              menu={v.type}
              created_at={v.createdAt}
              nickname={v.nickname}
            ></UserLottery>
          ))}
          {isScroll && (
            <button
              className="sticky bottom-20 z-50 float-right
             h-[4.75rem] w-[4.75rem] rounded-full bg-white font-semibold text-gray_4 shadow-[0_4px_10px_0_rgba(0,0,0,0.25)]"
              onClick={scrollToTop}
            >
              <Image
                src="/img/icon_top_arrow_black.svg"
                alt="img"
                width={12}
                height={21}
                className="m-auto pb-[0.44rem]"
              />
              TOP
            </button>
          )}
        </div>
      </main>
    </>
  );
}
