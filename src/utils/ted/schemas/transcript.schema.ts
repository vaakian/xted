import { gql } from "@apollo/client";

export const GET_TRANSCRIPT = gql`
  query getTranscript($language: String!, $videoId: ID!) {
    translation(language: $language, videoId: $videoId) {
      paragraphs {
        cues {
          text
          time
        }
      }
    }
  }
`;

export interface TranscriptData {
  translation: Translation;
}

export interface Translation {
  paragraphs: Paragraph[];
}

export interface Paragraph {
  cues: Cue[];
}

export interface Cue {
  text: string;
  time: number;
}
