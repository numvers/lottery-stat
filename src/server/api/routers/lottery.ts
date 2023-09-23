import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { lotteryStatLotteries } from "../../db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const insertLotterySchema = createInsertSchema(lotteryStatLotteries);

export const lotteryRouter = createTRPCRouter({
  findLottery: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.lotteryStatLotteries.findMany();
  }),
  createLottery: publicProcedure
    .input(
      z.object({
        numbers: z.number().array().length(6),
        type: z.enum(["pick", "uju", "random", "odd-even", "missing"]),
      }),
    )
    .mutation(({ ctx, input }) => {
      const data = insertLotterySchema.parse({
        type: input.type,
        first: input.numbers[0],
        second: input.numbers[1],
        third: input.numbers[2],
        forth: input.numbers[3],
        fifth: input.numbers[4],
        sixth: input.numbers[5],
        created_at: new Date(),
      });
      return ctx.db.insert(lotteryStatLotteries).values(data);
    }),
});
