import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useContext, useState } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ILogin, signUpSchema } from "../common/validation/auth";
import type { ISignUp } from "../common/validation/auth";
import { trpc } from "../common/trpc";
import loadingImage from "./loading.svg";
import { signIn } from "next-auth/react";
import { useAppContext } from "../hooks/useAppContext";
import { FaUserAlt, FaUserMd } from "react-icons/fa";
const loginClasses = {
  unselectedRole:
    "flex flex-col items-center rounded-md border-2 border-transparent p-6 hover:border-2 hover:border-violet-800 hover:bg-violet-400 hover:bg-opacity-10 cursor-pointer my-4",
  selectedRole:
    "flex flex-col items-center rounded-md border-2 border-transparent p-6 bg-violet-800 text-white cursor-pointer my-4",
};
const SignUp: NextPage = () => {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<ISignUp>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });
  const [selectedRole, setSelectedRole] = useState("Patient");

  const { mutateAsync } = trpc.signup.useMutation();
  const { user, setUser } = useAppContext();

  // const login = useCallback(
  //   async (data: ILogin) => {
  //     console.log(data);

  //     setisLoading(true);
  //     try {
  //       const result = await signIn("credentials", {
  //         ...data,
  //         redirect: false,
  //       });
  //       if (result.ok) {
  //         router.push("/gettingstarted");
  //       } else {
  //         setisLoading(false);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       reset();
  //     }
  //     // setisLoading(false);
  //   },
  //   [reset, router]
  // );

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      setisLoading(true);
      try {
        console.log("something");
        const result = await mutateAsync(data);
        if (result.status === 201) {
          setUser(result.userId);
          router.push("/gettingstarted");
        }
      } catch (err) {
        console.error(err);
        reset();
      }
      // setisLoading(false);
    },
    [mutateAsync, router, reset]
  );

  return (
    <div>
      <Head>
        <title>Next App - Register</title>
        <meta name="description" content="HealthFirst - Register Now!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form
          className="box-border flex h-screen items-center justify-center font-montserrat"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card bg-base-100 w-96 text-center shadow-xl">
            <div className="card-body">
              <h1 className="m-4 text-3xl font-semibold">Create an account</h1>
              <div className="flex justify-center gap-4">
                <label
                  className={
                    selectedRole === "Patient"
                      ? `${loginClasses.selectedRole}`
                      : `${loginClasses.unselectedRole}`
                  }
                >
                  <input
                    // onClick={handleRoleClick}
                    value="Patient"
                    type="radio"
                    name="role"
                    className="invisible"
                    defaultChecked
                  />
                  <FaUserAlt />
                  Patient
                </label>
                <label
                  className={
                    selectedRole === "Doctor"
                      ? `${loginClasses.selectedRole}`
                      : `${loginClasses.unselectedRole}`
                  }
                >
                  <input
                    // onClick={handleRoleClick}
                    value="Doctor"
                    type="radio"
                    name="role"
                    className="invisible"
                  />
                  <FaUserMd />
                  Doctor
                </label>
              </div>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Username..."
                    className="m-4 border-b-2 border-[#262626] bg-transparent p-2 outline-none"
                    {...field}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    type="email"
                    placeholder="Email..."
                    className="m-4 border-b-2 border-[#262626] bg-transparent p-2 outline-none"
                    {...field}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    type="password"
                    placeholder="Type your password..."
                    className="m-4 border-b-2 border-[#262626] bg-transparent p-2 outline-none"
                    {...field}
                  />
                )}
              />

              <div className="card-actions items-center justify-between">
                {/* <Link href="/" className="link">
                  Go to login
                </Link> */}

                <button
                  className="m-4 w-1/2 rounded-3xl bg-violet-800 p-2 font-bold text-white"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Image
                      src={loadingImage}
                      alt="loading"
                      width={25}
                      height={25}
                      className="m-auto"
                    />
                  ) : (
                    "SignUp"
                  )}
                </button>
                <p className="m-4 font-semibold text-gray-400">
                  Already have an account?
                  <span className="text-violet-800">
                    <Link href="/"> Login</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
