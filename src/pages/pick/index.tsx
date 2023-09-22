import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Pick() {
  const router = useRouter();
  return (
    <main className="px-[1rem] pb-20 sm:w-screen md:w-[22.5rem]">
      <div className="flex h-[3.75rem]">
        <Image
          src="/img/icon_left_arrow.svg"
          alt="img"
          width={10}
          height={20}
          className="mb-[0.63rem] cursor-pointer"
          onClick={() => router.back()}
        />
      </div>
      <nav className="align-center mb-[1.25rem] flex h-[2.5rem] gap-[0.37rem] overflow-auto ">
        <Image
          src="/img/button_blue_plus.svg"
          alt="button_blue_plus"
          width={0}
          height={0}
          style={{ width: "2.5rem", height: "2.5rem" }}
        />
        <NavButton>우주추천</NavButton>
        <NavButton>랜덤뽑기</NavButton>
        <NavButton>미출현 번호</NavButton>
        <NavButton>짝홀조합</NavButton>
      </nav>
      <div className="text-center">번호를 직접 선택해보세요!</div>
      <hr
        className="my-[1.19rem]"
        style={{
          border: "2.5px solid #D1D1D133",
          marginLeft: "-15",
          marginRight: "-15px",
        }}
      ></hr>

      <NumberBoard></NumberBoard>
    </main>
  );
}

function NavButton(props: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className="min-w-[4.75rem] flex-shrink-0 rounded-[20px] bg-[#242429] px-[0.44rem]"
      {...props}
    ></button>
  );
}

function NumberBoard() {
  const numbers = Array.from(Array(45), (_, i) => i + 1);
  const [isExcluding, setIsExcluding] = useState(false);

  return (
    <>
      <div className="mb-[0.75rem] text-xl">My lotto</div>
      <div className="flex h-[2.5rem] items-center justify-between">
        <div className="flex gap-[0.63rem]">
          <BlankBall></BlankBall>
          <BlankBall></BlankBall>
          <BlankBall></BlankBall>
          <BlankBall></BlankBall>
          <BlankBall></BlankBall>
          <BlankBall></BlankBall>
        </div>
        <Image
          src="/img/icon_refresh.svg"
          alt="button_refersh"
          width={0}
          height={0}
          style={{ width: "1.25rem", height: "1.25rem" }}
        />
      </div>
      <div
        className={`my-[1.5rem] h-auto w-full rounded-[1.25rem] ${
          isExcluding ? "bg-gray_4" : "bg-gray_1"
        } px-[1.12rem] py-[1.25rem]`}
      >
        <div className=" grid grid-cols-8 items-center gap-x-[0.56rem] gap-y-[0.5rem]">
          {numbers.map((number, _) => (
            <div key={number} className="">
              <input
                type="checkbox"
                value={number}
                id={String(number)}
                className="hidden"
                onChange={() => "TODO"}
                checked={true}
              />
              <label
                htmlFor={String(number)}
                className={`inline-block h-[2.125rem] w-[2.125rem] cursor-pointer rounded-full  bg-white 
            text-center font-semibold leading-[2.125rem] text-black `}
              >
                {number}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-[1.62rem] mt-[1.25rem] flex h-[1.125rem] items-center gap-[0.38rem]">
          <input
            type="checkbox"
            className="h-[1.125rem] w-[1.125rem] bg-[#D9D9D9]"
            onChange={(e) => setIsExcluding(e.target.checked)}
          ></input>
          <div className="inline-block text-sm font-medium text-black">
            번호 제외하기
          </div>
        </div>
      </div>
    </>
  );
}

function BlankBall() {
  return (
    <Image
      src="/img/icon_blank.svg"
      alt="icon_blank"
      width={0}
      height={0}
      style={{ width: "2.5rem" }}
    />
  );
}
