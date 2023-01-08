import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'
import type { TranscriptData, VideosData } from './schemas'
import { GET_TRANSCRIPT, GET_VIDEOS } from './schemas'

export const tedGraphQLClient = new ApolloClient({
  uri: 'https://graphql.ted.com',
  cache: new InMemoryCache(),
})

export async function tedQuery<T>(...args: Parameters<typeof tedGraphQLClient.query<T>>) {
  const response = await tedGraphQLClient.query<T>(...args)
  return response
}

export async function getTranscript(title: string, lang: string) {
  const response = await tedQuery<TranscriptData>({
    query: GET_TRANSCRIPT,
    variables: {
      language: lang,
      videoId: title,
    },
  })
  return response
}

export async function getVideoDetail(title: string) {
  const response = await tedQuery<VideosData>({ query: GET_VIDEOS, variables: { id: title } })
  const videos = response.data.videos.edges[0]
  return videos
}

export async function getVideos(variables: {
  id?: string
  language?: string
  first?: string
  after?: string
} = {}) {
  const response = await tedQuery<VideosData>({ query: GET_VIDEOS, variables })
  return response
}
