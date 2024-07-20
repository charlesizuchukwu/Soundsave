import { useParams } from "react-router-dom";
import { ImMusic } from "react-icons/im";
import { GiMusicalScore } from "react-icons/gi";
import { MdLibraryMusic } from "react-icons/md";
import { AudioPlayer } from "react-audio-play";

export default function ArtistSong() {
  const { songId, songName } = useParams();

  console.log(songId, songName);

  const content = (
    <main className="min-h-screen  w-full  flex justify-center  items-center">
      <section className="w-[98%] h-[20rem]   border-2 border-white  shadow-md shadow-gray-500  rounded-[2rem] flex flex-col justify-around items-center p-1 m-2">
        {/* <div className="     border-2 border-white"> */}
        <ImMusic className="  text-[12rem]  mx-auto  " />
        {/* </div> */}
        <div>
          <h1 className="capitalize  text-[1.1rem] font-bold  mb-2">
            &#9836; {songName}
          </h1>
          <AudioPlayer
            src={`http://127.0.0.1:5000/downloadsong/${songId}/${songName}`}
          />
        </div>
      </section>
    </main>
  );

  return content;
}
