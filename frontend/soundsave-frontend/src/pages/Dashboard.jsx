import { Outlet } from "react-router-dom";
import DashboardFooter from "./fragments/DashboardFooter";
import DashboardHeader from "./fragments/DashboardHeader";

export default function Dashboard() {
  const content = (
    <main className="relative">
      <DashboardHeader />
      <Outlet />
      <DashboardFooter />
    </main>
  );

  return content;
}
