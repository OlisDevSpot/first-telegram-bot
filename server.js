import express from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const TELEGRAM_TOKEN = process.env.API_KEY;

app.get("/", async (req, res) => {
  const data = await axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => res.data);
  res.json({ message: "Hello from server", data });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
