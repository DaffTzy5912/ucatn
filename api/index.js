const fs = require("fs");
const path = require("path");
const axios = require("axios");

const TELEGRAM_BOT_TOKEN = "TOKEN_KAMU";
const TELEGRAM_USER_ID = "USER_ID_KAMU";

module.exports = async (req, res) => {
  const text = `Woi Bang Ada yang baru buka website absensi!`;
  await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    chat_id: TELEGRAM_USER_ID,
    text,
  });

  const formHtml = fs.readFileSync(path.join(__dirname, "../form.html"), "utf-8");
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(formHtml);
};
