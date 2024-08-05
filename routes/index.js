const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const msgController = require("../controllers/messageController");

/* GET home page. */
router.get("/", msgController.GET_all_messages);

module.exports = router;
