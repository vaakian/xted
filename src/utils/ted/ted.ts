import type { Cue } from './schemas'
import { getTranscript, getVideoDetail } from './tedGraphql'

/**
 *
 * @param id the id of the talk, similar to the title.
 * @param lang the language of the talk, default to ['en', 'zh-cn']
 * @returns
 */
export async function getBilingualDetail(
  id = 'brittney_cooper_the_racial_politics_of_time',
  lang: [string, string] = ['en', 'zh-cn'],
) {
  const paragraphs = await getBilingual(id, lang)
  const detail = await getVideoDetail(id)

  return {
    detail,
    paragraphs,
    id,
  }
}

/**
 *
 * @param cues A cue is a sentence, or a part of a sentence.
 * @param joiner the joiner between cues, default to ' '
 * @returns the joined paragraph
 */
export function joinCues(cues: Cue[], joiner = ' ') {
  const isEn = !!joiner
  return (
    cues
      .map(cue => cue.text)
      .join(joiner)
      .replace(/\n/g, isEn ? ' ' : '')
      // replace double spaces
      .replace(/\s{2,}/g, ' ')
  )
}

/**
 *
 * @param id
 * @param lang
 * @returns
 */
export async function getBilingual(
  id = 'brittney_cooper_the_racial_politics_of_time',
  lang: [string, string] = ['en', 'zh-cn'],
) {
  try {
    // eslint-disable-next-line prefer-const
    let [origin, target] = await Promise.all([
      getTranscript(id, lang[0]),
      getTranscript(id, lang[1]),
    ])
    // 有英文 但没有中文，尝试台湾
    // 第二种情况：都有，但是无法配对
    if (origin.data.translation && target.data.translation === null) {
      // try to get zh-tw
      target = await getTranscript(id, 'zh-tw')
    }
    const originParagraphs = origin.data.translation.paragraphs
    const targetParagraphs = target.data.translation.paragraphs
    // failed
    if (originParagraphs.length !== targetParagraphs.length)
      return []

    return originParagraphs.map((originParagraph, i) => {
      return [
        joinCues(originParagraph.cues),
        joinCues(targetParagraphs[i]?.cues || [], ''),
      ]
    })
  }
  catch (err) {
    return []
  }
}

type InferPromise<T> = T extends Promise<infer U> ? U : T

export type BilingualDetail = InferPromise<
  ReturnType<typeof getBilingualDetail>
>
