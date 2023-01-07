import Head from 'next/head'
import Link from 'next/link'
import Paragraphs from './Paragraphs'
import type { BilingualDetail } from '@/utils/ted/ted'

export default function Talk({ data }: { data: BilingualDetail }) {
  const speaker = data.detail?.node.speakers.edges?.[0]?.node
  const title = data.detail?.node.title
  const speakerFullName = `${speaker?.firstname} ${speaker?.lastname}`
  return (
    <>
      <Head>
        <title>
          {title} - {speakerFullName}
        </title>
      </Head>

      <div className="mx-auto flex max-w-3xl min-w-[352px] flex-col text-xl">
        <Link href={'/'}>
          <h1
            className="border-l-4 border-red-500 pl-2 font-[Georgia] text-2xl text-red-800"
            dangerouslySetInnerHTML={{ __html: title ?? '' }}
          ></h1>
        </Link>
        <h2 className="text-right italic text-gray-600">{speakerFullName}</h2>
        <Paragraphs paragraphs={data.paragraphs} />
      </div>
    </>
  )
}
