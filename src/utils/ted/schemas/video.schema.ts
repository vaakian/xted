export interface VideoDetail {
  video: Video
}

export interface Video {
  speakers: Speakers
  id: string
  duration: number
  description: string
  primaryImageSet: PrimaryImageSet[]
  subtitledDownloads: SubtitledDownload[]
}

export interface PrimaryImageSet {
  url: string
  aspectRatioName: string
}

export interface Speakers {
  edges: Edge[]
}

export interface Edge {
  node: Node
}

export interface Node {
  firstname: string
  lastname: string
}

export interface SubtitledDownload {
  high: string
  internalLanguageCode: string
  languageName: string
  low: string
}
