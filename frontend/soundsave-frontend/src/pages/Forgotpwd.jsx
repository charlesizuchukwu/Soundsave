import { useForm } from "react-hook-form";
import { FaRegCircleUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
// import axios from "axios";
import * as EmailValidator from "email-validator";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import { errorMsg } from "../helper/errorMsg";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import { secretQuestions } from "../data";

export default function Forgotpwd() {
  // DESTRUCTURED USEFORM DATA
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const [logicError, setLogicError] = useState({});
  const navigate = useNavigate();
  const [loading, setIsloading] = useState(false);

  const { setAuth, auth } = useAuth();
  let err_msg;

  // FORM SUBMITION
  const onSubmit = async (data) => {
    console.log(data);
    const { secretQuestion, secretAnswer, email } = data;
    if (!secretQuestion && !secretAnswer && !email) {
      setLogicError("All fields are required");
      console.log("all fields");
    }

    if (!EmailValidator.validate(email)) {
      setLogicError("Invalid email address");
    }

    // More validations can be added based on security target

    try {
      const credentials = { secretQuestion, secretAnswer, email };
      const apiHeader = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      setAuth((prev) => ({ ...prev, email }));
      setIsloading(true);
      const response = await axios.post("/forgotpwd", credentials, apiHeader);

      console.log(response);

      if (response.status > 200) {
        setLogicError((prev) => ({
          ...prev,
          errorData: response?.data?.message,
        }));
      }
      if (response.status === 200) {
        const { success } = response?.data;
        if (!success) {
          setLogicError((prev) => ({
            ...prev,
            errorData: "Invalid user data recieved",
          }));
        } else {
          navigate("/resetpwd");
        }
        // const userData = jwtDecode(accessToken);
        // const { id, fullName } = userData;
        // setAuth((prev) => ({ ...prev, id, fullName, accessToken }));
        // navigate("/dashboard/", { state: { fullName } });

        // console.log(userData);
      }
    } catch (error) {
      const err = errorMsg(error);
      console.log(err);
      setLogicError((prev) => ({ ...prev, errorData: err }));
      // throw new Error(error);
    } finally {
      reset();
      setIsloading(false);
    }
  };

  // console.log(logicError);
  // console.log(auth);
  // console.log("hello");
  // REGISTER PAGE CONTENT
  const content = (
    <main className="w-full min-h-screen   bg-[#1c2121]  text-white  flex  flex-col py-16  justify-around  items-center  ">
      <div>
        {" "}
        <span className="text-xl font-bold mr-1">Signin</span>{" "}
        <FaRegCircleUser className="inline  text-[1.5rem] " />{" "}
      </div>
      <hr className="w-[50%] bg-white" />

      {logicError.errorData && (
        <p className="error-msg-style ">{logicError.errorData}</p>
      )}

      {loading && (
        <ScaleLoader
          color="white"
          cssOverride={{ height: "500", width: "500" }}
        />
      )}

      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className=" w-[90%]   min-h-[10rem] flex flex-col  gap-3  justify-center items-center p-2"
      >
        {/* EMAIL FEILD */}

        <div className="form-div-style">
          <label htmlFor="email" className="form-label-style ">
            Email:{" "}
          </label>
          <input
            type="text"
            placeholder="mike@gmail.com"
            id="email"
            {...register("email", {
              required: { value: true, message: "Please fill this field" },
              maxLength: { value: 50, message: "Length exceeded." },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            name="email"
            className={`form-input-style  ${
              errors?.email ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors?.email && errors?.email?.type === "required" && (
            <p className="error-msg-style">{errors?.email?.message}</p>
          )}

          {errors?.email && errors?.email?.type === "maxLength" && (
            <p className="error-msg-style"> {errors?.email?.message}</p>
          )}

          {errors?.email && errors?.email?.type === "pattern" && (
            <p className="error-msg-style"> {errors?.email?.message}</p>
          )}
        </div>
        {/* END OF EMAIL */}

        {/* END OF EMAIL FIELD */}

        {/* SECRET QUESTIONS*/}

        <div className="form-div-style">
          <label htmlFor="secretQuestion" className="form-label-style ">
            Secret Question:{" "}
          </label>
          <select
            type="text"
            id="secretQuestion"
            {...register("secretQuestion", {
              required: { value: true, message: "Please fill this field" },
            })}
            name="secretQuestion"
            className={`form-input-style  ${
              errors.secretQuestion ? "border-red-400" : "border-green-500"
            } `}
          >
            {" "}
            {secretQuestions.map((data) => (
              <option key={data?.id} value={data?.name}>
                {data?.name}
              </option>
            ))}
          </select>
        </div>

        {/* END OF SECRET QUESTIONS */}

        {/* SECRET ANSWER */}

        <div className="form-div-style">
          <label htmlFor="secretAnswer" className="form-label-style ">
            Secret Answer:{" "}
          </label>
          <input
            type="text"
            id="secretAnswer"
            {...register("secretAnswer", {
              required: { value: true, message: "Please fill this field" },
              maxLength: { value: 50, message: "Length exceeded." },
              minLength: {
                value: 1,
                message: "input characters are too short.",
              },
            })}
            name="secretAnswer"
            className={`form-input-style  ${
              errors.secretAnswer ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors?.secretAnswer && errors?.secretAnswer?.type == "required" && (
            <p className="error-msg-style">{errors?.secretAnswer?.message}</p>
          )}

          {errors?.secretAnswer &&
            errors?.secretAnswer?.type == "maxLength" && (
              <p className="error-msg-style">
                {" "}
                {errors?.secretAnswer?.message}
              </p>
            )}

          {errors?.secretAnswer &&
            errors?.secretAnswer?.type == "minLength" && (
              <p className="error-msg-style">
                {" "}
                {errors?.secretAnswer?.message}
              </p>
            )}
        </div>

        {/* END OF SECRET ANSWER */}

        <input
          type="submit"
          className="bg-[#0a572a]  text-xl tracking-wide rounded-lg  mx-auto block  p-2"
        />
      </form>
    </main>
  );

  return content;
}
