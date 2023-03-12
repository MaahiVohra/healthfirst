import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import user from "../../../public/user.png";
import { requireAuth } from "../../common/requireAuth";
import Sidebar from "components/Bar";
import Timeline from "components/Timeline";
export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});
const cardClasses = {
  card: "my-2 mx-6 flex flex-col items-center justify-between rounded-lg px-6 py-2 shadow-lg md:max-w-xl md:flex-row cursor-pointer",
  light: "bg-white hover:bg-gray-200",
  dark: "bg-[#262626] hover:bg-[#212526]",
};
function getMonth(month) {
  if (month == 1) return "January";
  if (month == 2) return "February";
  if (month == 3) return "March";
  if (month == 4) return "April";
  if (month == 5) return "May";
  if (month == 6) return "June";
  if (month == 7) return "July";
  if (month == 8) return "August";
  if (month == 9) return "September";
  if (month == 10) return "October";
  if (month == 11) return "November";
  if (month == 12) return "December";
}

const Dashboard: NextPage = () => {
  const { data } = useSession();
  const [isLoading, setisLoading] = useState(true);
  const today = new Date();
  const month = today.getMonth() + 1;
  const strmonth = getMonth(month);
  const date = strmonth + " " + today.getDate() + ", " + today.getFullYear();
  useEffect(() => {
    if (data) {
      setisLoading(false);
    }
  }, [data]);

  return (
    <main className="flex font-montserrat">
      <Sidebar />
      {/* Main Dashboard */}
      <div className="grid h-screen w-9/12 grid-cols-2 justify-evenly p-6">
        <div className="">
          <div>
            <h2 className="text-lg font-bold">Today&#39;s Plan</h2>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
          <TodayPlanCard />
        </div>
        <div className="">
          <h2 className="mb-6 text-lg font-bold">Pinned Documents</h2>
          <p className="text-xs"></p>
          <DocumentCard
            documentName={"Aadhaar.pdf"}
            documentUpdatedAt={"500"}
          />
          <DocumentCard
            documentName={"Report.pdf"}
            documentUpdatedAt={"1000"}
          />
        </div>
        <div className="col-span-2 m-2">
          <h2 className="mb-6 text-lg font-bold">Latest Updates</h2>
          <Timeline cardClasses={cardClasses} />
        </div>
      </div>

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

// Internal Components
function TodayPlanCard() {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <div
      className={`${
        theme === "dark" ? cardClasses.dark : cardClasses.light
      } + ${cardClasses.card}`}
    >
      <div className="flex flex-col">
        <h5 className="text-xl font-medium ">Weekly visit to Doctor</h5>
        <p className="text-xs text-gray-600">Appointment at 3:00 PM</p>
      </div>
    </div>
  );
}
function DocumentCard({ documentName, documentUpdatedAt }) {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "dark" ? cardClasses.dark : cardClasses.light
      } + ${cardClasses.card}`}
    >
      <div className="flex flex-col">
        <h5 className="text-xl font-medium ">{documentName}</h5>
        <p className="text-xs text-gray-600">Last updated 3 mins ago</p>
      </div>
      <button className="">Unpin</button>
    </div>
  );
}

export default Dashboard;
