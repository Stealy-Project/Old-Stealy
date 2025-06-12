const { Client, Guild } = require("legend.js");

module.exports = {
  name: "guildUpdate",
  ws: false,
  /**
   * @param {Guild} oldGuild
   * @param {Guild} newGuild
   * @param {Client} client
   */
  run: async (oldGuild, newGuild, client) => {
    // console.log(client.user.id, newGuild.id, oldGuild.id);
    // console.log("=========================");

    // const entry = client.db.snipeurl.find(
    //   (entry) => newGuild.id === entry.guildID
    // );
    // console.log(entry)
    // if (!entry) return;
    // if (newGuild.vanityURLCode === entry.vanityURL) return;

    // const req = await fetch(`https://discord.com/api/v9/guilds/${entry.guildID}/vanity-url`, {
    //     method: "PATCH",
    //     headers: {
    //         "accept": "*/*",
    //         "accept-language": "en-US",
    //         "sec-ch-ua": "\"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    //         "sec-ch-ua-mobile": "?0",
    //         "sec-ch-ua-platform": "\"Windows\"",
    //         "sec-fetch-dest": "empty",
    //         "sec-fetch-mode": "cors",
    //         "sec-fetch-site": "same-origin",
    //         "x-debug-options": "bugReporterEnabled",
    //         "x-discord-locale": "en-US",
    //         "x-discord-timezone": "America/New_York",
    //         "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRmlyZWZveCIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJlbi1VUyIsImhhc19jbGllbnRfbW9kcyI6ZmFsc2UsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2OjEzMy4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzEzMy4wIiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTMzLjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MzU1NjI0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
    //         "referer": "https://discord.com/channels/@me",
    //         "origin": "https://discord.com",
    //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Electron/33.0.0 Safari/537.36",
    //         "priority": "u=1, i",
    //         "Authorization": client.token,
    //         "X-Discord-Mfa-Authorization": client.mfaToken[entry.guildID],
    //         "Content-Type": "application/json",
    //         "cookie": `__Secure-recent_mfa=${client.mfaToken[entry.guildID]}`,
    //         "Referrer-Policy": "strict-origin-when-cross-origin"
    //     },
    //     body: JSON.stringify({ code: entry.vanityURL}),
    //     redirect: "follow",
    //     credentials: "include",
    // });

    // console.log(
    //   client.mfaToken[entry.guildID],
    //   JSON.stringify({ code: entry.vanityURL }),
    //   req
    // );

    // if (client.guilds.get(entry.guildID).vanityURLCode !== entry.vanityURL)
    //   client.print("Erreur lors de la mise à jour de la vanity");
    // client.print(`${client.user.username} a snipé : ${entry.vanityURL}`);

    // await client.log(entry.webhookURL, {
    //   embeds: [
    //     {
    //       color: 0xffffff,
    //       description: `***${client.language(
    //         `L'URL \`${newGuild.vanityURLCode}\` vous appartient`,
    //         `The URL \`${newGuild.vanityURLCode}\` is now your`
    //       )}***`,
    //     },
    //   ],
    //   content: `${client.user}`,
    // });
    // client.db.snipecount = client.db.snipecount++;
    // // client.db.snipeurl = client.db.snipeurl.filter(
    // //   (o) => o.guildID !== newGuild.id
    // // );
    // client.save();
  },
};
