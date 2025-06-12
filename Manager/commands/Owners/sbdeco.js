const fs = require('node:fs');

module.exports = {
    name: "sbdeco",
    description: "Déconnecte un utilisateur de la machine.",
    aliases: [],
    permissions: [],
    botWhitelistOnly: false,
    guildOwnerOnly: false,
    botOwnerOnly: true,
    async execute(client, message, args) {

        const user = message.mentions.users.first() || client.users.get(args[0])
        if (!args[0] || !user) return message.channel.send({ content: `${cross} 〃 Veuillez entrer un ID d'utilisateur valide` })
    
        const token = client.config.SenjuUsers.find(t => Buffer.from(t.split('.')[0], 'base64').toString('utf-8') == user.id);
        if (!token) return message.channel.send({ content: `${cross} 〃 ${user.username} n'est pas connecté à la machine`  })
    
        client.config.SenjuUsers.splice(client.config.SenjuUsers.indexOf(token), 1) 
        fs.writeFileSync("./config.json", JSON.stringify(client.config, null, 2))

        fetch(`http://localhost:${client.port}/close/${token}`, {
            method: 'POST',
            headers: {
                Authorization: client.auth,
                'Content-Type': 'application/json'
            }
        })

        message.channel.send({ content: `${yes} 〃 ${user.username} a été retiré de la machine` })
    
    },
    async executeSlash(client, interaction) {

        const user = interaction.options.getUser('user');
        if (!user) return interaction.reply({ content: `${cross} 〃 Veuillez entrer utilisateur valide`, ephemeral: true })

        const token = client.config.SenjuUsers.find(t => Buffer.from(t.split('.')[0], 'base64').toString('utf-8') == user.id);
        if (!token) return message.channel.send({ content: `${cross} 〃 ${user.username} n'est pas connecté à la machine`  })
        
        if (!token) return interaction.reply({ content: `${cross} 〃 ${user.username} n'est pas connecté à la machine`, ephemeral: true })
    
        client.config.SenjuUsers.splice(client.config.SenjuUsers.indexOf(token), 1);
        fs.writeFileSync("./config.json", JSON.stringify(client.config, null, 2))

        fetch(`http://localhost:${client.port}/close/${token}`, {
            method: 'POST',
            headers: {
                Authorization: client.auth,
                'Content-Type': 'application/json'
            }
        })

        interaction.reply({ content: `${yes} 〃 ${user.username} a été retiré de la machine` })

    },
    get data() {
        return {
            name: this.name,
            description: this.description,
            integration_types: [0, 1],
            contexts: [0, 1, 2],
            options: [
                {
                    type: 6,
                    name: "user",
                    required: true,
                    description: "L'utilisateur à déconnecter de la machine",
                }
            ]
        }
    }
}