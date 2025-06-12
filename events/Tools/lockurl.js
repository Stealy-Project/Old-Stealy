const { Guild, Client } = require("legend.js");

module.exports = {
    name: "guildUpdate",
    /**
     * @param {Guild} oldGuild
     * @param {Guild} newGuild
     * @param {Client} client
    */
    run: async (oldGuild, newGuild, client) => {
        // try {
        //     const entry = client.db.lockurl.find(entry => oldGuild.id === entry.guildID);

        //     if (!entry) return;
        //     if (newGuild.vanityURLCode === entry.vanityURL) return;

        //     let res = await fetch(`https://discord.com/api/v9/guilds/${oldGuild.id}/vanity-url`, {
        //         method: "PATCH",
        //         userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        //         headers: {
        //             "accept": "*/*",
        //             "accept-language": "fr,fr-FR;q=0.9",
        //             "authorization": client.token,
        //             "content-type": "application/json",
        //             "sec-fetch-dest": "empty",
        //             "sec-fetch-mode": "cors",
        //             "sec-fetch-site": "same-origin",
        //             "x-debug-options": "canary,logGatewayEvents,logOverlayEvents,bugReporterEnabled",
        //             "x-discord-locale": "en-US",
        //             "x-discord-timezone": "Europe/Paris",
        //             "x-super-properties": "eyJvcyI6IkxpbnV4IiwiYnJvd3NlciI6IkRpc2NvcmQgQ2xpZW50IiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X3ZlcnNpb24iOiIxLjAuOTE4NCIsIm9zX3ZlcnNpb24iOiIxMC4wLjE5MDQ1Iiwib3NfYXJjaCI6Ing2NCIsImFwcF9hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImZyIiwiaGFzX2NsaWVudF9tb2RzIjpmYWxzZSwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgZGlzY29yZC8xLjAuOTE4NCBDaHJvbWUvMTMwLjAuNjcyMy4xOTEgRWxlY3Ryb24vMzMuNC4wIFNhZmFyaS81MzcuMzYiLCJicm93c2VyX3ZlcnNpb24iOiIzMy40LjAiLCJvc19zZGtfdmVyc2lvbiI6IjE5MDQ1IiwiY2xpZW50X2J1aWxkX251bWJlciI6MzczNTI3LCJuYXRpdmVfYnVpbGRfbnVtYmVyIjo1OTA5MCwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0="
        //         },
        //         body: JSON.stringify({ code: oldGuild.vanityURLCode }),
        //     });
            
        //     if (res.body.code === 60003) {
        //         await fetch("https://discord.com/api/v9/mfa/finish", {
        //             method: "PATCH",
        //             headers: {
        //                 "accept": "*/*",
        //                 "accept-language": "fr,fr-FR;q=0.9",
        //                 "authorization": client.token,
        //                 "content-type": "application/json",
        //                 "sec-fetch-dest": "empty",
        //                 "sec-fetch-mode": "cors",
        //                 "sec-fetch-site": "same-origin",
        //                 "x-debug-options": "canary,logGatewayEvents,logOverlayEvents,bugReporterEnabled",
        //                 "x-discord-locale": "en-US",
        //                 "x-discord-timezone": "Europe/Paris",
        //                 "x-super-properties": "eyJvcyI6IkxpbnV4IiwiYnJvd3NlciI6IkRpc2NvcmQgQ2xpZW50IiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X3ZlcnNpb24iOiIxLjAuOTE4NCIsIm9zX3ZlcnNpb24iOiIxMC4wLjE5MDQ1Iiwib3NfYXJjaCI6Ing2NCIsImFwcF9hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImZyIiwiaGFzX2NsaWVudF9tb2RzIjpmYWxzZSwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgZGlzY29yZC8xLjAuOTE4NCBDaHJvbWUvMTMwLjAuNjcyMy4xOTEgRWxlY3Ryb24vMzMuNC4wIFNhZmFyaS81MzcuMzYiLCJicm93c2VyX3ZlcnNpb24iOiIzMy40LjAiLCJvc19zZGtfdmVyc2lvbiI6IjE5MDQ1IiwiY2xpZW50X2J1aWxkX251bWJlciI6MzczNTI3LCJuYXRpdmVfYnVpbGRfbnVtYmVyIjo1OTA5MCwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0="
        //             },
        //             body: JSON.stringify({
        //                 ticket: body.ticket,
        //                 mfa_type: body.methods[0].type,
        //                 data: body.methods[0].type === "password" ? client.db.mfa : client.otp.TOTP.generate(client.db.mfa.key),
        //             })
        //         })
        //     }

        //     if (client.guilds.get(oldGuild.id).vanityURLCode !== entry.vanityURL) return client.print("Erreur lors de la mise à jour de la vanity (lockUrl)");
        //     client.print(`${client.user.username} a lock : ${entry.vanityURL}`);

        //     const embed = {
        //         title: '<a:star:1345073135095123978>・Lock URL・<a:star:1345073135095123978>',
        //         color: 0xFFFFFF,
        //         fields: [
        //             {
        //                 name  : 'Serveur',
        //                 value : `[\`${oldGuild.name}\`](https://discord.gg/${entry.vanityURL})`,
        //                 inline: false
        //             },
        //             {
        //                 name  : 'URL Lock',
        //                 value : `[\`${entry.vanityURL}\`](https://discord.gg/${entry.vanityURL})`,
        //                 inline: false
        //             }
        //         ]
        //     }

        //     const guild  = client.guilds.get(oldGuild.id)
        //     const action = await guild.fetchAuditLogs({ type: 1 }).then(a => a.entries.filter(c => c.executor.id !== client.user.id).first()).catch(() => false);
        //     const member = guild.members.get(action?.executor.id)

        //         if (action && member && action.executor.id !== client.user.id){
        //             member.kick("Lock URL")
        //                 .catch(() => member.roles.set([], "Lock URL")
        //                 .catch(() => false))

        //             embed.fields.push({name: "Executeur", value: `[\`${member.user.username}${member.user.globaleName ? ` - ${member.user.globalName}` : ""}\`](https://discord.gg/${entry.vanityURL})`, inline: false})
        //         }

        //     client.log(client.db.logslockurlwb, { embeds: [embed], content: `${client.user}` })
        // } 
        // catch (e) { client.print('Erreur avec le lockUrl ' + e) }
    }
};