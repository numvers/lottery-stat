import Image from "next/image";
import { useRouter } from "next/router";

export default function Pick() {
  const router = useRouter();
  return (
    <main className="pb-20 sm:w-screen md:w-[22.5rem]">
      <div className="flex h-[3.75rem] px-4">
        <Image
          src="/img/icon_left_arrow.svg"
          alt="img"
          width={10}
          height={20}
          className="mb-[0.63rem] cursor-pointer"
          onClick={() => router.back()}
        />
      </div>
      <nav className="align-center mb-[1.25rem] flex h-[2.5rem] gap-[0.37rem] overflow-auto px-4">
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
        style={{ border: "2.5px solid #D1D1D133" }}
      ></hr>
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
