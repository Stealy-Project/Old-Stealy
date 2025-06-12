module.exports = {
    name: "find",
    run: async (client, message, args) => {
        
        let memberToFind = message.mentions.users.first() || client.users.get(args[0]);
        if (!args[0] || !memberToFind) return message.edit(client.language("*Membre introuvable.*", "*Member not found.*"));

        let foundVoiceChannels = [];

        for (const guild of client.guilds.map(r => r)) {
            let voiceChannel = guild.members.get(memberToFind.id)?.voiceChannel;
            if (voiceChannel) foundVoiceChannels.push(client.language(`*<@${memberToFind.id}> est actuellement connecté dans le vocal ${voiceChannel}.*`, `*<@${memberToFind.id}> is actually connected in the voice channel ${voiceChannel}.*`));
        }

        if (foundVoiceChannels.length > 0) message.edit(foundVoiceChannels.join("\n")); 
        else message.edit(client.language("*Cet utilisateur n'est pas en vocal.*", "*This user isn't in voice chat.*"));
    }
}