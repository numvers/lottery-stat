import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter();

  const navMenu = [
    {
      name: "홈",
      path: "/",
      img: "/img/icon_home.svg",
    },
    {
      name: "번호 검색",
      path: "/search",
      img: "/img/icon_search.svg",
    },
    {
      name: "번호 뽑기",
      path: "/select",
      img: "/img/icon_line_plus.svg",
    },
    {
      name: "번호저장함",
      path: "/saved",
      img: "/img/icon_storage.svg",
    },
  ];

  const [activeTap, setActiveTap] = useState(1);
  const clickHandler = (idx: number) => {
    setActiveTap(idx);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveTap(
        navMenu.findIndex((menu) => menu.path === window.location.pathname),
      );

      if (window.location.pathname === "/select/list") {
        setActiveTap(2);
      }
    }
  }, [router]);

  return (
    <nav>
      <div className="fixed bottom-0 z-50 h-[4.375rem] rounded-t-[1.25rem] bg-black/[.6] backdrop-blur-[0.625rem] sm:w-screen md:w-[22.5rem]">
        <ul className="mt-[0.75rem]">
          {navMenu.map((menu, idx) => {
            return (
              <Link key={idx} href={menu.path}>
                <li
                  className={`float-left grid h-[3.125rem] w-[25%] cursor-pointer place-items-center text-xs ${
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
              </Link>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
