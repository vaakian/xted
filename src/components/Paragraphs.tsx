import type { BilingualDetail } from "../utils/ted";

export default function Paragraphs({
  paragraphs,
}: {
  paragraphs: BilingualDetail["paragraphs"];
}) {
  return (
    <>
      {paragraphs.map(([p1, p2], i) => (
        <p key={i}>
          <p className="font-[Georgia]">{p1}</p>
          <p className="font-['SongTi_SC'] mb-2 text-gray-500">{p2}</p>
        </p>
      ))}
    </>
  );
}
