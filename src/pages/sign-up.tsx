import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { signUpSchema } from "../common/validation/auth";
import type { ISignUp } from "../common/validation/auth";
import { trpc } from "../common/trpc";
import loadingImage from "./loading.svg";
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

  const { mutateAsync } = trpc.signup.useMutation();

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      setisLoading(true);
      try {
        const result = await mutateAsync(data);
        if (result.status === 201) {
          router.push("/");
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
          className="box-border flex h-screen items-center justify-center bg-white font-montserrat"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card bg-base-100 w-96 text-center shadow-xl">
            <div className="card-body">
              <h1 className="m-4 text-3xl font-semibold">Create an account</h1>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Username..."
                    className="m-4 border-b-2 border-black p-2 outline-none"
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
                    placeholder="Type your password..."
                    className="m-4 border-b-2 border-black p-2 outline-none"
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
