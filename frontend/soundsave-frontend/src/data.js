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
import { BsSpotify } from "react-icons/bs";
import { FaApple } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

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

export const publicSongs = [
  {
    url: "https://music.youtube.com/watch?v=Yt-841OSeLA&list=OLAK5uy_limkyK9U-OlHydjzeBDK_uKBp_G-mvFiY",
    id: 1,
  },

  {
    url: "https://music.youtube.com/watch?v=ZsOA7Dvf32A",
    id: 2,
  },
  {
    url: "https://music.youtube.com/watch?v=ZKRr9ekYK-k",
    id: 3,
  },
  {
    url: "https://music.youtube.com/watch?v=j5FdAPUEf7w",
    id: 4,
  },
];

//  {
//     url: "https://music.youtube.com/watch?v=RM8QhvvxLmc&list=RDAMVMoI6c9qpYKPU",
//     id: 5,
//   },
//   {
//     url: "https://music.youtube.com/watch?v=q8ly-y8XnkY&list=RDAMVMoI6c9qpYKPU",
//     id: 6,
//   },
//   {
//     url: "https://music.youtube.com/watch?v=-8o3tvLnsWA",
//     id: 7,
//   },

export const dashboardData = [
  {
    head: "Apple Music for Artists",
    subHead:
      "Add personality to your artist profile, upload lyrics for each track, and access your data and insights",
    url: "#",
    icon: <FaApple />,
    id: 1,
  },
  {
    head: "Spotify for Artists",
    subHead:
      "Update your bio and artist photos, share updates with fans through Artist Pick, and feature playlists.",
    url: "#",
    icon: <BsSpotify />,
    id: 2,
  },
  {
    head: "Official Artist channel",
    subHead:
      "All content & subscribers from across your channels together in one place, plus Analytics for Artists.",
    url: "#",
    icon: <IoLogoYoutube />,
    id: 3,
  },
  {
    head: "Your songs, Your Money.",
    subHead: "Claim Song Writer Royalties",
    url: "#",
    icon: <FaMoneyBillTrendUp />,
    id: 4,
  },
];
