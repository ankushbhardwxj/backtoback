import express from "express";
import config from "./config";
import api from "./api";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
app.use(bodyParser.json());
dotenv.config();

console.log(process.env);

app.use("/api/v1", api);

app.listen(config.PORT, () => {
  console.log(`Listening on ${config.PORT}`);
});
