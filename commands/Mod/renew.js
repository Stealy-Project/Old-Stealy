module.exports = {
    name: "renew",
    run: async (client, message, args) => {
        if (!message.guild) return message.edit(client.language(`*Cette commande est utilisable sur un serveur uniquement.*`, `*This command is usable only in a guild.*`))
        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.edit(client.language(`*Permissions insuffisantes pour utiliser cette commande.*`, `*You don't have the permissions for using this command.*`))

        const channel = message.mentions.channels.first() || message.guild.channels.get(args[0]) || message.channel

        let ee = await channel.clone({
            name: channel.name,
            permissions: channel.permissionsOverwrites,
            type: channel.type,
            topic: channel.withTopic,
            nsfw: channel.nsfw,
            birate: channel.bitrate,
            userLimit: channel.userLimit,
            rateLimitPerUser: channel.rateLimitPerUser,
            permissions: channel.withPermissions,
            position: channel.position
        })

        channel.delete()
        .catch(async () => {
            ee.delete()
            message.edit(client.language("*Je ne peux pas supprimer ce salon, sûrement à cause de la communauté activé.*", "*I cannot delete this channel maybe because the community is enabled.*"))
        })
    }
}