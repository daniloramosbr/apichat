import Express, { json } from "express";
import routes from "./routes/routes.js";
import { ConnectDB } from "./database/connect.js";
import { configDotenv } from "dotenv";

const dotenv = configDotenv()

const app = Express()

const port = 3000

app.use(json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(routes)

  ConnectDB()

  app.listen(port, () => {

  })
