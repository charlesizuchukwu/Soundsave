import { dashboardFooterData } from "../../data";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { MdLibraryMusic } from "react-icons/md";
import { FaUpload } from "react-icons/fa";

export default function DashboardFooter() {
  const content = (
    <footer className="w-full  min-h-[3rem] sm:w-[8%]   sm:min-w-fit sm:min-h-full    bg-opacity-70 bg-black py-1   sm:p-2   text-white     fixed sm:sticky  bottom-0 ">
      <ul className="w-[90%]   sm:p-1 sm:max-w-[3.4rem]  text-[0.9rem]  sm:text-[1rem]   sm:rounded-[1rem]   sm:h-[25rem]  sm:border-2   sm:border-white       h-[4rem]  mx-auto  flex   sm:flex-col   sm:gap-7  justify-around  items-center hover:overflow-visible">
        {dashboardFooterData.map((data) => (
          <li key={data.id}>
            <Link
              to={data.url}
              className="flex   flex-col justify-center items-center  p-1 sm:p-2  text-[0.8rem]  hover:border-2 rounded-[1rem]  hover:bg-white  hover:text-black   transition-all duration-200  hover:scale-70 sm:hover:scale-80"
            >
              {data.comp}
              <h5 className="font-medium    text-[0.9rem]  sm:text-[1rem]">
                {data.name}
              </h5>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );

  return content;
}
