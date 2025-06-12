module.exports = {
    name: "addrole",
    run: async (client, message, args) => {
        if (!message.guild) return message.edit(client.language(`*Cette commande est utilisable sur un serveur uniquement.*`, `*This command is usable only in a guild.*`));
        if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.edit(client.language(`*Je n'ai pas la permission de gérer les rôles.*`, `*I don't have permission to manage roles.*`));

        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        const role = message.mentions.roles.first() || message.guild.roles.get(args[1]);
        const reason = args.slice(2).join(" ") || client.language(`*Aucune raison spécifiée.*`, `*No reason specified.*`);

        if (!args[0] || !member) return message.edit(client.language(`*Aucun utilisateur trouvé pour \`${args[0] || "rien"}\`.*`, `*No user found for \`${args[0] || "nothing"}\`.*`));        
        if (!role || !args[1]) return message.edit(client.language(`*Aucun rôle trouvé pour \`${args[1] || "rien"}\`.*`, `*No role found for \`${args[1] || "nothing"}\`.*`));

        try {
            await member.addRole(role.id, reason);
            message.edit(client.language(`*Le rôle ${role.name} a été ajouté à ${member.user.tag}.*`, `*The role ${role.name} has been added to ${member.user.tag}.*`));
        } catch (err) {
            console.error(err);
            message.edit(client.language(`*Je ne peux pas ajouter le rôle ${role.name} à ${member.user.tag}.*`, `*I cannot add the role ${role.name} to ${member.user.tag}.*`));
        }
    }
};