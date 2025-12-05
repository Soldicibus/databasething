import express from "express";
import { router } from "./src/router.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(router);

app.listen(PORT, () => {
  console.log(`SUCCESS: Server running on http://localhost:${PORT}`);
});

export default app;