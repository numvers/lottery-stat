import Image from "next/image";
import { useState } from "react";


export default function NavBar() {
  const navMenu = [
    {
      name: "홈",
      path: "/home",
      img: '/img/icon_home_fill.svg',
    },
    {
      name: "번호 검색",
      path: "/home",
      img: '/img/icon_serch_fill.svg',
    },
    {
      name: "번호 뽑기",
      path: "/home",
      img: '/img/icon_heart_fill.svg',
    },
    {
      name: "커뮤니티",
      path: "/home",
      img: '/img/icon_message_fill.svg',
    },
  ];

  const [activeTap, setActiveTap] = useState("");
  const clickHandler = (idx: number) => {
    setActiveTap(idx.toString());

    // navigate(navMenu[idx].path);
  };

  return (
    <nav>
      <div className="fixed bottom-0  z-10 h-[70px] w-[500px] rounded-t-[20px] bg-num-black/[.6] sm:w-screen ">
        <ul>
          {navMenu.map((menu, idx) => {
            return (
              <li
                key={idx}
                className="float-left grid h-[60px] w-[25%] place-items-center "
              >
                <Image src={menu.img} alt="img" width={23} height={23} />
                {menu.name}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
