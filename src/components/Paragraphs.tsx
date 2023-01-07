import type { BilingualDetail } from '@/utils/ted/ted'

export default function Paragraphs({
  paragraphs,
}: {
  paragraphs: BilingualDetail['paragraphs']
}) {
  return (
    <>
      {paragraphs.map(([p1, p2], i) => (
        <div key={i}>
          <p className="text-justify font-[Georgia]">{p1}</p>
          <p className="mb-2 font-['SongTi_SC'] text-gray-600">{p2}</p>
        </div>
      ))}
    </>
  )
}
