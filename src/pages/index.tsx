import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
// import { trpc } from "@/utils/trpc";

// https://www.ted.com/talks/tawanda_kanhema_my_journey_mapping_the_uncharted_world/transcript
// https://www.ted.com/talks/tawanda_kanhema_my_journey_mapping_the_uncharted_world
function splitTedLink(link: string) {
  if (link.startsWith("https://www.ted.com/talks/")) {
    return link.split("talks/")[1]?.split("/")[0];
  } else {
    return link;
  }
}
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>xTed - Transcript</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="home h-screen w-screen">
        <div className="flex h-full w-full flex-col items-center bg-gradient-to-t from-[#ffffffEF] to-[#ffffffAA] pt-[30vh]">
          <BannerHeading />
          <Form />
        </div>
      </main>
    </>
  );
};

function Form() {
  const [link, setLink] = useState("");
  const router = useRouter();
  function handleLoad() {
    const title = splitTedLink(link);
    if (title) {
      // go to talk/[title]
      router.push(`/talk/${title}`);
    }
  }
  return (
    <div className="search flex w-full justify-center">
      <input
        className="text-main-600 caret-main-500 shadow-main-300/90 placeholder:text-main-400 inline-block h-[3.1rem] w-[70%] max-w-2xl overflow-hidden rounded-2xl border-[1px] bg-gray-100 px-5 text-center text-xl font-medium text-gray-500 outline-none transition-all duration-300 placeholder:select-none placeholder:font-normal focus:border-gray-200 focus:bg-white focus:shadow-[0_0_1.5rem_var(--tw-shadow-color)]"
        placeholder="link or title"
        onChange={(e) => setLink(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? handleLoad() : null)}
        value={link}
      ></input>
      <button
        onClick={handleLoad}
        className="ml-2 inline-flex h-[3.1rem] w-20 items-center justify-center rounded-xl bg-gray-400 text-xl text-white hover:bg-gray-600"
      >
        Go
      </button>
    </div>
  );
}

function BannerHeading() {
  return (
    <h3 className="mb-10 max-w-4xl text-center text-3xl font-bold text-gray-600 md:mx-auto md:px-20 md:text-6xl md:leading-[1.2]">
      Type the <span className="font-extrabold text-[#e72b1e]">TED </span>
      <span className="underline decoration-green-500 hover:text-green-600 hover:decoration-8">
        link
      </span>
      <span className="text-gr"> / </span>
      <span className="underline decoration-indigo-500 hover:text-indigo-600">
        title{" "}
      </span>
      <span>to get your </span>
      <span>transcript</span>
    </h3>
  );
}

export default Home;
