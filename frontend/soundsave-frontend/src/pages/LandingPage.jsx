import singer from "../assets/singernobg.png";
import { domain, partners, whychoose, publicSongs } from "../data";
import ReactPlayer from "react-player/lazy";
import { useEffect, useState } from "react";
// import axios from "../api/axios";
import axios from "axios";
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
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import songartist from "../assets/songartist.jpg";
import choose from "../assets/choose.jpg";
import { motion } from "framer-motion";
import ReactAudioPlayer from "react-audio-player";

// import { AudioPlayer } from "react-audio-play";

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
    const fetchdata = async () => {
      const apiHeader = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await axios.get(
          "https://openwhyd.org/hot/electro?format=json",
          apiHeader
        );

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    return () => {
      fetchdata();
    };
  }, []);

  useEffect(() => {
    const handleWidthResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWidthResize);

    const fetchData = async () => {
      let searchDataArray = [];
      try {
        setLoading(true);
        console.log("start");
        const serverRes = await axios.get(
          "https://openwhyd.org/hot/electro?format=json"
        );
        console.log("done");

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
        console.log(error);
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
    <main className="min-h-screen w-full    flex flex-col  z-0">
      <section
        className={` w-full min-h-[30rem]  text-center             bg-center bg-cover bg-no-repeat `}
        style={{ backgroundImage: `url(${songartist})` }}
      >
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.6 }}
          className="w-full min-h-[30rem] bg-gradient-to-b from-transparent  to-black  bg-opacity-30      flex flex-col justify-center  gap-5 items-center "
        >
          <h1 className=" w-[90%]   text-[2rem]  md:text-[2.2rem] leading-10 capitalize text-left  font-black">
            <span className="bg-clip-text   text-transparent  bg-gradient-to-r from-blue-500 to-red-500">
              SoundSave
            </span>
            , a leading platform for musicians, producers, and creators{" "}
          </h1>
          <p className="text-[0.8rem] md:text-[1.2rem]   md:w-[40%] text-gray-300    w-[90%] tracking-wide  text-left ">
            secure file sharing, music management, and copyright protection -
            empowers artists to collaborate freely on unreleased projects while
            safeguarding their intellectual property
          </p>

          <Link
            to="/register"
            className="rounded-full font-bold  block w-[90%]  md:w-[40%]  tracking-tight sm:w-[70%] text-[0.8rem]  px-3 py-2  bg-gradient-to-r from-blue-500  to-red-500"
          >
            SIGN UP NOW
          </Link>

          <MdKeyboardDoubleArrowDown className="mx-auto text-[1.4rem]   animate-bounce " />
        </motion.div>
      </section>

      <section className="w-full min-h-full  flex flex-col  justify-center items-center gap-4">
        <motion.h2
          whileInView={{ x: 0, scale: 1 }}
          animate={{ x: -60, scale: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[1.5rem] hover:rounded-full   px-4 py-3 duration-200  hover:border-2  hover:border-white mx-auto  font-black  bg-clip-text text-transparent  bg-gradient-to-r from-blue-500   to-red-500 leaing-6 w-[90%] md:w-fit"
        >
          <span className="">Connect with our experts</span>{" "}
          <span className="animate-pulse  text-white ml-2">&#10174;</span>
        </motion.h2>

        <motion.p
          whileInView={{ x: 0 }}
          animate={{ x: -60 }}
          transition={{ duration: 0.5 }}
          className="text-[0.8rem]  w-[90%]  md:w-[50%]  text-gray-400  md:text-center md:text-[1.2rem]"
        >
          Partner with our expert advisors for seamless distribution,
          publishing, and marketing across all major platforms at the most
          competitive prices. Connect with top industry professionals to amplify
          your reach and maximize your impact in the music industry.
        </motion.p>

        <motion.ul
          whileInView={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.3 }}
          className="w-[90%] mx-auto grid sm:grid-cols-2 lg:grid-cols-3  gap-3   text-[1.5rem]  font-bold"
        >
          {partners.map((data) => (
            <li className=" ">
              <div className="flex justify-center items-center">
                {data.icon}
                {data.name}
              </div>
            </li>
          ))}
        </motion.ul>

        <Link
          to="/register"
          className="rounded-full font-bold  text-center  block w-[90%]  md:w-[40%]  tracking-tight sm:w-[70%] text-[0.8rem]  px-3 py-2  bg-gradient-to-r from-blue-500  to-red-500"
        >
          VIEW ALL 150+ STORES
        </Link>
      </section>

      <section className="w-[90%]  mx-auto  my-[2rem]  flex flex-col  md:flex-row   gap-3 justify-around items-center ">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6 }}
          className=" w-[90%] md:w-[50%]  md:text-[1.2rem]   bg-gradient-to-b from-transparent to-black"
        >
          <img
            src={choose}
            alt="tunecore"
            height={100}
            width={100}
            className="w-full h-full"
          />
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.3 }}
        >
          <h2 className="text-[1.5rem] font-bold mx-auto">
            why choose{" "}
            <span className=" bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
              SoundSave
            </span>
          </h2>
          <ul className="list-disc  list-inside trackng-wide leading-7 font-bold text-[0.8rem]   md:text-[1.2rem]">
            {whychoose.map((data) => (
              <li key={data.id}>{data.name}</li>
            ))}
          </ul>
        </motion.div>
      </section>

      <section className="w-full  min-h-[10rem]  my-[2rem]  ">
        <h3 className=" w-[80%] text-center  text-[1.5rem]  mx-auto  my-3  font-semibold  tracking-wide">
          {" "}
          Explore the trending tracks on{" "}
          <span className=" bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
            {domain}
          </span>
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
        <div className="w-[90%] p-1  h-[15rem] rounded-[1.rem] mx-auto  flex  justify-around   gap-5   items-center   overflow-x-scroll   bg-gradient-to-b from-transparent  to-gray-900  ">
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
          {publicSongs.map((data) => (
            <div
              key={data.id}
              className=" min-w-full sm:min-w-[10rem] h-[85%]  bg-black text-white   text-center   rounded-[1.2rem]  p-2  shadow-md shadow-gray-500"
            >
              {/* <Link
                  to={`/song/${data?._id}/${data?.filename}`}
                  className="w-full  h-full  flex flex-col  gap-3 justify-center items-center  rounded-[1.2rem] "
                >
                  <SiYoutubemusic className="text-[2rem] text-green-500  mx-auto" />
                  <b className=" min-w-[5rem] text-white text-[0.9rem]">
                    {data.filename}
                  </b>
                </Link> */}

              {/* <div className="w-[80%] sm:w-[60%]  mx-auto  bg-white"> */}
              <ReactPlayer url={data.url} width="100%" height="100%" />
              {/* </div> */}
            </div>
          ))}
          {/* </Carousel> */}
        </div>
      </section>
    </main>
  );

  return content;
}
