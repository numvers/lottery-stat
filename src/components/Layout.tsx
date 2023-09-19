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
      <div className=" m-auto min-h-screen  w-[500px] bg-black text-white">
        <div>{children}</div>
        <NavBar />
      </div>
    </>
  );
}
