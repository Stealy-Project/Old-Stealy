const { Client, Message } = require("legend.js")

module.exports = {
    name: "say",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
    */
    run: async (client, message, args) => {

        if (!message.guild) return message.edit(client.language("*Veuillez utiliser cette commande dans un serveur.*", "*Please use this command in a guild.*"))
        
        if (!message.member.permissions.has("MANAGE_WEBHOOKS"))
            return message.edit(client.language("*Vous n'avez pas les permissions nécéssaires pour utiliser cette commande.*", "*You don't have the permissions for using this command.*"))

        if (!args[0])
            return message.edit(client.language("*Veuillez mentionner un utilisateur.*", "*Please mention a user.*"))

        const user = message.mentions.users.first() || client.users.get(args[0]) || await client.fetchUser(args[0] ?? 1).catch(() => false);

        if (!args[0] || !user || !args[1])
            return message.edit(client.language("*Veuillez me donner un texte à envoyer.*", "*Please give me a text to send.*"))

        message.delete().catch(() => false)

        let webhooks = await message.guild.fetchWebhooks().catch(() => false)
        let webhook = webhooks?.first()

        if (!webhook) webhook = await message.channel.createWebhook(user.username, user.avatarURL).catch(() => false)
        if (webhook) webhook.send(args.slice(1).join(' '), { username: user.global_name ?? user.username, avatarURL: user.avatarURL ?? null }).catch(() => false)
    }
}