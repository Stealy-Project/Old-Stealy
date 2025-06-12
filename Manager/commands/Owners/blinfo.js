const blacklist = require('../../../db/blacklist.json');
const Discord = require('discord.js');

module.exports = {
    name: "blinfo",
    description: "Afficher les infos d'un utilisateur blacklist.",
    aliases: [],
    permissions: [],
    botWhitelistOnly: false,
    guildOwnerOnly: false,
    botOwnerOnly: true,
    async execute(client, message, args) {
        
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || await client.users.fetch(args[0]).catch(() => false);
        if (!user || !args[0]) return message.channel.send({ content: `Aucun utilisateur de trouvé pour \`${args[0] || "rien"}\`` })

        const data = blacklist.find(o => o.id === user.id)
        if (!data) return message.channel.send({ content: `Aucun utilisateur de blacklist pour \`${user.username}` })

        await user.fetch()

        const embed = {
            title      : `Information de ${user.username}`,
            color      : 0xFFFFFF,
            image      : { url: user.banner ? user.bannerURL({ dynamic: true, size: 4096 }) : null },
            thumbnail  : { url: user.avatarURL({ dynamic: true }) },
            description: `***Pseudo*** ➜ \`${user.username}\`\n***ID*** ➜ \`${user.id}\`\n***Blacklist par*** ➜ <@${data.author}> (\`${data.author}\`)\n***Blacklist il y a*** ➜ <t:${Math.round(data.date / 1000)}:R>\n***Raison*** ➜ \`${data.reason ?? "Aucune raison fournie"}\``
        }

        message.channel.send({ embeds: [embed] })
    },
    async executeSlash(client, interaction) {
        const user = interaction.options.getUser("user") || await client.users.fetch(interaction.options.getUser('user')).catch(() => false)
        if (!user) return interaction.reply({ content: `Aucun utilisateur de trouvé `, ephemeral: true })

        const data = blacklist.find(o => o.id === user.id)
        if (!data) return interaction.reply({ content: `Aucun utilisateur de blacklist pour \`${user.username}`, ephemeral: true  })

        await user.fetch()

        const embed = {
            title      : `Information de ${user.username}`,
            color      : 0xFFFFFF,
            image      : { url: user.banner ? user.bannerURL({ dynamic: true, size: 4096 }) : null },
            thumbnail  : { url: user.avatarURL({ dynamic: true }) },
            description: `***Pseudo*** ➜ \`${user.username}\`\n***ID*** ➜ \`${user.id}\`\n***Blacklist par*** ➜ <@${data.author}> (\`${data.author}\`)\n***Blacklist il y a*** ➜ <t:${Math.round(data.date / 1000)}:R>\n***Raison*** ➜ \`${data.reason ?? "Aucune raison fournie"}\``
        }

        interaction.reply({ embeds: [embed], ephemeral: true   })
   },
    get data() {
        return {
            name: this.name,
            description: this.description,
            integration_types: [0, 1],
            contexts: [0, 1, 2],
            options: [
                {
                    name: "user",
                    description: "L'utilisateur blacklist",
                    type: 6,
                    required: true
                }
            ]
        }
    }
}