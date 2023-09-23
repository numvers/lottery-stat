import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LotteryNumberBallSmall from "~/components/LotteryNumberBallSmall";

export default function List() {
  const router = useRouter();

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
          <div className="mb-[0.37rem] rounded-[1.25rem] bg-gradient-to-r from-[#4B2EFD] to-[#C623FF] p-[0.1rem]">
            <div className="flex items-center justify-between rounded-[1.25rem] bg-gray_4 px-[1.25rem] py-[0.87rem]">
              <div>
                <h2 className="font-semibold">능이버섯</h2>
                <span className="text-xs">23.09.12</span>
              </div>
              <LotteryNumberBallSmall
                numbers={[1, 2, 3, 4, 5, 6, 7]}
                bonus={false}
              />
            </div>
          </div>
          <div className="mb-[0.37rem] rounded-[1.25rem] p-[0.1rem]">
            <div className="flex items-center justify-between rounded-[1.25rem] bg-gray_4 px-[1.25rem] py-[0.87rem]">
              <div>
                <h2 className="font-semibold">능이버섯</h2>
                <span className="text-xs">23.09.12</span>
              </div>
              <LotteryNumberBallSmall
                numbers={[1, 2, 3, 4, 5, 6, 7]}
                bonus={false}
              />
            </div>
          </div>
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
