const express = require("express");
const cors = require("cors");

const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
var validator = require("validator");
const app = express();
const createTables = require("./tableCreation.js");
// const createExampleUserData = require("./testData/testUserData.js");
const createMarketPlaceData = require("./testData/testMarketplaceData.js");
// const fillGamesTable = require("./dbQueries/supportedGames.js");
const { getAllOtherUserItems } = require("./dbQueries/marketPlaceQueries");
// Assuming `db` is your sqlite3 database instance
const morgan = require("morgan");
morgan.token("route_and_time", function (req, res, tokens) {
  return `${req.path} ${tokens["response-time"](req, res)} ms`;
});
// Use morgan middleware with 'combined' preset which includes response time

const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/LootLairStorage/userProfilePicture");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });
app.use(morgan(":url :response-time ms"));
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

app.get("/getUserBalance/:userId", (req, res) => {
  const { userId } = req.params;
  if (!validator.isNumeric(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

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
// fillGamesTable(db);

app.get("/marketplace/:game", (req, res) => {
  const { game } = req.params.toLowerCase().replace(/_/g, "");

  if (!validator.isAlphanumeric(game)) {
    return res.status(400).json({ message: "Invalid game title" });
  }

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

  if (!validator.isNumeric(userId) || !validator.isNumeric(amount)) {
    return res.status(400).json({ message: "Invalid userId or amount" });
  }

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
  if (
    !validator.isNumeric(buyerId) ||
    !validator.isNumeric(sellerId) ||
    !validator.isNumeric(amount) ||
    !validator.isAlpha(transactionType)
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }
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
  if (!validator.isNumeric(userId) || !validator.isNumeric(balance)) {
    return res.status(400).json({ message: "Invalid userId or balance" });
  }
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

  if (
    validator.isAlphanumeric(username) ||
    validator.isAlphanumeric(password) ||
    validator.isLength(username, { min: 3, max: 20 }) ||
    validator.isLength(password, { min: 3, max: 20 })
  ) {
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
  } else {
    res.send({ message: "Invalid username or password" });
  }
});

app.get("/login", async (req, res) => {
  const { username, password } = req.query;

  if (
    !validator.isAlphanumeric(username) ||
    !validator.isAlphanumeric(password)
  ) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

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

  if (!validator.isNumeric(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  getAllOtherUserItems(db, userId).then((data) => {
    res.send(data);
  });
});

app.post(
  "/uploadProfilePicture",
  upload.single("profilePicture"),
  (req, res) => {
    // req.file is the `profilePicture` file
    // req.body will hold the text fields, if there were any
    console.log(req.file, req.body, "file uploaded successfully");
    // Save the file path to the database
    const filePath = path.join(
      "src",
      "LootLairStorage",
      "userProfilePicture",
      req.file.filename
    );

    console.log(req.body, filePath);

    // Check if the user already has a profile picture
    db.get(
      `SELECT * FROM profilePictures WHERE userId = ?`,
      [req.body.userId],
      (err, row) => {
        if (err) {
          return console.log(err.message);
        }
        if (row) {
          // Update the existing profile picture
          db.run(
            `UPDATE profilePictures SET image_route = ?, updated_at = datetime('now') WHERE userId = ?`,
            [filePath, req.body.userId],
            function (err) {
              if (err) {
                return console.log(err.message);
              }
              res.send("Profile picture updated successfully");
            }
          );
        } else {
          // Insert a new profile picture
          db.run(
            `INSERT INTO profilePictures(userId, image_route, created_at, updated_at) VALUES(?, ?, datetime('now'), datetime('now'))`,
            [req.body.userId, filePath],
            function (err) {
              if (err) {
                return console.log(err.message);
              }
              res.send("Profile picture uploaded and saved successfully");
            }
          );
        }
      }
    );
  }
);
app.get("/getUserProfilePicture/:userId", (req, res) => {
  const { userId } = req.params;
  if (!validator.isNumeric(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }
  db.get(
    `SELECT image_route FROM profilePictures WHERE userId = ?`,
    [userId],
    (err, row) => {
      if (err) {
        return console.log(err.message);
      }
      res.send(row);
    }
  );
});
app.get("/getUserName/:userId", (req, res) => {
  const { userId } = req.params;
  if (!validator.isNumeric(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }
  db.get(`SELECT username FROM users WHERE id = ?`, [userId], (err, row) => {
    if (err) {
      return console.log(err.message);
    }
    res.send(row);
  });
});
app.post("/createItemPosting", (req, res) => {
  const { sellerId, title, description, price } = req.body;
  console.log(typeof sellerId, typeof title, typeof description, typeof price);
  if (
    !validator.isNumeric(sellerId) ||
    !validator.isAlpha(title) ||
    !validator.isAlpha(description) ||
    !validator.isNumeric(price)
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  db.run(
    `INSERT INTO itemPostings( sellerId, itemStatus, title, description, price, created_at) VALUES(?,'available', ?, ? , ?,datetime('now'))`,
    [sellerId, title, description, price],
    function (err) {
      if (err) {
        console.log("Failed parameters:", {
          sellerId,
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
