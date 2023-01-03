import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import type { TranscriptData } from "./schemas";
import { GET_TRANSCRIPT } from "./schemas";

export const tedGraphQLClient = new ApolloClient({
  uri: "https://graphql.ted.com",
  cache: new InMemoryCache(),
});

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
  });
  return response;
}