import express from "express";
import cors from "cors";
import routes from "./routes/url.routes";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/shorten", routes);

app.get("/", (req, res) => {
  res.send("anjm");
});

export default app;
