const { Message, Client } = require('legend.js');

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} message
     * @param {Client} client
    */
    run: async (message, client) => {
        if (!message.content?.includes(`<@${client.user.id}>`)) return;
        if (message.author.id === client.user.id) return;

        const embed = {
            author: { name: message.author.username, icon_url: message.author.avatarURL ?? null },
            footer: { text: `${message.author.username}`, icon_url: message.author.avatarURL ?? null },
            color: 0xFFFFFF,
            title: "***__› Ghostping Ping__*** <a:star:1345073135095123978>",
            timestamp: new Date().toISOString(),
            fields: [
                { name: client.language('Auteur :', 'Author :'), value: `${message.author.username} (${message.author.id})` },
                { name: client.language('Serveur :', 'Server :'), value: `${message.guild ? `${message.guild.name} (${message.guild.id})` : client.language(`Pas dans un serveur`, `Not in a server`)}` },
                { name: client.language('Salon :', 'Channel :'), value: `${message.channel}` },
                { name: 'Message :', value: `${message.content.length > 1024 ? `${message.content.substring(0, 1021)}...` : message.content}` },
            ]
        }

        if (client.db.ghostpingwb) client.log(client.db.ghostpingwb, { embeds: [embed] });
    }
};