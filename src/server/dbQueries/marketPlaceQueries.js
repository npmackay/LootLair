async function getAllOtherUserItems(db, userId) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT itemPostings.*, users.username AS sellerName FROM itemPostings JOIN users ON itemPostings.sellerId = users.id WHERE sellerId != $1",
      userId,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

async function getAllUserItems(db, userId) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT itemPostings.*, users.username AS sellerName FROM itemPostings JOIN users ON itemPostings.sellerId = users.id WHERE sellerId = $1",
      userId,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

async function purchaseItem(db, buyerId, sellerId, amount, transactionType) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO transactions(buyerId, sellerId, amount, transaction_type, created_at) VALUES(?, ?, ?, ?, datetime('now'))`,
      [buyerId, sellerId, amount, transactionType],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
    db.run(
      `UPDATE userBalance SET balance = balance - ? WHERE userId = ?`,
      [amount, buyerId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );

    db.run(
      `UPDATE userBalance SET balance = balance + ? WHERE userId = ?`,
      [amount, sellerId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}
module.exports = { getAllOtherUserItems, purchaseItem, getAllUserItems };
