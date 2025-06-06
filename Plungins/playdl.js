import axios from "axios";
import yts from "yt-search";
import config from '../config.cjs';

const play = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const args = m.body.slice(prefix.length + cmd.length).trim().split(" ");

  if (cmd === "play4") {
    if (args.length === 0 || !args.join(" ")) {
      return m.reply("*Please provide a song name or keywords to search for.*");
    }

    const searchQuery = args.join(" ");
    m.reply("> *🎧 Searching for the song wait...*");

    try {
      const searchResults = await yts(searchQuery);
      if (!searchResults.videos || searchResults.videos.length === 0) {
        return m.reply(`❌ No results found for "${searchQuery}".`);
      }

      const firstResult = searchResults.videos[0];
      const videoUrl = firstResult.url;

      // Using a reliable API for YouTube audio downloads
      const apiUrl = `https:                                                
      const response = await axios.get(apiUrl);

      if (!response.data.status) {
        return m.reply(`//api.yt-mx.com/download/ytmp3?url=${videoUrl}`;
      const response = await axios.get(apiUrl);

      if (!response.data.status) {
        return m.reply(`❌ Failed to fetch audio for "${searchQuery}".`);
      }

      const { title, download_url } = response.data.result;

                            
      await gss.sendMessage(m.from, {
        audio: { url: download_url },
        mimetype: "audio/mp4",
        ptt: false,
      }, { quoted: m });

      m.reply(`// Send the audio file
      await gss.sendMessage(m.from, {
        audio: { url: download_url },
        mimetype: "audio/mp4",
        ptt: false,
      }, { quoted: m });

      m.reply(`> ✅ *${title}* has been downloaded successfully by 𝐽𝛩𝑆𝛨𝑈𝛥𝛭𝛥𝛭𝐵𝛩1 𝛯𝐶𝛩𝑈𝛮𝐵𝛥𝛮!`);
    } catch (error) {
      console.error(error);
      m.reply("❌ An error occurred while processing your request.");
    }
  }
};

export default play;
