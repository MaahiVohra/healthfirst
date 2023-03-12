import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { trpc } from "../common/trpc";
import loadingImage from "./loading.svg";
import { IProfile, profileSchema } from "../common/validation/profile";
import "react-phone-input-2/lib/style.css";
import { useSession } from "next-auth/react";
import { useAppContext } from "../hooks/useAppContext";
const GettingStarted: NextPage = () => {
  const session = useSession();

  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (session.data) {
      setisLoading(false);
      console.log(session.data.user);
    }
  }, [session.data]);
  const { handleSubmit, control, reset, watch, register } = useForm<IProfile>({
    defaultValues: {
      dob: new Date(),
      bloodgroup: "A+",
      contact: "",
      emergencyContact: "",
      address: "",
    },
    resolver: zodResolver(profileSchema),
  });
  // const onSubmit = (data) => console.log(data);
  const { mutateAsync } = trpc.updateprofile.useMutation();
  const { user } = useAppContext();
  const onSubmit = useCallback(
    async (data: IProfile) => {
      console.log(data.dob.toString());
      // console.log(session.data.user.userId);
      setisLoading(true);
      try {
        const result = await mutateAsync({
          dob: data.dob.toString(),
          bloodgroup: data.bloodgroup,
          contact: data.contact,
          emergencyContact: data.emergencyContact,
          address: data.address,
          userId: user,
        });
        if (result.status === 201) {
          router.push("/dashboard");
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
        <title>Next App - Getting Started</title>
        <meta name="description" content="HealthFirst - Register Now!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form
          className="box-border flex h-screen items-center justify-center font-montserrat"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card bg-base-100   w-[40rem] items-center gap-10 p-8 text-center shadow-xl">
            <h1 className=" m-4 text-3xl font-semibold">
              Complete Your Profile
            </h1>

            <div className="flex">
              <div className="flex flex-col">
                <label htmlFor="dob" className="m-4 p-2">
                  DOB
                </label>
                <label htmlFor="bloodgroup" className="m-4 p-2">
                  Blood Group
                </label>
                <label htmlFor="contact" className="m-4 p-2">
                  Contact
                </label>
                <label htmlFor="emergencyContact" className="m-4 p-2">
                  Emergency Contact
                </label>
                <label htmlFor="address" className="m-4 p-2">
                  Address
                </label>
              </div>
              <div className="">
                <Controller
                  control={control}
                  name="dob"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      className="m-2 my-4 w-48 border-b-2 border-[#262626] bg-transparent p-2 text-center outline-none"
                    />
                  )}
                />
                <Controller
                  name="bloodgroup"
                  control={control}
                  render={({ field }) => (
                    <select
                      onChange={field.onChange}
                      value={field.value}
                      className="m-4 mb-2 border-b-2 border-[#262626] bg-transparent p-2 outline-none "
                    >
                      <option value="A">A+</option>
                      <option value="A-">B-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  )}
                />
                <Controller
                  name="contact"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={field.value}
                      onChange={field.onChange}
                      inputStyle={{
                        backgroundColor: "transparent",
                        outline: "none",
                        border: "none",
                        fontFamily: "Montserrat",
                        fontSize: "1rem",
                      }}
                      containerClass=" border-b-2 border-[#262626] my-4 p-2"
                      dropdownClass="phone-dropdown"
                      buttonStyle={{
                        backgroundColor: "transparent",
                        outline: "none",
                        border: "none",
                      }}
                      buttonClass="phone"
                      country={"in"}
                    />
                  )}
                />
                <Controller
                  name="emergencyContact"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={field.value}
                      onChange={field.onChange}
                      inputStyle={{
                        backgroundColor: "transparent",
                        outline: "none",
                        border: "none",
                        fontFamily: "Montserrat",
                        fontSize: "1rem",
                      }}
                      containerClass=" border-b-2 border-[#262626] my-4 p-2"
                      dropdownClass="phone-dropdown"
                      buttonStyle={{
                        backgroundColor: "transparent",
                        outline: "none",
                        border: "none",
                      }}
                      buttonClass="phone"
                      country={"in"}
                    />
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Address..."
                      value={field.value}
                      onChange={field.onChange}
                      className="my-2 mx-4 border-b-2 border-[#262626] bg-transparent p-2 outline-none"
                    />
                  )}
                />
              </div>
            </div>

            <button
              className=" m-4 w-1/2 rounded-3xl bg-violet-800 p-2 font-bold text-white"
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
                "Continue"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default GettingStarted;
