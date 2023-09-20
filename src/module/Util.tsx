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

// 3번째 자리마다 , 찍기
export const getEraseFourDigits = (data: number | undefined) => {
  if (data === undefined) {
    data = 0;
  }
  const result = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return result;
};

// 날짜포맷 **년 **월 **일
export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const year = date.getFullYear().toString().slice(-2); // 뒤에서 두 자리만 사용
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1 필요
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}년 ${month}월 ${day}일`;
};

export const formatMoney = (money: number) => {
  const hundredMillion = Math.trunc(money / 10_000_000);
  if (hundredMillion == 0) {
    return `${money % 1_000}천 만원`;
  }
  return `${hundredMillion}억원`;
};
