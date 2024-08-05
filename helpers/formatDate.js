const { DateTime } = require("luxon");

function formatDate(date) {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_SHORT);
}

module.exports = formatDate;
