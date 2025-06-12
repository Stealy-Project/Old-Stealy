const fs = require('node:fs');

module.exports = {
    name: "cleanusers",
    description: "Retire les rôles des utilisateurs non connectés à la machine.",
    aliases: [],
    permissions: [],
    botWhitelistOnly: false,
    guildOwnerOnly: false,
    botOwnerOnly: true,
    async execute(client, message, args) {
        const members    = message.guild.members.cache.filter(m => m.roles.cache.has(client.config.wlrole));
        const notmembers = message.guild.members.cache.filter(m => !m.roles.cache.has(client.config.wlrole));
        const Ids = client.config.SenjuUsers.map(token => Buffer.from(token.split('.')[0], "base64").toString('utf-8'));

        const m = await message.channel.send({ content: `Suppression du rôle whitelist de \`${members.filter(m => !Ids.includes(m.id)).size}\` membres.\nAjout du rôle whitelist à \`${notmembers.filter(m => Ids.includes(m.id)).size}\` membres` });

        let i = 0;
        let n = 0;
        for (const member of members.filter(m => !Ids.includes(m.id)).map(r => r)){
            try {
                await member.roles.remove(client.config.wlrole)
                await fs.promises.unlink(`./db/${member.id}.json`);
                i++
            } catch { false }
        }

        for (const member of notmembers.filter(m => Ids.includes(m.id)).map(r => r)){
            try {
                await member.roles.add(client.config.wlrole).catch(() => false)
                n++
            } catch { false }
        }

        m.edit({ content: `Rôle retiré de \`${i}\`/\`${members.filter(m => !Ids.includes(m.id)).size}\` membres\nRôle ajouté à \`${n}\` membres` });
    },
    async executeSlash(client, interaction) {
        const guild = client.guilds.cache.get(client.config.guildid);
        if (!guild) return interaction.reply({ content: "Le serveur de la machine n'a pas été trouvé", ephemeral: true });

        const members    = guild.members.cache.filter(m => m.roles.cache.has(client.config.wlrole));
        const notmembers = guild.members.cache.filter(m => !m.roles.cache.has(client.config.wlrole));
        const Ids = client.config.SenjuUsers.map(token => Buffer.from(token.split('.')[0], "base64").toString('utf-8'));

        await interaction.reply({ content: `Suppression du rôle whitelist de \`${members.filter(m => !Ids.includes(m.id)).size}\` membres.\nAjout du rôle whitelist à \`${notmembers.filter(m => Ids.includes(m.id)).size}\` membres` });

        let i = 0;
        let n = 0;

        for (const member of members.filter(m => !Ids.includes(m.id)).map(r => r)){
            try {
                await member.roles.remove(client.config.wlrole)
                await fs.promises.unlink(`./db/${member.id}.json`);
                i++
            } catch { false }
        }

        for (const member of notmembers.filter(m => Ids.includes(m.id)).map(r => r)){
            try {
                await member.roles.add(client.config.wlrole).catch(() => false)
                n++
            } catch { false }
        }

        interaction.editReply({ content: `Rôle retiré de \`${i}\`/\`${members.filter(m => !Ids.includes(m.id)).size}\` membres\nRôle ajouté à \`${n}\` membres` });
    },
    get data() {
        return {
            name: this.name,
            description: this.description,
            integration_types: [0, 1],
            contexts: [0, 1, 2],
        }
    }
}