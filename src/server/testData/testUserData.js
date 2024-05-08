function createExampleUserData(db) {
  let exampleData = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
    { username: "user3", password: "password3" },
  ];

  exampleData.forEach((user) => {
    db.run(
      `INSERT INTO users( username, password) VALUES(?,?)`,
      [user.username, user.password],
      (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log(user.username + " created successfully");
      }
    );
    (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("user1 created successfully");
    };
  });
}

module.exports = createExampleUserData;
