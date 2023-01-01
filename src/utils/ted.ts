export async function getTranscript(title: string, lang: string) {
  return await fetch(
    "https://www.ted.com/graphql?" +
      new URLSearchParams({
        operationName: "Transcript",
        variables: `{"id":"${title}","language":"${lang}"}`,
        extensions: `{"persistedQuery":{"version":1,"sha256Hash":"906b90e820733c27cab3bb5de1cb4578657af4610c346b235b4ece9e89dc88bd"}}`,
      })
  ).then((res) => res.json());
}

export function joinCues(cues: any[], joiner = " ") {
  const isEn = !!joiner;
  return (
    cues
      .map((cue) => cue.text)
      .join(joiner)
      .replace(/\n/g, isEn ? " " : "")
      // replace double spaces
      .replace(/\s{2,}/g, " ")
  );
}
export async function getBilingual(
  id = "brittney_cooper_the_racial_politics_of_time",
  lang: [string, string] = ["en", "zh-cn"]
) {
  try {
    // eslint-disable-next-line prefer-const
    let [origin, target] = await Promise.all([
      getTranscript(id, lang[0]),
      getTranscript(id, lang[1]),
    ]);
    console.log(origin, target);
    // 有英文 但没有中文，尝试台湾
    // 第二种情况：都有，但是无法配对
    if (origin.data.translation && target.data.translation === null) {
      // try to get zh-tw
      target = await getTranscript(id, "zh-tw");
    }
    const originParagraphs = origin.data.translation.paragraphs as any[];
    const targetParagraphs = target.data.translation.paragraphs as any[];
    // failed
    if (originParagraphs.length !== targetParagraphs.length) {
      return [];
    }
    return originParagraphs.map((originParagraph: any, i) => {
      return [
        joinCues(originParagraph.cues),
        joinCues(targetParagraphs[i].cues, ""),
      ];
    });
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getDetail(id = "brittney_cooper_the_racial_politics_of_time") {
  const html = await fetch("https://www.ted.com/talks/" + id).then((res) =>
    res.text()
  );
  // match content in <title></title>
  const [author, title] = (html.match(/<title>(.*)<\/title>/) || [
    ,
    ":",
  ])[1].split(":");
  return {
    author,
    title: title?.split("|")[0],
  };
}

export async function getBilingualDetail(
  id = "brittney_cooper_the_racial_politics_of_time",
  lang: [string, string] = ["en", "zh-cn"]
) {
  const [detail, paragraphs] = await Promise.all([
    getDetail(id),
    getBilingual(id, lang),
  ]);
  return {
    ...detail,
    paragraphs,
    id,
  };
}

type InferPromise<T> = T extends Promise<infer U> ? U : T;

export type BilingualDetail = InferPromise<
  ReturnType<typeof getBilingualDetail>
>;
