const express = require("express");
const app = express();
const db = require("./db");
const router = require("./event/router");
const cors = require("cors");
const bodyParser = require("body-parser");

const corsMiddleware = cors();
app.use(corsMiddleware);

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

app.use(router);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
