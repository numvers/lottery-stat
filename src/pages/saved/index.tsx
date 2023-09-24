import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import LotteryNumberBall from "~/components/LotteryNumberBall";

export default function Home() {
  const router = useRouter();

  const [isDot, setIsDot] = useState(false);
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
        <div className="relative grid px-[1.25rem]">
          <div className="relative mb-[0.37rem] rounded-[1.25rem] bg-gray_1 p-[1.25rem]">
            <div className="mb-[0.87rem]">
              <h1 className="mb-1 flex  justify-between text-xl font-bold text-point">
                1번 로또
              </h1>
              <span className="text-sm text-gray_3">23년 09월 16일 생성</span>
            </div>
            <Image
              src="/img/icon_dot_black.svg"
              alt="img"
              width={22}
              height={6}
              className="absolute right-[1.25rem] top-[1.25rem] cursor-pointer"
              onClick={() => (isDot ? setIsDot(false) : setIsDot(true))}
            />
            <LotteryNumberBall
              numbers={[1, 2, 3, 4, 5, 6, 7]}
              bonus={true}
              checkNum={[]}
            />
            {isDot && (
              <ul className="absolute right-4 top-[1.87rem] z-50 cursor-pointer rounded-[0.63rem] bg-gray_4 px-[1.5rem] py-[0.6rem]">
                <li className="pb-[0.3rem] ">번호 복사</li>
                <li className="pt-[0.3rem]">삭제하기</li>
              </ul>
            )}
          </div>
          <div className="gradient-container relative mb-[0.37rem] rounded-[1.25rem] p-[1.25rem]">
            <div className="mb-[0.87rem]">
              <h1 className="mb-1 flex items-center  text-xl font-bold text-white">
                1번 로또
                <Image
                  src="/img/icon_spaceship_bright.svg"
                  alt="img"
                  width={39}
                  height={21}
                  className="ml-1"
                />
              </h1>
              <span className="text-sm text-white">23년 09월 16일 생성</span>
            </div>
            <Image
              src="/img/icon_dot_white.svg"
              alt="img"
              width={22}
              height={6}
              className="absolute right-[1.25rem] top-[1.25rem] cursor-pointer"
              onClick={() => (isDot ? setIsDot(false) : setIsDot(true))}
            />
            <LotteryNumberBall
              numbers={[1, 2, 3, 4, 5, 6, 7]}
              bonus={true}
              checkNum={[]}
            />
            {isDot && (
              <ul className="absolute right-4 top-[1.87rem] z-50 cursor-pointer rounded-[0.63rem] bg-gray_4 px-[1.5rem] py-[0.6rem]">
                <li className="pb-[0.3rem] ">번호 복사</li>
                <li className="pt-[0.3rem]">삭제하기</li>
              </ul>
            )}
          </div>
          <Image
            src="/img/img_round_plus.svg"
            alt="img"
            width={40}
            height={40}
            className=" m-auto my-3 cursor-pointer"
            onClick={() => router.back()}
          />
          <Image
            src="/img/icon_triangle.svg"
            alt="img"
            width={22}
            height={22}
            className="m-auto mb-[-0.5rem] cursor-pointer"
            onClick={() => router.back()}
          />
          <button
            className="m-auto w-[100%] rounded-full bg-gray_3 py-[0.94rem]"
            onClick={() => router.push("/select")}
          >
            한번 더 번호 뽑기
          </button>
          <button
            className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 transform rounded-full bg-point p-[0.9rem] sm:w-screen  md:w-[20rem]"
            onClick={() => router.push("/saved/result")}
          >
            이미지 저장
          </button>
        </div>
      </main>
    </>
  );
}
