module.exports = {
    name: "bring",
    run: async (client, message, args) => {
        if (!message.guild) return message.edit(client.language("*Cette commande ne peut pas être exécutée en messages privés.*", "*This command cannot be executed in DMs.*"));
        if (!args[0]) return message.edit(client.language("*Merci de préciser un utilisateur à déplacer.*", "Please specify a user to move.*"));

        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return message.edit(client.language("*L'utilisateur spécifié est invalide.*", "*The specified user is invalid.*"));
        
        if (!message.member.permissions.has("MOVE_MEMBERS")) return message.edit(client.language("*Je n'ai pas la permission de déplacer des membres dans ce salon.*", "*I don't have the permission to move members in this voice channel.*"));

        if (!message.member.voiceChannel) return message.edit(client.language("*Vous devez être dans un salon vocal*", "You must be connected to any voice channel.*"))
        if (!member.voiceChannel) return message.edit(client.language(`*${member} n'est connecté dans aucun salon vocal`, `${member} is not connected to any voice channel.*`))
        
        member.setVoiceChannel(message.member.voiceChannel)
            .then(() => message.edit(client.language(`*${member} a été déplacé.*`, `*${member} has been moved.*`)))
            .catch(() => message.edit(client.language(`*Je n'ai pas pu déplacé ${member}*`, `*I can't move ${member}.*`)))
    }
};