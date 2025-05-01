const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./collection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

const addColumn = () => {  
  const Sql = "ALTER TABLE items ADD COLUMN userid TEXT DEFAULT 'default'"
  db.run(Sql, (err) => {
    if (err) {
      console.error("Error adding column:", err.message);
    } else {
      console.log("Column added successfully");
    }
  });
  
};
// addColumn()

const updateColumn = (table, column, condition, conditionValue, newValue) => {
  const Sql = `UPDATE ${table} SET ${column} = ? WHERE ${condition}`
  db.run(Sql, [newValue, conditionValue], (err) => {
    if (err) {
      console.error("Error updating column:", err.message);
    } else {
      console.log("Column updated successfully");
    }
  });
};
// updateColumn(table='items',column='userid',condition='id = ?',conditionValue='9',newValue='123')

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the items table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT,
        propertyaddress TEXT,
        locality TEXT,
        city TEXT,
        ownername TEXT,
        phoneno INTEGER,
        rentalprice INTEGER,
        paymentstatus TEXT
      )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created items table.");

      // Clear the existing data in the products table
      db.run(`DELETE FROM items`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from items");

        // Insert new data into the products table               
        const insertSql = `INSERT INTO items(title, description, propertyaddress, locality, city, ownername, phoneno, rentalprice, paymentstatus) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        for(let i=0; i<8; i++){
          const itemValues = ["Title "+i,"Description "+i,"Property address "+i,
              "Locality "+i,"City "+i,"Owner Name "+i,"Phone No "+i,
              "Rental Price "+i,"paymentstatus "+i];
          db.run(insertSql, itemValues, function (err) {
            if (err) {
              return console.error(err.message);
            }
            const id = this.lastID; // get the id of the last inserted row
            console.log(`Rows inserted, ID ${id}`);
            });
        }        
      });
    }
  );
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Closed the database connection.");
});

