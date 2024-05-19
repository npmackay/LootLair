function createTables(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT,
      password TEXT,
      created_at DATE,
      updated_at DATE
    )`,
    (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("users Table created successfully");
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS userBalance(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      balance INTEGER,
      created_at DATE,
      updated_at DATE,
      FOREIGN KEY(userId) REFERENCES users(id)
    )`,
    (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("userBalance Table created successfully");
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS transactions(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      buyerId INTEGER,
      sellerId INTEGER,
      amount INTEGER,
      transaction_type TEXT,
      created_at DATE,
      FOREIGN KEY(buyerId) REFERENCES users(id),
      FOREIGN KEY(sellerId) REFERENCES users(id)
    )`,
    (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("transactions Table created successfully");
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS profilePictures(id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, 
      image_route TEXT, created_at DATE, updated_at DATE, FOREIGN KEY(userId) REFERENCES users(id))`,
    (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("profilePictures Table created successfully");
    }
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS itemPostings(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sellerId INTEGER,
      title TEXT,
      description TEXT,
      price INTEGER,
      itemStatus TEXT,
      created_at DATE,
      updated_at DATE,
      gameId INTEGER,
      FOREIGN KEY(gameId) REFERENCES games(id),
      FOREIGN KEY(sellerId) REFERENCES users(id)
    )`,
    (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("itemPostings Table created successfully");
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS games(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      created_at DATE,
      updated_at DATE
    )`,
    (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("games Table created successfully");
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS itemImages(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      itemId INTEGER,
      image_url TEXT,
      created_at DATE,
      updated_at DATE,
      FOREIGN KEY(itemId) REFERENCES itemPostings(id)
    )`,
    (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("itemImages Table created successfully");
    }
  );
}

module.exports = createTables;
