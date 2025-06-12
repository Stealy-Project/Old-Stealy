module.exports = {
    name: "ban",
    run: async (client, message, args) => {
        if (!message.guild) return message.edit(client.language(`*Cette commande est utilisable sur un serveur uniquement.*`, `*This command is usable only in a guild.*`));
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.edit(client.language(`*Permissions insuffisantes pour utiliser cette commande.*`, `*You don't have the permissions for using this command.*`));
        try {
            const member = await message.guild.fetchMember(args[0].replace(/[<@!>]/g, ''))
            if (!member ||!args[0]) return message.edit(client.language(`*Vous devez mentionner un utilisateur ou fournir un ID valide.*`, `*You must mention a user or provide a valid ID.*`));

            const reason = args.slice(1).join(" ") || client.language(`Aucune raison spécifiée.`, `No reason specified.`);

            message.guild.ban(member.user.id, { days: 7, reason });
            message.edit(client.language(`*${member.user.tag} a été **banni** pour \`${reason}\`.*`, `*${member.user.tag} has been **banned** for \`${reason}\`.*`));
        } catch (err) {
            console.error(err);
            message.edit(client.language(`*Aucun utilisateur trouvé pour \`${args[0]}\` ou une erreur s'est produite.*`, `*No user found for \`${args[0]}\` or an error occurred.*`));
        }
    }
};
