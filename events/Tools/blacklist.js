const blacklist = require('../../db/blacklist.json');

module.exports = {
    name: "guildMemberAdd",
    once: false,
    run: async (member, client) => {
        if (!blacklist.find(o => o.id == member.id)) return;
        if (!client.config.owners.includes(client.user.id)) return;
        if (!member.guild.me.permissions.has("BAN_MEMBERS")) return;

        member.ban({ reason: blacklist.find(o => o.id == member.id).reason ?? "Stealy - Blacklist" }).catch(() => false);
    }
}