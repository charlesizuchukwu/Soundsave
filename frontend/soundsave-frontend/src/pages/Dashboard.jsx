import { Outlet } from "react-router-dom";
import DashboardFooter from "./fragments/DashboardFooter";
import DashboardHeader from "./fragments/DashboardHeader";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { auth, setAuth } = useAuth();
  const content = (
    <main className=" relative  ">
      <DashboardHeader value={{ auth }} />

      <Outlet context={{ auth, setAuth }} />
      <DashboardFooter />
    </main>
  );

  return content;
}
