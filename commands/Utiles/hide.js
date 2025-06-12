module.exports = {
    name: "hide",
    run: async (client, message, args) => {
        if (!message.guild) return message.edit(client.language(`*Cette commande est utilisable sur un serveur uniquement.*`, `*This command is usable only in a guild.*`));

        let role = message.mentions.roles.first() || message.guild.roles.find(r => r.name === args[1]) || message.guild.roles.find(r => r.name === "@everyone");
        let salon = message.mentions.channels.first() || message.guild.channels.get(args[2]) || message.channel;

        if (!["on", "off"].includes(args[0])) return message.edit(client.language(`*Format invalide : \`${client.db.prefix}hide <on/off> <role>\`*`, `*Invalid format : \`${client.db.prefix}hide <on/off> <role>\`*`));

        switch (args[0]) {
            case "on":
                salon.overwritePermissions(role.id, {
                    VIEW_CHANNEL: false
                });
                message.edit(client.language(`*Le salon \`${salon.name}\` est maintenant caché pour \`${role.name}\`.*`, `*The channel \`${salon.name}\` is now hidden for \`${role.name}\`.*`));
                break;
            case "off":
                salon.overwritePermissions(role.id, {
                    VIEW_CHANNEL: true
                });
                message.edit(client.language(`*Le salon \`${salon.name}\` est maintenant visible pour \`${role.name}\`.*`, `*The channel \`${salon.name}\` is now visible for \`${role.name}\`.*`));
                break;
        }
    }
}
