import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { getColorClass } from "../../components/LotteryNumberBall";

type menu = "pick" | "uju" | "random" | "missing" | "odd-even";

export default function Pick() {
  const router = useRouter();
  const [menu, setMenu] = useState<menu>("pick");
  const [picks, setPicks] = useState<number[]>([]);
  const [exclusions, setExclusions] = useState<number[]>([]);
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
        <NavButton activated={menu == "uju"} onClick={() => setMenu("uju")}>
          우주추천
        </NavButton>
        <NavButton
          activated={menu == "random"}
          onClick={() => setMenu("random")}
        >
          랜덤뽑기
        </NavButton>
        <NavButton
          activated={menu == "missing"}
          onClick={() => setMenu("missing")}
        >
          미출현 번호
        </NavButton>
        <NavButton
          activated={menu == "odd-even"}
          onClick={() => setMenu("odd-even")}
        >
          짝홀조합
        </NavButton>
      </nav>
      <div className="text-center">{navMessageFrom(menu, picks.length)}</div>
      <hr
        className="my-[1.19rem]"
        style={{
          border: "2.5px solid #D1D1D133",
          marginLeft: "-15",
          marginRight: "-15px",
        }}
      ></hr>
      <NumberBoard
        picks={picks}
        addPicks={(num: number) => {
          if (6 <= picks.length) {
            alert("번호는 6개 이하로 선택 가능합니다.");
          }
          setPicks([num, ...picks]);
        }}
        exclusions={exclusions}
        addExclusions={(num: number) => {
          setExclusions([num, ...exclusions]);
        }}
      ></NumberBoard>
      <div className="bg-indigo-600 m-auto flex h-[3.125rem] w-full items-center justify-center rounded-[20px] bg-point text-center">
        <p>선택하세요</p>
      </div>
    </main>
  );
}

function NavButton(props: NavButtonProps) {
  return (
    <button
      className={`min-w-[4.75rem] flex-shrink-0 rounded-[20px] ${
        props.activated ? "bg-point" : "bg-[#242429]"
      } px-[0.44rem]`}
      {...props}
    ></button>
  );
}

interface NavButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  activated: boolean;
}

function navMessageFrom(menu: menu, numPicked: number) {
  switch (menu) {
    case "pick":
      return "번호를 직접 선택해보세요!";
    case "uju":
      return "우주 번호가 나옵니다";
    case "random":
      if (0 < numPicked) {
        return "남은 번호는 랜덤하게 채우세요!";
      }
      return "무작위 번호가 나옵니다";
    case "missing":
      return "최근 5회차 중 추첨되지 않았던 번호들 중에 랜덤";
    case "odd-even":
      return "짝수 3개, 홀수 3개 랜덤 선택";
  }
}

const NumberBoard = ({
  picks,
  addPicks,
  exclusions,
  addExclusions,
}: NumberBoardProps) => {
  const numbers = Array.from(Array(45), (_, i) => i + 1);
  const [isExcluding, setIsExcluding] = useState(false);
  const sortedPicks = [...picks].sort();

  return (
    <>
      <div className="mb-[0.75rem] text-xl">My lotto</div>
      <div className="flex h-[2.5rem] items-center justify-between">
        <div className="flex gap-[0.63rem]">
          {Array.from(Array(6), (_, i) => i).map((i) => {
            if (i < sortedPicks.length) {
              return (
                <NumberBall
                  key={i}
                  number={sortedPicks[i] ?? 0}
                  excluded={false}
                  picked={true}
                ></NumberBall>
              );
            }
            return <BlankBall key={i}></BlankBall>;
          })}
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
            <NumberBall
              key={number}
              number={number}
              picked={picks.includes(number)}
              excluded={exclusions.includes(number)}
              onClick={() => {
                if (isExcluding) {
                  addExclusions(number);
                  console.log(
                    `excluding ${number} for ${exclusions.toString()}`,
                  );
                } else {
                  addPicks(number);
                  console.log(`picking ${number} for ${picks.toString()}`);
                }
              }}
            ></NumberBall>
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
};

interface NumberBoardProps {
  picks: number[];
  addPicks: (num: number) => void;
  exclusions: number[];
  addExclusions: (num: number) => void;
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

const NumberBall = (props: NumberBallProps) => {
  let color = "white";
  let textColor = "black";
  if (props.picked) {
    color = getColorClass(props.number);
  }
  if (props.excluded) {
    color = "gray_4";
    textColor = "gray_3";
  }
  return (
    <button
      className="relative flex items-center justify-center"
      disabled={props.picked || props.excluded}
      {...props}
    >
      <div className={`absolute z-10 font-semibold text-${textColor}`}>
        {props.number}
      </div>
      <Image
        src={`/img/ball_${color}.svg`}
        alt={`${color} ${props.number} ball`}
        width={0}
        height={0}
        style={{ width: "2.5rem" }}
      ></Image>
    </button>
  );
};

interface NumberBallProps extends React.ComponentPropsWithoutRef<"button"> {
  number: number;
  picked: boolean;
  excluded: boolean;
}
