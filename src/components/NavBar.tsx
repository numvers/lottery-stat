import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

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
      img: "/img/icon_nav_search.svg",
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

  return (
    <nav>
      <div className="fixed bottom-0 z-50 h-[4.375rem] rounded-t-[1.25rem] bg-black/[.6] backdrop-blur-[0.625rem] sm:w-screen md:w-[22.5rem]">
        <ul className="mt-[0.75rem]">
          {navMenu.map((menu, idx) => {
            return (
              <Link key={idx} href={menu.path}>
                <li
                  className={`float-left grid h-[3.125rem] w-[25%] cursor-pointer place-items-center text-xs ${
                    router.pathname.endsWith(menu.path)
                      ? "text-white"
                      : "text-white/[.5]"
                  }`}
                >
                  <Image
                    src={menu.img}
                    alt="img"
                    width={20}
                    height={23}
                    className={`${
                      router.pathname.endsWith(menu.path)
                        ? "opacity-100"
                        : "opacity-50"
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
