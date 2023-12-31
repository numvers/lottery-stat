import { desc } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { lotteryStatLotteries, numbers } from "../../db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const insertLotterySchema = createInsertSchema(lotteryStatLotteries);

export const lotteryRouter = createTRPCRouter({
  findAllNumbers: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.numbers.findMany({
      orderBy: [desc(numbers.pickedDate)],
    });
  }),
  searchAllNumbers: publicProcedure
    .input(z.object({ numbers: z.number().array() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.numbers
        .findMany({
          orderBy: [desc(numbers.pickedDate)],
        })
        .then((nums) =>
          nums
            .map((num) => ({
              lottery: num,
              numbers: [
                num.first,
                num.second,
                num.third,
                num.forth,
                num.fifth,
                num.sixth,
                num.bonus,
              ],
            }))
            .filter((num) =>
              input.numbers.every((inNumber) => num.numbers.includes(inNumber)),
            )
            .map((num) => num.lottery),
        );
    }),
  findLottery: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.lotteryStatLotteries.findMany({
      orderBy: [desc(lotteryStatLotteries.createdAt)],
    });
  }),
  createLottery: publicProcedure
    .input(
      z.object({
        nickname: z.string().nonempty(),
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
        nickname: input.nickname,
      });
      return ctx.db.insert(lotteryStatLotteries).values(data);
    }),
});
