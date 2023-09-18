import { ReactNode } from "react";
import NavBar from "./NavBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex justify-center items-center">
      <div className="container  w-[500px]  bg-num-yellow sm:w-screen">
        {children}
      </div>
    </div>
  );
}
