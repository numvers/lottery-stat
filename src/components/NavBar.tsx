import Image from "next/image";
import { useState } from "react";

export default function NavBar() {
  const navMenu = [
    {
      name: "홈",
      path: "/",
      img: "/img/icon_home.svg",
    },
    {
      name: "번호 검색",
      path: "/serch",
      img: "/img/icon_serch.svg",
    },
    {
      name: "번호 뽑기",
      path: "/select",
      img: "/img/icon_heart.svg",
    },
    {
      name: "커뮤니티",
      path: "/community",
      img: "/img/icon_message.svg",
    },
  ];

  const [activeTap, setActiveTap] = useState(0);
  const clickHandler = (idx: number) => {
    setActiveTap(idx);
  };

  return (
    <nav>
      <div className="fixed bottom-0 z-10 h-[70px] w-[500px] rounded-t-[20px] bg-black/[.6] backdrop-blur-[10px]">
        <ul className="mt-[12px]">
          {navMenu.map((menu, idx) => {
            return (
              <li
                key={idx}
                className={`float-left grid h-[50px] w-[25%] cursor-pointer place-items-center text-xs ${
                  activeTap === idx ? "text-white" : "text-white/[.5]"
                }`}
                onClick={() => clickHandler(idx)}
              >
                <Image
                  src={menu.img}
                  alt="img"
                  width={20}
                  height={23}
                  className={`${
                    activeTap === idx ? "opacity-100" : "opacity-50"
                  }`}
                />
                {menu.name}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
