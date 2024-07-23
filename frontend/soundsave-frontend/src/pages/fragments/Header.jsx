import { Link } from "react-router-dom";
import { GiSoundOn } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";

// import { domain } from "../../data";

export default function Header() {
  const content = (
    <footer className=" bg-[#1c2121]  text-white  border-b-2 border-b-gray-500">
      <section className="w-full  h-[4rem]  flex justify-around  items-center">
        <Link
          to="/"
          className="flex justify-center  items-center   border-2 rounded-[1.5rem] p-1"
        >
          <b className=" tracking-wider">Sound-Save</b>
          <GiSoundOn className="text-[1.8rem]" />
        </Link>
        <Link to="/login" className="header-link">
          Sign in
        </Link>
        <Link to="/register" className="header-link">
          Sign up
        </Link>
      </section>
    </footer>
  );

  return content;
}
