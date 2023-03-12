import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { trpc } from "../common/trpc";
import ThemeSwitch from "../components/ThemeSwitch";
import { GlobalContextProvider } from "../context/AppContext";
import { NextComponentType, NextPageContext } from "next";

/*
Adds an optional property named session to the pageProps object.
The & AppProps["pageProps"] part of the code is an intersection type, which allows the new pageProps property to inherit any existing properties defined in AppProps["pageProps"]. This means that CustomAppProps is a superset of AppProps, and can be used interchangeably in places where AppProps is expected.
*/
interface CustomAppProps extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: {
    session?: Session;
  } & AppProps["pageProps"];
}

const CustomApp = ({ Component, pageProps }: CustomAppProps) => (
  <SessionProvider session={pageProps.session}>
    <ThemeProvider enableSystem={false}>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
      <ThemeSwitch />
    </ThemeProvider>
  </SessionProvider>
);
export default trpc.withTRPC(CustomApp);
