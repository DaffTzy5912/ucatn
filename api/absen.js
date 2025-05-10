const fs = require("fs");
const path = require("path");
const axios = require("axios");
const absensiFile = path.join(__dirname, "../absensi.json");

const TELEGRAM_BOT_TOKEN = "7990890271:AAFHGe2etMiRhZxaZj8JbcVHdPnBx-yHqB8";
const TELEGRAM_USER_ID = "7341190291";

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", async () => {
    const params = new URLSearchParams(body);
    const nama = params.get("nama");
    const umur = params.get("umur");
    const kelas = params.get("kelas");
    const waktu = params.get("waktu");

    const data = { nama, umur, kelas, waktu };

    let list = [];
    if (fs.existsSync(absensiFile)) {
      list = JSON.parse(fs.readFileSync(absensiFile));
    }
    list.push(data);
    fs.writeFileSync(absensiFile, JSON.stringify(list, null, 2));

    const text = `Woi Bang Ada Yang Absen Nih:\nNama: ${nama}\nUmur: ${umur}\nKelas: ${kelas}\nWaktu: ${waktu}`;
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_USER_ID,
      text
    });

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`<p>Absensi berhasil dikirim!</p><a href="/">Kembali</a>`);
  });
};
