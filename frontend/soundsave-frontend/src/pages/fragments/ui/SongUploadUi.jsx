import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "../../../api/axios";
import { useOutletContext } from "react-router-dom";
// import { useForm } from "react-hook-form";
import ScaleLoader from "react-spinners/ScaleLoader";
import { errorMsg } from "../../../helper/errorMsg";
import useRouteProtect from "../../../hooks/useRouteProtect";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import uploadsong from "../../../assets/uploadsong.jpg";

export default function SongUploadUi() {
  const [file, setFile] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [errMsg, setErrMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  // const { register, handleSubmit } = useForm();

  const { auth } = useOutletContext();

  console.log(auth?.id);

  useRouteProtect(auth?.accessToken, setIsAllowed);

  const upload = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = axiosPrivate.post(
        `/upload`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Credentials": true,
            withCredentials: true,
          },
        }
      );
      const serverRes = await res;
      console.log(serverRes);
      if (serverRes?.status > 201) {
        setErrMsg(
          serverRes?.data?.message ? serverRes?.data?.message : serverRes?.data
        );
      }
      if (serverRes.status === 201) {
        setSuccessMsg(serverRes?.data?.message);
      }
      // console.log(data);
    } catch (error) {
      const err = errorMsg(error);
      console.log(err);
      setErrMsg(err);
    } finally {
      setIsLoading(false);
    }
  };

  const content = (
    <main
      className="w-full min-h-screen  flex justify-center items-center  bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${uploadsong})` }}
    >
      <form
        // onSubmit={handleSubmit(onSubmit)}
        // encType="multipart/form-data"
        className="w-[90%]  min-h-[10rem]  rounded-[2rem]    bg-black bg-opacity-70  overflow-hidden  flex flex-col gap-4 p-3 "
      >
        {isLoading ? (
          <ScaleLoader
            color="white"
            className="mx-auto"
            cssOverride={{ height: "500", width: "500" }}
          />
        ) : errMsg ? (
          <p className="error-msg-style ">{errMsg}</p>
        ) : (
          successMsg && (
            <p className="text-green-500 text-center tracking-wide ">
              &#10003; {successMsg}
            </p>
          )
        )}
        <div className="  w-[80%]  mx-auto flex flex-col gap-3 text-center ">
          <label
            htmlFor="song"
            className=" w-[80%] sm:w-[80%]  text-black  mx-auto  rounded-r-lg p-2 bg-gradient-to-r from-transparent to-white      px-3 text-[1rem] sm:text-[2rem]  my-[3rem]    uppercase tracking-wide font-serif"
          >
            {" "}
            Upload Song{" "}
          </label>
          <p className="w-[90%] mx-auto text-[0.9rem]  tracking-wide">
            With Soundsave, you can confidently share your music without
            worrying about unauthorized access or leaks.
          </p>
          <hr className="w-[50%]  mx-auto my-[1rem]" />
          <input
            type="file"
            // {...register("song")}
            name="song"
            className="text-yellow-500"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          onClick={upload}
          disabled={isLoading}
          className="min-w-[50%] px-3 py-2  my-3  text-[1.1rem] mx-auto flex justify-around gap-3 items-center  hover:border-2 hover:border-white transition-all duration-200   rounded-md tracking-wide bg-green-700"
        >
          Upload now <FaUpload />
        </button>
      </form>
    </main>
  );

  return isAllowed === true && content;
}
