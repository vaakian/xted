import { router } from "../trpc";
import { transcriptRouter } from "./example";

export const appRouter = router({
  example: transcriptRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
