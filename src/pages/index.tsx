import Seo from "components/Seo";

export default function Home() {
  return (
    <>
      <Seo title="numbers" />
      <main className="bg-num-yellow flex h-screen flex-col items-center justify-center">
        <div className="sm:bg-num-blue md:bg-num-red bg-num-green container flex h-screen  w-[500px]  flex-col items-center justify-center sm:w-screen">
          테스트
        </div>
      </main>
    </>
  );
}
