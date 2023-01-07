import fs from 'fs'
import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import type { BilingualDetail } from '@/utils/ted/ted'
import { getBilingualDetail } from '@/utils/ted/ted'

function readCache() {
  try {
    const cache = fs.readFileSync('./cache.json').toString()
    return JSON.parse(cache)
  }
  catch (e) {
    return {}
  }
}

const transcriptCache: Record<string, BilingualDetail> = new Proxy(
  readCache(),
  {
    set(target, key, value) {
      target[key] = value
      try {
        fs.writeFileSync('./cache.json', JSON.stringify(target))
      }
      catch (err) {
        console.error(err)
      }
      return true
    },
  },
)

export const transcriptRouter = router({
  bilingualDetail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      if (transcriptCache[input.id])
        return transcriptCache[input.id]

      const detail = await getBilingualDetail(input.id)
      if (detail)
        transcriptCache[input.id] = detail

      return detail
    }),
})
