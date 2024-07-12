import singer from "../assets/singernobg.png";
import { domain } from "../data";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";


export default function LandingPage() {



  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
   useEffect(() => {
    const fetchData = async () => {
      try {
        
      } catch (error) {
        setErr(err)
        
      }
    };

    fetchData();
  }, []);

  

  const content = (
    <main className="min-h-screen w-full  flex flex-col">
      <section
        className={` w-full min-h-[10rem]  bg-[#0a572a] text-white relative  pt-1 px-2`}
      >
        <h2 className=" w-[8rem]  absolute  right-3 text-center  text-opacity-50">
          <b>What's next in music is first on {domain}</b>
        </h2>
        <img src={singer} alt="singer" height={500} width={500} className="" />
      </section>
      <section className="w-full  min-h-[10rem]    bg-[#1c2121] text-white">
        <h3 className=" w-[80%]  text-center  mx-auto h-[5rem] my-3  font-semibold  tracking-wide">
          {" "}
          Explore the trending tracks on {domain}
        </h3>
        <div className="w-[90%]  bg-red-500 min-h-52  mx-auto flex justify-around gap-4 items-center    overflow-scroll">
          <div className="slide-unit">slide 1</div>
          <div className="slide-unit">slide 2</div>
          <div className="slide-unit">slide 3</div>
          <div className="slide-unit">slide 4</div>
          <div className="slide-unit">slide 5</div>
          <div className="slide-unit">slide 5</div>
          <div className="slide-unit">slide 5</div>
          <div className="slide-unit">slide 5</div>
          <div className="slide-unit">slide 5</div>
        </div>
      </section>
    </main>
  );

  return content;
}
