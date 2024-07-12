import { IoMdDownload } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import { errorMsg } from "../../../helper/errorMsg";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

export default function SongLibraryUi() {
  const [songs, setSongs] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      const apiHeader = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get("/getsingleartistsongs", {
          signal: controller.signal,
        });

        isMounted && response.status === 200 && setSongs(response.data);
      } catch (error) {
        const err = errorMsg(error);
        console.log(err);
        // setErrMsg(err);
        // navigate("/login", { state: { from: location }, replace: true });
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

  console.log(songs);

  const content = (
    <main className="w-full min-h-screen    text-white   text-center">
      <div className="h-[5rem]  text-yellow-400  bg-gradient-to-tr from-black  from-50% to-gray-500  ">
        <h1 className=" ">Artist-name's songs </h1>
      </div>
      <section className=" w-[95%]  mx-auto  grid grid-cols-1 md:grid-cols-2  gap-3 ">
        {songList.map((data) => (
          <div
            key={data.id}
            className=" min-w-[80%]  mx-auto   text-yellow-600  flex flex-col justify-center  items-center  mt-3  border-b-2 border-b-white "
          >
            <p className="capitalize  text-xl  mb-2"> &#9836; {data.name}</p>
            <div className=" min-w-[60%]  mx-auto  flex justify-between  gap-4 items-center">
              <button className="text-green-500  border-2 border-gray-400 p-1 shadow-md shadow-gray-300  rounded-md">
                <IoMdDownload className="inline     " /> Download
              </button>
              <button className="text-red-500  border-2 border-gray-400 p-1 shadow-md shadow-gray-300  rounded-md">
                {" "}
                <MdDeleteForever className="inline" /> Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );

  return content;
}
