module.exports = {
    name: "sbrestart",
    description: "Relance la machine d'un utilisateur connecté à Stealy.",
    aliases: [],
    permissions: [],
    botWhitelistOnly: false,
    guildOwnerOnly: false,
    botOwnerOnly: true,
    async execute(client, message, args) {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || await client.users.fetch(args[0]).catch(() => false);
        if (!user || !args[0]) return message.channel.send(`${cross} 〃Aucun utilisateur de trouvé pour \`${args[0] ?? 'rien'}\``);

        const sb = client.config.SenjuUsers.find(t => Buffer.from(t.split('.')[0], 'base64').toString('utf-8') == user.id);
        if (!sb) return message.edit(`${cross} 〃 ${user} n'est pas connecté à la machine`);

        message.edit(`Relancement de la machine de ${user}`);

        fetch(`http://localhost:${client.port}/restart/${sb}`, {
            method: 'POST',
            headers: {
                Authorization: client.auth,
                'Content-Type': 'application/json'
            }
        })
        
        message.edit(`${yes} 〃 La machine de ${user} a été relancée`);
    },
    async executeSlash(client, interaction) {
        await interaction.deferReply();

        const user = interaction.options.getUser('user');
        if (!user) return interaction.editReply({ content: `${cross} 〃 Veuillez entrer utilisateur valide`, ephemeral: true })
        
        const sb = client.config.SenjuUsers.find(t => Buffer.from(t.split('.')[0], 'base64').toString('utf-8') == user.id);
        if (!sb) return interaction.editReply({ content: `${cross} 〃 ${user} n'est pas connecté à la machine`, ephemeral: true });

        interaction.editReply({ content: `Relancement de la machine de ${user}` })

        await fetch(`http://localhost:${client.port}/restart/${sb}`, {
            method: 'POST',
            headers: {
                Authorization: client.auth,
                'Content-Type': 'application/json'
            }
        }).catch(() => false)

        interaction.editReply({ content: `${yes} 〃 La machine de ${user} a été relancée` });
    },
    get data() {
        return {
            name: this.name,
            description: this.description,
            integration_types: [0, 1],
            contexts: [0, 1, 2],
            options: [{
                name: "user",
                type: 6,
                description: "L'utilisateur qui sera restart",
                required: true
            }]
        }
    }
}