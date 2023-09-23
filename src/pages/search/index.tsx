import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LotteryNumberBall from "~/components/LotteryNumberBall";
import NumberBoard from "~/components/NumberBoard";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";
import { formatDate, formatMoney, getEraseFourDigits } from "~/module/Util";

interface LotteryResult {
  round: number;
  date: string;
  numbers: number[];
  wins: {
    num_winners: number;
    prize: number;
  }[];
}

export default function Home({ allData }: { allData: LotteryResult[] }) {
  const router = useRouter();

  // 로또 조회
  const [searchKeyword, setSearchKeyword] = useState("");
  // 회차선택 클릭 상태 state
  const [isRoundClick, setIsRoundClick] = useState(false);
  // 스크롤 상태 state
  const [isScroll, setIsScroll] = useState(false);
  // 다중선택 클릭 상태 state
  const [isMultiCheck, setIsMultiCheck] = useState(false);

  // Infinite scroll
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  // const [items, setItems] = useState(10);
  // const [data, setData] = useState(allData?.slice(itemIndex, items));

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

  // 로또 조회 핸들러
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  // 회차선택 클릭 상태 핸들러
  const roundClickHandler = () => {
    if (isRoundClick) {
      setIsRoundClick(false);
    } else {
      setIsRoundClick(true);
    }
  };

  // 회차선택 핸들러
  const roundHandler = async (e: React.MouseEvent<HTMLElement>) => {
    const value = (e.target as HTMLButtonElement).value;

    const response = await fetch(
      `http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries/${value}`,
    );
    const result = (await response.json()) as LotteryResult;

    // setItemIndex()

    // const newData = [result, ...data];
    // setData(newData);
    setIsRoundClick(false);
  };

  // 다중선택 핸들러
  const multiCheckHandler = () => {
    if (isMultiCheck) {
      setIsMultiCheck(false);
    } else {
      setIsMultiCheck(true);
    }
  };

  // Infinite scroll
  const testFetch = (delay = 0) => new Promise((res) => setTimeout(res, delay));

  const getMoreItem = async () => {
    setIsLoaded(true);
    await testFetch();
    setItemIndex(itemIndex + 10);
    // setItems(items + 10);
    // setData([...data, ...allData?.slice(items, items + 10)]);
    setIsLoaded(false);
  };

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer,
  ) => {
    if (entry?.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
    return;
  };

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: "10px",
    threshold: 0.1,
    onIntersect,
  });

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
          {/* 검색창 */}
          <div className="relative mb-10">
            <input
              type="text"
              className="mb-4 w-full rounded-[1.25rem] border-2 border-solid border-gray_4 bg-gray_4 p-5 text-sm font-regular text-white placeholder:text-white focus:border-point focus:outline-none"
              value={searchKeyword}
              placeholder="추첨공 번호 조회하기 (ex. 3-28-33)"
              onChange={searchHandler}
            />
            <Image
              src="/img/icon_search.svg"
              alt="img"
              width={20}
              height={20}
              className="absolute right-5 top-6 cursor-pointer"
            />
            <div className="flex items-center justify-between text-sm">
              <button
                className={`rounded-[1.25rem]  py-3 pl-5 pr-4 ${
                  isMultiCheck ? "bg-point" : "bg-gray_4"
                }`}
                onClick={multiCheckHandler}
              >
                번호 선택
                <Image
                  src="/img/icon_bottom_arrow.svg"
                  alt="img"
                  width={14}
                  height={14}
                  className="float-right ml-2"
                />
              </button>
              <div className="flex items-center ">
                <input
                  type="checkbox"
                  id="bonus_num_check"
                  className="mr-2 h-[1.125rem] w-[1.125rem] accent-point"
                />
                <label htmlFor="bonus_num_check" className="">
                  보너스 번호 제외
                </label>
              </div>
            </div>
            {isMultiCheck && (
              <div className="absolute z-40 mt-[0.63rem] ">
                {/* <NumberBoard
                  // setData={setData}
                  setIsMultiCheck={setIsMultiCheck}
                /> */}
              </div>
            )}
          </div>
          {/* 회차 */}
          <div className="mb-[1.87rem] flex items-center justify-between">
            <h1 className="text-xl font-semibold">전체 회차</h1>
            <div className="relative grid place-items-center">
              <button
                className="rounded-[1.56rem] bg-gray_4 py-3 pl-5 pr-3"
                onClick={roundClickHandler}
              >
                회차 선택
                <Image
                  src="/img/icon_bottom_arrow.svg"
                  alt="img"
                  width={14}
                  height={14}
                  className="float-right ml-2"
                />
              </button>
              {isRoundClick && (
                <ul className="absolute top-[2.4rem] z-20 mt-2 h-[7.75rem] overflow-y-scroll rounded-[0.63rem] bg-gray_4 px-[1.69rem] scrollbar-hide">
                  {allData?.map((item, idx) => {
                    return (
                      <button
                        value={item.round}
                        key={idx}
                        className="cursor-pointer py-[0.88rem] text-center"
                        onClick={roundHandler}
                      >
                        {getEraseFourDigits(item.round)}회
                      </button>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          {allData
            ?.filter((_, index) => index >= itemIndex)
            .map((item, idx) => {
              return (
                <div
                  className="relative mb-[0.38rem] overflow-hidden rounded-[1.25rem] bg-white p-5 text-black"
                  key={idx}
                >
                  {isMultiCheck && (
                    <div className="absolute left-0 top-0 z-[11] h-full bg-black/[.5] sm:w-full md:w-full" />
                  )}
                  <h1 className="mb-[1.56rem] flex items-center text-lg font-semibold text-point">
                    {getEraseFourDigits(item.round)}회
                    <Image
                      src="/img/icon_right_arrow_point.svg"
                      alt="img"
                      width={8}
                      height={8}
                      className="ml-2"
                    />
                    <span className="ml-auto text-sm font-medium text-gray_3">
                      {formatDate(item.date)} 추첨
                    </span>
                  </h1>
                  <LotteryNumberBall numbers={item.numbers} bonus={true} />
                  <div className="mt-[1.06rem] rounded-[0.63rem] bg-gray_1 py-3 text-center">
                    1등 총상금({item.wins[0]?.num_winners}명/
                    {formatMoney(
                      item.wins[0]?.prize
                        ? item.wins[0]?.prize / item.wins[0]?.num_winners
                        : 0,
                    )}
                    )&nbsp;
                    <span className="text-md font-bold">
                      {formatMoney(item.wins[0]?.prize ?? 0)}
                    </span>
                  </div>
                </div>
              );
            })}
          <div ref={setTarget} />
          {isScroll && (
            <button
              className=" sticky bottom-20 z-50 float-right
             h-[4.75rem] w-[4.75rem] font-semibold rounded-full bg-gray_4 shadow-[0_4px_10px_0_rgba(0,0,0,0.25)]"
              onClick={scrollToTop}
            >
              <Image
                src="/img/icon_top_arrow_white.svg"
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

export async function getServerSideProps() {
  // 전체 당첨번호 조회
  const allResponse = await fetch(
    "http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries",
  );

  const allData = (await allResponse.json()) as LotteryResult;
  return {
    props: {
      allData,
    },
  };
}
