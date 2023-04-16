import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const scoreboardRouter = createTRPCRouter({
  // createUser: publicProcedure
  //   .input(z.string())
  //   .mutation(async ({ ctx, input }) => {
  //     const exist = !!(await ctx.prisma.scoreboard.findFirst({
  //       where: {
  //         username: input,
  //       },
  //     }));

  //     if (exist) {
  //       throw new TRPCError({
  //         code: "BAD_REQUEST",
  //         cause: "Username already exists",
  //         message: "This username already exists in database",
  //       });
  //     }

  //     const user = await ctx.prisma.scoreboard.create({
  //       data: {
  //         score: 0,
  //         username: input,
  //       },
  //     });
  //     return user.id;
  //   }),
  updateScore: publicProcedure
    .input(z.object({ id: z.string(), newScore: z.number() }))
    .mutation(async ({ ctx, input }) => {
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
    const scores = await ctx.prisma.scoreboard.findMany();
    return scores;
  }),
});
