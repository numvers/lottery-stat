import Image from "next/image";
import { useEffect, useState } from "react";
import LotteryNumberBall from "~/components/LotteryNumberBall";
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
  // 로또 조회
  const [searchKeyword, setSearchKeyword] = useState("");
  // 회차선택 클릭 상태 state
  const [isRoundClick, setIsRoundClick] = useState(false);

  // Infinite scroll
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [items, setItems] = useState(10);
  // state 없이 구현하는것 고민해보기
  const [data, setData] = useState(allData?.slice(itemIndex, items));

  // 로또 조회 핸들러
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  // top 버튼(페이지 상단으로 이동)
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  // 회차선택 핸들러
  const roundHandler = async (e: React.MouseEvent<HTMLElement>) => {
    const value = (e.target as HTMLButtonElement).value;

    // setData([]);
    const response = await fetch(
      `http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries/${value}`,
    );
    const result = (await response.json()) as LotteryResult;
    setData([result]);
    setIsRoundClick(false);
  };

  // 회차선택 클릭 상태 핸들러
  const roundClickHandler = () => {
    if (isRoundClick) {
      setIsRoundClick(false);
    } else {
      setIsRoundClick(true);
    }
  };

  // Infinite scroll
  const testFetch = (delay = 0) => new Promise((res) => setTimeout(res, delay));

  const getMoreItem = async () => {
    setIsLoaded(true);
    await testFetch();
    setItemIndex(items);
    setItems(items + 10);
    setData([...data, ...allData?.slice(items, items + 10)]);
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
          />
        </div>
        <div className="relative px-[1.25rem]">
          {/* 검색창 */}
          <div className="relative mb-10">
            <input
              type="text"
              className="mb-4 w-full rounded-[1.25rem] border-2 border-solid border-gray_4 bg-gray_4 p-5 text-md font-regular text-white placeholder:text-white focus:border-point focus:outline-none"
              value={searchKeyword}
              placeholder="조회 번호를 검색해보세요!"
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
              <button className="rounded-[1.25rem] bg-gray_4 py-3 pl-5 pr-4">
                다중선택
                <Image
                  src="/img/icon_bottom_arrow.svg"
                  alt="img"
                  width={14}
                  height={14}
                  className="float-right ml-2"
                />
              </button>
              <div className="flex items-center">
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
          </div>
          {/* 회차 */}
          <div className="mb-[1.87rem] flex items-center justify-between">
            <h1 className="text-xl font-semibold">전체 회차</h1>
            <div className="relative grid place-items-center">
              <button
                className="rounded-[1.56rem] bg-gray_4 py-3 pl-5 pr-3"
                onClick={roundClickHandler}
              >
                회차선택
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
          {data?.map((item, idx) => {
            return (
              <div
                className="mb-[0.38rem] rounded-[1.25rem] bg-white p-5 text-black"
                key={idx}
              >
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
                <LotteryNumberBall numbers={item.numbers} />
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
          <button
            className="fixed bottom-20 z-50 h-[4.75rem]  w-[4.75rem] rounded-full bg-gray_4 sm:fixed"
            onClick={scrollToTop}
          >
            TOP
          </button>
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
  // 회차별 당첨번호 조회 (ex 999회 /lotteries/999)
  // const response = await fetch("http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries/999");

  const allData = (await allResponse.json()) as LotteryResult;
  return {
    props: { allData },
  };
}

// 당첨번호 검색 4를 포함하는 경우
// const response = await fetch("http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries?include=4");
// 당첨번호 검색 5, 10을 포함하는 경우
// const response = await fetch("http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries?include=5&include=10");
// 당첨번호 검색을 하지 않고 전체 번호를 조회하는 경우 (기존이랑 같음)
// const response = await fetch("http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries");
