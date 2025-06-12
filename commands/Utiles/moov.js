module.exports = {
    name: "moov",
    run: async (client, message, args) => {
        if (!message.guild) return message.edit(client.language("*Cette commande ne peut pas être exécutée en messages privés.*", "*This command cannot be executed in DMs.*"));
        if (!args[0]) return message.edit(client.language("*Merci de préciser un utilisateur à déplacer.*", "*Please specify a user to move.*"));

        const member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return message.edit(client.language("*L'utilisateur spécifié est invalide.*", "*The specified user is invalid.*"));
        
        if (!message.guild.me.permissions.has("MOVE_MEMBERS")) return message.edit(client.language("*Je n'ai pas la permission de déplacer des membres dans ce salon.*", "*I don't have the permission to move members in this voice channel.*"));

        if (!message.member.voiceChannel) return message.edit(client.language("*Vous devez être dans un salon vocal.*", "*You must be connected to any voice channel.*"))
        if (!member.voiceChannel) return message.edit(client.language(`*${member} n'est connecté dans aucun salon vocal.*`, `*${member} is not connected to any voice channel.*`))

        message.member.setVoiceChannel(member.voiceChannel)
            .then( () => message.edit(client.language(`*Vous avez été déplacé dans ${member.voiceChannel}.*`, `*You have been moved to ${member.voiceChannel}.*`)))
            .catch(() => message.edit(client.language(`*Je n'ai pas pu vous déplacer dans ${member.voiceChannel}.*`, `*I can't move you to ${member.voiceChannel}.*`)))
    }
};