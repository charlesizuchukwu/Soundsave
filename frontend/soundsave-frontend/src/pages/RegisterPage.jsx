import { useForm } from "react-hook-form";
import { FaRegCircleUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";
import * as EmailValidator from "email-validator";
import { useNavigate } from "react-router-dom";
import { errorMsg } from "../helper/errorMsg";

export default function RegisterPage() {
  // DESTRUCTURED USEFORM DATA
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const [logicError, setLogicError] = useState("");
  const navigate = useNavigate();
  const [loading, setIsloading] = useState(false);

  // FORM SUBMITION
  const onSubmit = async (data) => {
    const { fullName, email, password } = data;
    if (!fullName && !email && !password) {
      return setLogicError("All fields are required");
    }

    if (!EmailValidator.validate(email)) {
      return setLogicError("Invalid email address");
    }

    // More validations can be added based on security target

    try {
      const credentials = { fullName, email, password };
      const apiHeader = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      setIsloading(true);
      const response = await axios.post(
        "http://127.0.0.1:5000/register",
        credentials,
        apiHeader
      );

      // console.log(response);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      const err = errorMsg(error);
      setLogicError(err);
      // throw new Error(error);
    } finally {
      reset();
      setIsloading(false);
    }
  };

  // REGISTER PAGE CONTENT
  const content = (
    <main className="w-full min-h-screen   bg-[#1c2121]  text-white  flex  flex-col py-2  justify-around  items-center  ">
      <div>
        {" "}
        <span className="text-xl font-bold mr-1">Signup</span>{" "}
        <FaRegCircleUser className="inline  text-[1.5rem] " />{" "}
      </div>
      <hr className="w-[50%] bg-white" />
      {logicError && <p className="error-msg-style"> &#10005; {logicError}</p>}
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
        {/* FULL NAME  */}
        <div className="form-div-style">
          {/* <h4>
            We are happy{" "}
            <span className="text-yellow-400 text-[1.4rem] "> &#9787; </span>
            to have you.{" "}
          </h4> */}
          <label htmlFor="fullName" className="form-label-style ">
            Fullname:{" "}
          </label>
          <input
            type="text"
            placeholder="Mike Morgan"
            id="fullName"
            {...register("fullName", {
              required: { value: true, message: "Please fill this field" },
              maxLength: { value: 50, message: "Length exceeded." },
              minLength: {
                value: 4,
                message: "fullname should be more than three (3) characters.",
              },
            })}
            name="fullName"
            className={`form-input-style  ${
              errors.fullName ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors?.fullName && errors?.fullName?.type == "required" && (
            <p className="error-msg-style">{errors?.fullName?.message}</p>
          )}

          {errors?.fullName && errors?.fullName?.type == "maxLength" && (
            <p className="error-msg-style"> {errors?.fullName?.message}</p>
          )}

          {errors?.fullName && errors?.fullName?.type == "minLength" && (
            <p className="error-msg-style"> {errors?.fullName?.message}</p>
          )}
        </div>
        {/* END OF FULL-NAME */}

        {/* EMAIL  */}
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
          {errors?.email && errors?.email?.type == "required" && (
            <p className="error-msg-style">{errors?.email?.message}</p>
          )}

          {errors?.email && errors?.email?.type == "maxLength" && (
            <p className="error-msg-style"> {errors?.email?.message}</p>
          )}

          {errors?.email && errors?.email?.type == "pattern" && (
            <p className="error-msg-style"> {errors?.email?.message}</p>
          )}
        </div>
        {/* END OF EMAIL */}

        {/* PASSWORD  */}
        <div className="form-div-style">
          <label htmlFor="password" className="form-label-style ">
            Password:{" "}
          </label>
          <input
            type="text"
            placeholder="MikePwd&44%"
            id="password"
            {...register("password", {
              required: { value: true, message: "Please fill this field" },
              maxLength: { value: 25, message: "Length exceeded." },
              minLength: {
                value: 7,
                message: "input data should be more than six (6) characters.",
              },
            })}
            name="password"
            className={`form-input-style  ${
              errors.password ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors?.password && errors?.password?.type == "required" && (
            <p className="error-msg-style">{errors?.password?.message}</p>
          )}

          {errors?.password && errors?.password?.type == "maxLength" && (
            <p className="error-msg-style"> {errors?.password?.message}</p>
          )}

          {errors?.password && errors?.password?.type == "minLength" && (
            <p className="error-msg-style"> {errors?.password?.message}</p>
          )}
        </div>
        {/* END OF PASSWORD */}

        {/*  CONFIRM PASSWORD  */}
        <div className="form-div-style">
          <label htmlFor="confirmPassword" className="form-label-style ">
            Confirm Password:{" "}
          </label>
          <input
            type="text"
            placeholder="MikePwd&44%"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: { value: true, message: "Please fill this field" },
              maxLength: { value: 25, message: "Length exceeded." },
              minLength: {
                value: 7,
                message: "input data should be more than six (6) characters.",
              },
              validate: (value) => value === getValues("password"),
            })}
            name="confirmPassword"
            className={`form-input-style  ${
              errors.confirmPassword ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors?.confirmPassword &&
            errors?.confirmPassword?.type == "required" && (
              <p className="error-msg-style">
                {errors?.confirmPassword?.message}
              </p>
            )}

          {errors?.confirmPassword &&
            errors?.confirmPassword?.type == "maxLength" && (
              <p className="error-msg-style">
                {" "}
                {errors?.confirmPassword?.message}
              </p>
            )}

          {errors?.confirmPassword &&
            errors?.confirmPassword?.type == "minLength" && (
              <p className="error-msg-style">
                {" "}
                {errors?.confirmPassword?.message}
              </p>
            )}

          {errors?.confirmPassword &&
            errors?.confirmPassword?.type == "validate" && (
              <p className="error-msg-style"> Password does not match.</p>
            )}
        </div>
        {/* END OF CONFIRM PASSWORD */}
        <input
          type="submit"
          className="bg-[#0a572a]  text-xl tracking-wide rounded-lg  mx-auto block  p-2"
        />
      </form>
    </main>
  );

  return content;
}
