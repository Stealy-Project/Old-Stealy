module.exports = {
    name: "react",
    run: async (client, message, args) => {

        if (args[0] === 'stop') {
            client.db.autoreact.emoji = null
            client.db.autoreact.channel = null
            client.save()
            return message.edit(client.language("*Réaction automatique arrêtée.*", "*Automatic reaction stopped.*"));
        }

        if (args[1]) return message.edit(client.language("*Usage incorrect. Veuillez spécifier un salon et un emoji.*", "*Incorrect usage. Please specify a channel and an emoji.*"));

        const channel = message.mentions.channels.first() || client.channels.get(args[0])
        const emoji = args[1];

        if (!channel) return message.edit(client.language("*Aucun salon de trouvé.*", "*Channel not found.*"));

        client.db.autoreact.emoji = args[1]
        client.db.autoreact.channel = channel.id
        client.save()

        return message.edit(client.language(`*Je réagirai désormais avec ${emoji} aux nouveaux messages dans ${channel}.*`, `I will now react with ${emoji} to new messages in ${channel}.*`));
    }
};
