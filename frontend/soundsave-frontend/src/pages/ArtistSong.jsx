import { useParams } from "react-router-dom";
import { ImMusic } from "react-icons/im";
import { GiMusicalScore } from "react-icons/gi";
import { MdLibraryMusic } from "react-icons/md";
import { AudioPlayer } from "react-audio-play";
import { IoMdDownload } from "react-icons/io";
import { errorMsg } from "../helper/errorMsg";
import fileDownload from "js-file-download";
import axios from "../api/axios";
import { useState } from "react";

export default function ArtistSong() {
  const { songId, songName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

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

  console.log(songId, songName);

  const content = (
    <main className="min-h-screen  w-full  flex justify-center  items-center">
      <section className="w-[98%] lg:max-w-[25rem] h-[20rem]   border-2 border-white  shadow-md shadow-gray-500  rounded-[2rem] flex flex-col justify-around items-center p-1 m-2">
        {/* <div className="     border-2 border-white"> */}
        <ImMusic className="  text-[12rem]  mx-auto  " />
        {/* </div> */}
        <div>
          <h1 className="capitalize  text-[1.1rem] font-bold  mb-2">
            &#9836; {songName}
          </h1>
          <AudioPlayer
            src={`https://soundsave-server.app/downloadsong/${songId}/${songName}`}
          />
        </div>
        <button
          onClick={() => {
            download(songId, songName);
          }}
          className=" min-w-max  text-green-500 mx-auto  border-2 border-gray-400 p-2 my-2 shadow-md shadow-green-400  rounded-md"
        >
          <IoMdDownload className="inline animate-pulse    " /> Download
        </button>
      </section>
    </main>
  );

  return content;
}
