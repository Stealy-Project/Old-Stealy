module.exports = {
    name: "url",
    run: async (client, message, args) => {

        if (!args[0]) return message.edit(client.language(`*Veuillez fournir un \`server_id\` pour snipe son url*`, `*Please give an \`server_id\` to snipe its url*`))

        if (args[0] === "list") return message.edit(client.language(`*Liste des urls snipées : * \n\n${client.db.snipeurl.length === 0 ? "*Aucune URL snipée pour l'instant*" : client.db.snipeurl.map(entry => `*ID : * \`${entry.guildID}\` - *URL : * \`${entry.vanityURL}\` - *Server : * \`${client.guilds.get(entry.guildID)?.name || entry.guildID}\`\n`).join('\n')}`, `*Sniped URLs list : *\n${client.db.snipeurl.length === 0 ? "*No URL sniped right now.*" : client.db.snipeurl.map(entry => `*ID : * \`${entry.guildID}\` - *URL : * \`${entry.vanityURL}\` - *Server : * \`${client.guilds.get(entry.guildID)?.name || entry.guildID}\`\n`).join('\n')}`));
        if (args[0] === "stop") {
            if (!client.db.snipeurl.find(c => c.guildID === args[1])) return message.edit(client.language(`*Aucun serveur de snipe de trouvé.*`, `*No guild found in snipe.*`));

            client.db.snipeurl = client.db.snipeurl.filter(c => c.guildID !== args[1])
            client.save()
            return message.edit(client.language(`*Le serveur a été retiré du snipeur.*`, `*The url has been removed from the snipe.*`));
        }
        if (args[0] === "clear") {
            client.db.snipeurl = []
            client.save()
            return message.edit(client.language(`*Tous les snipes ont été supprimés.*`, `*All the snipe has been deleted.*`));
        }

        if (!client.db.mfa) message.edit(client.language(`*Veuillez d'abord configurer votre mot de passe/clé A2F avec la commande \`${client.db.prefix}setmfa\`.*`, `*Please configure first your password/mfa key with the command \`${client.db.prefix}setmfa\`.*`));
        if (!message.guild) message.edit(client.language(`*Vous devez faire la commande sur un serveur.*`, `*You need to send this command on a guild where you put the new URL.*`));

        if (args[0] == 'claim') {
            if (!args[0]) return message.edit(client.language(`*Veuillez entrer une vanity valide.*`, `*Please enter a valid vanity.*`));

            let res = await fetch(`https://discord.com/api/v9/guilds/${message.guild.id}/vanity-url`, {
                method: "PATCH",
                headers: {
                    "accept": "*/*",
                    "accept-language": "fr,fr-FR;q=0.9",
                    "authorization": client.token,
                    "content-type": "application/json",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-debug-options": "canary,logGatewayEvents,logOverlayEvents,bugReporterEnabled",
                    "x-discord-locale": "en-US",
                    "x-discord-timezone": "Europe/Paris",
                    "x-super-properties": "eyJvcyI6IkxpbnV4IiwiYnJvd3NlciI6IkRpc2NvcmQgQ2xpZW50IiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X3ZlcnNpb24iOiIxLjAuOTE4NCIsIm9zX3ZlcnNpb24iOiIxMC4wLjE5MDQ1Iiwib3NfYXJjaCI6Ing2NCIsImFwcF9hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImZyIiwiaGFzX2NsaWVudF9tb2RzIjpmYWxzZSwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgZGlzY29yZC8xLjAuOTE4NCBDaHJvbWUvMTMwLjAuNjcyMy4xOTEgRWxlY3Ryb24vMzMuNC4wIFNhZmFyaS81MzcuMzYiLCJicm93c2VyX3ZlcnNpb24iOiIzMy40LjAiLCJvc19zZGtfdmVyc2lvbiI6IjE5MDQ1IiwiY2xpZW50X2J1aWxkX251bWJlciI6MzczNTI3LCJuYXRpdmVfYnVpbGRfbnVtYmVyIjo1OTA5MCwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0="
                },
                body: JSON.stringify({ code: args[0] })
            })

            if (res.body.code === 60003) {
                await fetch("https://discord.com/api/v9/mfa/finish", {
                    headers: {
                        "accept": "*/*",
                        "accept-language": "fr,fr-FR;q=0.9",
                        "authorization": client.token,
                        "content-type": "application/json",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-debug-options": "canary,logGatewayEvents,logOverlayEvents,bugReporterEnabled",
                        "x-discord-locale": "en-US",
                        "x-discord-timezone": "Europe/Paris",
                        "x-super-properties": "eyJvcyI6IkxpbnV4IiwiYnJvd3NlciI6IkRpc2NvcmQgQ2xpZW50IiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X3ZlcnNpb24iOiIxLjAuOTE4NCIsIm9zX3ZlcnNpb24iOiIxMC4wLjE5MDQ1Iiwib3NfYXJjaCI6Ing2NCIsImFwcF9hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImZyIiwiaGFzX2NsaWVudF9tb2RzIjpmYWxzZSwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgZGlzY29yZC8xLjAuOTE4NCBDaHJvbWUvMTMwLjAuNjcyMy4xOTEgRWxlY3Ryb24vMzMuNC4wIFNhZmFyaS81MzcuMzYiLCJicm93c2VyX3ZlcnNpb24iOiIzMy40LjAiLCJvc19zZGtfdmVyc2lvbiI6IjE5MDQ1IiwiY2xpZW50X2J1aWxkX251bWJlciI6MzczNTI3LCJuYXRpdmVfYnVpbGRfbnVtYmVyIjo1OTA5MCwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0="
                    },
                    method: "PATCH",
                    body: JSON.stringify({
                        ticket: body.ticket,
                        mfa_type: client.db.mfa.type,
                        data: client.db.mfa.type == "password" ? `${client.db.mfa}` : client.otp.TOTP.generate(client.db.mfa),
                    })
                })
            }

            if (res.body.code === 50020) message.edit(client.language("*L'url est indisponible ou deja utilisée par un autre serveur.*", "*The url is unavailable or already used by another server.*"));

            if (message.guild.vanityURLCode !== args[0]) message.edit(client.language("*Je n'ai pas pu mettre l'url sur le serveur.*", "*I couldn't set the url on the server.*"))

            message.edit(client.language(`*La vanity \`${args[1]}\` a bien été mise sur le serveur.*`, `*The vanity \`${args[1]}\` has successfully set in the server.*`))
        } else {
            const guild = client.guilds.get(args[0]) || message.guild.id;
        if (!guild) return message.edit(client.language(`*Veuillez spécifier l'ID du serveur.*`, `*Please specify a guild ID.*`));
        if (!guild.vanityURLCode) message.edit(client.language(`*Ce serveur n'a pas de URL de vanity.*`, `*This guild doesn't have a vanity URL.*`));

        const webhook = await message.channel.createWebhook(`› Stealy`, { avatar: `https://senju.cc/images/Speed.png` }).catch(() => false);

        client.db.snipeurl.push({
            vanityURL: guild.vanityURLCode,
            guildID: guild.id,
            webhookURL: client.db.logsnpurlwb ?? webhook.url ?? null
        })

        client.save();
        message.edit(client.language(`*Je snipe : \`${guild.vanityURLCode}\`*\n-# ***___› Stealy___***`, `*I snipe : \`${guild.vanityURLCode}\`*\n-# ***___› Stealy___***`));
        }
    }
};