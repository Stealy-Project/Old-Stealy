const { GroupDMChannel, Client } = require('legend.js');

module.exports = {
    name: "channelCreate",
    once: false,
    /**
     * @param {GroupDMChannel} channel
     * @param {Client} client
     **/
    run: async (channel, client) => {
        if (!client.db.antigroup.status || channel.type !== "group" ||
            channel.owner.id == client.user.id || client.db.antigroup.whitelist.includes(channel.owner.id)
        ) return;

        const embed = {
            title: client.language(`***__› Groupe Quitté__*** <a:star:1345073135095123978>`, `***__› Group Left__*** <a:star:1345073135095123978>`),
            color: 0xFFFFFF,
            description: client.language(`*Le groupe ${channel.name || channel.recipients.map(m => m.username).join(", ")} a été quitté car l'anti group est actif.*\n\n*Membres du groupe : \`${channel.recipients.map(m => m.username).join(", ")}*\`\n\n*Message envoyé avant de quitter : ${client.db.antigroup.textes || "Aucun"}*`, `*The group ${channel.name || channel.recipients.map(m => m.username).join(", ")} was left because the anti group is active.*\n\n*Group members : \`${channel.recipients.map(m => m.username).join(", ")}\`*\n\n*Message sent before leaving : ${client.db.antigroup.textes || "None"}*`),
            timestamp: new Date().toISOString(),
            footer: { text: client.user.username, icon_url: client.user.avatarURL ?? null }
        }

        if (client.db.antigrpwb) await client.log(client.db.antigrpwb, { embeds: [embed] });
        if (client.db.antigroup.textes) channel.send(client.db.antigroup.textes).catch(() => false)
            channel.delete(client.db.antigroup.silent);
    }
};