import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import * as EmailValidator from "email-validator";
import { GrUserSettings } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { errorMsg } from "../../../helper/errorMsg";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import useRouteProtect from "../../../hooks/useRouteProtect";
import useAuth from "../../../hooks/useAuth";
import secure from "../../../assets/secure.jpg";
// import { jwtDecode } from "jwt-decode";

export default function SettingUi() {
  // LOGIC STATES AND VARIABLES
  const [logicError, setLogicError] = useState("");
  const [logicSuccessMsg, setLogicSuccessMsg] = useState("");
  const navigate = useNavigate();
  const [loading, setIsloading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const { auth } = useOutletContext();
  const { auth: dt } = useAuth();

  console.log(dt);

  // /dashboard/settings ROUTE PROTECTION

  // const ud = jwtDecode(dt?.accessToken);

  // console.log(ud);
  useRouteProtect(auth?.accessToken, setIsAllowed);

  console.log(auth);
  // DESTRUCTURED USEFORM DATA

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  // FORM SUBMITION
  const onSubmit = async (data) => {
    console.log(data);
    const {
      instagramAccount,
      facebookAccount,
      twitterAccount,
      whatsappAccount,
      stageName,
      country,
      id,
    } = data;

    // More validations can be added based on security target

    const credentials = {
      instagramAccount,
      facebookAccount,
      twitterAccount,
      whatsappAccount,
      stageName,
      country,
      id,
    };
    const apiHeader = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    // const controller = new AbortController();
    try {
      setIsloading(true);
      const response = await axiosPrivate.patch("/settings", credentials);
      // signal: controller.signal,

      console.log(response);

      if (response?.status === 200) {
        setLogicSuccessMsg(response?.data?.message);
      } else {
        navigate("/login");
      }
    } catch (error) {
      // setLogicError("Something went wrong, please try again later");
      // throw new Error(error);
      const err = errorMsg(error);
      // navigate("/login", { state: { from: location }, replace: true });
      setLogicError(err);
    } finally {
      reset();
      setIsloading(false);
      // controller.abort();
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      const response = await axiosPrivate("/logout");
      console.log(response);
      navigate("/");
    } catch (error) {
      const err = errorMsg(error);
      setLogicError(err);
    }
  };

  // SETTING-UI CONTENT
  const content = (
    <main className="w-full min-h-full   text-white  flex  flex-col py-16  justify-around  items-center  ">
      <section
        className="w-full h-[10rem]  bg-center bg-cover bg-no-repeat   "
        style={{ backgroundImage: `url(${secure})` }}
      >
        {/* <div className="w-full h-full bg-gradient-to-b from-transparent  to-black"></div> */}
      </section>
      <div className="">
        {" "}
        <span className="text-xl font-bold mr-1">Profile Setting </span>{" "}
        <GrUserSettings className="inline  text-[1.5rem] " />{" "}
      </div>
      <div className="w-[90%]  bg-slate-800  p-2  tracking-wide  my-5">
        <ul className="w-[99%] mx-auto grid  sm:grid-cols-2  place-content-center ">
          <li>
            Fullname:{" "}
            <span>
              <b>{auth?.fullName}</b>
            </span>
          </li>
          {/* <li>
            users-Email:{" "}
            <span>
              <b>user@gmail.com</b>
            </span>
          </li>
          <li>
            Joined Date:{" "}
            <span>
              <b>4/12/2024</b>
            </span>
          </li>
          <li>
            Last Updated:{" "}
            <span>
              <b>4/12/2024</b>
            </span> */}
          {/* </li> */}
        </ul>
      </div>
      <button
        onClick={() => {
          logout();
        }}
        className="bg-red-500  text-xl  p-2 rounded-md "
      >
        Logout
      </button>
      <hr className="w-[50%]  my-4 bg-white" />
      {logicSuccessMsg && logicSuccessMsg != "" ? (
        <p className="text-green-500  mx-auto  tracking-wide">
          {" "}
          &#10003; {logicSuccessMsg}{" "}
        </p>
      ) : logicError ? (
        <p className="error-msg-style">{logicError}</p>
      ) : (
        loading && (
          <ScaleLoader
            color="white"
            cssOverride={{ height: "500", width: "500" }}
          />
        )
      )}

      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className=" w-[90%]   min-h-[10rem]   bg-gradient-to-b from-transparent to-black  flex flex-col  gap-3  justify-center items-center p-2"
      >
        {/* ARTIST STAGE NAME */}
        <div className="form-div-style">
          <label htmlFor="stageName" className="form-label-style ">
            Artist stage name:{" "}
          </label>
          <input
            type="text"
            defaultValue="2pac"
            id="stageName"
            {...register("stageName", {
              required: { value: true, message: "Please fill this field" },
              maxLength: { value: 50, message: "Length exceeded." },
            })}
            name="stageName"
            className={`  dashb-form-input-style ${
              errors?.stageName ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors?.stageName && errors?.stageName?.type == "required" && (
            <p className="error-msg-style">{errors?.stageName?.message}</p>
          )}

          {errors?.stageName && errors?.stageName?.type == "maxLength" && (
            <p className="error-msg-style"> {errors?.stageName?.message}</p>
          )}

          {errors?.stageName && errors?.stageName?.type == "pattern" && (
            <p className="error-msg-style"> {errors?.stageName?.message}</p>
          )}
        </div>
        {/* END OF STAGE-NAME*/}

        {/* ARTIST COUNTRY */}
        <div className="form-div-style">
          <label htmlFor="country" className="form-label-style ">
            Country:{" "}
          </label>
          <input
            type="text"
            defaultValue="USA"
            id="country"
            {...register("country", {
              required: { value: true, message: "Please fill this field" },
              maxLength: { value: 50, message: "Length exceeded." },
            })}
            name="country"
            className={`  dashb-form-input-style ${
              errors?.country ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors?.country && errors?.country?.type == "required" && (
            <p className="error-msg-style">{errors?.country?.message}</p>
          )}

          {errors?.country && errors?.country?.type == "maxLength" && (
            <p className="error-msg-style"> {errors?.country?.message}</p>
          )}

          {errors?.country && errors?.country?.type == "pattern" && (
            <p className="error-msg-style"> {errors?.country?.message}</p>
          )}
        </div>
        {/* ARTIST COUNTRY*/}

        {/* INSTAGRAM ACCOUNT */}
        <div className="form-div-style">
          <label htmlFor="instagramAccount" className="form-label-style ">
            <FaInstagramSquare className="   text-[1.4rem]  inline" /> Instagram
            account:{" "}
          </label>
          <input
            type="text"
            defaultValue="None"
            id="instagram"
            {...register("instagramAccount", {
              required: { value: true, message: "Please fill this field" },
              maxLength: { value: 50, message: "Length exceeded." },
            })}
            name="instagramAccount"
            className={`  dashb-form-input-style ${
              errors?.instagramAccount ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors?.instagramAccount &&
            errors?.instagramAccount?.type == "required" && (
              <p className="error-msg-style">
                {errors?.instagramAccount?.message}
              </p>
            )}

          {errors?.instagramAccount &&
            errors?.instagramAccount?.type == "maxLength" && (
              <p className="error-msg-style">
                {" "}
                {errors?.instagramAccount?.message}
              </p>
            )}

          {errors?.instagramAccount &&
            errors?.instagramAccount?.type == "pattern" && (
              <p className="error-msg-style">
                {" "}
                {errors?.instagramAccount?.message}
              </p>
            )}
        </div>
        {/* INSTAGRAM ACCOUNT*/}
        {/* FACEBOOK ACCOUNT */}
        <div className="form-div-style">
          <label htmlFor="facebookAccount" className="form-label-style ">
            <FaFacebook className="   text-[1.4rem]  inline" /> Facebook
            account:{" "}
          </label>
          <input
            type="text"
            defaultValue="None"
            id="facebookAccount"
            {...register("facebookAccount", {
              required: { value: true, message: "Please fill this field" },
              maxLength: { value: 50, message: "Length exceeded." },
            })}
            name="facebookAccount"
            className={`  dashb-form-input-style ${
              errors?.facebookAccount ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors?.facebookAccount &&
            errors?.facebookAccount?.type == "required" && (
              <p className="error-msg-style">
                {errors?.facebookAccount?.message}
              </p>
            )}

          {errors?.facebookAccount &&
            errors?.facebookAccount?.type == "maxLength" && (
              <p className="error-msg-style">
                {" "}
                {errors?.facebookAccount?.message}
              </p>
            )}

          {errors?.facebookAccount &&
            errors?.facebookAccount?.type == "pattern" && (
              <p className="error-msg-style">
                {" "}
                {errors?.facebookAccount?.message}
              </p>
            )}
        </div>
        {/* FACEBOOK ACCOUNT*/}

        {/* TWITTER ACCOUNT */}
        <div className="form-div-style">
          <label htmlFor="twitterAccount" className="form-label-style ">
            <FaXTwitter className="   text-[1.4rem]  inline" /> Twitter account:{" "}
          </label>
          <input
            type="text"
            defaultValue="None"
            id="twitterAccount"
            {...register("twitterAccount", {
              required: { value: true, message: "Please fill this field" },
              maxLength: { value: 50, message: "Length exceeded." },
            })}
            name="twitterAccount"
            className={`  dashb-form-input-style ${
              errors?.twitterAccount ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors?.twitterAccount &&
            errors?.twitterAccount?.type == "required" && (
              <p className="error-msg-style">
                {errors?.twitterAccount?.message}
              </p>
            )}

          {errors?.twitterAccount &&
            errors?.twitterAccount?.type == "maxLength" && (
              <p className="error-msg-style">
                {" "}
                {errors?.twitterAccount?.message}
              </p>
            )}

          {errors?.twitterAccount &&
            errors?.twitterAccount?.type == "pattern" && (
              <p className="error-msg-style">
                {" "}
                {errors?.twitterAccount?.message}
              </p>
            )}
        </div>
        {/* TWITTER ACCOUNT*/}

        {/* WHATSAPP ACCOUNT */}
        <div className="form-div-style">
          <label htmlFor="whatsappAccount" className="form-label-style ">
            <FaWhatsappSquare className="   text-[1.4rem]   text-white inline" />{" "}
            WhatsApp account:{" "}
          </label>
          <input
            type="text"
            defaultValue="None"
            id="whatsappAccount"
            {...register("whatsappAccount", {
              required: { value: true, message: "Please fill this field" },
              maxLength: { value: 50, message: "Length exceeded." },
            })}
            name="whatsappAccount"
            className={`  dashb-form-input-style ${
              errors?.whatsappAccount ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors?.whatsappAccount &&
            errors?.whatsappAccount?.type == "required" && (
              <p className="error-msg-style">
                {errors?.whatsappAccount?.message}
              </p>
            )}

          {errors?.whatsappAccount &&
            errors?.whatsappAccount?.type == "maxLength" && (
              <p className="error-msg-style"> {errors?.whatsapp?.message}</p>
            )}

          {errors?.whatsappAccount &&
            errors?.whatsappAccount?.type == "pattern" && (
              <p className="error-msg-style">
                {" "}
                {errors?.whatsappAccount?.message}
              </p>
            )}
        </div>
        {/* WHATSAPP ACCOUNT*/}

        {/* FACEBOOK ACCOUNT */}
        {/* <div className="form-div-style">
          <label htmlFor="facebookAccount" className="form-label-style ">
            <FaFacebook className="   text-[1.4rem]  inline" /> Instagram
            account:{" "}
          </label>
          <input
            type="text"
            defaultValue="None"
            id="facebook"
            {...register("instagram", {
              required: { value: true, message: "Please fill this field" },
              maxLength: { value: 50, message: "Length exceeded." },
            })}
            name="facebook"
            className={`  dashb-form-input-style ${
              errors?.facebook ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors?.facebook && errors?.facebook?.type == "required" && (
            <p className="error-msg-style">{errors?.facebook?.message}</p>
          )}

          {errors?.facebook && errors?.facebook?.type == "maxLength" && (
            <p className="error-msg-style"> {errors?.facebook?.message}</p>
          )}

          {errors?.facebook && errors?.facebook?.type == "pattern" && (
            <p className="error-msg-style"> {errors?.facebook?.message}</p>
          )}
        </div>
        FACEBOOK ACCOUNT */}

        {/*  ACCOUNT ID */}
        <div className="form-div-style hidden">
          <label htmlFor="id" className="form-label-style ">
            <FaXTwitter className="   text-[1.4rem]  inline" /> account id:{" "}
          </label>
          <input
            type="text"
            defaultValue="None"
            id="id"
            {...register("id", {
              required: { value: true, message: "Please fill this field" },
              maxLength: { value: 50, message: "Length exceeded." },
            })}
            name="id"
            className={`  dashb-form-input-style ${
              errors?.id ? "border-red-400" : "border-green-500"
            } `}
          />
          {errors?.id && errors?.id?.type == "required" && (
            <p className="error-msg-style">{errors?.id?.message}</p>
          )}

          {errors?.id && errors?.id?.type == "maxLength" && (
            <p className="error-msg-style"> {errors?.id?.message}</p>
          )}

          {errors?.id && errors?.id?.type == "pattern" && (
            <p className="error-msg-style"> {errors?.id?.message}</p>
          )}
        </div>
        {/* TWITTER ACCOUNT*/}
        <input
          type="submit"
          className="bg-[#0a572a]  text-xl tracking-wide rounded-lg  mx-auto block  p-2"
        />
      </form>
    </main>
  );

  // return content;
  return isAllowed === true && content;
}
