import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { getColorClass } from "../../components/LotteryNumberBall";
import { api } from "../../utils/api";

export type menu = "pick" | "uju" | "random" | "missing" | "odd-even";

export default function Pick() {
  return <PickPage firstMenu="pick"></PickPage>;
}

export function PickPage({ firstMenu }: { firstMenu: menu }) {
  const router = useRouter();
  const mutation = api.lottery.createLottery.useMutation();
  const [menu, setMenu] = useState<menu>(firstMenu);
  const [picks, setPicks] = useState<number[]>([]);
  const [exclusions, setExclusions] = useState<number[]>([]);
  const [hover, setHover] = useState(false);
  return (
    <main className="px-[1rem] pb-20 sm:w-screen md:w-[22.5rem]">
      <div className="flex h-[3.75rem] ">
        <Image
          src="/img/icon_left_arrow.svg"
          alt="img"
          width={10}
          height={20}
          className="mb-[0.63rem] cursor-pointer"
          onClick={() => router.back()}
        />
      </div>
      <nav className="align-center mb-[1.25rem] flex h-[2.5rem] gap-[0.37rem] overflow-auto scrollbar-hide ">
        <Image
          src={
            menu == "pick"
              ? `/img/button_blue_plus.svg`
              : `/img/button_gray_4_plus.svg`
          }
          alt="img button pick"
          width={0}
          height={0}
          className="cursor-pointer"
          onClick={() => setMenu("pick")}
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
          marginLeft: "-1rem",
          marginRight: "-1rem",
        }}
      ></hr>
      {menu == "uju" ? (
        <SpaceBoard animate={hover}></SpaceBoard>
      ) : (
        <NumberBoard
          picks={picks}
          addPick={(num: number) => {
            if (6 <= picks.length) {
              alert("번호는 6개 모두 선택해주세요.");
            }
            setPicks([num, ...picks]);
          }}
          removePicks={(...numToRemove: number[]) => {
            setPicks(picks.filter((n) => !numToRemove.includes(n)));
          }}
          exclusions={exclusions}
          addExclusion={(num: number) => {
            setExclusions([num, ...exclusions]);
          }}
          removeExclusion={(num: number) => {
            setExclusions(exclusions.filter((n) => n != num));
          }}
        ></NumberBoard>
      )}

      {(0 < picks.length || menu != "pick") && (
        <SubmitButton
          menu={menu}
          numPicks={picks.length}
          onTouchStart={() => setHover(true)}
          onTouchEnd={() => setHover(false)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            if (menu == "pick" && picks.length < 6) {
              alert("번호 6개 모두 선택해주세요");
              return;
            }
            // if (menu == "uju") {
            //   alert("TODO: 이미지 저장 페이지로 이동");
            // }
            if (picks.length < 6) {
              setPicks([
                ...picks,
                ...numbersFrom(menu, [...picks, ...exclusions]).slice(
                  0,
                  6 - picks.length,
                ),
              ]);
              return;
            }
            let lottoIndex = localStorage.getItem("lottoIndex");
            if (lottoIndex && parseInt(lottoIndex) >= 5) {
              alert("이미 5개의 로또를 저장하셨습니다.");
            } else {
              // 5개 미만인 경우 새로운 로또 저장
              lottoIndex = lottoIndex ? String(1 + parseInt(lottoIndex)) : "1";
              localStorage.setItem("lottoIndex", String(lottoIndex));
              localStorage.setItem(
                `lotto${lottoIndex}`,
                JSON.stringify({
                  type: menu,
                  numbers: picks,
                  time: new Date(),
                }),
              );

              alert("번호 저장 완료!");
            }

            router.push("/saved").catch((e) => console.log(e));
            // localStorage.setItem('numbers',picks )
            // mutation.mutate({
            //   nickname: "뛰어난 기사", // TODO: 닉네임 생성
            //   type: menu,
            //   numbers: picks,
            // });
          }}
        ></SubmitButton>
      )}
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
      return "숫자판을 눌러 번호를 선택해보세요!";
    case "uju":
      return "우주 번호가 나옵니다";
    case "random":
      if (0 < numPicked) {
        return "나머지 숫자는 랜덤뽑기로 빠르게 추첨해보세요";
      }
      return "최대 6개의 숫자를 무작위로 랜덤 추첨해드려요";
    case "missing":
      return "한달간 추첨되지 않은 숫자를 랜덤 추첨해드려요";
    case "odd-even":
      return "짝수 3개, 홀수 3개를 조합하여 추첨해드려요";
  }
}

export function numbersFrom(menu: menu, exclusions: number[]) {
  const numLeftRandom = Array.from(Array(45), (_, i) => i + 1)
    .filter((n) => !exclusions.includes(n))
    .map((value) => ({ num: value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ num }) => num);

  const missing = [2, 6, 10, 19, 20, 28, 30, 39, 40, 41, 43, 45];

  switch (menu) {
    case "odd-even":
      let evenLeft = numLeftRandom.filter((v) => v % 2 == 0).length;
      let oddLeft = numLeftRandom.length - evenLeft;
      return numLeftRandom.filter((v) => {
        if (evenLeft >= oddLeft && v % 2 == 0) {
          evenLeft -= 1;
          return true;
        }
        if (oddLeft > evenLeft && v % 2 == 1) {
          oddLeft -= 1;
          return true;
        }
        return false;
      });
    case "missing":
      return numLeftRandom.filter((n) => missing.includes(n));
    case "pick":
    case "uju":
      const recent = [
        3, 4, 5, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 25, 26, 27, 29,
        31, 32, 33, 34, 35, 36, 37, 38, 42, 44,
      ];
      return numLeftRandom.filter((v) => recent.includes(v));
    case "random":
      return numLeftRandom;
  }
}

