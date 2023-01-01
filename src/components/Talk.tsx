import type { BilingualDetail } from "../utils/ted";
import Paragraphs from "./Paragraphs";

export default function Talk({ data }: { data: BilingualDetail}) {
  return (
    <div className="max-w-3xl flex flex-col mx-auto">
      <h1 className="text-xl">{data.title}</h1>
      <h2 className="italic">{data.author}</h2>
      <Paragraphs paragraphs={data.paragraphs} />
    </div>
  )
}