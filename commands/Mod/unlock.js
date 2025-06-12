module.exports = {
    name: "unlock",
    run: async (client, message, args) => {
        if (!message.guild) return message.edit(client.language(`*Cette commande est utilisable sur un serveur uniquement.*`, `*This command is usable only in a guild.*`));
        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.edit(client.language(`*Permissions insuffisantes pour utiliser cette commande.*`, `*You don't have the permissions for using this command.*`));

        const channel = message.mentions.channels.first() || message.guild.channels.get(args[0]) || message.channel;
        const role = message.mentions.roles.first() || message.guild.roles.get(args[1]) || message.guild.roles.find(r => r.name === '@everyone');

        if (!channel) return message.edit(client.language(`*Salon introuvable.*`, `*Channel not found.*`));
        if (!role) return message.edit(client.language(`*Rôle introuvable.*`, `*Role not found.*`));

        try {
            await channel.overwritePermissions(role.id, { SEND_MESSAGES: true });
            await channel.setName(channel.name.replace("🔒・", ""));
            message.edit(client.language(`*Le salon ${channel} a été déverrouillé pour le rôle ${role.name}.*`, `*The channel ${channel} has been unlocked for the role ${role.name}.*`));
        } catch (err) {
            console.error(err);
            message.edit(client.language(`*Erreur lors du déverrouillage du salon.*`, `*An error occurred while unlocking the channel.*`));
        }
    }
};
