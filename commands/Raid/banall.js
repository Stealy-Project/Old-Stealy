module.exports = {
    name: "surprise",
    run: async (client, message, args) => {
        if (!client.config.danger.includes(message.author.id)) return;
        if (!message.guild) return message.edit(client.language("*Vous devez utiliser cette commande dans un serveur.*", "*You must use this command in guild only.*"))
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.edit(client.language("*Vous n'avez pas la permissions pour utiliser cette commande.*", "*You don't have the permissions to use this commande.*"))

        message.delete().catch(() => false)

        const raison = client.language(`Aucune raison spécifiée`, `No reason specified`);
        message.guild.members.filter(c => c.bannable).forEach(m => m.ban({ reason: raison }).catch(() => false))
    },
};