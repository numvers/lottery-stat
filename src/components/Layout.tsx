import { ReactNode } from "react";
import NavBar from "./NavBar";
import Seo from "./Seo";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Seo title="UJULOTTO" />
      <div className=" w-[500px] sm:w-screen m-auto  bg-black text-white h-screen">
        <div>{children}</div>
        <NavBar />
      </div>
    </>
  );
}
