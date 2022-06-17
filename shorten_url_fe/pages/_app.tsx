import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../config/axiosConfig";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
