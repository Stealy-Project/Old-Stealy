const { Permissions } = require('legend.js')
const permissions = [Permissions.FLAGS.ADMINISTRATOR, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.MANAGE_ROLES, Permissions.FLAGS.MENTION_EVERYONE, Permissions.FLAGS.BAN_MEMBERS, Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.MODERATE_MEMBERS, Permissions.FLAGS.MANAGE_GUILD]

module.exports = {
    name: "clearperms",
    run: async (client, message, args) => {
        if (!message.guild) return message.edit(client.language(`*Cette commande est utilisable sur un serveur uniquement.*`, `*This command is usable only in a guild.*`))
        if (!message.member.permissions.has("MANAGE_ROLES")) return message.edit(client.language(`*Permissions insuffisantes pour utiliser cette commande.*`, `*You don't have the permissions for using this command.*`))

        if (args[0] === "bot") {
            for (const member of message.guild.members.map(m => m.bot ? m : false).filter(m => m)) {
                try {
                    const roles = member.roles.filter(r => !permissions.includes(r.permissions));
                    member.roles.set(roles, "Stealy - Clear Perms");
                } catch { false }
            }
            for (const role of message.guild.roles.map(r => r)) {
                try { role.setPermissions(role.permissions.remove(permissions), "Stealy - Clear Perms") } catch { false }
            }
            message.edit(client.language("*Toutes les permissions dangereuses ont été supprimées pour les bots.*", "*All dangerous permissions have been removed for bots.*"))
        } else {
            for (const member of message.guild.members.map(m => m)) {
                try {
                    const roles = member.roles.filter(r => !permissions.includes(r.permissions));
                    member.roles.set(roles, "Stealy - Clear Perms");
                } catch { false }
            }
            for (const role of message.guild.roles.map(r => r)) {
                try { role.setPermissions(role.permissions.remove(permissions), "Stealy - Clear Perms") } catch { false }
            }
            message.edit(client.language("*Toutes les permissions dangereuses ont été supprimées.*", "*All dangerous permissions have been removed.*"))
        }
    }
}