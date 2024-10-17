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
import newsinger from "../assets/newsinger.jpg";

export default function LoginPage() {
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
    const { email, password } = data;
    if (!email && !password) {
      // setLogicError("All fields are required");
      console.log("all fields");
    }

    if (!EmailValidator.validate(email)) {
      // setLogicError("Invalid email address");
    }

    // More validations can be added based on security target

    try {
      const credentials = { email, password };

      setIsloading(true);
      const response = await axios.post("/login", credentials);

      console.log(response);

      if (!response.ok) {
        setLogicError((prev) => ({
          ...prev,
          errorData: response?.data?.message,
        }));
      }
      if (response.status === 200) {
        const { accessToken } = response?.data;
        if (!accessToken) {
          setLogicError((prev) => ({
            ...prev,
            errorData: "Invalid user data recieved",
          }));
          navigate("/login");
        }
        const userData = jwtDecode(accessToken);
        console.log(userData);
        const { id, fullName } = userData;
        setAuth((prev) => ({ ...prev, id, fullName, accessToken }));
        const resp = await axios.patch("/saveToken", {
          recvToken: accessToken,
        });
        console.log(resp);
        navigate("/dashboard/", { state: { fullName } });

        console.log(userData);
      }
    } catch (error) {
      console.log(error);
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
    <main className="w-full min-h-screen    text-white  flex  flex-col md:flex-row  justify-around  items-center  ">
      <section
        className="w-full  h-[25rem]  md:h-[50rem]  bg-center bg-no-repeat bg-cover   "
        style={{ backgroundImage: `url(${newsinger})` }}
      >
        <div className="w-full h-[25rem]  md:h-[50rem]  bg-gradient-to-b    md:bg-gradient-to-r from-transparent to-black"></div>
      </section>
      <section className="w-full  flex flex-col justify-center  gap-4 items-center">
        <div className=" ">
          {" "}
          <span className="text-xl font-bold mx-auto">Signin</span>{" "}
          {/* <FaRegCircleUser className="inline  text-[1.5rem] " />{" "} */}
        </div>
        {/* <hr className="w-[50%] bg-white" /> */}

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
          <div className="form-div-style">
            <label htmlFor="email" className="form-label-style ">
              Email:{" "}
            </label>
            <input
              type="text"
              // placeholder="mike@gmail.com"
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

          {/* PASSWORD  */}
          <div className="form-div-style">
            <label htmlFor="password" className="form-label-style ">
              Password:{" "}
            </label>
            <input
              type="text"
              // placeholder="MikePwd&44%"
              id="password"
              name="password"
              {...register("password", {
                required: { value: true, message: "Please fill this field" },
                maxLength: { value: 25, message: "Length exceeded." },
                minLength: {
                  value: 7,
                  message: "input data should be more than six (6) characters.",
                },
              })}
              className={`form-input-style  ${
                errors.password ? "border-red-400" : "border-green-500"
              } `}
            />
            {errors?.password && errors?.password?.type === "required" && (
              <p className="error-msg-style">{errors?.password?.message}</p>
            )}

            {errors?.password && errors?.password?.type === "maxLength" && (
              <p className="error-msg-style"> {errors?.password?.message}</p>
            )}

            {errors?.password && errors?.password?.type === "minLength" && (
              <p className="error-msg-style"> {errors?.password?.message}</p>
            )}
          </div>
          {/* END OF PASSWORD */}

          <input
            type="submit"
            value="Submit"
            className="bg-[#0a572a]  text-xl tracking-wide rounded-lg  mx-auto block  p-2"
          />
        </form>
        <p className="my-4">
          Forgot password click{" "}
          <Link
            to="/forgotpwd"
            className=" text-blue-600  text-bold tracking-wide "
          >
            here
          </Link>
        </p>
      </section>
    </main>
  );

  return content;
}
