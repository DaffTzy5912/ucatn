const fs = require("fs");
const path = require("path");
const axios = require("axios");

const TELEGRAM_BOT_TOKEN = "7990890271:AAFHGe2etMiRhZxaZj8JbcVHdPnBx-yHqB8";
const TELEGRAM_USER_ID = "7341190291";

module.exports = async (req, res) => {
  const text = `Woi Bang Ada yang baru buka website absensi!`;
  await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    chat_id: TELEGRAM_USER_ID,
    text,
  });

  const formHtml = fs.readFileSync(path.join(__dirname, "../index.html"), "utf-8");
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(indexHtml);
};
