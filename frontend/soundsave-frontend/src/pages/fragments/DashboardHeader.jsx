import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoMdNotificationsOff } from "react-icons/io";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function DashboardHeader() {
  const { auth } = useAuth();

  console.log(auth);

  const { id, fullName } = auth;
  // console.log(auth);

  // const { state } = useLocation();

  // const { fullName } = state;
  console.log(fullName);
  const content = (
    <header className="h-[5rem]  w-full flex  justify-center  items-center  text-white  bg-slate-800  sticky top-0  z-50 ">
      <section className="w-[90%] mx-auto  flex justify-around  items-center">
        <FaUser className="text-[1.6rem] " />
        <h2 className="flex flex-col justify-center  items-center">
          <span className="block">Welcome home</span>
          {fullName}
        </h2>
        <IoMdNotifications className="text-[1.6rem] " />
      </section>
    </header>
  );

  return content;
}
