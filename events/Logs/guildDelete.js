const { Guild, Client } = require('legend.js');

module.exports = {
    name: "guildDelete",
    /**
     * @param {Guild} guild
     * @param {Client} client
    */
    run: async (guild, client) => {
        const embed = {
            color: 0xFFFFFF,
            title: client.language("***__› Serveur Quitté__*** <a:star:1345073135095123978>",``),
            fields: [{ name: client.language('Serveur :', 'Server :'), value: guild.name }],
            timestamp: new Date().toISOString(),
            footer: { text: `${client.user.username}`, icon_url: client.user.avatarURL ?? null }
        }

        if (client.db.guildwb) client.log(client.db.guildwb, { embeds: [embed] });
        if (guild.id === client.config.guildid) return client.destroy();
    }
};