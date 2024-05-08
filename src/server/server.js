const express = require("express");
const cors = require("cors");

const sqlite3 = require("sqlite3").verbose();

const app = express();
const createTables = require("./tableCreation.js");
const createExampleUserData = require("./testData/testUserData.js");
// Assuming `db` is your sqlite3 database instance

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

createTables(db);
// createExampleUserData(db);
app.get("/getUserBalance/:userId", (req, res) => {
  const { userId } = req.params;
  db.get(
    "SELECT balance FROM userBalance WHERE userId = ?",
    [userId],
    (err, row) => {
      if (err) {
        return console.log(err.message);
      }
      res.send(row);
    }
  );
});

app.post("/createUserBalance", (req, res) => {
  const { userId, balance } = req.body;
  db.run(
    "INSERT INTO userBalance (userId, balance) VALUES (?, ?)",
    [userId, balance],
    (err) => {
      if (err) {
        console.log(err.message);
        res.status(500).json({ message: "Failed to create user balance" });
      } else {
        console.log("User balance created successfully");
        res.status(200).json({ message: "User balance created successfully" });
      }
    }
  );
});

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
          const userId = this.lastID;
          db.run(
            "INSERT INTO userBalance (userId, balance) VALUES (?, ?)",
            [userId, 1000],
            (err) => {
              if (err) {
                console.log(err.message);
                res
                  .status(500)
                  .json({ message: "Failed to create user balance" });
              } else {
                console.log("User balance created successfully");
                res
                  .status(200)
                  .json({ message: "User balance created successfully" });
              }
            }
          );
        }
      );
    }
  });
});

app.get("/login", (req, res) => {
  const { username, password } = req.query;

  db.get(
    `SELECT id FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err) {
        return console.log(err.message);
      }
      if (row) {
        db.get(
          "SELECT balance FROM userBalance WHERE userId = ?",
          [row.id],
          (err, balanceRow) => {
            if (err) {
              return console.log(err.message);
            }
            console.log(balanceRow.balance);
            res.send({
              loginBool: true,
              userId: row.id,
              username: username,
              balance: balanceRow.balance,
            });
          }
        );
      } else {
        res.send({ loginBool: false });
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

app.get("/getUserName/:userId", (req, res) => {
  const { userId } = req.params;
  db.get(`SELECT username FROM users WHERE id = ?`, [userId], (err, row) => {
    if (err) {
      return console.log(err.message);
    }
    res.send(row);
  });
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
