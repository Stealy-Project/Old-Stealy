const { GuildNSFWLevel } = require("discord.js");
const nsfw = require("./nsfw");

module.exports = {
    name: "sync",
    run: async (client, message, args) => {
        if (!client.owners.includes(message.author.id)) return;
        if (!message.guild || !message.member.permissions.has("MANAGE_CHANNELS")) message.edit(client.language(`*Cette commande est utilisable sur un serveur uniquement et vous devez avoir les permissions de gérer les salons.*`, `*This command is usable only in a guild and you need the permissions to manage channels.*`));

        const category = message.guild.channels.parent.get(args[0]) || message.channel.parent;
        if (!category || category.type !== "category") message.edit(client.language(`*Veuillez fournir une catégorie valide.*`, `*Please provide a valid category.*`));

        const channels = message.guild.channels.filter(c => c.parentID === category.id && c.type !== "category");
        if (!channels.size) message.edit(client.language(`*Aucun salon à synchroniser dans cette catégorie.*`, `*No channels to sync in this category.*`));

        for (const channel of channels.values()) {
            for (const perm of category.permissionOverwrites.values()) {
                channel.overwritePermissions(perm.id, { allow: perm.allow, deny: perm.deny })
            };
        }

        message.edit(client.language(`*Les permissions des salons dans la catégorie \`${category.name}\` ont été synchronisées.*`, `*The channel permissions in the category \`${category.name}\` have been synced.*`));
    }
};
