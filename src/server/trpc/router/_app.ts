import { router } from '../trpc'
import { tedRouter } from './transcript'

export const appRouter = router({
  ted: tedRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
