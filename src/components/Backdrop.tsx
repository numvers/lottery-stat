import classes from "../styles/Backdrop.module.css";

type BackDropType = {
  children: React.ReactNode;
};

export default function Backdrop({ children }: BackDropType) {
  return <div className={`${classes.backdrop} sm:w-screen md:w-[22.5rem]`}>{children}</div>;
}
