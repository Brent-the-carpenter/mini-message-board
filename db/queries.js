const pool = require("./pool");

async function getAllMessages() {
  try {
    const result = await pool.query(
      `SELECT * FROM messages 
      LEFT JOIN users ON messages.author_id = users.id`
    );
    return result.rows;
  } catch (error) {
    console.log(`Error getting all messages : ${error}`);
    return [];
  }
}

async function POSTMessage(userName, message) {
  try {
    const userResult = await pool.query(
      `INSERT INTO users(user_name) VALUES ($1) ON CONFLICT (user_name) DO NOTHING RETURNING *`,
      [userName]
    );
    let userId;
    if (userResult.rows.length > 0) {
      userId = userResult.rows[0].id;
    } else {
      const existingUserQuery = `SELECT id FROM users WHERE user_name = ($1) `;
      const existingUserResult = await pool.query(existingUserQuery, [
        userName,
      ]);
      userId = existingUserResult.rows[0].id;
    }
    const newMessage = await pool.query(
      "INSERT INTO messages(author_id , message , posted_at) VALUES($1 , $2 , DEFAULT) RETURNING *",
      [userId, message]
    );
    console.log(newMessage);
    return;
  } catch (error) {
    console.log("Error posting message: ", error);
    return error;
  }
}

async function DELETEMessage(id) {
  try {
    const result = await pool.query(`DELETE FROM messages WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      console.log("No message found with the given ID.");
      return { success: false, message: `Error deleting message.`, error };
    }
    return { success: true, message: `Message deleted successfully.` };
  } catch (error) {
    console.log("Error deleting message ", error);
    return { success: false, message: "Error deleting message.", error };
  }
}

module.exports = {
  getAllMessages,
  POSTMessage,
  DELETEMessage,
};
