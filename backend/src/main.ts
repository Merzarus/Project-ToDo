import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./router";

const app = express();
const port = process.env["PORT"]

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})