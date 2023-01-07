import { GET_VIDEOS } from '../schemas/videos.schema'
import { tedQuery } from '../tedGraphql'
import type { TranscriptData, VideosData } from '../schemas'
import { GET_TRANSCRIPT } from '../schemas'
const videoId = 'mark_pollock_and_simone_george_a_love_letter_to_realism_in_a_time_of_grief'
describe('video query', () => {
  it('should get videos', async () => {
    const { data } = await tedQuery<VideosData>({
      query: GET_VIDEOS,
      variables: { after: '500' },
    })
    expect(data.videos.edges.length).toBeGreaterThan(0)
  })
})

describe('transcript query', () => {
  it('should get transcript', async () => {
    const { data } = await tedQuery<TranscriptData>({
      query: GET_TRANSCRIPT,
      variables: {
        language: 'en',
        videoId,
      },
    })
    const { paragraphs } = data.translation
    expect(paragraphs.length).toBeGreaterThan(0)

    paragraphs.forEach((paragraph) => {
      paragraph.cues.forEach((cue) => {
        expect(cue.text.length).toBeGreaterThan(0)
        expect(cue.time).toBeDefined()
      })
      // expect(paragraph.cues.map((cue) => cue.time).filter(Boolean).length).toBeGreaterThan(0);
    })
  })
})
