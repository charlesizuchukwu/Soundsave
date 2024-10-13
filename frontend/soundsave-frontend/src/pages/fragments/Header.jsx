import { Link } from "react-router-dom";
import { GiSoundOn } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { headerData } from "../../data";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { IoHeadset } from "react-icons/io5";
import { HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// import { domain } from "../../data";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const changePage = (page) => {
    setShowMenu(false);
    if (typeof page === "undefined" || page === "") {
      navigate("/");
    } else {
      navigate(`/${page}`);
    }
  };

  const content = (
    <motion.header
      whileInView={{ y: 0 }}
      animate={{ y: 80 }}
      transition={{ duration: 0.7 }}
      className=" min-h-[5rem] w-full    rounded-b-md     flex flex-col  sm:flex-row   justify-center items-center"
    >
      <section className="w-full  sm:w-[40%]  h-[4rem]  flex justify-around  items-center">
        <Link
          to="/"
          className="flex justify-center text-[1.1rem]  items-center   p-1 "
        >
          <span className="font-bold  ">Sound</span>
          <span className="font-thin">Save</span>
          <IoHeadset />
        </Link>
        <p
          onClick={() => changePage("login")}
          className="header-link hover:cursor-pointer "
        >
          Login
        </p>
        <button onClick={() => setShowMenu(!showMenu)} className=" sm:hidden">
          {showMenu ? <HiOutlineX /> : <GiHamburgerMenu />}
        </button>
      </section>

      <motion.nav
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        animate={{ opacity: 0, y: 70, scale: 0 }}
        transition={{ duration: 0.5 }}
        className={`${
          showMenu ? `flex` : `hidden`
        }   sm:block   justify-center items-center    bg-[#18171746]   w-full  min-h-full    z-50  `}
      >
        <ul className="w-full h-full  p-3  flex flex-col sm:flex-row  gap-3 justify-around items-center ">
          {headerData.map((data) => (
            <li
              key={data.id}
              onClick={() => changePage(data.url)}
              className="text[1.1rem]  font-serif  hover:cursor-pointer tracking-wider"
            >
              {data.name}
            </li>
          ))}
        </ul>
      </motion.nav>
    </motion.header>
  );

  return content;
}
