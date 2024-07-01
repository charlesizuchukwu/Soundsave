import singer from "../assets/singernobg.png";
import { domain } from "../data";

export default function LandingPage() {
  const content = (
    <main className="min-h-screen w-full  flex flex-col">
      <section
        className={` w-full min-h-[10rem]  bg-[#0a572a] text-white relative  pt-1 px-2`}
      >
        <h2 className=" w-[8rem]  absolute  right-3 text-center">
          <b>What's next in music is first on {domain}</b>
        </h2>
        <img src={singer} alt="singer" height={500} width={500} className="" />
      </section>
      <section className="w-full  h-[10rem]    bg-[#1c2121] text-white">
        <h3 className=" w-[80%]  text-center  mx-auto h-[5rem] my-3  font-semibold  tracking-wide">
          {" "}
          Explore the trending tracks on {domain}
        </h3>
      </section>
    </main>
  );

  return content;
}
