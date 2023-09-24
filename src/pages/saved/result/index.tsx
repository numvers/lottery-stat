import Image from "next/image";
import { useRouter } from "next/router";
import LotteryNumberBall from "~/components/LotteryNumberBall";

export default function Home() {
  const router = useRouter();

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
                src="/img/logo_white.png"
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
                  <LotteryNumberBall
                    numbers={[1, 2, 3, 4, 5, 6, 7]}
                    bonus={true}
                    checkNum={[]}
                  />
                </div>
                <div className="mb-1">
                  <LotteryNumberBall
                    numbers={[1, 2, 3, 4, 5, 6, 7]}
                    bonus={true}
                    checkNum={[]}
                  />
                </div>
                <div className="mb-1">
                  <LotteryNumberBall
                    numbers={[1, 2, 3, 4, 5, 6, 7]}
                    bonus={true}
                    checkNum={[]}
                  />
                </div>
                <div className="mb-1">
                  <LotteryNumberBall
                    numbers={[1, 2, 3, 4, 5, 6, 7]}
                    bonus={true}
                    checkNum={[]}
                  />
                </div>
                <div className="mb-1">
                  <LotteryNumberBall
                    numbers={[1, 2, 3, 4, 5, 6, 7]}
                    bonus={true}
                    checkNum={[]}
                  />
                </div>
              </div>
            </div>
            <h1 className="mb-[0.62rem] w-[12rem] rounded-full bg-white/[.2] px-[2.19rem] py-[0.62rem] text-center font-bold">
              운이좋은 참새구리
            </h1>
            <h3 className="text-xs">
              우주의 기운으로 추천된 오늘의 닉네임이에요.
            </h3>
            <img src="/img/img_uju.svg" alt="img" className="absolute top-8" />
          </div>
          <button className="mb-[1rem] w-[100%] rounded-full bg-point py-[0.94rem] font-semibold">
            번호 복사하기
          </button>
          <button className="w-[100%] rounded-full bg-white py-[0.94rem] font-semibold text-black">
            하나 더 뽑기 (1/5)
          </button>
        </div>
      </main>
    </>
  );
}
