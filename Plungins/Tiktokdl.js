const axios = require('axios');
const config = require('../config');
const { cmd } = require('../command');
const { isUrl } = require('../lib/functions');
const DY_SCRAP = require('@joshuamambo1/scrap');
const dy_scrap = new DY_SCRAP();

cmd({
  pattern: "tiktok",
  alias: ["tt", "ttdl"],
  react: "🌷",
  desc: "Download TikTok videos",
  category: "download",
  use: ".tiktok <TikTok URL>",
  filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
  try {
    if (!q || !isUrl(q)) {
      return await reply("❌ Please provide a valid TikTok URL!");
    }

    const response = await dy_scrap.tiktok(q);
    if (!response?.status) {
      return await reply("❌ Failed to download TikTok video.");
    }

    const { id, title, cover, duration, play_count, digg_count, sd, hd } = response.result;

    const info = `🍒 *𝚃𝙸𝙺𝚃𝙾𝙺 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁* 🍒\n\n` +
      `🎵 *Title:* ${title}\n` +
      `⏳ *Duration:* ${duration}\n` +
      `👀 *Views:* ${play_count}\n` +
      `❤️ *Likes:* ${digg_count}\n\n` +
      `🔽 *Choose the quality:*\n` +
      `1️⃣ *SD Video* 📹\n` +
      `2️⃣ *HD Video* 🎥\n\n` +
      `${config.FOOTER || "POWERED BY YOUR BOT NAME"}`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: cover },
      caption: info
    }, { quoted: mek });

    const messageID = sentMsg.key.id;

    conn.ev.on('messages.upsert', async (messageUpdate) => {
      const mekInfo = messageUpdate.messages[0];
      if (!mekInfo?.message) return;

      const messageType = mekInfo.message.conversation || mekInfo.message.extendedTextMessage?.text;
      const isReplyToSentMsg = mekInfo.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

      if (isReplyToSentMsg) {
        let userReply = messageType.trim();
        let videoUrl = "";
        let msg = '';

        if (userReply === "1") {
          msg = await conn.sendMessage(from, { text: "📥 Downloading SD Video..." }, { quoted: mek });
          videoUrl = sd;
        } else if (userReply === "2") {
          msg = await conn.sendMessage(from, { text: "📥 Downloading HD Video..." }, { quoted: mek });
          videoUrl = hd;
        } else {
          return await reply("❌ Invalid choice! Reply with 1️⃣ or 2️⃣.");
        }

        await conn.sendMessage(from, {
          video: { url: videoUrl },
          caption: `🎥 *Here is your TikTok Video!*\n\n> ${title}`
        }, { quoted: mek });

        await conn.sendMessage(from, { text: '✅ Media Upload Successful ✅', edit: msg.key });
      }
    });
  } catch (error) {
    console.error(error);
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    await reply(`❌ *An error occurred:* ${error.message}`);
  }
});
