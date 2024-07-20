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
    url: "/dashboard",
    comp: <IoHomeSharp className="df-icon-stye" />,
    id: 1,
  },
  {
    name: "library",
    url: "/dashboard/library",
    comp: <MdLibraryMusic className="df-icon-stye" />,
    id: 2,
  },
  {
    name: "Upload",
    url: "/dashboard/upload",
    comp: <FaUpload className="df-icon-stye" />,
    id: 3,
  },
  {
    name: "Setting",
    url: "/dashboard/setting",
    comp: <IoSettings className="df-icon-stye" />,
    id: 4,
  },
];

export const secretQuestions = [
  { name: "In what city were you born?", id: 1 },
  { name: "What is the name of your favorite pet?", id: 2 },
  { name: "What high school did you attend?", id: 3 },
  { name: "What was your favorite food as a child?", id: 4 },
  { name: "What color do you like the most?", id: 5 },
  { name: "What is your favorite artist name?", id: 6 },
];
