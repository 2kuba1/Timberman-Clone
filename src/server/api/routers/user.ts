import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const exist = !!(await ctx.prisma.scoreboard.findFirst({
        where: {
          username: input,
        },
      }));

      if (exist) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: "Username already exists",
          message: "This username already exists",
        });
      }

      const user = await ctx.prisma.scoreboard.create({
        data: {
          score: 0,
          username: input,
        },
      });
      return user.id;
    }),
  getUsername: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const username = await ctx.prisma.scoreboard.findFirst({
        where: {
          id: input,
        },
        select: {
          username: true,
        },
      });
      return username;
    }),
});
