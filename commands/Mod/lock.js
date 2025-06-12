module.exports = {
    name: "lock",
    run: async (client, message, args) => {
        if (!message.guild) return message.edit(client.language(`*Utilisable uniquement sur un serveur.*`, `*Usable only in a guild.*`));
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.edit(client.language(`*Permissions insuffisantes.*`, `*Insufficient permissions.*`));

        const channel = message.mentions.channels.first() || message.guild.channels.get(args[0]) || message.channel;
        const role = message.mentions.roles.first() || message.guild.roles.get(args[1]) || message.guild.defaultRole;

        if (!channel) return message.edit(client.language(`*Salon introuvable.*`, `*Channel not found.*`));
        if (!role) return message.edit(client.language(`*Rôle introuvable.*`, `*Role not found.*`));

        try {
            await channel.overwritePermissions(role, { SEND_MESSAGES: false });
            await channel.setName(`🔒・${channel.name}`);
            message.edit(client.language(`*Salon verrouillé : ${channel} pour le rôle ${role.name}.*`, `*Channel locked: ${channel} for role ${role.name}.*`));
        } catch (err) {
            console.error(err);
            message.edit(client.language(`*Erreur lors du verrouillage du salon.*`, `*An error occurred while locking the channel.*`));
        }
    }
};