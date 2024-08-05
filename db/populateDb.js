const { Client } = require("pg");
const path = require("path");
const fs = require("fs");
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

async function main() {
  try {
    console.log("Seeding ...");
    const client = new Client({
      connectionString: connectionString,
    });
    const sqlPath = path.join(__dirname, "schemas/miniMessageBoard.sql");
    const SQL = fs.readFileSync(sqlPath, "utf-8");
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log(`${process.env.DB_NAME} populated, connection closed.`);
  } catch (error) {
    console.log(`Error populating DB: ${error} 
        `);
  }
}
main();
