import { z } from "zod";
import fs from 'fs';
import type { BilingualDetail} from "../../../utils/ted";
import { getBilingualDetail } from "../../../utils/ted";

import { router, publicProcedure } from "../trpc";

function readCache() {
  try {
    const cache = fs.readFileSync("./cache.json").toString();
    return JSON.parse(cache);
  } catch (e) {
    return {};
  }
}

const transcriptCache: Record<string, BilingualDetail> = new Proxy(readCache(), {
  set(target, key, value) {
    target[key] = value;
    fs.writeFileSync("./cache.json", JSON.stringify(target));
    return true;
  }
})

export const transcriptRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  bilingualDetail: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({input}) => {
    if (transcriptCache[input.id]) {
      return transcriptCache[input.id]
    }
    const detail = await getBilingualDetail(input.id)
    if (detail) {
      transcriptCache[input.id] = detail
    }
    return detail
  })
});
