import { IoHomeSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { MdLibraryMusic } from "react-icons/md";
import { FaUpload } from "react-icons/fa";

// SITE NAME
export const domain = "SoundSave";

// NORMAL PAGE FOOTER
export const footerData = [
  { name: "Sign in", url: "/login", id: 3 },
  { name: "Sign up", url: "/register", id: 4 },
  { name: "About us", url: "/about", id: 1 },
  { name: "Developer", url: "/developer", id: 2 },
];

// DASHBOARD FRAGMENT UI
export const dashboardFooterData = [
  {
    name: "Home",
    url: "/",
    comp: <IoHomeSharp className="df-icon-stye" />,
    id: 1,
  },
  {
    name: "library",
    url: "/library",
    comp: <MdLibraryMusic className="df-icon-stye" />,
    id: 2,
  },
  {
    name: "Upload",
    url: "/upload",
    comp: <FaUpload className="df-icon-stye" />,
    id: 3,
  },
  {
    name: "Setting",
    url: "/setting",
    comp: <IoSettings className="df-icon-stye" />,
    id: 4,
  },
];
