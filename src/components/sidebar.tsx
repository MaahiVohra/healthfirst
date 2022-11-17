import Link from "next/link";
import Image from "next/image";
import { FaHistory } from "react-icons/Fa";
import { AiFillMedicineBox } from "react-icons/Ai";
import { IoSettingsSharp } from "react-icons/io5";
import { MdDashboard, MdLogout } from "react-icons/Md";
import logo from "../../public/logo.png";
import { signOut } from "next-auth/react";
export default function Sidebar() {
  return (
    <div className="sidebar my-5 flex max-h-screen w-2/12 flex-col justify-between border-r-2 py-10 text-center">
      <div>
        <div className="logo">
          <Image
            src={logo}
            alt="logo"
            width={25}
            height={25}
            className="m-auto mb-2"
          />
          <h1 className="font-montserrat text-2xl font-black text-violet-900">
            HealthFirst
          </h1>
        </div>
        <br />
        <div className="tabs text-left font-bold">
          <ul>
            <li className="p-4 hover:bg-violet-50">
              <Link href="/dashboard" className="flex items-center">
                <MdDashboard />
                &nbsp; Dashboard
              </Link>
            </li>
            <li className=" p-4 hover:bg-violet-50">
              <Link href="/dashboard" className="flex items-center">
                <AiFillMedicineBox />
                &nbsp; Ongoing
              </Link>
            </li>
            <li className=" p-4 hover:bg-violet-50">
              <Link href="/dashboard" className="flex items-center">
                <FaHistory />
                &nbsp; History
              </Link>
            </li>
            <li className=" p-4 hover:bg-violet-50">
              <Link href="/dashboard" className="flex items-center">
                <IoSettingsSharp />
                &nbsp; Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="logout">
        <button className="" onClick={() => signOut({ callbackUrl: "/" })}>
          <p className="flex items-center">
            <MdLogout className="rounded-full bg-black p-2 pl-3 text-4xl text-white" />
            &nbsp; Log out
          </p>
        </button>
      </div>
    </div>
  );
}
