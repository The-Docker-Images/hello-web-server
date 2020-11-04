import express from "express";
import path from "path";

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../static")));

app.listen(parseInt(process.env.PORT || '3000', 10));

