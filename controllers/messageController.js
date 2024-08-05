const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const format = require("../helpers/formatDate");
const formatDate = require("../helpers/formatDate");
const title = "Members only";
const GET_all_messages = asyncHandler(async (req, res, next) => {
  const messages = await db.getAllMessages();
  messages.forEach((message) => {
    message.posted_at = formatDate(message.posted_at);
  });
  console.log(messages);
  return res.render("index", {
    title,
    messages,
  });
});

const GET_new_message_form = asyncHandler(async (req, res, next) => {
  return res.status(200).render("new-message", {
    title: "Post a new message.",
  });
});

const POST_message = asyncHandler(async (req, res, next) => {
  const userMessage = req.body.message;
  const userName = req.body.name;
  await db.POSTMessage(userName, userMessage);
  res.redirect("/");
});

const DELETE_message = asyncHandler(async (req, res, next) => {
  const messageId = req.params.id;
  console.log(messageId);
  await db.DELETEMessage(messageId);
  res.redirect("/");
});

module.exports = {
  GET_all_messages,
  GET_new_message_form,
  POST_message,
  DELETE_message,
};
