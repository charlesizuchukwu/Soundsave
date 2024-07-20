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
import { MdLockReset } from "react-icons/md";

export default function Resetpwd() {
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
  const [isAllowed, setIsAllowed] = useState(false);

  const { setAuth, auth } = useAuth();

  useEffect(() => {
    const protector = () => {
      if (typeof auth?.email === "undefined") {
        navigate("/login");
      } else {
        setIsAllowed(true);
      }
    };

    protector();
  }, []);

  console.log(auth?.email);

  // FORM SUBMITION
  const onSubmit = async (data) => {
    console.log(data);
    const { password } = data;
    if (!password) {
      setLogicError("Please enter a new password.");
      console.log("all fields");
    }

    if (
      !EmailValidator.validate(auth?.email) ||
      typeof auth?.email === "undefined"
    ) {
      setLogicError("Invalid credential");
    }

    // More validations can be added based on security target

    try {
      const credentials = { email: auth?.email, password };
      console.log(auth?.email, password);
      const apiHeader = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      setIsloading(true);
      const response = await axios.patch("/resetpwd", credentials, apiHeader);

      console.log(response);

      if (response.status !== 200) {
        setLogicError((prev) => ({
          ...prev,
          errorData: response?.data?.message
            ? response?.data?.message
            : response?.data,
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
          navigate("/login");
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
        <span className="text-xl font-bold mr-1">Reset Password</span>{" "}
        <MdLockReset className="inline  text-[1.8rem] " />{" "}
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
        {/* PASSWORD  */}
        <div className="form-div-style">
          <label htmlFor="password" className="form-label-style ">
            New Password:{" "}
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
            Confirm New Password:{" "}
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
      {/* <p>
        Forgot password click{" "}
        <Link
          to="/forgotpwd"
          className=" text-blue-600  text-bold tracking-wide "
        >
          here
        </Link>
      </p> */}
    </main>
  );

  return isAllowed === true && content;
}
