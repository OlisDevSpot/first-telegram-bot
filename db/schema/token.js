import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const token = pgTable("token", {
  id: serial("id").primaryKey(),
  tokenAddress: varchar("token_address", { length: 255 }).notNull(),
  marketCap: integer("market_cap"),
  volume24h: integer("volume_24h"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
