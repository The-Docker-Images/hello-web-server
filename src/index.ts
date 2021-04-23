import { debug } from "debug";
import express from "express";
import fetch from "node-fetch";
import path from "path";
import { inspect } from "util";

const logger = debug("web-server");
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../static")));

const serviceName = process.env.SERVICE_NAME ?? "default";

logger(`service name: ${serviceName}`);

app.get("/status", (req) => req.res.json({
  name: serviceName
}));

app.get(/^\/proxy\/(.*?)$/, (req) => {
  fetch(req.params[0])
    .then(response => response.body.pipe(req.res))
    .catch(req.next);
});

const listener = app.listen(
  parseInt(process.env.PORT || '3000', 10),
  () => {
    logger(`serve service '${serviceName}' on ${inspect(listener.address())}`);
  }
);

