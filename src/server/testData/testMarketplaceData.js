
function createMarketPlaceData(db) {
  let exampleData = [
    {
      sellerId: 7,
      title: "Tarkov Carry Service ",
      description:
        "2 raids of carry service in Escape from Tarkov , all loot is yours to keep , 100% survival rate guaranteed will play until you get out for number of raids purchased",
      price: 50,
      itemStatus: "available",
    },
    {
      sellerId: 8,
      title: "World of Warcraft CLASSIC Gold WHITEMANE",
      description: "1000 gold on Whitemane server Alliance side",
      price: 20,
      itemStatus: "available",
    },
    {
      sellerId: 9,
      title: "Pax Twisted Fate",
      description: "Pax Twisted Fate skin code for League of Legends",
      price: 999,
      itemStatus: "available",
    },
    {
      sellerId: 8,
      title: "World of Warcraft CLASSIC Gold WHITEMANE",
      description: "1000 gold on Whitemane server Alliance side",
      price: 20,
      itemStatus: "available",
    },
    {
      sellerId: 8,
      title: "World of Warcraft CLASSIC Gold THRALL",
      description: "1000 gold on THRALL server HORDE side",
      price: 20,
      itemStatus: "available",
    },
  ];

  exampleData.forEach((item) => {
    db.run(
      `INSERT INTO itemPostings( sellerId, title, description, price, itemStatus, created_at, updated_at) VALUES(?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [
        item.sellerId,
        item.title,
        item.description,
        item.price,
        item.itemStatus,
      ],
      (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log(item.title + " created successfully");
      }
    );
  });
}

module.exports = createMarketPlaceData;