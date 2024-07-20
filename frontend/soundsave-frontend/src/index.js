import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// page importation
import App from "./App";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/Dashboard";
import SongLibraryUi from "./pages/fragments/ui/SongLibraryUi";
import SongUploadUi from "./pages/fragments/ui/SongUploadUi";
import SettingUi from "./pages/fragments/ui/SettingUi";
import LandingPage from "./pages/LandingPage";
import DashboardLandingUi from "./pages/fragments/ui/DashboardLandingUi";
import { AuthProvider } from "./context/AuthProvider";
import ArtistSong from "./pages/ArtistSong";
import Resetpwd from "./pages/Resetpwd";
import Forgotpwd from "./pages/Forgotpwd";

const backPages = {
  home: "/",
  register: "/register",
  login: "/login",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },

      {
        path: "song/:songId/:songName",
        element: <ArtistSong />,
      },
      {
        path: "resetpwd",
        element: <Resetpwd />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "forgotpwd",
        element: <Forgotpwd />,
        errorElement: <NotFoundPage />,
      },
      ,
      {
        path: "login",
        element: <LoginPage />,
        errorElement: <NotFoundPage />,
      },

      {
        path: "register",
        element: <RegisterPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <DashboardLandingUi />,
      },
      { path: "setting", element: <SettingUi /> },

      { path: "library", element: <SongLibraryUi /> },
      { path: "upload", element: <SongUploadUi /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
