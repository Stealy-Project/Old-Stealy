module.exports = {
    name: "autologs",
    run: async (client, message, args) => {
        const logChannels = {
            guild: "🙊・servs",
            antigrp: "🍜・groups",
            ghostping: "👻・ghostping",
            mpdelete: "🙈・dm-del",
            mpupdate: "🙉・dm-modif",
            nitro: "🐁・nitros",
            saveprofil: "📨・saveprofil",
            logslockurl: "🔒・lockurl",
            logsnpurl: "🎯・snipeurl"
        };

        if (!message.guild) return message.edit(client.language("*Veuillez utiliser cette commande sur un serveur.*", "*Please use this command on a guild.*"))

        let category = message.guild.channels.find(c => c.name === `Stealy - ${message.author.username}` && c.type === "category")
        if (!category) category = await message.guild.createChannel(`Stealy - ${message.author.username}`, {
            type: "category", 
            permissionOverwrites: [
                {
                    id: message.guild.id, 
                    deny: ["VIEW_CHANNEL"] 
                }
            ]
        });

        for (const [type, channelName] of Object.entries(logChannels)) {
            const logchannel = message.guild.channels.find(c => c.name === channelName)
            if (logchannel){
                const webhooks = await logchannel.fetchWebhooks().catch(() => false)
                let webhook = webhooks?.first()

                if (!webhook) webhook = await logchannel.createWebhook(`${type}Webhook`).catch(() => false)
                if (!webhook) continue;

                client.db[`${type}wb`] = webhook.url;
                client.save()
                message.edit(client.language("*Les logs ont été configurés avec succès.*", "*Logs have been successfully set up.*"));
            }
            else {
                const channel = await message.guild.createChannel(channelName, {
                    type: "text", 
                    parent: category,
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ]
                });
                channel.setParent(category)

                const webhook = await channel.createWebhook(`${type}Webhook`).catch(() => false);
                if (webhook) client.db[`${type}wb`] = webhook.url;
            }
        }

        client.save();
        message.edit(client.language("*Les logs ont été configurés avec succès.*", "*Logs have been successfully set up.*"));
    }
};