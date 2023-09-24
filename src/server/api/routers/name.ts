import { eq } from "drizzle-orm";
import { nicknames } from "../../db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const nameRouter = createTRPCRouter({
  findNames: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.nicknames.findFirst({
      where: eq(nicknames.id, Math.floor(Math.random() * 1000)),
    });
  }),
});
