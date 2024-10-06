import { Outlet } from "react-router-dom";
import DashboardFooter from "./fragments/DashboardFooter";
import DashboardHeader from "./fragments/DashboardHeader";
import useAuth from "../hooks/useAuth";
import useRouteProtect from "../hooks/useRouteProtect";
import { useState } from "react";

export default function Dashboard() {
  const [isAllowed, setIsAllowed] = useState(false);
  const { auth, setAuth } = useAuth();

  useRouteProtect(auth?.accessToken, setIsAllowed);

  console.log(auth);
  const content = (
    <main className="  w-full min-h-screen  flex flex-col  sm:flex-row-reverse   justify-center  sm:items-start items-center  relative  ">
      {/* <DashboardHeader value={{ auth }} /> */}

      <Outlet context={{ auth, setAuth }} />
      <DashboardFooter />
    </main>
  );

  // return content;
  return isAllowed === true && content;
}
