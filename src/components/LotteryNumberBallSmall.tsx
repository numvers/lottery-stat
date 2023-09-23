import Image from "next/image";

export const getColorClass = (item: number) => {
  if (item <= 10) return "yellow";
  if (item <= 20) return "blue";
  if (item <= 30) return "red";
  if (item <= 40) return "black";
  return "green";
};

export const renderNumberBall = (item: number, idx: number) => {
  const numColor = getColorClass(item);

  return (
    <div
      key={idx}
      className="relative float-left mx-[0.1875rem] flex h-[1.5rem] w-[1.5rem] items-center justify-center"
    >
      <h1 className="absolute z-10 text-xs font-semibold">{item}</h1>
      <Image
        src={`/img/ball_${numColor}.svg`}
        alt="img"
        width={32}
        height={32}
      />
    </div>
  );
};

export default function LotteryNumberBallSmall({
  numbers,
  bonus,
}: {
  numbers: number[];
  bonus: boolean;
}) {
  return (
    <div className="flex justify-center text-black">
      {numbers.slice(0, 6).map((item, idx) => renderNumberBall(item, idx))}
      {!bonus && (
        <>
          <Image src="/img/icon_plus.svg" alt="img" width={12} height={12} />
          {numbers.slice(6, 7).map((item, idx) => renderNumberBall(item, idx))}
        </>
      )}
    </div>
  );
}
