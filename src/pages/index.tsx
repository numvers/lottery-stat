import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className=" w-[500px] bg-num-blue">
        <div className="h-[60px] bg-num-red">Logo</div>
        <div className="px-[16px] text-center ">
          <h3 className="py-[20px] text-base">
            <Image src="/img/icon_clock.svg" alt="img" width={18} height={18} />
            3일 10시간 20분
          </h3>
          <div>
            <h2>23년 09월 16일 추첨</h2>
            <h2>1,085회 당첨결과</h2>
            <div>123123231123</div>
            <div>
              1등 총상금(23명/ 11억)<span>246억원</span>
            </div>
          </div>
          <h3>등수별 당첨금액</h3>
        </div>
      </main>
    </>
  );
}
