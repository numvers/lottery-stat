import {
  int,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  tinyint,
} from "drizzle-orm/mysql-core";

export const lotteryStatLotteries = mysqlTable(
  "lottery-stat_lotteries",
  {
    id: int("id").notNull().autoincrement(),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    type: text("type").notNull(),
    first: tinyint("first").notNull(),
    second: tinyint("second").notNull(),
    third: tinyint("third").notNull(),
    forth: tinyint("forth").notNull(),
    fifth: tinyint("fifth").notNull(),
    sixth: tinyint("sixth").notNull(),
  },
  (table) => {
    return {
      lotteryStatLotteriesId: primaryKey(table.id),
    };
  },
);
