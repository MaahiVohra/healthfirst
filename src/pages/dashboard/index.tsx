import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import user from "../../../public/user.png";
import { requireAuth } from "../../common/requireAuth";
import Sidebar from "../../components/sidebar";
export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});

const Dashboard: NextPage = () => {
  const { data } = useSession();
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    if (data) {
      setisLoading(false);
    }
  }, [data]);
  return (
    <main className="flex font-montserrat">
      <Sidebar />

      <div className="h-screen w-9/12 bg-white"></div>
      <div className="profilebar my-5 max-h-screen min-h-max w-2/12 border-l-2 p-10 text-center">
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

export default Dashboard;
