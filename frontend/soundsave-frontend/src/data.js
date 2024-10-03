import { IoHomeSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { MdLibraryMusic } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import { IoLogoApple } from "react-icons/io5";
import { IoLogoYoutube } from "react-icons/io";
import { GrAmazon } from "react-icons/gr";
import { SiTidal } from "react-icons/si";
import { SiBeatport } from "react-icons/si";
import { FaPeopleGroup } from "react-icons/fa6";
import { SiMusicbrainz } from "react-icons/si";
import { MdSecurity } from "react-icons/md";
import { MdOutlineAddToHomeScreen } from "react-icons/md";
import { GrConnect } from "react-icons/gr";

// SITE NAME
export const domain = "SoundSave";

export const partners = [
  { name: "Spotify", icon: <FaSpotify />, id: 1 },
  { name: "Music", icon: <IoLogoApple />, id: 2 },
  { name: "Youtube", icon: <IoLogoYoutube />, id: 3 },
  { name: "amazon music", icon: <GrAmazon />, id: 4 },
  { name: "Tidal", icon: <SiTidal />, id: 5 },
  { name: "Beatport", icon: <SiBeatport />, id: 6 },
];

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

export const headerData = [
  { name: "Sell Your Music", url: "#", id: 1 },
  { name: "Music Publishing", url: "#", id: 2 },
  { name: "Artist Services", url: "#", id: 3 },
  { name: "Pricing", url: "#", id: 4 },
  { name: "Artist Advice", url: "#", id: 5 },
  { name: "Splits", url: "#", id: 6 },
  { name: "Create Account", url: "register", id: 7 },
];

export const whychoose = [
  { name: "Comprehensive music management", icon: <SiMusicbrainz />, id: 1 },
  { name: "secure collaboration", icon: <FaPeopleGroup />, id: 2 },
  {
    name: "Protection against unauthorized leaks",
    icon: <MdSecurity />,
    id: 3,
  },
  {
    name: "User-friendly platform for all levels",
    icon: <MdOutlineAddToHomeScreen />,
    id: 4,
  },
  {
    name: "Collaborate seamlessly with industry professionals",
    icon: <GrConnect />,
    id: 5,
  },
];
