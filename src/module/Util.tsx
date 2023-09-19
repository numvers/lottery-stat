// 오늘부터 복권당첨일까지 남은 시간을 구하는 함수
export const calculateTimeRemaining = (): string => {
  const now: Date = new Date();
  const saturday: Date = new Date(now);
  saturday.setDate(now.getDate() + (6 - now.getDay())); // 토요일로 이동
  saturday.setHours(20, 45, 0, 0); // 오후 8시 45분으로 설정

  const timeDifference: number = saturday.getTime() - now.getTime();
  const days: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours: number = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes: number = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
  );

  return `${days}일 ${hours}시간 ${minutes}분`;
};
