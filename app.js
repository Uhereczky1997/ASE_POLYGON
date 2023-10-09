const express = require("express");
const pg = require("pg");
const Polygon = require("polygon");
const {getPositionVector, getSize, getArea} = require("./utils/map.js");

const port = 8080;
const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log("listening on port:" + port);
});

const pool = new pg.Pool({
  host: "localhost",
  port: "5432",
  database: "ase_polygon",
  user: "postgres",
  password: "1234",
});

app.post("/polygon", async (req, res) => {
  const reqBody = req.body;
  console.log(reqBody);
  try {
    const dbRes = await pool.query(
      "insert into polygon (path) values ($1) returning *",
      [reqBody.path]
    );
    console.log(dbRes.rows);
    return res.status(200).json(dbRes.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

app.get("/polygon", async (req, res) => {
  try {
    const dbRes = await pool.query("select * from polygon");
    console.log(dbRes.rows);
    return res.status(200).json(dbRes.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});
app.get("/path/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const dbRes = await pool.query("select * from polygon where id = $1", [
      Number(id),
    ]);
    const path = dbRes?.rows[0]?.path;
    var vector = getPositionVector(path);
    var size = getSize();
    var area = getArea(vector);
    return res.status(200).json({size: size, area: area, vector: vector});
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});
