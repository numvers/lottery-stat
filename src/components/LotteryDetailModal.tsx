import { getEraseFourDigits } from "~/module/Util";
import classes from "../styles/LotteryDetailModal.module.css";
import Backdrop from "./Backdrop";
import Image from "next/image";

interface LotteryResult {
  round: number;
  date: string;
  numbers: number[];
  wins: {
    num_winners: number;
    prize: number;
  }[];
}

export default function LotteryDetailModal({
  data,
  onClose,
}: {
  data: LotteryResult[];
  onClose: () => void;
}) {
  return (
    <>
      <Backdrop>
        <div className={classes.outline}>
          <div>
            <div className="relative rounded-[1.25rem] bg-white p-[1.25rem]  text-center text-sm text-black sm:w-screen md:w-[20.5rem]">
              <div className="grid grid-cols-4 grid-rows-6 ">
                <ul className="col-span-4 grid grid-cols-4 items-center rounded-[0.375rem]  bg-point/[0.1]  font-bold">
                  <li className="col-start-1">순위</li>
                  <li className="col-span-2 col-start-2">1인당 당첨금액</li>
                  <li className="col-start-4">당첨인원</li>
                </ul>
                {data[0]?.wins.map((item, idx) => {
                  return (
                    <ul
                      key={idx}
                      className="col-span-4 mt-[0.625rem] grid grid-cols-4 py-[0.15rem]"
                    >
                      <li className="col-start-1 font-semibold">{idx + 1}</li>
                      <li className="col-span-2 col-start-2 font-regular">
                        {getEraseFourDigits(item.prize)}원
                      </li>
                      <li className="col-start-4 font-regular">
                        {item.num_winners}
                      </li>
                    </ul>
                  );
                })}
              </div>
            </div>
            <div className="mt-[0.625rem] flex items-center justify-center text-sm text-gray_2">
              <span className="cursor-pointer" onClick={onClose}>
                닫기
              </span>
              <Image
                src="/img/icon_clear.svg"
                alt="img"
                width={18}
                height={18}
                className="ml-[0.5rem] cursor-pointer"
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      </Backdrop>
    </>
  );
}
