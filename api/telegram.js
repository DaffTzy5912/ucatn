const fs = require("fs");
const path = require("path");
const axios = require("axios");
const absensiFile = path.join(__dirname, "../absensi.json");

const TELEGRAM_BOT_TOKEN = "TOKEN_KAMU";

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", async () => {
    const message = JSON.parse(body).message;
    if (!message || !message.text) return res.status(200).send("OK");

    const chatId = message.chat.id;
    const text = message.text;

    if (text === "/cekabsen") {
      let responseText = "Daftar Absensi:\n\n";

      if (fs.existsSync(absensiFile)) {
        const list = JSON.parse(fs.readFileSync(absensiFile));

        if (list.length === 0) {
          responseText = "Belum ada data absensi.";
        } else {
          list.forEach((item, index) => {
            responseText += `${index + 1}. ${item.nama} | ${item.umur} th | ${item.kelas} | ${item.waktu}\n`;
          });
        }
      } else {
        responseText = "File absensi tidak ditemukan.";
      }

      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: responseText
      });
    }

    res.status(200).send("OK");
  });
};
