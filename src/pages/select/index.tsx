import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Autoplay, Mousewheel, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../node_modules/swiper/modules/pagination/pagination.min.css";
import "../../../node_modules/swiper/swiper.min.css";
import UserLottery from "../../components/UserLottery";
import { api } from "../../utils/api";

export default function Home() {
  const router = useRouter();
  // 검색 정규화 번호-번호-번호- 이렇게 그냥 집어넣기 10-200-30-40 이여도 상관없음
  const query = api.lottery.findLottery.useQuery();
  const active =
    "gradient-container flex h-[3.75rem] w-[65%] items-center justify-between rounded-full pl-[1.2rem] pr-[0.63rem] text-center text-md font-semibold";
  const disabled =
    "h-[3.75rem] w-[32%] rounded-full bg-gray_4 text-md font-semibold ";

  const [nowClick, setnowClick] = useState("universe");

  return (
    <>
      <main className="pb-20 sm:w-screen  md:w-[22.5rem]">
        <div className="relative w-[100%] px-[1.25rem]">
          <div className="flex h-[3.75rem] items-center">
            <Image src="/img/logo.png" alt="img" width={82} height={30} />
          </div>
          <Swiper
            className="ten-swiper"
            direction={"horizontal"}
            slidesPerView={1}
            spaceBetween={5}
            modules={[Pagination, Mousewheel, Autoplay]}
            allowTouchMove
            threshold={20}
            speed={800}
            autoplay={{ delay: 2800 }}
            loop={true}
          >
            <SwiperSlide className="ten-swiper-slide">
              <TitleCard_1 />
            </SwiperSlide>
            <SwiperSlide className="ten-swiper-slide">
              <TitleCard_2 />
            </SwiperSlide>
          </Swiper>
          <div className="flex justify-between">
            <button
              className={`${nowClick === "universe" ? active : disabled} `}
              onMouseEnter={() => setnowClick("universe")}
              onClick={() => router.push("/")}
            >
              {nowClick === "universe" ? (
                <>
                  우주 추천 하러가기
                  <Image
                    src="/img/img_arrow_diagonal.svg"
                    alt="img"
                    width={40}
                    height={40}
                    className="float-right ml-[0.25rem]"
                  />
                </>
              ) : (
                "우주 추천"
              )}
            </button>
            <button
              className={`${nowClick === "universe" ? disabled : active} `}
              onMouseEnter={() => setnowClick("direct")}
              onClick={() => router.push("/")}
            >
              {nowClick === "universe" ? (
                "직접 생성"
              ) : (
                <>
                  직접 생성 하러가기
                  <Image
                    src="/img/img_round_plus_bright.svg"
                    alt="img"
                    width={40}
                    height={40}
                    className="float-right ml-[0.25rem]"
                  />
                </>
              )}
            </button>
          </div>
        </div>
        <div className="my-[1.87rem] h-[0.375rem] bg-[#6362624D]/[.3] sm:w-screen md:w-[22.5rem]" />
        <div className="px-[1.25rem]">
          <h1 className="mb-[1.25rem] flex items-center justify-between text-[1.375rem] font-semibold">
            실시간 우주 생성 번호
            <span
              className="float-right cursor-pointer text-sm"
              onClick={() => router.push("/select/list")}
            >
              모두보기
            </span>
          </h1>
          {query.data?.map((v, i) => (
            <UserLottery
              key={i}
              numbers={[v.first, v.second, v.third, v.forth, v.fifth, v.sixth]}
              bonus={false}
              menu={v.type}
              created_at={v.createdAt}
              nickname={v.nickname}
            ></UserLottery>
          ))}
        </div>
      </main>
    </>
  );
}

export function TitleCard_1() {
  return (
    <>
      <div className="mb-[0.63rem] h-[13rem] rounded-[1.25rem] bg-[#E2DFFB] p-[1.25rem] text-black">
        <div className="mb-[0.5rem] flex justify-between">
          <h1 className="text-xxl font-bold text-point">우주 Pick! 행운넘버</h1>
          <h3 className="font-xs rounded-full bg-point/[.2] px-[0.75rem] py-[0.12rem] font-semibold leading-[1.25rem] text-point ">
            1/2
          </h3>
        </div>
        <span className="text-sm font-semibold">우추추천이란?</span>
        <div className="flex justify-center">
          <Image
            src="/img/img_ball_com_1.svg"
            alt="img"
            width={250}
            height={0}
            className="py-[0.94rem]"
          />
        </div>
        <h3 className="text-center text-[0.75rem]">
          <b>당첨번호</b>와 <b>선호 번호 생성 데이터</b>에 기반한 서비스입니다.
        </h3>
      </div>
    </>
  );
}

export function TitleCard_2() {
  return (
    <>
      <div className="mb-[0.63rem] h-[13rem] rounded-[1.25rem] bg-[#E2DFFB] p-[1.25rem] text-black">
        <div className="mb-[0.5rem] flex justify-between">
          <h1 className="text-xxl font-bold text-point">My lotto! </h1>
          <h3 className="font-xs rounded-full bg-point/[.2] px-[0.75rem] py-[0.12rem] font-semibold leading-[1.25rem] text-point ">
            2/2
          </h3>
        </div>
        <span className="text-sm font-semibold">
          내가 직접 채우는 나만의 번호 뽑기
        </span>
        <div className="flex justify-center">
          <Image
            src="/img/img_ball_com_2.svg"
            alt="img"
            width={250}
            height={0}
            className="py-[0.94rem]"
          />
        </div>
        <h3 className="text-center text-[0.75rem]">
          다양한 방법으로 <b>로또 번호를 생성</b>해 볼 수 있어요.
        </h3>
      </div>
    </>
  );
}
