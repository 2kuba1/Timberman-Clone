import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const leaderboardRouter = createTRPCRouter({
  addFirstScore: publicProcedure
    .input(z.object({ name: z.string(), score: z.number() }))
    .mutation(({ ctx, input }) => {
      ctx.prisma.leaderboar.create({
        data: {
          score: input.score,
          username: input.name,
        },
      });
    }),
  updateScore: publicProcedure
    .input(z.object({ id: z.string(), newScore: z.number() }))
    .mutation(({ ctx, input }) => {
      ctx.prisma.leaderboar.update({
        data: {
          score: input.newScore,
        },
        where: {
          id: input.id,
        },
      });
    }),
  getTop3: publicProcedure.query(({ ctx }) => {
    const top3 = ctx.prisma.leaderboar.findMany({
      take: 3,
      orderBy: {
        score: "desc",
      },
    });
    return top3;
  }),
});
