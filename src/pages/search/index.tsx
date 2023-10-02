import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import superjson from "superjson";
import LotteryDetailModal from "~/components/LotteryDetailModal";
import LotteryNumberBall from "~/components/LotteryNumberBall";
import NumberBoard from "~/components/NumberBoard";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";
import { formatDate, formatMoney, getEraseFourDigits } from "~/module/Util";
import { appRouter } from "../../server/api/root";
import { db } from "../../server/db";
import { type SelectNumber } from "../../server/db/schema";

interface LotteryResult {
  round: number;
  date: string;
  numbers: number[];
  wins: {
    num_winners: number;
    prize: number;
  }[];
}

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();

  // 로또 조회
  const [searchKeyword, setSearchKeyword] = useState("");
  // 회차선택 클릭 상태 state
  const [isRoundClick, setIsRoundClick] = useState(false);
  // 스크롤 상태 state
  const [isScroll, setIsScroll] = useState(false);
  // 번호선택 클릭 상태 state
  const [isMultiCheck, setIsMultiCheck] = useState(false);
  // 보너스 번호 제외 상태 state
  const [isBonus, setIsBonus] = useState(false);
  // 번호 선택 후 받는 배열값
  const [data, setData] = useState<LotteryResult[]>(props.allData);
  const [checkNum, setCheckNum] = useState<(number | boolean)[]>([]);
  // Infinite scroll
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  // 상세정보 모달창
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [lottoDetailList, setLottoDetailList] = useState<LotteryResult[]>([]);

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

  // 로또번호 상세 모달창 열기
  const openLottoDetailModal = (event: React.MouseEvent<HTMLElement>) => {
    const value = Number((event.target as HTMLButtonElement).value);

    // allData와 data를 합친 새로운 배열을 생성
    const combinedData =
      props.allData.length > 0 ? [...props.allData] : [...data];

    // value 위치의 데이터를 가져와서 배열 형태로 설정
    const selectedData = combinedData[value];

    if (selectedData) {
      setLottoDetailList([selectedData]); // 배열 형태로 설정
      setIsDetailModal(true);
    }
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
  const roundHandler = (e: React.MouseEvent<HTMLElement>) => {
    const value = (e.target as HTMLButtonElement).value;
    setItemIndex(props.allData.length - Number(value));
    setIsRoundClick(false);
  };

  // 번호선택 핸들러
  const multiCheckHandler = () => {
    if (isMultiCheck) {
      setIsMultiCheck(false);
    } else {
      setIsMultiCheck(true);
    }
  };

  // 번호 검색으로 로또 정보 얻기 핸들러
  const getDetailData = () => {
    // searchKeyword -> number[]
    try {
      // <- - >...
      const searchNums = searchKeyword
        .split(/[\s,-]+/)
        .map((term) => Number(term))
        .filter((num) => num && num > 0);

      const newData = props.allData.filter((data) =>
        searchNums.every((s) => data.numbers.includes(s)),
      );
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  // Infinite scroll
  const testFetch = (delay = 0) => new Promise((res) => setTimeout(res, delay));

  const getMoreItem = async () => {
    setIsLoaded(true);
    await testFetch();
    setItemIndex(itemIndex + 10);
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
      if (window.scrollY > 10) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 모달창 띄우기
  useEffect(() => {
    setPortalElement(document.getElementById("portal"));
  }, [isDetailModal]);

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
              src={`${
                searchKeyword.length > 0
                  ? "/img/icon_search.svg"
                  : "/img/icon_search_trans.svg"
              }`}
              alt="img"
              width={20}
              height={20}
              className="absolute right-5 top-5 cursor-pointer"
              onClick={getDetailData}
            />
            <div className="mb-4 flex items-center justify-between text-sm">
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
                  className="mr-2 h-[1.125rem] w-[1.125rem] cursor-pointer accent-point"
                  onChange={() =>
                    isBonus ? setIsBonus(false) : setIsBonus(true)
                  }
                />
                <label htmlFor="bonus_num_check" className="cursor-pointer">
                  보너스 번호 제외
                </label>
              </div>
            </div>
            {isMultiCheck && (
              <div className="absolute z-[99] mt-[0.63rem] ">
                <NumberBoard
                  checkNum={checkNum}
                  setCheckNum={setCheckNum}
                  setData={setData}
                  setIsMultiCheck={setIsMultiCheck}
                  allData={props.allData}
                />
              </div>
            )}
            {checkNum.length > 0 && (
              <>
                {checkNum.map((item, idx) => {
                  return (
                    <button
                      key={idx}
                      value={String(item)}
                      className=" mr-[0.37rem]  inline-block cursor-pointer rounded-[0.63rem] bg-point/[.6] px-[0.62rem] py-[0.38rem] text-sm text-white"
                      onClick={() =>
                        setCheckNum(checkNum.filter((num) => num !== item))
                      }
                    >
                      {item}
                      <Image
                        src="/img/icon_clear_white.svg"
                        alt="img"
                        width={12}
                        height={12}
                        className="float-right ml-[0.5rem]"
                      />
                    </button>
                  );
                })}
              </>
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
                <ul className="absolute top-[2.4rem] z-[99] mt-2 h-[7.75rem] overflow-y-scroll rounded-[0.63rem] bg-gray_4 px-[1.69rem] scrollbar-hide">
                  {props.allData?.map((item, idx) => {
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
          {(data.length === 0 ? props.allData : data)
            .filter((_, index) => index >= itemIndex)
            .map((item, idx) => {
              return (
                <div
                  className="relative mb-[0.38rem] overflow-hidden rounded-[1.25rem] bg-white p-5 text-black"
                  key={idx}
                >
                  <button
                    className="absolute left-0 top-0 z-50 h-[100%] w-[100%] cursor-pointer"
                    onClick={openLottoDetailModal}
                    value={idx}
                  />
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
                  <LotteryNumberBall
                    numbers={item.numbers}
                    bonus={isBonus}
                    checkNum={checkNum}
                  />
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
              className="sticky bottom-20 z-50 float-right h-[4.75rem] w-[4.75rem] rounded-full bg-gray_4 font-semibold shadow-[0_4px_10px_0_rgba(0,0,0,0.25)]"
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
      {isDetailModal && portalElement
        ? createPortal(
            <LotteryDetailModal
              data={lottoDetailList}
              onClose={() => {
                setIsDetailModal(false);
              }}
            />,
            portalElement,
          )
        : null}
    </>
  );
}

export async function getServerSideProps(props: GetServerSidePropsContext) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { session: null, db: db },
    transformer: superjson,
  });

  const allData = await helpers.lottery.findAllNumbers
    .fetch()
    .then((res) => res.map((v) => fromSelectNumber(v)));

  props.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=3600",
  );
  // 전체 당첨번호 조회

  return {
    props: {
      trpcState: helpers.dehydrate(),
      allData,
    },
  };
}

function fromSelectNumber(num: SelectNumber): LotteryResult {
  return {
    round: num.round,
    date: num.pickedDate,
    wins: [
      {
        num_winners: num.numFirstWinners,
        prize: Number(num.firstPrize),
      },
      {
        num_winners: num.numSecondWinners,
        prize: Number(num.secondPrize),
      },
      {
        num_winners: num.numThirdWinners,
        prize: Number(num.thirdPrize),
      },
      {
        num_winners: num.numForthWinners,
        prize: Number(num.forthPrize),
      },
      {
        num_winners: num.numFifthWinners,
        prize: Number(num.fifthPrize),
      },
    ],
    numbers: [
      num.first,
      num.second,
      num.third,
      num.forth,
      num.fifth,
      num.sixth,
      num.bonus,
    ],
  };
}
