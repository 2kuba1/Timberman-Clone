import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const scoreboardRouter = createTRPCRouter({
  getBestScore: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const best = ctx.prisma.scoreboard.findFirst({
      where: {
        id: input,
      },
      select: {
        score: true,
      },
    });
    return best;
  }),
  updateScore: publicProcedure
    .input(z.object({ id: z.string(), newScore: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (input.newScore < 0)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Score can not be negative",
        });
      if (input.newScore > 3000)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cheater",
        });
      await ctx.prisma.scoreboard.update({
        data: {
          score: input.newScore,
        },
        where: {
          id: input.id,
        },
      });
    }),
  getTop3: publicProcedure.query(async ({ ctx }) => {
    const top3 = await ctx.prisma.scoreboard.findMany({
      take: 3,
      orderBy: {
        score: "desc",
      },
    });
    return top3;
  }),
  getAllScores: publicProcedure.query(async ({ ctx }) => {
    const scores = await ctx.prisma.scoreboard.findMany({
      orderBy: {
        score: "desc",
      }
    });
    return scores;
  }),
});
