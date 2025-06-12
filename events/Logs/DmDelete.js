const { Message, Client } = require('legend.js');

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} message
     * @param {Client} client
    */
    run: async (message, client) => {
        if (!message || !message.channel || 
            !message.author || message.author.id === client.user.id) return;
        if (!["dm", "group"].includes(message.channel.type)) return;
        if (message.author.id === client.user.id) return;

        const attachments = [];
        const embed = {
            author: { name: message.author.username, icon_url: message.author.avatarURL ?? null },
            color: 0xFFFFFF,
            title: client.language(`***__› Message Supprimé__*** <a:star:1345073135095123978>`,`***__› Message Deleted__*** <a:star:1345073135095123978>`),
            description: message.content?.length > 1024 ? `${message.content.substring(0, 1021)}...` : message.content ?? client.language(`Aucun contenu`, `No content`),
            timestamp: new Date().toISOString(),
            fields: [],
            footer: { text: `${client.user.username}`, icon_url: client.user.avatarURL ?? null }
        }

        for (const attachment of message.attachments.map(c => c)) 
            await client.upload(attachment.url)
                .then(i => attachments.push(i))
                .catch(() => attachments.push(attachment.url));

        embed.fields.push({ name: client.language("Fichiers", 'Files'), value: `${attachments.map((r, i) => `- [\`${client.language('Fichier', 'Files')} ${i+1}\`](${r})`).join('\n')}` })

        if (client.db.mpdeletewb) client.log(client.db.mpdeletewb, { embeds: [embed] });
    }
}