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
      <form action="" className="w-[80%] bg-green-500">
        <div>
          <label htmlFor="filename" onChange={(e) => e.target.files[0]}>
            Choose a file
          </label>
          <input type="file" />
        </div>

        <button onClick={upload}>
          Upload <FaUpload />
        </button>
      </form>
    </main>
  );

  return content;
}
