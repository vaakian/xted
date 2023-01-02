import Link from "next/link";
import type { BilingualDetail } from "../utils/ted";
import Paragraphs from "./Paragraphs";

export default function Talk({ data }: { data: BilingualDetail}) {
  return (
    <div className="max-w-3xl flex flex-col mx-auto">
      {/* escape character */}
      <Link href={"/"}><h1 className="text-xl" dangerouslySetInnerHTML={{__html: data.title ?? ''}}></h1></Link>
      <h2 className="italic">{data.author}</h2>
      <Paragraphs paragraphs={data.paragraphs} />
    </div>
  )
}