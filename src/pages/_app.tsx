import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import { Rubik } from '@next/font/google';
import "../styles/globals.css";


const rubik = Rubik({
  weight: ['400', '500'],
  display: 'swap'
})
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
    <style global jsx>
      {`
      :root {
        font-family: ${rubik.style.fontFamily};
      }
      `}
    </style>
    <Component {...pageProps} />
    </>
  )
};

export default trpc.withTRPC(MyApp);
