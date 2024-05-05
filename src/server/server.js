const express = require("express");
const cors = require("cors");

const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

let db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

db.run(
  "CREATE TABLE IF NOT EXISTS users( id integer PRIMARY KEY AUTOINCREMENT, username text, password text)",
  (err) => {
    if (err) {
      return console.log(err.message);
    } else {
      console.log("users Table created successfully");
    }
  }
);

db.run(
  `CREATE TABLE IF NOT EXISTS itemPostings(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sellerId INTEGER,
    itemStatus TEXT,
    title TEXT,
    description TEXT,
    price TEXT,
    datePosted DATE,
    FOREIGN KEY(sellerId) REFERENCES users(id)
  )`,
  (err) => {
    if (err) {
      return console.log(err.message);
    } else {
      console.log("itemPostings Table created successfully");
    }
  }
);

app.post("/createUser", (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT id FROM users WHERE username = ?`, [username], (err, row) => {
    if (err) {
      return console.log(err.message);
    }
    if (row) {
      res.send({ message: "user already exists" });
    } else {
      db.run(
        `INSERT INTO users( username, password) VALUES(?,?)`,
        [username, password],
        function (err) {
          if (err) {
            return console.log(err.message);
          }
          res.send({ message: "Added User" + username });
        }
      );
    }
  });
});

app.get("/login", (req, res) => {
  const { username, password } = req.query;

  db.all(
    `SELECT id FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, rows) => {
      if (err) {
        return console.log(err.message);
      }
      if (rows.length > 0) {
        res.send({
          message: "Login successful",
          loginBool: true,
          userId: rows[0].id,
        });
      } else {
        res.send({ message: "Login failed", loginBool: false });
      }
    }
  );
});

app.get("/getItemPostings/:userId", (req, res) => {
  const { userId } = req.params;

  db.all(
    `SELECT * FROM itemPostings WHERE sellerId != ?`,
    [userId],
    (err, rows) => {
      if (err) {
        return console.log(err.message);
      }
      res.send(rows);
    }
  );
});


app.post("/createItemPosting", (req, res) => {
  const { userId, title, description, price } = req.body;
  console.log(userId, title, description, price);

  db.run(
    `INSERT INTO itemPostings( sellerId, itemStatus, title, description, price, datePosted) VALUES(?,'available', ?, ? , ?,datetime('now'))`,
    [userId, title, description, price],
    function (err) {
      if (err) {
        console.log("Failed parameters:", {
          userId,
          title,
          description,
          price,
        });
        return console.log(err.message);
      }
      res.send({ message: "Added Item Posting" + title });
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
