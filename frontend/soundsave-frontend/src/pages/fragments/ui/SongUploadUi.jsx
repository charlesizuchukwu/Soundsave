import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "../../../api/axios";
import { useOutletContext } from "react-router-dom";
// import { useForm } from "react-hook-form";
import ScaleLoader from "react-spinners/ScaleLoader";
import { errorMsg } from "../../../helper/errorMsg";
import useRouteProtect from "../../../hooks/useRouteProtect";

export default function SongUploadUi() {
  const [file, setFile] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [errMsg, setErrMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
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
      const res = axios.post(`/upload/${auth?.id}`, formData);
      const serverRes = await res;
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
    <main className="w-full min-h-screen  flex justify-center items-center">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        // encType="multipart/form-data"
        className="w-[90%]  min-h-[10rem]  overflow-hidden  flex flex-col gap-4 p-3 "
      >
        {isLoading && (
          <ScaleLoader
            color="white"
            className="mx-auto"
            cssOverride={{ height: "500", width: "500" }}
          />
        )}

        {errMsg && <p className="error-msg-style ">{errMsg}</p>}
        {successMsg && (
          <p className="text-green-500 text-center tracking-wide ">
            &#10003; {successMsg}
          </p>
        )}
        <div className="  w-[80%]  mx-auto flex flex-col gap-3 text-center ">
          <label htmlFor="song">
            Please select the song file you wish to upload.
          </label>
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
          className="min-w-[50%] p-5  text-[1.1rem] mx-auto flex justify-around gap-3 items-center  rounded-md tracking-wide bg-green-700"
        >
          Upload now <FaUpload />
        </button>
      </form>
    </main>
  );

  return isAllowed === true && content;
}
