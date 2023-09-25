import Image from "next/image";
import LotteryNumberBallSmall from "./LotteryNumberBallSmall";

export default function UserLottery(props: UserLotteryProps) {
  return (
    <div
      className={`${
        props.menu == "uju" ? "gradient-container" : ""
      } mb-[0.37rem] rounded-[1.25rem] p-[0.15rem]`}
    >
      <div className="flex items-center justify-between rounded-[1.25rem] bg-gray_4 px-[1.25rem] py-[0.87rem]">
        <div>
          <div className="flex items-center">
            <h2 className=" w-[5rem] overflow-hidden truncate font-semibold">
              {props.nickname}
            </h2>
            {props.menu == "uju" && (
              <Image
                src="/img/icon_spaceship.svg"
                alt="img"
                width={26}
                height={14}
                className=""
              />
            )}
          </div>
          <span className="text-center text-xs">
            {props.created_at.slice(0, 10)}
          </span>
        </div>
        <LotteryNumberBallSmall numbers={props.numbers} bonus={true} />
      </div>
    </div>
  );
}

interface UserLotteryProps {
  numbers: number[];
  bonus: boolean;
  menu: string;
  created_at: string;
  nickname: string;
}
