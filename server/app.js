const express = require("express");
const app = express();
const knex = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "",
    database: "jellow_app",
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/boxes", async (req, res) => {
  const boxResult = await knex.raw("SELECT * FROM boxes");
  const boxes = boxResult.rows;
  res.json(boxes);
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
