import { createTRPCRouter } from "~/server/api/trpc";
import { scoreboardRouter } from "./routers/scoreboard";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  scoreboard: scoreboardRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
