import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root123#",
  database: "test",
});

//If there is a auth problem
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Root123#';

app.get("/", (req, res) => {
  res.json("hello this is backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`id`,`title`, `description`,`price` ,`cover`) VALUE (?)";
  const values = [
    req.body.id,
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully.");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ? , `description` = ?, `price` =?, `cover` =? WHERE id =?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully.");
  });
});

app.listen(8800, () => {
  console.log("connect to backend!");
});
