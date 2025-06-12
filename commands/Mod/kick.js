module.exports = {
    name: "kick",
    run: async (client, message, args) => {
        if (!message.guild) return message.edit(client.language(`*Cette commande est utilisable sur un serveur uniquement.*`, `*This command is usable only in a guild.*`));
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.edit(client.language(`*Permissions insuffisantes pour utiliser cette commande.*`, `*You don't have the permissions for using this command.*`));
        try {
            const member = await message.guild.fetchMember(args[0].replace(/[<@!>]/g, ''))
            if (!member ||!args[0]) return message.edit(client.language(`*Vous devez mentionner un utilisateur ou fournir un ID valide.*`, `*You must mention a user or provide a valid ID.*`));

            const reason = args.slice(1).join(" ") || client.language(`\`Aucune raison spécifiée.\``, `\`No reason specified.\``);

            await member.kick(reason);
            message.edit(client.language(`*${member.user.tag} a été expulsé pour ${reason}.*`, `*${member.user.tag} has been kicked for ${reason}.*`));
        } catch (err) {
            message.edit(client.language(`*Aucun utilisateur trouvé pour \`${args[0]}\`.*`, `*No user found for \`${args[0]}\`.*`));
        }
    }
};
