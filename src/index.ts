import express from "express";
import fetch from "node-fetch";
import path from "path";

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../static")));

app.get("/status", (req) => req.res.json({ name: process.env.SERVICE_NAME || "default" }));

app.get(/^\/proxy\/(.*?)$/, (req) => {
  fetch(req.params[0])
    .then(response => response.body.pipe(req.res))
    .catch(req.next);
});

app.listen(parseInt(process.env.PORT || '3000', 10));

