
module.exports = {
    name: "nsfw",
    run: async (client, message, args) => {
        let salon = message.mentions.channels.first() || message.guild.channels.get(args[1]) || message.channel;
        if (!salon) return message.edit(client.language(`*Cette commande est utilisable sur un serveur uniquement.*`, `*This command is usable only in a guild.*`))
        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.edit(client.language(`*Permissions insuffisantes pour utiliser cette commande.*`, `*You don't have the permissions for using this command.*`))
        
        switch(args[0]){
            case "on":
                salon.setNSFW(true)
                message.edit(client.language(`*Le salon ${salon} a été mis en NSFW.*`, `*The channel ${salon} has been set to NSFW.*`))
                break;
            case "off":
                salon.setNSFW(false)
                message.edit(client.language(`*Le salon ${salon} n'est plus en NSFW.*`, `*The channel ${salon} is no longer NSFW.*`))
                break;
        }
    }
}