function SubmitButton(props: SubmitButtonProps) {
  return (
    <button
      className={`bg-indigo-600 m-auto flex h-[3.125rem] w-full items-center justify-center rounded-[20px] ${
        props.menu == "pick" && props.numPicks < 6 ? "bg-gray_4" : "bg-point"
      } text-center`}
      {...props}
    >
      <p>{submitMessageFrom(props.menu, props.numPicks)}</p>
    </button>
  );
}

interface SubmitButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  menu: menu;
  numPicks: number;
}

function submitMessageFrom(menu: menu, numPicks: number) {
  if (numPicks == 6 && menu != "uju") {
    return `선택완료 ${numPicks}/6`;
  }
  switch (menu) {
    case "pick":
      return `선택완료 ${numPicks}/6`;
    case "uju":
      return "시작하기";
    case "random":
      return `랜덤 뽑기`;
    case "missing":
      return `미출현 번호 뽑기`;
    case "odd-even":
      return `짝홀뽑기`;
  }
}

const NumberBoard = ({
  picks,
  addPick: addPicks,
  removePicks,
  exclusions,
  addExclusion: addExclusions,
  removeExclusion: removeExclusions,
}: NumberBoardProps) => {
  const numbers = Array.from(Array(45), (_, i) => i + 1);
  const [isExcluding, setIsExcluding] = useState(false);
  const sortedPicks = [...picks].sort((left, right) => left - right);

  return (
    <>
      <div className="mb-[0.75rem] flex h-[1.4375rem] gap-[0.62rem] text-xl">
        <div className="text-md text-point">My lotto</div>
        {0 < picks.length && (
          <div className="inline-flex items-center justify-center gap-2.5 rounded-[1.625rem] bg-point px-[0.5rem] py-[0.13rem]">
            <div className="font-normal text-center font-['Pretendard'] text-xs">
              선택한 번호를 다시 눌러서 제거할 수 있어요!
            </div>
          </div>
        )}
      </div>
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
                  onClick={() => removePicks(sortedPicks[i] ?? 0)}
                ></NumberBall>
              );
            } else {
              return <BlankBall key={i}></BlankBall>;
            }
          })}
        </div>
        <Image
          src="/img/icon_refresh.svg"
          alt="button_refersh"
          width={0}
          height={0}
          style={{ width: "1.25rem", height: "1.25rem" }}
          className="cursor-pointer"
          onClick={() => {
            removePicks(...picks);
          }}
        />
      </div>
      <div
        className={`my-[1.5rem] h-auto w-full rounded-[1.25rem] ${
          isExcluding ? "bg-gray_4" : "bg-gray_1"
        }  px-[1.12rem] py-[1.25rem]`}
      >
        <div className=" grid grid-cols-8 items-center gap-x-[0.56rem] gap-y-[0.5rem]">
          {numbers.map((number, _) => (
            <NumberBall
              key={number}
              number={number}
              disabled={
                picks.includes(number) ||
                (exclusions.includes(number) && !isExcluding)
              }
              picked={picks.includes(number)}
              excluded={exclusions.includes(number)}
              onClick={() => {
                if (isExcluding && exclusions.includes(number)) {
                  removeExclusions(number);
                  return;
                }
                if (isExcluding) {
                  addExclusions(number);
                  return;
                }
                if (picks.length < 6) {
                  addPicks(number);
                } else {
                  alert("번호는 최대 6개까지만 선택할 수 있습니다");
                }
                console.log(`picking ${number} for ${picks.toString()}`);
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
            제외할 번호 선택하기
          </div>
        </div>
      </div>
    </>
  );
};

function SpaceBoard({ animate }: { animate: boolean }) {
  return (
    <div className="mx-auto mb-[6.63rem]">
      <div className="relative mx-auto flex justify-center">
        <Image
          className="display-block max-w-[100%]"
          src="/img/space/background.svg"
          alt="button_blue_plus"
          width={0}
          height={0}
          style={{ width: "20.5rem", height: "18.75rem" }}
        />
        <Image
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform animate-pulse`}
          src="/img/space/comet.svg"
          alt="star"
          width={0}
          height={0}
          style={{
            width: "9rem",
            height: "auto",
          }}
        ></Image>
        <Image
          className={`absolute ${
            animate ? "animate-spin-slow" : ""
          } left-1/7 top-1/2 `}
          src="/img/space/round-star.svg"
          alt="star"
          width={0}
          height={0}
          style={{
            top: "3.8rem",
            right: "5.75rem",
            width: "9rem",
            height: "auto",
          }}
        ></Image>
        <Image
          className={`absolute ${animate ? "animate-bounce" : ""}`}
          src="/img/space/star.svg"
          alt="star"
          width={0}
          height={0}
          style={{
            top: "4.12rem",
            right: "3.5rem",
            width: "15rem",
            height: "auto",
          }}
        ></Image>
      </div>
      <p className="mt-[0.62rem] h-[4.375rem] rounded-[1.25rem] bg-gray_4 px-[1.06rem] py-[1.06rem] text-center text-sm leading-[1.1375rem] text-gray_2">
        과거의 로또 추첨 결과와 패턴을 분석한 방식으로,<br></br>각 번호의 출현
        빈도를 파악하여 번호를 추첨 해드려요
      </p>
    </div>
  );
}
interface NumberBoardProps {
  picks: number[];
  addPick: (num: number) => void;
  removePicks: (...num: number[]) => void;
  exclusions: number[];
  addExclusion: (num: number) => void;
  removeExclusion: (num: number) => void;
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
    <button className="relative flex items-center justify-center" {...props}>
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
