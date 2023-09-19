import Image from "next/image";
import { calculateTimeRemaining } from "../module/Util";
import { useState } from "react";

export default function Home() {
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
      <main className="w-[500px] ">
        <div className="h-[60px] bg-red">Logo</div>
        <div className="px-[20px]">
          {/* 메인 상단 박스 */}
          <div className="mb-[40px]  text-center">
            {/* 오늘부터 복권당첨일까지 남은 시간 */}
            <h3 className="flex items-center justify-center py-[20px] text-base">
              <Image
                src="/img/icon_clock.svg"
                alt="img"
                width={18}
                height={18}
                className="float-left mr-[10px]"
              />
              {calculateTimeRemaining()}
            </h3>
            {isCardClick ? (
              <RecentLotteryListCardComponent />
            ) : (
              // 최근 당첨결과 카드 컴포넌트
              <RecentLotteryCardComponent />
            )}
            {/* 등수별 당첨금액 / 닫기 버튼 */}
            <div className="mt-[10px] flex items-center justify-center text-sm text-gray_2">
              <span className="cursor-pointer" onClick={cardClickHandler}>
                {isCardClick ? "닫기" : "등수별 당첨금액"}
              </span>
              <Image
                src="/img/icon_clear.svg"
                alt="img"
                width={18}
                height={18}
                className="ml-[8px] cursor-pointer"
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
export function RecentLotteryCardComponent() {
  return (
    <>
      <div className="relative h-[220px] rounded-[20px] bg-white py-[30px] text-black">
        <h2 className="mb-[10px] text-sm text-gray_3">23년 09월 16일 추첨</h2>
        <div className="mb-[20px] flex  items-center justify-center text-xl font-bold">
          <h2 className="cursor-pointer">1,085회 당첨결과</h2>
          <Image
            src="/img/icon_right_arrow.svg"
            alt="img"
            width={6.6}
            height={11.5}
            className="ml-[16px] cursor-pointer"
          />
        </div>
        <div className="h-[32px] bg-point">123123231123</div>
        <h3 className="via-transparent absolute bottom-0 flex h-[64px] w-full items-center justify-center rounded-[20px] bg-gradient-to-r from-[#4B2EFD] to-[#A090FF] text-base leading-[64px] text-white">
          <span className="font-semibold">1등 총상금</span>(23명/ 11억)
          <span className="ml-[10px] inline-block text-xxl font-semibold">
            246억원
          </span>
        </h3>
      </div>
    </>
  );
}

// 등수별 당첨금액
export function RecentLotteryListCardComponent() {
  return (
    <>
      <div className="relative h-[220px] rounded-[20px] bg-white py-[30px] text-black">
        순위
      </div>
    </>
  );
}

// 메인 하단 커뮤니티 카드 컴포넌트
export function CommunityCardComponent() {
  return (
    <div className="pb-[90px]">
      <h1 className="mb-[12px] text-xl font-semibold">Community</h1>
      <span className="mb-[20px] inline-block text-sm text-gray_2">
        로또를 이용하는 전국의 사용자들과 소통해요!
      </span>
      <div className="grid  grid-cols-2 gap-2 text-base text-black">
        <div className="relative h-[220px] cursor-pointer rounded-[20px] bg-gray_2 p-[20px]">
          <h2 className="mb-[7px] font-semibold">톡톡 로또</h2>
          <span className="text-xs">소소한 로또 라이프를 공유해요.</span>
          <Image
            src="/img/icon_circle_right_arrow.svg"
            alt="img"
            width={36}
            height={36}
            className="absolute bottom-[20px] right-[20px]"
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <div className="cursor-pointer rounded-[20px] bg-yellow p-[20px]">
            <h2 className="mb-[7px] font-semibold">명예의 전당</h2>
            <span className="text-xs">로또 당첨자들의 후기</span>
          </div>
          <div className="cursor-pointer rounded-[20px] bg-white p-[20px]">
            <h2 className="mb-[7px] font-semibold flex items-center">
              인기글
              <span className="text-xxs ml-[3px] rounded-[4px] bg-red px-[5px] py-[3px] text-white">
                HOT
              </span>
            </h2>
            <span className="text-xs">이번주 가장 많은 추천을 받은 글은?</span>
          </div>
        </div>
        <div className="relative col-span-2 h-[160px] cursor-pointer rounded-[20px] bg-blue p-[20px] text-white">
          <h2 className="mb-[7px] font-semibold">
            1등 당첨이 가장 많이 배출된 곳은?
          </h2>
          <span className="text-xs">
            전국에 포진된 복권 판매점을 한눈에 알아봐요!
          </span>
          <Image
            src="/img/icon_circle_right_arrow.svg"
            alt="img"
            width={36}
            height={36}
            className="absolute bottom-[20px] right-[20px]"
          />
        </div>
      </div>
    </div>
  );
}
