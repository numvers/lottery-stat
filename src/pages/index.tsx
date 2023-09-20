import Image from "next/image";
import { useState } from "react";
import LotteryNumberBall from "~/components/LotteryNumberBall";
import {
  calculateTimeRemaining,
  formatDate,
  formatMoney,
  getEraseFourDigits,
} from "../module/Util";

interface LotteryResult {
  round: number;
  date: string;
  numbers: number[];
  wins: {
    num_winners: number;
    prize: number;
  }[];
}
export default function Home({
  allData,
  recentData,
}: {
  allData: LotteryResult[];
  recentData: LotteryResult;
}) {
  // 등수별 당첨금액/닫기 버튼 상태 state
  const [isCardClick, setIsCardClick] = useState(false);
  // 등수별 당첨금액/닫기 버튼 핸들러
  const cardClickHandler = () => {
    if (isCardClick) {
      setIsCardClick(false);
    } else {
      setIsCardClick(true);
    }
  };
  return (
    <>
      <main className="sm:w-screen md:w-[22.5rem] ">
        <div className="h-[3.75rem] bg-red">Logo</div>
        <div className="px-[1.25rem]">
          {/* 메인 상단 박스 */}
          <div className="mb-[2.5rem]  text-center">
            {/* 오늘부터 복권당첨일까지 남은 시간 */}
            <h3 className="flex items-center justify-center py-[1.25rem] text-base">
              <Image
                src="/img/icon_clock.svg"
                alt="img"
                width={18}
                height={18}
                className="float-left mr-[0.625rem]"
              />
              {calculateTimeRemaining()}
            </h3>
            {isCardClick ? (
              <RecentLotteryListCardComponent allData={allData} />
            ) : (
              // 최근 당첨결과 카드 컴포넌트
              <RecentLotteryCardComponent recentData={recentData} />
            )}
            {/* 등수별 당첨금액 / 닫기 버튼 */}
            <div className="mt-[0.625rem] flex items-center justify-center text-sm text-gray_2">
              <span className="cursor-pointer" onClick={cardClickHandler}>
                {isCardClick ? "닫기" : "등수별 당첨금액"}
              </span>
              <Image
                src="/img/icon_clear.svg"
                alt="img"
                width={18}
                height={18}
                className="ml-[0.5rem] cursor-pointer"
                onClick={cardClickHandler}
              />
            </div>
          </div>
          {/* 메인 하단 커뮤니티 카드 컴포넌트 */}
          <CommunityCardComponent />
        </div>
      </main>
    </>
  );
}

// 최근 당첨결과 카드 컴포넌트
export function RecentLotteryCardComponent({
  recentData,
}: {
  recentData: LotteryResult;
}) {
  return (
    <>
      <div className="relative h-[13.75rem] rounded-[1.25rem] bg-white py-[1.875rem] text-black">
        <h2 className="mb-[0.625rem] text-sm text-gray_3">
          {formatDate(recentData.date)} 추첨
        </h2>
        <div className="mb-[1.25rem] flex  items-center justify-center text-xl font-bold">
          <h2 className="cursor-pointer">
            {getEraseFourDigits(recentData.round)}회 당첨결과
          </h2>
          <Image
            src="/img/icon_right_arrow.svg"
            alt="img"
            width={6.6}
            height={11.5}
            className="ml-[1rem] cursor-pointer"
          />
        </div>
        <LotteryNumberBall numbers={recentData.numbers} />
        <h3 className="via-transparent absolute bottom-0 flex h-[4rem] w-full items-center justify-center rounded-[1.25rem] bg-gradient-to-r from-[#4B2EFD] to-[#A090FF] text-base leading-[4rem] text-white">
          <span className="font-semibold">1등 총상금</span>
          {recentData.wins[0]?.num_winners}명/
          <span className="ml-[0.625rem] inline-block text-xxl font-semibold">
            {formatMoney(recentData.wins[0]?.prize ?? 0)}
          </span>
        </h3>
      </div>
    </>
  );
}

