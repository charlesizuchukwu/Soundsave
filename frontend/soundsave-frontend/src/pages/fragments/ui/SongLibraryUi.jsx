import { IoMdDownload } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { errorMsg } from "../../../helper/errorMsg";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useOutletContext } from "react-router-dom";
import { FaFaceFrown } from "react-icons/fa6";
import { PiWarningOctagonFill } from "react-icons/pi";
import { FaLaptopHouse } from "react-icons/fa";
import ScaleLoader from "react-spinners/ScaleLoader";
import fileDownload from "js-file-download";
import { AudioPlayer } from "react-audio-play";
import useRouteProtect from "../../../hooks/useRouteProtect";
import songlib from "../../../assets/songlib.jpg";

// import { errorMsg } from "../../../helper/errorMsg";

export default function SongLibraryUi() {
  const [serverData, setServerData] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useOutletContext();
  const axiosPrivate = useAxiosPrivate();

  console.log(auth);

  // useRouteProtect(auth?.accessToken, setIsAllowed);
  const download = async (id, name) => {
    console.log(id, name);
    try {
      setIsLoading(true);
      const response = await axios(`/downloadsong/${id}/${name}`, {
        responseType: "blob",
      });

      // window.open(`http://127.0.0.1:5000/${id}/${name}`);
      console.log(response);
      fileDownload(response?.data, name);
      if (response.status > 201) {
        console.log(response?.data?.message);
      }
    } catch (error) {
      const err = errorMsg(error);
      console.log(err);
      setErrMsg(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSong = async (id) => {
    console.log(id);
    try {
      setIsLoading(true);
      const response = await axiosPrivate.delete(`/deletesong/${id}`);
      console.log(response);
      if (response.status > 201) {
        console.log(response?.data?.message);
      }
    } catch (error) {
      const err = errorMsg(error);
      console.log(err);
      // setErrMsg(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      console.log(auth?.id);
      const apiHeader = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      // const apiData = {
      //   id: auth?.id,
      // };
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(
          `/getsingleartistsongs`,

          apiHeader
        );

        console.log(response);

        if (response.status > 200) {
          setErrMsg(response?.data?.message);
        }

        isMounted &&
          response.status === 200 &&
          setServerData((serverData) => ({
            ...serverData,
            songs: response.data,
          }));
      } catch (error) {
        const err = errorMsg(error);
        setErrMsg(err);
        console.log(err);
        // navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const songList = [
    { name: "bless me", id: 1 },
    { name: "we rise", id: 2 },
    { name: "dem all", id: 3 },
    { name: "clear pass", id: 4 },
  ];

  // const songData =
  let { songs: data } = serverData;
  let artistSongs = data?.songs;

  console.log(typeof artistSongs);

  console.log(errMsg);

  const hostedbaserUrl = "https://soundsave-server.vercel.app/downloadsong";
  const localbaseurl = "http://127.0.0.1:5000/downloadsong";

  const content = (
    <main
      className="w-full min-h-screen    text-white   text-center  bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${songlib})` }}
    >
      {/* <div className="h-[5rem]  text-yellow-400  bg-gradient-to-tr from-black  from-50% to-gray-500  ">
        <h1 className=" ">Artist-name's songs </h1>
      </div> */}

      {isLoading && (
        <ScaleLoader
          color="white"
          className="mx-auto"
          cssOverride={{ height: "500", width: "500" }}
        />
      )}

      <section className=" w-[95%]  mx-auto  grid grid-cols-1 md:grid-cols-2  gap-3 ">
        {isLoading === false && artistSongs && artistSongs.length != 0 ? (
          artistSongs.map((data) => (
            <div
              key={data._id}
              className=" min-w-[90%] min-h-[5rem]  mx-auto   text-yellow-500  bg-opacity-80  flex flex-col justify-center gap-3 p-2  items-center  mt-3  bg-black  border-2 border-white  shadow-md shadow-gray-500 rounded-[1.6rem]"
            >
              <div>
                <h1 className="capitalize  text-[0.9rem] font-bold  mb-2">
                  &#9836; {data.filename}
                </h1>
                <AudioPlayer
                  src={`${hostedbaserUrl}/${data?._id}/${data?.name}`}
                />
              </div>
              <div className=" min-w-[60%]  mx-auto  flex justify-between  gap-4 items-center">
                <button
                  onClick={() => {
                    download(data?._id, data?.filename);
                  }}
                  className="text-green-500  border-2 border-gray-400 p-1 shadow-md shadow-green-400  rounded-md"
                >
                  <IoMdDownload className="inline  animate-pulse   " /> Download
                </button>
                <button
                  onClick={() => {
                    deleteSong(data?._id);
                  }}
                  className="text-red-500  border-2 border-gray-400 p-1 shadow-md shadow-red-400  rounded-md"
                >
                  {" "}
                  <MdDeleteForever className="inline" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : errMsg && isLoading === false ? (
          <p className="text-yellow-500 mx-auto">
            <PiWarningOctagonFill className="inline text-yellow-400  text-[1.5rem]" />{" "}
            {errMsg}
          </p>
        ) : (
          isLoading === false &&
          typeof artistSongs === "undefined" && (
            <p className="text-white mx-auto animate-pulse">
              {" "}
              Loading Songs....
            </p>
          )
        )}
      </section>
    </main>
  );

  // return isAllowed === true && content;
  return content;
}
