import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import process from "process";
import * as schema from "./schema/index.js";

config({ path: ".env" });

export const client = neon(process.env.DATABASE_URL);

export const db = drizzle(client, {
  schema,
  casing: "snake_case",
});
