import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";

export default function SongUploadUi() {
  const [file, setFile] = useState();
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData
      );
      console.log(response);
    } catch (error) {
      //   throw new Error(error);
      console.log(error);
    }
  };
  const content = (
    <main className="w-full min-h-screen  flex justify-center items-center">
      <form
        action=""
        className="w-[90%]  min-h-[10rem]  overflow-hidden  flex flex-col gap-4 p-3 "
      >
        <div className="  w-[80%]  mx-auto flex flex-col gap-3 text-center ">
          <label htmlFor="filename" onChange={(e) => e.target.files[0]}>
            Please select the song file you wish to upload.
          </label>
          <input type="file" className="text-yellow-500" />
        </div>

        <button
          onClick={upload}
          className="min-w-[50%] p-5  text-[1.1rem] mx-auto flex justify-around gap-3 items-center  rounded-md tracking-wide bg-green-700"
        >
          Upload now <FaUpload />
        </button>
      </form>
    </main>
  );

  return content;
}
