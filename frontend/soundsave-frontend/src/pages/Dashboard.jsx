import { Outlet, useNavigate } from "react-router-dom";
import DashboardFooter from "./fragments/DashboardFooter";
import DashboardHeader from "./fragments/DashboardHeader";
import useAuth from "../hooks/useAuth";
import useRouteProtect from "../hooks/useRouteProtect";
import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";

export default function Dashboard() {
  const [isAllowed, setIsAllowed] = useState();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useRouteProtect(auth?.accessToken, setIsAllowed);

  console.log(isAllowed);

  console.log(auth);
  const content = (
    <main className="  w-full min-h-screen  flex flex-col  sm:flex-row-reverse   justify-center  sm:items-start items-center  relative  ">
      {/* <DashboardHeader value={{ auth }} /> */}

      <Outlet context={{ auth, setAuth }} />
      <DashboardFooter />
    </main>
  );

  // if (isAllowed === true) {

  return isAllowed === true ? content : navigate("/login");

  // useEffect(() => {
  //   const change = () => {
  //     if (isAllowed === true) {
  //       return content;
  //     } else {
  //       navigate("/login");
  //     }
  //   };

  //   change();
  // }, []);

  // return content;
}
