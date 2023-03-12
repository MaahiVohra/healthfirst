import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import user from "../../../public/user.png";
import { trpc } from "../../common/trpc";
import Sidebar from "../../components/Sidebar";

const cardClasses = {
  card: "my-2 mx-6 flex flex-col items-center justify-between rounded-lg px-6 py-2 shadow-lg md:max-w-xl md:flex-row cursor-pointer",
  light: "bg-white hover:bg-gray-200 text-black",
  dark: "bg-[#262626] hover:bg-[#212526] text-white",
};

const Treatments: NextPage = () => {
  const { theme } = useTheme();
  const { data } = useSession();
  const [isLoading, setisLoading] = useState(true);
  const treatments = trpc.getTreatments.useQuery();
  const [filteredTreatments, setFilteredTreatments] = useState(
    (treatments.data && treatments.data.treatments) || []
  );
  const searchRef = useRef<HTMLInputElement>();
  const [input, setInput] = useState("");
  useEffect(() => {
    if (data && treatments.data) {
      console.log("page loaded");
      setisLoading(false);
      setFilteredTreatments(treatments.data.treatments);
    }
  }, [data, treatments.data]);
  const loadTreatments = () => {
    setisLoading(true);
    setFilteredTreatments((prev) =>
      treatments.data.treatments.filter((treatment) => {
        if (searchRef.current.value === "") return treatment;
        return treatment.name
          .toLowerCase()
          .includes(searchRef.current.value.toLowerCase());
      })
    );
    setisLoading(false);
  };
  const handleInput = () => {
    setInput(() => searchRef.current.value);
    loadTreatments();
  };
  return (
    <main className="flex font-montserrat">
      <Sidebar />
      {/* Main Dashboard */}
      <section className="w-9/12 p-6">
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            value={input}
            onChange={handleInput}
            ref={searchRef}
            id="default-search"
            className={`${
              theme === "light" && "bg-gray-200"
            } + block w-full rounded-lg p-4 pl-10 text-sm outline-none`}
            placeholder="Search.."
            required
          />
          <button
            onClick={loadTreatments}
            className="absolute bottom-2 right-2.5 rounded-lg border-none bg-violet-700 px-4 py-2 text-sm font-medium text-white outline-none hover:bg-violet-800 focus:outline-none"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-3 justify-evenly gap-5 p-6">
          {filteredTreatments.map((treatment) => {
            return (
              <div
                className="flex cursor-pointer flex-col items-start rounded-lg px-6 py-2 shadow-lg md:max-w-xl md:flex-row"
                key={treatment.id}
              >
                <div className="flex flex-col justify-start p-6 ">
                  <h5 className="mb-2 text-xl font-medium ">
                    {treatment.name}
                  </h5>
                  <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {new Date(treatment.createdAt).toDateString()}
                  </time>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    {treatment.description}
                  </p>
                  <div className="mt-5 flex gap-2">
                    <Link
                      href=""
                      className=" rounded-lg border-none bg-violet-700 px-4 py-2 text-xs font-medium text-white outline-none hover:bg-violet-800 focus:outline-none"
                    >
                      View Docs
                    </Link>
                    <Link
                      href=""
                      className="rounded-lg border-none bg-violet-700 px-4 py-2 text-xs font-medium text-white outline-none hover:bg-violet-800 focus:outline-none"
                    >
                      View History
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Profile Bar - may be removed */}
      <div className="profilebar my-5 max-h-screen min-h-max w-1/12 p-10 text-center">
        <div>
          <Image
            src={user}
            alt="profile-photo"
            width={50}
            height={50}
            className="m-auto mb-2"
          />
          <p className="font-montserrat text-sm font-bold">
            {!isLoading && data.user.username}
          </p>
        </div>
      </div>
    </main>
  );
};
// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//   const treatment = trpc.getTreatments.useQuery();
//   const posts = treatment.data.treatments;

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   };
// }
export default Treatments;
