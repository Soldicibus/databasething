require("dotenv").config();
import { Database } from "src/database/database.js";

export const db = new Database(
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_HOST,
  process.env.DB_NAME,
  process.env.DB_PORT || 5432,
);

(async () => {
  try {
    await db.connect();
    if (db.client)
      console.log("SUCCESS: Database connection established successfully.");
    else console.log("ERROR: Database connection failed.");
  } catch (err) {
    console.log("ERROR: Failed to connect to the database:", err);
  }
})();