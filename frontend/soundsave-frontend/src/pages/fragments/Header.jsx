import { Link } from "react-router-dom";
import { GiSoundOn } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
// import { domain } from "../../data";

export default function Header() {
  const content = (
    <footer className=" bg-[#1c2121]  text-white">
      <section className="w-full  h-[4rem]  flex justify-around  items-center">
        <div className="flex justify-center  items-center">
          <GiSoundOn className="text-[2.2rem]" />
        </div>
        <FaSearch />
        <Link>Sign in</Link>
        <Link>Sign up</Link>
      </section>
    </footer>
  );

  return content;
}
