import Image from "next/image";
import { useState } from "react";

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
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  console.log(allData)
  return (
    <>
      <main className="sm:w-screen md:w-[22.5rem] ">
        <div className="mb-[0.63rem] flex h-[3.75rem] items-center  pl-4">
          <Image
            src="/img/icon_left_arrow.svg"
            alt="img"
            width={10}
            height={20}
            className=" cursor-pointer"
          />
        </div>
        <div className="px-[1.25rem]">
          {/* 검색창 */}
          <div className="relative mb-10">
            <input
              type="text"
              className="text-md mb-4 w-full rounded-[1.25rem] border-2 border-solid border-gray_4 bg-gray_4 p-5 font-regular text-white placeholder:text-white focus:border-point focus:outline-none"
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
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">전체 회차</h1>
            <select className="rounded-[1.25rem] bg-gray_4 py-3 pl-5 pr-2">
              <option>회차선택</option>
            </select>
          </div>
          <div>

          </div>

          {/* <select> 
              <option>회차선택</option>
            </select> */}
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
