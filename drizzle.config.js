import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import process from "process";

config({ path: ".env" });

export default defineConfig({
  out: "./db/migrations",
  schema: "./db/schema/index.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
