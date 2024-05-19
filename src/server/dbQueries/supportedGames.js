function fillGamesTable(db) {
  db.run(`
        INSERT INTO games (name, created_at, updated_at)
        VALUES 
                ("League of Legends", datetime("now"), datetime("now")),
                ("Valorant", datetime("now"), datetime("now")),
                ("CS2", datetime("now"), datetime("now")),
                ("NBA2K", datetime("now"), datetime("now")),
                ("Rocket League", datetime("now"), datetime("now")),
                ("World of Warcraft", datetime("now"), datetime("now")),
                ("Escape From Tarkov", datetime("now"), datetime("now")),
                ("Fortnite", datetime("now"), datetime("now")),
                ("Hearthstone", datetime("now"), datetime("now")),
              
        `);
  // Add more games as needed
  // Add more games as needed
}

module.exports = fillGamesTable;
