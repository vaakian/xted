import Head from "next/head";
import Link from "next/link";
import type { BilingualDetail } from "@/utils/ted";
import Paragraphs from "./Paragraphs";

export default function Talk({ data }: { data: BilingualDetail }) {
  return (
    <>
      <Head>
        <title>
          {data.title} - {data.author}
        </title>
      </Head>

      <div className="mx-auto flex max-w-3xl flex-col text-xl">
        <Link href={"/"}>
          <h1
            className="border-l-4 border-red-500 pl-2 font-[Georgia] text-2xl text-red-800"
            dangerouslySetInnerHTML={{ __html: data.title ?? "" }}
          ></h1>
        </Link>
        <h2 className="text-right italic text-gray-600">{data.author}</h2>
        <Paragraphs paragraphs={data.paragraphs} />
      </div>
    </>
  );
}
