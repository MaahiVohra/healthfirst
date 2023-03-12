import Link from "next/link";
import Image from "next/image";
// import { FaHistory } from "react-icons/Fa";
import { FaHistory } from "react-icons/fa";
import { AiFillMedicineBox } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { MdDashboard, MdLogout, MdDarkMode, MdLightMode } from "react-icons/md";
import logo from "../../public/logo.png";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { NavLink } from "./Navlink";

const style = {
  listitem: "p-4 transition-all flex items-center mt-2 rounded",
};

export default function Sidebar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="sidebar flex max-h-screen w-2/12 flex-col justify-between px-6 py-10 text-center ">
      <div>
        <div className="logo">
          <Image
            src={logo}
            alt="logo"
            width={25}
            height={25}
            className="m-auto mb-2"
          />
          <h1 className="font-montserrat text-2xl font-black ">HealthFirst</h1>
        </div>
        <br />
        <div className="tabs text-left font-bold">
          <ul>
            <li>
              <NavLink href="/dashboard" className={style.listitem}>
                <MdDashboard />
                &nbsp; Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink href="/current" className={style.listitem}>
                <AiFillMedicineBox />
                &nbsp; Ongoing
              </NavLink>
            </li>
            <li>
              <NavLink href="/treatments" className={style.listitem}>
                <FaHistory />
                &nbsp; Treatments
              </NavLink>
            </li>
            <li>
              <NavLink href="/settings" className={style.listitem}>
                <IoSettingsSharp />
                &nbsp; Settings
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* <button
          className="mr-2"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "light" ? (
            <MdDarkMode className="rounded-full bg-gray-200 p-2 text-4xl" />
          ) : (
            <MdLightMode className="rounded-full bg-[#262626] p-2 text-4xl" />
          )}
        </button> */}
      <button
        className="absolute bottom-0 mb-6 ml-16"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <MdLogout className="rounded-full bg-black p-2 pl-3 text-4xl text-white " />
      </button>
    </div>
  );
}
