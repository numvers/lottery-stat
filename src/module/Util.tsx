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

// 금액 단위 한글로 변환하기
export const getNumberToKorean = (amount: number | undefined): string => {
  // amount가 undefined인 경우, 기본값으로 0을 사용하도록 설정
  if (amount === undefined) {
    amount = 0;
  }

  const kor1 = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const kor2 = ["", "십", "백", "천"];
  const kor3 = ["만", "억", "조", "경"];

  let strVal: string = amount.toString();

  strVal =
    strVal.length > 4
      ? (Math.floor(amount / 1000) * 1000).toString() // 억이 넘어가면 '00억 0천만'까지만
      : strVal.length > 3
      ? (Math.floor(amount / 100) * 100).toString() // 천만 단위라면 '0천0백만'까지만
      : amount.toString();

  const strLen = strVal.length;
  let strRet = "";

  for (let i = 0; i < strLen; i++) {
    const c = strVal[i];
    const n = parseInt(c);

    const digit = strLen - i - 1;
    if (n > 0) {
      strRet += kor1[n] + kor2[digit % 4];
    }

    if (digit % 4 === 0 && strRet[strRet.length - 1] !== " ") {
      strRet += kor3[digit / 4];
    }
  }

  return strRet.replace("억만", "억");

  // function numberFormat(x: number) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }

  // let inputNumber = "";

  // if (number === null || number === 0 || number === undefined) {
  //   inputNumber = "0";
  // } else {
  //   inputNumber = number < 0 ? "false" : number.toString();
  // }

  // const unitWords = ["만", "억", "조"];
  // const splitUnit = 10000;
  // const splitCount = unitWords.length;
  // const resultArray = [];
  // let resultString = "";

  // for (let i = 0; i < splitCount; i++) {
  //   let unitResult =
  //     (parseFloat(inputNumber) % Math.pow(splitUnit, i + 1)) /
  //     Math.pow(splitUnit, i);
  //   unitResult = Math.floor(unitResult);
  //   if (unitResult > 0) {
  //     resultArray[i] = unitResult;
  //   }
  // }

  // if (resultArray.length === 0 || resultArray === undefined) {
  //   resultString = "0";
  // } else {
  //   for (let j = 0; j < resultArray.length; j++) {
  //     // let으로 변경
  //     if (!resultArray[j]) continue;
  //     resultString =
  //       String(numberFormat(resultArray[j])) + unitWords[j] + resultString;
  //   }
  // }

  // return resultString;
};
