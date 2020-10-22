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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/projects/:id", async (req, res) => {
  const projectList = await knex.raw("SELECT * FROM projects WHERE id = ?", [
    1,
  ]);
  const projects = projectList.rows;
  res.json(projects);
});

app.get("/api/columns", async (req, res) => {
  const columnList = await knex.raw("SELECT * FROM columns");
  const columns = columnList.rows;
  res.json(columns);
});

app.post("/api/columns", async (req, res) => {
  const { title } = req.body;
  await knex.raw("INSERT INTO columns (title, project_id) VALUES (?, ?)", [
    title,
    1,
  ]);
  res.json("created column");
});

app.patch("/api/columns/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  await knex.raw("UPDATE columns SET title = ? WHERE id = ?", [title, id]);
  res.json("updated column");
});

app.delete("/api/columns/:id", async (req, res) => {
  const { id } = req.params;
  await knex.raw("DELETE FROM columns WHERE id = ?", [id]);
  res.json("deleted column");
});

app.get("/api/cards", async (req, res) => {
  const cardList = await knex.raw("SELECT * FROM cards");
  const cards = cardList.rows;
  res.json(cards);
});

app.post("/api/cards", async (req, res) => {
  const { description } = req.body;
  await knex.raw("INSERT INTO cards (description, column_id) VALUES (?, ?)", [
    description,
    column_id,
  ]);
  res.json("created card");
});

app.patch("/api/cards/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  await knex.raw("UPDATE columns SET title = ? WHERE id = ?", [
    description,
    id,
  ]);
  res.json("updated card");
});

app.delete("/api/cards/:id", async (req, res) => {
  const { id } = req.params;
  await knex.raw("DELETE FROM cards WHERE id = ?", [id]);
  res.json("deleted card");
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
