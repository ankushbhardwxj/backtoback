import express from "express";
import config from "./config";
import senderApi from "./api";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
app.use(bodyParser.json());
dotenv.config();

app.use("/api/v1", senderApi);

app.listen(config.PORT, () => {
  console.log(`Listening on ${config.PORT}`);
});
