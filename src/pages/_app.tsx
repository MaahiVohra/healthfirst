import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, useTheme } from "next-themes";
import { trpc } from "../common/trpc";
import ThemeSwitch from "../components/ThemeSwitch";
import { GlobalContextProvider } from "../context/AppContext";
interface CustomAppProps extends AppProps {
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
