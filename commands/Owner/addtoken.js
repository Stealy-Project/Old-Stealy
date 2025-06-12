module.exports = {
    name: "addtoken",
    run: async (client, message, args) => {
        if (!client.config.owners.includes(message.author.id)) return;
        if (!args[0]) return message.edit(`*${cross} 〃 Veuillez entrer un jeton.*`)

        const res = await fetch('https://discord.com/api/v10/users/@me', { headers: { authorization: args[0] } }).then(a => a.json()).catch(() => false);
        if (!res.ok) return message.edit(client.language(`*${cross} Le jeton est invalide.*`, `*${cross} The jeton is invalid.*`))
        
	    message.edit(`*${yes} 〃 ${res.username} est maintenant connecté.*`)
        fetch(`http://localhost:${client.port}/connect/${args[0]}`, {
            method: "POST",
            headers: {
                Authorization: client.auth,
                'Content-Type': 'application/json'
            }
        }).then(r => r.json());
    }
}