// 등수별 당첨금액
export function RecentLotteryListCardComponent({
  allData,
}: {
  allData: LotteryResult[];
}) {
  return (
    <>
      <div className="relative h-[13.75rem] rounded-[1.25rem] bg-white p-[1.25rem] text-sm text-black">
        <div className="grid grid-cols-3 grid-rows-6 ">
          <ul className="col-span-3 grid grid-cols-3 items-center rounded-[0.375rem]  bg-point/[0.1]  font-bold">
            <li className="col-span-1">순위</li>
            <li className="col-span-1">1인당 당첨금액</li>
            <li className="col-span-1">당첨인원</li>
          </ul>
          {allData.slice(0, 5).map((item, idx) => {
            return (
              <ul
                key={idx}
                className="col-span-3 mt-[0.625rem] grid grid-cols-3"
              >
                <li className="col-span-1 font-semibold">{idx + 1}</li>
                <li className="col-span-1 font-regular">
                  {getEraseFourDigits(item.wins[0]?.prize)}원
                </li>
                <li className="col-span-1 font-regular">
                  {item.wins[0]?.num_winners}
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
}

// 메인 하단 커뮤니티 카드 컴포넌트
export function CommunityCardComponent() {
  return (
    <div className="pb-[5.625rem]">
      <h1 className="mb-[0.75rem] text-xl font-semibold">Community</h1>
      <span className="mb-[1.25rem] inline-block text-sm text-gray_2">
        로또를 이용하는 전국의 사용자들과 소통해요!
      </span>
      <div className="grid  grid-cols-2 gap-2 text-base text-black">
        <div className="relative col-span-2 h-[13.75rem] cursor-pointer overflow-hidden rounded-[1.25rem] bg-blue p-[1.25rem] text-white ">
          <h2 className="relative z-10 mb-[0.4375rem] font-semibold">
            1등 당첨이 가장 많이 배출된 곳은?
          </h2>
          <span className="relative z-10 text-xs">
            전국에 포진된 복권 판매점을 한눈에 알아봐요!
          </span>
          <Image
            src="/img/icon_circle_right_arrow.svg"
            alt="img"
            width={36}
            height={36}
            className="absolute bottom-[1.25rem] right-[1.25rem]"
          />
          <div className="absolute bottom-[5.19rem] right-[1.69rem] h-[7.1875rem] w-[7.1875rem] rounded-full bg-point" />
          <div className="absolute left-[0.87rem] top-[7.44rem] h-[7.1875rem] w-[7.1875rem] rounded-full bg-point" />
        </div>
        <div className="relative h-[13.75rem] cursor-pointer rounded-[1.25rem] bg-gray_2 p-[1.25rem]">
          <h2 className="mb-[0.4375rem] font-semibold">톡톡 로또</h2>
          <span className="text-xs">
            소소한 로또 라이프를
            <br />
            공유해요.
          </span>
          <Image
            src="/img/icon_circle_right_arrow.svg"
            alt="img"
            width={36}
            height={36}
            className="absolute bottom-[1.25rem] right-[1.25rem]"
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <div className="cursor-pointer rounded-[1.25rem] bg-yellow p-[1.25rem]">
            <h2 className="mb-[0.4375rem] font-semibold">명예의 전당</h2>
            <span className="text-xs">로또 당첨자들의 후기</span>
          </div>
          <div className="cursor-pointer rounded-[1.25rem] bg-white p-[1.25rem]">
            <h2 className="mb-[0.4375rem] flex items-center font-semibold">
              인기글
              <span className="ml-[0.1875rem] rounded-[0.25rem] bg-red px-[0.3125rem] py-[0.1875rem] text-xxs text-white">
                HOT
              </span>
            </h2>
            <span className="text-xs">이번주 가장 많은 추천을 받은 글은?</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // 전체 당첨번호 조회
  const allResponse = await fetch(
    "http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries",
  );
  // 가장 최신의 당첨번호 조회 (/lotteries/0 로 호출)
  const recentResponse = await fetch(
    "http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries/0",
  );

  const allData = (await allResponse.json()) as LotteryResult;
  const recentData = (await recentResponse.json()) as LotteryResult;

  return {
    props: {
      allData,
      recentData,
    },
  };
}

// 회차별 당첨번호 조회 (ex 999회 /lotteries/999)
// const response = await fetch("http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries/999");
// 당첨번호 검색 4를 포함하는 경우
// const response = await fetch("http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries?include=4");
// 당첨번호 검색 5, 10을 포함하는 경우
// const response = await fetch("http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries?include=5&include=10");
// 당첨번호 검색을 하지 않고 전체 번호를 조회하는 경우 (기존이랑 같음)
// const response = await fetch("http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries");
