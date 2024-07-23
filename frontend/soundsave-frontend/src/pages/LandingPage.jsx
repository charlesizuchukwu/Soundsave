import singer from "../assets/singernobg.png";
import { domain } from "../data";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import { errorMsg } from "../helper/errorMsg";
import { Link } from "react-router-dom";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { SiYoutubemusic } from "react-icons/si";
import { IoSearchSharp } from "react-icons/io5";

export default function LandingPage() {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [allSongs, setAllsongs] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const [searchData, setSearchData] = useState("");

  // FOR CAROUSEL config

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    className: "flex ",
  };

  // FOR CAROUSELS DIFFERENT SCREEN VIEWS

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const handleWidthResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWidthResize);

    const fetchData = async () => {
      let searchDataArray = [];
      try {
        setLoading(true);
        const serverRes = await axios.get("/getallsongs", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(serverRes);
        if (serverRes.status > 200) {
          setErr(
            serverRes?.data?.message
              ? serverRes?.data?.message
              : serverRes?.data
          );
        }

        if (
          searchData &&
          searchData.length > 0 &&
          typeof serverRes?.data?.allSongFile !== "undefined" &&
          serverRes?.data?.allSongFile.length != 0
        ) {
          serverRes?.data?.allSongFile.map((data) => {
            if (data?.filename.includes(searchData)) {
              searchDataArray.push(data);
            }
          });
        }

        setAllsongs(
          searchDataArray.length > 0
            ? searchDataArray
            : serverRes?.data?.allSongFile
        );
      } catch (error) {
        const err = errorMsg(error);

        setErr(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => window.removeEventListener("resize", handleWidthResize);
  }, [searchData, setAllsongs]);

  console.log(allSongs);
  console.log(width);
  console.log(searchData);

  const content = (
    <main className="min-h-screen w-full  flex flex-col">
      <section
        className={` w-full min-h-[10rem] bg-gradient-to-r from-gray-600    to-[#0a572a] text-white relative  pt-1 px-2`}
      >
        <h2 className=" w-[8rem]   tracking-wide font-bold lg:text-[1.7rem] xl:text-[2rem] lg:w-fit absolute lg:mt-[5rem]  lg:mr-[2.9rem] xl:mr-[6rem] right-3 text-center  text-opacity-50">
          What's next in music is first on{" "}
          <span className="underline underline-offset-2 font-black tracking-wider">
            {" "}
            {domain}
          </span>
        </h2>
        {/* <p className=" w-fit  absolute lg:bottom-3  right-0 lg:mb-[5rem]  lg:mr-[2.9rem] text-center ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident,
          unde.
        </p> */}
        <img src={singer} alt="singer" height={500} width={500} className="" />
      </section>
      <section className="w-full  min-h-[10rem]    bg-[#1c2121] text-white">
        <h3 className=" w-[80%]  text-center  mx-auto  my-3  font-semibold  tracking-wide">
          {" "}
          Explore the trending tracks on {domain}
        </h3>
        <form
          action=" "
          className="w-[80%] lg:max-w-[20rem] mx-auto  flex justify-center items-center border-2 border-gray-300 rounded-md p-1 mb-2"
        >
          <IoSearchSharp className="text-[1.2rem]  text-white" />

          <input
            type="text"
            className="w-[80%] mx-auto p-1 text-black rounded-md  block"
            placeholder="Search for artists or songs. "
            onChange={(e) => {
              setSearchData(e.target.value);
            }}
            name="search"
          />
        </form>
        <div className="w-[98%] p-1  h-[15rem]  mx-auto  flex  justify-around   gap-5   items-center   overflow-x-scroll   bg-gradient-to-l from-gray-500   to-[#0a572a]  ">
          {/* <Carousel
            responsive={responsive}
            centerMode={true}
            swipeable={true}
            infinite={true}
            shouldResetAutoplay={true}
            showDots={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="all .9"
            transitionDuration={1000}
            deviceType={
              width && width >= 464
                ? "mobile"
                : width >= 1024
                ? "tablet"
                : "desktop"
            }
            ssr={true}
            containerClass="caousel-container"
            className="w-[99%] h-[98%]    bg-[#0a572a] mx-auto  text-black  grid place-content-center"
          > */}
          {/* <div className="slide-unit">slide 1</div> */}
          {allSongs && allSongs.length != 0 ? (
            allSongs.map((data) => (
              <div
                key={data._id}
                className=" min-w-full sm:min-w-[10rem] h-[85%]  bg-black text-white   text-center   rounded-[1.2rem]  p-2  shadow-md shadow-gray-500"
              >
                <Link
                  to={`/song/${data?._id}/${data?.filename}`}
                  className="w-full  h-full  flex flex-col  gap-3 justify-center items-center  rounded-[1.2rem] "
                >
                  <SiYoutubemusic className="text-[2rem] text-green-500  mx-auto" />
                  <b className=" min-w-[5rem] text-white text-[0.9rem]">
                    {data.filename}
                  </b>
                </Link>
              </div>
            ))
          ) : typeof allSongs == "undefined" ? (
            <b className="mx-auto text-center text-[1.1rem] text-red-500 tracking-wide">
              Network error, please try again when connected to the internet.
            </b>
          ) : (
            <p>No song available</p>
          )}
          {/* </Carousel> */}
        </div>
      </section>
    </main>
  );

  return content;
}
