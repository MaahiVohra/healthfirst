import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../common/validation/auth";
import type { ILogin } from "../common/validation/auth";

const Home: NextPage = () => {
  const { handleSubmit, control, reset } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (data: ILogin) => {
      try {
        await signIn("credentials", { ...data, callbackUrl: "/dashboard" });
        reset();
      } catch (err) {
        console.error(err);
      }
    },
    [reset]
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
          className="box-border flex h-screen items-center justify-center bg-white font-montserrat"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card bg-base-100 w-96 text-center shadow-xl">
            <div className="card-body">
              <h1 className="m-4 text-3xl font-semibold">Login</h1>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    type="email"
                    placeholder="Email..."
                    className="m-4 border-b-2 border-black p-2 outline-none"
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
                    className="m-4 border-b-2 border-black p-2 outline-none"
                    {...field}
                  />
                )}
              />
              <div className="card-actions items-center justify-between">
                <button
                  className="m-4 w-1/2 rounded-3xl bg-violet-800 p-2 font-bold text-white"
                  type="submit"
                >
                  Login
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
