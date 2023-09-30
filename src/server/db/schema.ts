import { sql } from "drizzle-orm";
import {
  bigint,
  int,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  tinyint,
} from "drizzle-orm/mysql-core";

export const mysqlTable = mysqlTableCreator((name) => `lottery-stat_${name}`);

export const lotteryStatLotteries = mysqlTable(
  "lotteries",
  {
    id: int("id").notNull().autoincrement(),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    type: text("type").notNull(),
    first: tinyint("first").notNull(),
    second: tinyint("second").notNull(),
    third: tinyint("third").notNull(),
    forth: tinyint("forth").notNull(),
    fifth: tinyint("fifth").notNull(),
    sixth: tinyint("sixth").notNull(),
    nickname: text("nickname").notNull(),
  },
  (table) => {
    return {
      lotteryStatLotteriesId: primaryKey(table.id),
    };
  },
);

export const numbers = mysqlTable("numbers", {
  round: int("round").notNull(),
  pickedDate: timestamp("picked_date", { mode: "string" }).notNull(),
  numFirstWinners: int("num_first_winners").notNull(),
  numSecondWinners: int("num_second_winners").notNull(),
  numThirdWinners: int("num_third_winners").notNull(),
  numForthWinners: int("num_forth_winners").notNull(),
  numFifthWinners: int("num_fifth_winners").notNull(),
  firstPrize: bigint("first_prize", { mode: "bigint" }).notNull(),
  secondPrize: bigint("second_prize", { mode: "bigint" }).notNull(),
  thirdPrize: bigint("third_prize", { mode: "bigint" }).notNull(),
  forthPrize: bigint("forth_prize", { mode: "bigint" }).notNull(),
  fifthPrize: bigint("fifth_prize", { mode: "bigint" }).notNull(),
  first: tinyint("first").notNull(),
  second: tinyint("second").notNull(),
  third: tinyint("third").notNull(),
  forth: tinyint("forth").notNull(),
  fifth: tinyint("fifth").notNull(),
  sixth: tinyint("sixth").notNull(),
  bonus: tinyint("bonus").notNull(),
});

export type SelectNumber = typeof numbers.$inferSelect;

export const nicknames = mysqlTable(
  "nicknames",
  {
    id: int("id").notNull().autoincrement(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      id: primaryKey(table.id),
    };
  },
);
