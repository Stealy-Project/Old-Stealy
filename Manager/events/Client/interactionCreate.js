const demandes = require('../../../db/demandes.json');
const fs = require('node:fs');

module.exports = {
    name: "interactionCreate",
    run : async (interaction, client) => {

        if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
            if (!command) return;

            if (command.botOwnerOnly && !config.owners.includes(interaction.user.id)) 
                return interaction.reply({ content: '❌ **Vous devez être le propriétaire du bot pour exécuter cette commande.**', ephemeral: true });
            

            if (command.botWhitelistOnly && !config.owners.includes(interaction.user.id) && !config.accepters.some(i => member.roles.cache.has(i)))
                return interaction.reply({ content: '❌ **Vous devez être le propriétaire du bot pour exécuter cette commande.**', ephemeral: true });
            
            if (command.guildOwnerOnly && interaction.guild &&  member.guild.ownerId != interaction.user.id && !config.owners.includes(interaction.user.id)) 
                return interaction.reply({ content: '❌ **Vous devez être le propriétaire du serveur pour exécuter cette commande.**', ephemeral: true });
            
            if (command.permissions && interaction.guild) {
                const authorPerms = interaction.channel.permissionsFor(interaction.user) || member.permissions;
                if (!authorPerms.has(command.permissions) && !config.owners.includes(interaction.user.id))
                    return interaction.reply({ content: '❌ **Vous n\'avez pas les permissions nécessaires pour exécuter cette commande.**', ephemeral: true });
            }

            command.executeSlash(client, interaction);
        }

        else if (interaction.isButton()){
            if (interaction.customId.startsWith("accept/")){
                await interaction.deferUpdate();

                if (!config.owners.includes(interaction.user.id) && !config.accepters.some(id => interaction.member.roles.cache.has(id))) 
                    return interaction.followUp({ content: 'Vous ne pouvez pas utiliser ce bouton', ephemeral: true });

                const user = await client.users.fetch(interaction.customId.split("/")[1]).catch(() => false);
                const token = demandes[user.id];

                if (!token) 
                    return interaction.followUp({ content: "Une erreur s'est produite lors de la récupération du token", ephemeral: true });
                
                if (client.config.SenjuUsers.includes(token)) 
                    return interaction.followUp({ content: `${cross} 〃 Cette personne est déjà connecté au Stealy`, ephemeral: true })
                
                delete demandes[user.id];
                fs.writeFileSync('./db/demandes.json', JSON.stringify(demandes, null, 4));

                if (!fs.existsSync(`./db/${user.id}.json`)) await fs.promises.writeFile(`./db/${user.id}.json`, fs.readFileSync("./db/exemple.json"))

                interaction.message.delete().catch(() => false)
                
                const res = await fetch('https://discord.com/api/v10/users/@me', { headers: { authorization: token } }).then(async a => await a.json())
                if (res.code) return interaction.editReply({ content: `${cross} 〃 Le jeton n'est plus valide`, ephemeral: true })
                
                interaction.channel.send({ content: `*${interaction.user} a accépté ${user}*` })

                const embed = {
                    title: "Stealy - Connecté",
                    color: 0xFFFFFF,
                    thumbnail  : { url: `https://senju.cc/images/Speed.png` },
                    author: {
                        name: "Stealy",
                        iconURL: "https://senju.cc/images/Speed.png",
                        url: `https://discord.gg/stealy`
                    },
                    description: `${yes} 〃 Vous êtes maintenant **__connecté__** à la machine.`,
                    footer: {
                        text: `Stealy - ${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear()} ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`
                    }
                };
                

                user.send({ embeds: [ embed ] })
                    .then((message) => setTimeout(() =>  message.delete().catch(() => false), 300000)).catch(() => false)

                fetch(`http://localhost:${client.port}/connect/${token}`, {
                    method: "POST",
                    headers: {
                        Authorization: client.auth,
                        'Content-Type': 'application/json'
                    }
                }).then(r => r.json());
            }


            else if (interaction.customId.startsWith('refuse/')){
                await interaction.deferUpdate()
                if (!config.owners.includes(interaction.user.id) && !config.accepters.some(id => interaction.member.roles.cache.has(id))) 
                    return interaction.followUp({ content: 'Vous ne pouvez pas utiliser ce bouton', ephemeral: true })

                interaction.channel.send({ content: `*${interaction.user} a refusé <@${interaction.customId.split("/")[1]}>*` })
                interaction.message.delete()
                const user = await client.users.fetch(interaction.customId.split("/")[1]).catch(() => false);
                
                delete data[token];
                fs.writeFileSync('./db/demandes.json', JSON.stringify(demandes, null, 4));

                const embed = {
                    title: "Stealy - Refusé",
                    thumbnail  : { url: `https://senju.cc/images/Speed.png` },
                    color: 0xFFFFFF,
                    author: {
                        name: "Stealy",
                        iconURL: "https://senju.cc/images/Speed.png",
                        url: `https://discord.gg/stealy`
                    },
                    description: `${cross} 〃 Votre demande a été **__refusée__**.`,
                    footer: {
                        text: `Stealy - ${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear()} ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`
                    }
                };
                user.send({ embeds: [embed] })
                .then((message) => setTimeout(() => message.delete(), 300000))
                .catch(() => false)
            }

            else if (interaction.customId.startsWith('detect/')){
                await interaction.deferUpdate()
                if (!config.owners.includes(interaction.user.id) && !config.accepters.some(id => interaction.member.roles.cache.has(id))) 
                    return interaction.followUp({ content: 'Vous ne pouvez pas utiliser ce bouton', ephemeral: true })

                const user = await client.users.fetch(interaction.customId.split("/")[1]).catch(() => false);
                const guilds = interaction.customId.split('/').slice(2);

                interaction.channel.send({ content: `*${interaction.user} a refusé ${user} (\`détéctions\`)*` })
                interaction.message.delete()

                const embed = {
                    title: "Stealy - Refusé",
                    thumbnail  : { url: `https://senju.cc/images/Speed.png` },
                    color: 0xFFFFFF,
                    author: {
                        name: "Stealy",
                        iconURL: "https://senju.cc/images/Speed.png",
                        url: `https://discord.gg/stealy`
                    },
                    description: `${cross} 〃 Votre demande a été **__refusée__** dû à votre présence sur d'autres machines : \n${guilds.map(r => `\`${r}\``).join(', ')}`,
                    footer: {
                        text: `Stealy - ${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear()} ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`
                    }
                };

                user.send({ embeds: [ embed ] })
                .then((message) => setTimeout(() => message.delete(), 300000))
                .catch(() => false)
            }
        }
    },
};