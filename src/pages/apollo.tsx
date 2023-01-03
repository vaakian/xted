import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import type { NextPage } from "next";

const client = new ApolloClient({
  uri: "https://graphql.ted.com",
  cache: new InMemoryCache(),
});

const ApolloPage: NextPage<ServerSideProps> = (props) => {
  return (
    <ApolloProvider client={client}>
      <div>{props.data.videos.edges.length}</div>
      <div className="flex">
        {props.data.videos.edges.map(({ node: video }) => (
          <div
            className="m-2 flex w-[400px] flex-col gap-2 border border-red-500 p-2"
            key={video.id}
          >
            {/* 标题，正常空格 */}
            <h1>title: {video.title}</h1>

            {/* ID，与标题相似，但以 _ 分割。 */}
            {/* <p>slug: {video.slug}</p> */}

            {/* 非常耗费流量，还是直接用 ted 的已有链接更好。 */}
            {/* https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/db422180-c696-4b00-9400-e5a81904635f/AdetayoBamiduro_2022-embed.jpg?quality=89&w=320 */}
            {/* <Image src={video.primaryImageSet[0]?.url || ''} alt="cover" width={150} height={130} /> */}

            {/* 描述(h-60) */}
            <TextItem title="description" text={video.description} height={'60'} />
            {/* 时长 */}
            <TextItem title="duration" text={video.duration} />
            {/* 数字id */}
            <TextItem title="videoId" text={video.id} />
            {/* 视频：0、1、2 */}
            {/* 音频：原声 */}
            <audio className="mx-auto" src={video.audioDownload} controls></audio>
            <video
              width={400}
              height={350}
              src={video.videoDownloads.nodes[1]?.url}
              poster={video.primaryImageSet[0]?.url}
              controls
            ></video>
            {/* 可用翻译稿 */}
            <select className="border">
              {video.publishedSubtitleLanguages.edges.map(({ node }) => (
                <option key={node.iso6391} value={node.internalLanguageCode}>
                  {node.endonym}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </ApolloProvider>
  );
};

function TextItem({
  title,
  text,
  height = null,
}: {
  title: string;
  text: string | number | null | undefined;
  height?: number | string | null;
}) {
  return (
    <div className={`flex flex-row font-[Georgia] h-${height} overflow-hidden text-ellipsis`}>
      <span className="text-stone-600">{title}</span>
      <span className="mx-2 text-gray-400">{" => "}</span>
      <span>{text}</span>
    </div>
  );
}

export async function getServerSideProps() {
  // after is a cursor, which is a `digit` string.
  const g = gql`
    {
      videos(language: "en", channel: FEATURED, first: 2, after: "400") {
        edges {
          node {
            videometricsVideoId
            id
            title
            description
            duration
            # 同样是标题id
            slug
            publishedSubtitleLanguages(first: 9999) {
              edges {
                node {
                  iso6391
                  iso6393
                  isRtl
                  ianaSubtag
                  endonym
                  englishName
                  internalLanguageCode
                }
              }
            }
            primaryImageSet {
              url
              aspectRatio {
                name
              }
            }
            canonicalUrl
            nativeDownloads {
              high
              medium
            }
            audioDownload
            videoDownloads {
              nodes {
                url
              }
            }
          }
          cursor
        }
      }
    }
  `;
  const res = await client.query<GraphVideoResponse>({ query: g });
  return {
    props: res,
  };
}

type InferPromise<T> = T extends Promise<infer U> ? U : T;
type ServerSideProps = InferPromise<
  ReturnType<typeof getServerSideProps>
>["props"];

export interface GraphVideoResponse {
  videos: Videos;
}

export interface Videos {
  edges: VideosEdge[];
}

export interface VideosEdge {
  node: PurpleNode;
  cursor: string;
}

export interface PurpleNode {
  videometricsVideoId: string;
  id: string;
  title: string;
  description: string;
  duration: number;
  slug: string;
  publishedSubtitleLanguages: PublishedSubtitleLanguages;
  primaryImageSet: PrimaryImageSet[];
  canonicalUrl: string;
  nativeDownloads: NativeDownloads;
  audioDownload: string;
  videoDownloads: VideoDownloads;
}

export interface NativeDownloads {
  high: string;
  medium: string;
}

export interface PrimaryImageSet {
  url: string;
  aspectRatio: AspectRatio;
}

export interface AspectRatio {
  name: string;
}

export interface PublishedSubtitleLanguages {
  edges: PublishedSubtitleLanguagesEdge[];
}

export interface PublishedSubtitleLanguagesEdge {
  node: FluffyNode;
}

export interface FluffyNode {
  iso6391: string;
  iso6393: string;
  isRtl: boolean;
  ianaSubtag: string;
  endonym: string;
  englishName: string;
  internalLanguageCode: string;
}

export interface VideoDownloads {
  nodes: NodeElement[];
}

export interface NodeElement {
  url: string;
}

export default ApolloPage;
