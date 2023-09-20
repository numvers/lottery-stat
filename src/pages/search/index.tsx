import Image from "next/image";
import {
  calculateTimeRemaining,
  formatDate,
  getEraseFourDigits,
} from "../../module/Util";
import { useEffect, useState } from "react";
import LotteryNumberBall from "~/components/LotteryNumberBall";
import { numToKorean, FormatOptions } from "num-to-korean";

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
  return (
    <>
      <main className="sm:w-screen md:w-[22.5rem] ">
        <div className="h-[3.75rem] bg-red">Logo</div>
        <div className="px-[1.25rem]">번호검색</div>
      </main>
    </>
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

  return {
    props: {},
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
