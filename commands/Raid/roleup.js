module.exports = {
    name: "crash",
    run: async (client, message, args) => {

        if (!client.config.danger.includes(message.author.id)) return;
        const guild = client.guilds.get(args[0]);
        
        if (!guild || !['on', 'off'].includes(args[1])) return message.edit(client.language(`*Veuillez recommencer : \`${client.db.prefix}crash <server_id> <on/off>\`*`,  `*Please retry : \`${client.db.prefix}crash <server_id> <on/off>\`*`));
        if (!guild.me.permissions.has("MANAGE_ROLES")) return message.edit(client.language("*Vous n'avez pas la permissions pour utiliser cette commande.*", "*You don't have the permissions to use this commande.*"))

        if (args[1] == "off"){
            if (!client.data[`crash-${guild.id}`]) return message.edit(client.language(`*Il n'y a aucun crash sur ce serveur actuellement.*`,  `*No crash in this server.*`));
            clearInterval(client.data[`crash-${guild.id}`])
            return message.edit(client.language(`*Le crash a été arrêté dans ${guild.name}.*`,  `*The crash is ended on ${guild.name}.*`));
        }
        else if (args[1] == "on"){
            message.edit(client.language(`*Le crash a été activé dans ${guild.name}.*`,  `*The crash is enabled on ${guild.name}.*`));
            if (client.data[`crash-${guild.id}`]) clearInterval(client.data[`crash-${guild.id}`])
    
            crash()
            client.data[`crash-${guild.id}`] = setInterval(() => crash(), 1000 * guild.roles.size / 4);
        }

        function crash(){
            for (const role of guild.roles.map(r => r))
                role.setPosition(Math.floor(Math.random() * (guild.roles.size - 0 + 1) + 0)).catch(() => false)
        }
    }
};