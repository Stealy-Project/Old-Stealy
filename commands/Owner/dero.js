module.exports = {
    name: "dero",
    async run(client, message, args) {
        if (!client.config.owners.includes(message.author.id)) return;
        if (!message.guild) message.edit(client.language(`*Vous devez utiliser cette commande dans un serveur.*`, `*You must use this command in guild only.*`));
        if (!message.member.hasPermission("MANAGE_ROLES") || !message.member.hasPermission("MANAGE_CHANNELS")) message.edit(client.language(`*Vous n'avez pas les permissions de faire cette commande.*`, `*You don't have the permissions to use this command.*`));

        let role = message.mentions.roles.first() || message.guild.roles.get(args[0]);
        if (!role) message.edit(client.language(`*Je n'ai pas trouvé le rôle \`${args[0] || "rien"}\`.*`, `*I couldn't find the role \`${args[0] || "nothing"}\`.*`));

        message.guild.channels.forEach(async (channel) => {

            if (channel.type === "text") {
                channel.overwritePermissions(role.id, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true
                })
            } else if (channel.type === "voice") {
                channel.overwritePermissions(role.id, {
                    VIEW_CHANNEL: true,
                    CONNECT: true,
                    SPEAK: true
                })
            }
        });

        message.edit(client.language(`*J'ai fais toutes les dérogations pour le role \`${role.name}\`.*`, `*I did all the derogations for the role \`${role.name}\`.*`));
    }
};
