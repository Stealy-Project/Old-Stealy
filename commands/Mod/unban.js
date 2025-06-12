module.exports = {
    name: "unban",
    run: async (client, message, args) => {
        if (!message.guild) return message.edit(client.language(`*Cette commande est utilisable sur un serveur uniquement.*`, `*This command is usable only in a guild.*`));
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.edit(client.language(`*Permissions insuffisantes pour utiliser cette commande.*`, `*You don't have the permissions for using this command.*`));

        const user = message.mentions.users.first() || client.users.get(args[0])
        if (!args[0] || !user) return message.edit(client.language(`Aucun utilisateur de trouvé pour \`${args[0] || "rien"}\``, `No user found for \`${args[0] || "nothing"}\``));

        const reason = args.slice(1).join(" ") || client.language(`Aucune raison spécifiée.`, `No reason specified.`);

        message.guild.unban(user.id, reason)
            .then(() => message.edit(client.language(`*${user.username} a été \`débanni\`*.`, `*${user.username} has been \`unban\`.*`)))
            .catch(() => message.edit(client.language(`*${user.username} n'est pas \`ban\`.*`, `*${user.username} is not \`ban\`.*`)))
    }
};