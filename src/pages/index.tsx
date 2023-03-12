import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../common/validation/auth";
import type { ILogin } from "../common/validation/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import loadingImage from "./loading.svg";
import { useTheme } from "next-themes";
import { FaUserAlt, FaUserMd } from "react-icons/fa";
const loginClasses = {
  unselectedRole:
    "flex flex-col items-center rounded-md border-2 border-transparent p-6 hover:border-2 hover:border-violet-800 hover:bg-violet-400 hover:bg-opacity-10 cursor-pointer my-4",
  selectedRole:
    "flex flex-col items-center rounded-md border-2 border-transparent p-6 bg-violet-800 text-white cursor-pointer my-4",
};

const Home: NextPage = () => {
  const { theme, setTheme } = useTheme();

  console.log(theme);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Patient");
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const handleRoleClick = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setSelectedRole(event.target.value);
  };
  const onSubmit = useCallback(
    async (data: ILogin) => {
      console.log(data);
      if (data.password.length < 5 || data.password.length > 20) {
        setError("Password should be between 5-20 characters");
      } else {
        setisLoading(true);
        try {
          setError("");
          const result = await signIn("credentials", {
            ...data,
            redirect: false,
          });
          if (result.ok) {
            router.push("/dashboard");
          } else {
            setError("Incorrect Email or Password");
            setisLoading(false);
          }
        } catch (err) {
          console.log(err);
          reset();
        }
        // setisLoading(false);
      }
    },
    [reset, router]
  );

  return (
    <div>
      <Head>
        <title>HealthFirst - Login</title>
        <meta
          name="description"
          content="HealthFirst - A platform for your medical documentation."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form
          className="box-border flex h-screen items-center justify-center font-montserrat"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card bg-base-100 w-96 text-center shadow-xl">
            <div className="card-body">
              <h1 className="m-4 text-3xl font-semibold">Login</h1>
              <p
                className="bg-red-300 font-bold text-white"
                aria-live="assertive"
              >
                {error}
              </p>
              {/* <Controller
                name="role"
                control={control}
                render={({ field }) => ( */}
              <div className="flex justify-center gap-4">
                <label
                  className={
                    selectedRole === "Patient"
                      ? `${loginClasses.selectedRole}`
                      : `${loginClasses.unselectedRole}`
                  }
                >
                  <input
                    onClick={handleRoleClick}
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
                    onClick={handleRoleClick}
                    value="Doctor"
                    type="radio"
                    name="role"
                    className="invisible"
                  />
                  <FaUserMd />
                  Doctor
                </label>
              </div>
              {/* )}
              /> */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    type="email"
                    placeholder="Email..."
                    className="m-4 w-60 border-b-2 border-[#262626] bg-transparent p-2 outline-none"
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
                    placeholder="Password..."
                    autoComplete="new-password"
                    className="m-4 w-60 border-b-2 border-[#262626] bg-transparent p-2 outline-none"
                    {...field}
                  />
                )}
              />

              <div className="card-actions items-center justify-between">
                <button
                  className="relative m-4 h-10 w-1/2 rounded-3xl bg-violet-800  p-2 font-bold text-white"
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
                    "Login"
                  )}
                </button>
                <br />
                <p className="m-4 font-semibold text-gray-400">
                  Not registered?
                  <span className="text-violet-800">
                    <Link href="/sign-up"> Sign Up</Link>
                  </span>
                </p>
                {/* <Link href="/sign-up" className="link">
                  Go to sign up
                </Link> */}
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
