import Image from "next/image";
import { calculateTimeRemaining } from "../module/Util";

export default function Home() {
  return (
    <>
      <main className=" w-[500px] ">
        <div className="h-[60px] bg-red">Logo</div>
        <div className="px-[16px] text-center ">
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
          <div className="relative h-[220px] rounded-[20px] bg-white py-[30px] text-black">
            <h2 className="mb-[10px] text-sm text-gray_3">
              23년 09월 16일 추첨
            </h2>
            <div className="mb-[20px] flex   items-center justify-center text-xl">
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
              1등 총상금(23명/ 11억)
              <span className="ml-[10px] inline-block text-xxl">246억원</span>
            </h3>
          </div>
          <div className="mt-[10px] flex  items-center justify-center text-sm text-gray_2">
            <h3 className="cursor-pointer">등수별 당첨금액</h3>
            <Image
              src="/img/icon_clear.svg"
              alt="img"
              width={18}
              height={18}
              className="ml-[8px] cursor-pointer"
            />
          </div>
        </div>
      </main>
    </>
  );
}
