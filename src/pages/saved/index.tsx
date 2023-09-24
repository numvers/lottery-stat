import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LotteryNumberBall from "~/components/LotteryNumberBall";
import { formatDate } from "~/module/Util";

export const getColorClass = (item: number) => {
  if (item <= 10) return "yellow";
  if (item <= 20) return "blue";
  if (item <= 30) return "red";
  if (item <= 40) return "black";
  return "green";
};
interface LocationLotto {
  type: string;
  numbers: number[];
  time: string;
}

export default function Home() {
  const router = useRouter();

  const [isDot, setIsDot] = useState(false);
  const [dataList, setDataList] = useState<LocationLotto[]>([]);


  // 클릭 이벤트 핸들러
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(dataList))
      .then(() => {
        alert('클립보드에 복사되었습니다.');
      })
      .catch((error) => {
        console.error('클립보드 복사 오류:', error);
      });
  };

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
      <main className="pb-80 sm:w-screen  md:w-[22.5rem]">
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
          {dataList?.map((item, idx) => {
            return (
              <div key={idx}>
                <div
                  className={
                    item.type === "uju"
                      ? "gradient-container relative  rounded-[1.25rem] px-[0.3rem] pb-[0.07rem] pt-[0.2rem]"
                      : ""
                  }
                >
                  <div className="relative mb-[0.37rem] rounded-[1.25rem] bg-gray_1 p-[1.25rem] ">
                    <div className="mb-[0.87rem]">
                      <h1 className="mb-1 flex   text-xl font-bold text-point">
                        {idx + 1}번 로또
                        {item.type === "uju" && (
                          <Image
                            src="/img/icon_spaceship_bright.svg"
                            alt="img"
                            width={39}
                            height={21}
                            className="ml-1"
                          />
                        )}
                      </h1>
                      <span className="text-sm text-gray_3">
                        {formatDate(item.time)} 생성
                      </span>
                    </div>
                    <Image
                      src="/img/icon_dot_black.svg"
                      alt="img"
                      width={22}
                      height={6}
                      className="absolute right-[1.25rem] top-[1.25rem] cursor-pointer"
                      onClick={() => (isDot ? setIsDot(false) : setIsDot(true))}
                    />
                    <div className="flex justify-center text-black">
                      {item.numbers?.map((num, idx) => {
                        const numColor = getColorClass(num);
                        return (
                          <div
                            key={idx}
                            className="relative float-left mx-[0.1875rem] flex h-[2rem] w-[2rem] items-center justify-center rounded-full"
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
                    </div>
                    {isDot && (
                      <ul className="absolute right-4 top-[1.87rem] z-50 cursor-pointer rounded-[0.63rem] bg-gray_4 px-[1.5rem] py-[0.6rem]">
                        <li className="pb-[0.3rem]" onClick={handleCopyToClipboard}>번호 복사</li>
                        <li className="pt-[0.3rem]">삭제하기</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
