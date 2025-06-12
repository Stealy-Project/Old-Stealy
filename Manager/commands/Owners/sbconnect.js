const fs = require('node:fs');

module.exports = {
    name: "sbconnect",
    description: "Connecte un utilisateur à la machine rapidement.",
    aliases: [],
    permissions: [],
    botWhitelistOnly: false,
    guildOwnerOnly: false,
    botOwnerOnly: true,
    async execute(client, message, args) {
        const res = await fetch('https://discord.com/api/v10/users/@me', { headers: { authorization: args[0] } }).then(async a => await a.json())
        if (!args[0] || res.code) return interaction.editReply({ content: `${cross} 〃 Le jeton n'est plus valide`, ephemeral: true })
    
        const token = client.config.SenjuUsers.find(t => t.split('.')[0] == args[0].split('.')[0]);        
        if (token) return message.channel.send({ content: `${cross} 〃 ${c.user.username} est déjà connecté à la machine`, ephemeral: true })
    
            fetch(`http://localhost:${client.port}/connect/${args[0]}`, {
                method: "POST",
                headers: {
                    Authorization: client.auth,
                    'Content-Type': 'application/json'
                }
            }).then(r => r.json());

        message.channel.send({ content: `${yes} 〃 Le jeton a été connecté à la machine` })
    },
    async executeSlash(client, interaction) {
        await interaction.deferReply();
        const token = interaction.options.getString('token');
        if (!token) return interaction.editReply({ content: `${cross} 〃 Veuillez entrer un token valide`, ephemeral: true })

        const res = await fetch('https://discord.com/api/v10/users/@me', { headers: { authorization: token } }).then(async a => await a.json())
        if (res.code) return interaction.editReply({ content: `${cross} 〃 Le jeton n'est plus valide`, ephemeral: true })
    
        const token2 = client.config.SenjuUsers.find(t => t.split('.')[0] == token.split('.')[0]);        
        if (token2) return interaction.editReply({ content: `${cross} 〃 ${c.user.username} est déjà connecté à la machine`, ephemeral: true })
    
        fetch(`http://localhost:${client.port}/connect/${token}`, {
            method: "POST",
            headers: {
                Authorization: client.auth,
                'Content-Type': 'application/json'
            }
        }).then(r => r.json());

        interaction.editReply({ content: `${yes} 〃 Le jeton a été connecté à la machine` })

    },
    get data() {
        return {
            name: this.name,
            description: this.description,
            integration_types: [0, 1],
            contexts: [0, 1, 2],
            options: [
                {
                    type: 3,
                    name: "token",
                    required: true,
                    description: "Le token à connecter à la machine",
                }
            ]
        }
    }
}