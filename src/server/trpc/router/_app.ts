import { router } from "../trpc";
import { transcriptRouter } from "./transcript";

export const appRouter = router({
  transcript: transcriptRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
