import Image from "next/image";
import { useRouter } from "next/router";
import LotteryNumberBall from "~/components/LotteryNumberBall";
import { useEffect, useState } from "react";

export const getColorClass = (item: number) => {
  if (item <= 10) return "yellow";
  if (item <= 20) return "blue";
  if (item <= 30) return "red";
  if (item <= 40) return "black";
  return "green";
};
interface nicknameResult {
  words: string[];
  seed: string;
}
interface LocationLotto {
  type: string;
  numbers: number[];
  time: string;
}

export default function Home({ nickname }: { nickname: nicknameResult }) {
  const router = useRouter();

  const [dataList, setDataList] = useState<LocationLotto[]>([]);

  useEffect(() => {
    const allKeys = Object.keys(localStorage);

    const filteredData = allKeys
      .filter((key) => key.startsWith("lotto") && key !== "lottoIndex")
      .map((key) => {
        return JSON.parse(localStorage.getItem(key) ?? "") as LocationLotto;
      });

    setDataList((prevData) => [...prevData, ...filteredData]);
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
            onClick={() => router.back()}
          />
        </div>
        <div className="px-[1.25rem]">
          <div className="via-transparent relative mb-[2.5rem] flex h-[26.5rem]  flex-col items-center rounded-[1.25rem] bg-gradient-to-br from-[#4B2EFD] to-[#C623FF] p-[1.25rem]">
            <div className="mx-auto mb-[1.44rem]">
              <Image
                src="/img/logo_white.svg"
                alt="img"
                width={113}
                height={41}
                className="mb-[0.81rem] cursor-pointer"
                onClick={() => router.back()}
              />
              <h3 className="text-sm">23년 9월 29일 생성</h3>
            </div>
            <div className="mb-[1.12rem] flex h-[12.875rem] items-center justify-center rounded-[1.25rem] bg-black/[.5] px-[1.85rem]">
              <div className="float-left">
                <div className="mb-1">
                  {dataList?.map((item, idx) => {
                    return (
                      <>
                        {item.numbers?.map((num, idx) => {
                          const numColor = getColorClass(num);
                          return (
                            <div
                              key={idx}
                              className="relative float-left m-[0.12rem] flex h-[2rem] w-[2rem] items-center justify-center rounded-full"
                            >
                              <h1 className="absolute z-10 font-semibold">
                                {num}
                              </h1>
                              <Image
                                src={`/img/ball_${numColor}.svg`}
                                alt="img"
                                width={32}
                                height={32}
                              />
                            </div>
                          );
                        })}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <h1 className="mb-[0.62rem] w-[12rem] rounded-full bg-white/[.2] px-[2.19rem] py-[0.62rem] text-center font-bold">
              {nickname.words}
            </h1>
            <h3 className="text-xs">
              우주의 기운으로 추천된 오늘의 닉네임이에요.
            </h3>
            <img src="/img/img_uju.svg" alt="img" className="absolute top-8" />
          </div>
          <button className="mb-[1rem] w-[100%] rounded-full bg-point py-[0.94rem] font-semibold">
            번호 복사하기
          </button>
          <button
            className="w-[100%] rounded-full bg-white py-[0.94rem] font-semibold text-black"
            onClick={() => router.push("/select")}
          >
            하나 더 뽑기 ({dataList.length}/5)
          </button>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    "https://nickname.hwanmoo.kr/?format=json&count=1&max_length=8",
  );
  const nickname = (await response.json()) as nicknameResult;

  return {
    props: {
      nickname,
    },
  };
}
