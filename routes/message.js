const express = require("express");
const router = express.Router();
const {
  GET_new_message_form,
  POST_message,
  DELETE_message,
} = require("../controllers/messageController");

/* GET users listing. */
router.get("/", GET_new_message_form);

/*DELETE message */

router.get("/delete/:id", DELETE_message);

/* Post message request */

router.post("/", POST_message);

module.exports = router;
