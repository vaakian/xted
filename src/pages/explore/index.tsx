import type { NextPage } from 'next'
import Link from 'next/link'
import { getVideos } from '@/utils/ted/tedGraphql'
import type { VideoNode, VideosData } from '@/utils/ted/schemas'

const Explore: NextPage<{ videos: VideosData }> = ({ videos }) => {
  return (
    <div>
      {videos && videos.videos.edges.map(edge => <Video video={edge.node} key={edge.cursor}></Video>)}
    </div>
  )
}

function Video({ video }: { video: VideoNode }) {
  return (
    <div className='max-w-3xl mx-auto'>
      <h2 className='text-slate-700 italic'>{video.title}</h2>
      <h3>{video.description}</h3>
      <video src={video.videoDownloads.nodes[2]?.url} controls poster={video.primaryImageSet[0]?.url}></video>
      <Link href={`/talk/${video.slug}`}>get transcript</Link>
    </div>
  )
}

export async function getServerSideProps() {
  const videos = await getVideos({ after: '200' })
  // console.log(videos.data)
  // console.log(videos.data.videos.edges)

  return {
    props: {
      videos: videos.data,
      // will be passed to the page component as props
    },
  }
}

export default Explore
