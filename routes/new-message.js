const express = require("express");
const router = express.Router();
const { messages } = require("./index.js");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("new-message", { title: "New Message", sent: false, error: null });
});

/* Post message request */

router.post("/new", (req, res, next) => {
  const message = {
    text: req.body.message,
    user: req.body.name,
    added: new Date(),
    error: null,
  };
  if (!message.text || !message.user) {
    return res.render("new-message", {
      title: "New Message",
      sent: false,
      error: "All fields are required",
    });
  }
  messages.push(message);
  console.log(
    `Message from ${message.user} : "${message.text}" has been posted`
  );
  res.redirect("/");
});

module.exports = router;
