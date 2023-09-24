import { sql } from "drizzle-orm";
import {
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
