import { footerData } from "../../data";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { domain } from "../../data";

export default function Footer() {
  const content = (
    <footer className=" w-full  h-[12rem]  bg-[#0a0c0c]  text-white">
      <section className="h-full w-[80%]  mx-auto  flex flex-col justify-around">
        <ul className="w-full mx-auto  text-center   grid grid-cols-2 gap-4 ">
          {footerData.map((data) => (
            <li key={data.id}>
              <Link
                to={data.url}
                className="w-full  hover:underline  hover:underline-offset-2"
              >
                {data.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className=" w-[80%] mx-auto flex justify-around">
          <Link to="#">
            {" "}
            <FaFacebook className="icon-style" />
          </Link>
          <Link to="#">
            {" "}
            <FaInstagramSquare className="icon-style" />
          </Link>
          <Link to="#">
            {" "}
            <FaXTwitter className="icon-style" />
          </Link>
        </div>
        <p className="w-[80%] mx-auto  text-center">&copy; 2024 {domain}</p>
      </section>
    </footer>
  );

  return content;
}
