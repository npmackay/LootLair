const express = require("express");
const cors = require("cors");

const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

const app = express();
const createTables = require("./tableCreation.js");
// const createExampleUserData = require("./testData/testUserData.js");
// const createMarketPlaceData = require("./testData/testMarketplaceData.js");
// const fillGamesTable = require("./dbQueries/supportedGames.js");
const { getAllOtherUserItems } = require("./dbQueries/marketPlaceQueries");
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
  createTables(db);
});

// createExampleUserData(db);
// createMarketPlaceData(db);
// fillGamesTable(db);
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

app.get("/marketplace/:game", (req, res) => {
  const { game } = req.params.toLowerCase().replace(/_/g, "");
  console.log(game);
  db.all(
    "SELECT itemPostings.*, users.username AS sellerName FROM itemPostings JOIN users ON itemPostings.sellerId = users.id WHERE gameId IN (SELECT id FROM games WHERE title = ?)",
    game,
    (err, rows) => {
      if (err) {
        return console.log(err.message);
      }
      res.send(rows);
    }
  );
});

app.post("/addBalance", (req, res) => {
  const { userId, amount } = req.body;
  console.log(userId, amount);
  console.log("addBalance hit");
  db.run(
    `UPDATE userBalance SET balance = balance + ? WHERE userId = ?`,
    [amount, userId],
    (err) => {
      if (err) {
        console.log(err.message);
        res.status(500).json({ message: "Failed to update balance" });
      } else {
        db.get(
          "SELECT balance FROM userBalance WHERE userId = ?",
          [userId],
          (err, row) => {
            if (err) {
              return console.log(err.message);
            }
            // Check if row is not undefined before accessing row.balance
            if (row) {
              res.status(200).json({ userId, balance: row.balance });
            } else {
              res.status(404).json({ message: "User not found" });
            }
          }
        );
      }
    }
  );
});

app.post("/purchaseItem", (req, res) => {
  const { buyerId, sellerId, amount, transactionType } = req.body;
  console.log("purchaseItem hit");

  console.log("purchaseItem route hit");
  db.run(
    `INSERT INTO transactions(buyerId, sellerId, amount, transaction_type, created_at) VALUES(?, ?, ?, ?, datetime('now'))`,
    [buyerId, sellerId, amount, transactionType],
    (err) => {
      if (err) {
        console.log(err.message);
        res.status(500).json({ message: "Failed to create transaction" });
      }
    }
  );
  db.run(
    `UPDATE userBalance SET balance = balance - ? WHERE userId = ?`,
    [amount, buyerId],
    (err) => {
      if (err) {
        console.log(err.message);
        res.status(500).json({ message: "Failed to update buyer balance" });
      }
    }
  );
  db.run(
    `UPDATE userBalance SET balance = balance + ? WHERE userId = ?`,
    [amount, sellerId],
    (err) => {
      if (err) {
        console.log(err.message);
        res.status(500).json({ message: "Failed to update seller balance" });
      }
    }
  );
  res.status(200).json({ message: "Transaction successful" });
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

app.post("/createUser", async (req, res) => {
  const { username, password } = req.body;

  db.get(
    `SELECT id FROM users WHERE username = ?`,
    [username],
    async (err, row) => {
      if (err) {
        return console.log(err.message);
      }
      if (row) {
        res.send({ message: "user already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
          `INSERT INTO users( username, password) VALUES(?,?)`,
          [username, hashedPassword],
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
    }
  );
});

app.get("/login", async (req, res) => {
  const { username, password } = req.query;

  db.get(
    `SELECT id, password FROM users WHERE username = ?`,
    [username],
    async (err, row) => {
      if (err) {
        return console.log(err.message);
      }
      if (row) {
        const match = await bcrypt.compare(password, row.password);
        console.log(match);
        if (match) {
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
      } else {
        res.send({ loginBool: false });
      }
    }
  );
});

app.get("/getItemPostings/:userId", (req, res) => {
  const { userId } = req.params;

  getAllOtherUserItems(db, userId).then((data) => {
    res.send(data);
  });
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
