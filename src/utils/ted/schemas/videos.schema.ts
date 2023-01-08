import { gql } from '@apollo/client'

export const GET_VIDEOS = gql`
  query getVideos($id: [String!], $language: String = "en", $first: Int = 10, $after: String) {
    videos(slug: $id, language: $language, channel: FEATURED, first: $first, after: $after) {
      edges {
        node {
          # playerData
          videometricsVideoId
          id
          title
          description
          duration
          # 同样是标题id
          slug
          speakers {
            edges {
              node {
                firstname
                lastname
                # whyListen
                # id
                # middlename
              }
            }
          }
          subtitledDownloads {
            low
            high
            internalLanguageCode
            languageName
          }
          publishedSubtitleLanguages(first: 999) {
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
`

export interface VideosData {
  videos: Videos
}

export interface Videos {
  edges: VideosEdge[]
}

export interface VideosEdge {
  node: VideoNode
  cursor: string
}

export interface VideoNode {
  videometricsVideoId: string
  id: string
  title: string
  description: string
  duration: number
  slug: string
  speakers: Speakers
  subtitledDownloads: SubtitledDownload[]
  publishedSubtitleLanguages: PublishedSubtitleLanguages
  primaryImageSet: PrimaryImageSet[]
  canonicalUrl: string
  nativeDownloads: NativeDownloads
  audioDownload: string
  videoDownloads: VideoDownloads
}

export interface NativeDownloads {
  high: string
  medium: string
}

export interface PrimaryImageSet {
  url: string
  aspectRatio: AspectRatio
}

export interface AspectRatio {
  name: string
}

export interface PublishedSubtitleLanguages {
  edges: PublishedSubtitleLanguagesEdge[]
}

export interface PublishedSubtitleLanguagesEdge {
  node: FluffyNode
}

export interface FluffyNode {
  iso6391: string
  iso6393: string
  isRtl: boolean
  ianaSubtag: string
  endonym: string
  englishName: string
  internalLanguageCode: string
}

export interface Speakers {
  edges: SpeakersEdge[]
}

export interface SpeakersEdge {
  node: TentacledNode
}

export interface TentacledNode {
  firstname: string
  lastname: string
}

export interface SubtitledDownload {
  low: string
  high: string
  internalLanguageCode: string
  languageName: string
}

export interface VideoDownloads {
  nodes: NodeElement[]
}

export interface NodeElement {
  url: string
}
