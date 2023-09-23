import { getIncludeParams } from "~/module/Util";

interface LotteryResult {
  round: number;
  date: string;
  numbers: number[];
  wins: {
    num_winners: number;
    prize: number;
  }[];
}

export default function NumberBoard({
  checkNum,
  setCheckNum,
  setData,
  setIsMultiCheck,
}: {
  checkNum: (number | boolean)[];
  setCheckNum: React.Dispatch<React.SetStateAction<(number | boolean)[]>>;
  setData: React.Dispatch<React.SetStateAction<LotteryResult[]>>;
  setIsMultiCheck: (isMultiCheck: boolean) => void;
}) {
  const numbers = Array.from(Array(45), (_, i) => i + 1);

  // 숫자 핸들러
  const arrayListItemHandler = (code: number, isChecked: boolean) => {
    if (isChecked) {
      if (checkNum.length > 6) {
        alert("번호는 7개 이하로 선택 가능합니다.");
        return;
      }

      if (!checkNum.includes(code)) {
        setCheckNum([...checkNum, code]);
      }
    } else {
      setCheckNum(checkNum.filter((item) => item !== code));
    }
  };

  // 초기화
  const resetHandler = () => {
    setCheckNum([]);
  };

  // 번호 선택 후 적용
  const numChoiceHandler = async () => {
    if (checkNum.length < 1) {
      alert("번호를 선택해주세요.");
      return;
    } else {
      const response = await fetch(
        `http://ec2-3-34-179-50.ap-northeast-2.compute.amazonaws.com:8080/lotteries?${getIncludeParams(
          checkNum as number[],
        )}`,
      );
      const result = (await response.json()) as LotteryResult[];
      setData(result);
      setIsMultiCheck(false);
    }
  };

  return (
    <div className="flex flex-col items-center rounded-[1.25rem] bg-gray_1 p-[1.25rem]">
      <div>
        {numbers.map((number, idx) => (
          <div
            key={idx}
            className={`${number % 8 === 0 ? "" : "mr-[0.35rem]"}
          ${number < 41 ? "mb-[0.5rem]" : ""}  float-left `}
          >
            <input
              type="checkbox"
              value={number}
              id={String(idx)}
              className="hidden"
              onChange={({ target }) => {
                arrayListItemHandler(Number(target.value), target.checked);
              }}
              checked={checkNum.includes(number)}
            />
            <label
              htmlFor={String(idx)}
              className={`inline-block h-[1.875rem] w-[1.875rem] cursor-pointer rounded-full  text-center 
            font-semibold leading-[1.875rem] text-black ${
              checkNum.includes(number) ? "bg-point/[.6]" : "bg-white"
            } `}
            >
              {number}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-[1rem] flex w-[100%] justify-between">
        <button
          className="w-[38%] rounded-full bg-gray_2 py-[0.7rem] text-sm text-gray_3"
          onClick={resetHandler}
        >
          초기화
        </button>
        <button
          className={`w-[60%]  rounded-full py-[0.7rem] text-sm font-semibold text-white ${
            checkNum.length > 0 ? "bg-point" : "bg-gray_4"
          }`}
          onClick={numChoiceHandler}
        >
          적용하기
        </button>
      </div>
    </div>
  );
}
