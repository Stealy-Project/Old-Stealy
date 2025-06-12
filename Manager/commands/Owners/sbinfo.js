const Selfbot = require('legend.js');
const Discord = require('discord.js'); 
const fs = require('node:fs');

module.exports = {
    name: "sbinfo",
    description: "Affiche les informations de la base de donné d'un utilisateur.",
    aliases: [],
    permissions: [],
    botWhitelistOnly: false,
    guildOwnerOnly: false,
    botOwnerOnly: true,
    async execute(client, message, args) {
        const user = message.mentions.users.first() || client.users.get(args[0])
        if (!args[0] || !user) return message.channel.send(`${cross} 〃 Veuillez entrer un ID d'utilisateur valide`)

        const c = clients.find(c => c.user.id === user.id)
        if (!c) return message.channel.send(`${cross}〃 Aucun utilisateur de connecté à la machine avec cet ID`)
    
        const embed = new Discord.EmbedBuilder()
            .setTitle(`**__Machine Information de ${c.user.username}__**`)
            .setColor(0xFF0000)
            .setDescription(`› ***Préfix*** : \`${c.db.prefix}\`
                › ***Twitch*** : [${c.db.twitch.split("twitch.tv/")[1]}](<${c.db.twitch}>)
                › ***Nitro Sniper*** : ${c.db.nitrosniper ? `${yes}` : `${cross}`}
                › ***Anti Groupe*** : ${c.db.antigroup.status ? `${yes}` : `${cross}`}
                › ***Dangerous Mode*** : ${client.config.danger.includes(c.user.id) ? `${yes}` : `${cross}`}`.replaceAll("                ", ""))
        
                const row = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId(`menu`)
                        .setPlaceholder("Make a selection")
                        .setMaxValues(1)
                        .addOptions([
                            {
                                label: "Prefix",
                                emoji: "❓",
                                value: "prefix",
                                description: 'Updates the machine\'s prefix',
                            },
                            {
                                label: "Add a jeton",
                                emoji: "➕",
                                value: "token",
                                description: 'Adds another jeton to the machine',
                            },
                            {
                                label: "Disconnect a jeton",
                                emoji: "➕",
                                value: "rtoken",
                                description: 'Adds another jeton to the machine',
                            }
                        ])
                )

        const msg = await message.channel.send({ embeds: [embed], components: [row] })
        const collector = msg.createMessageComponentCollector({ time: 1000 * 60 * 10 });
        collector.on('end', () => msg.edit({ components: [] }).catch(() => false))

        collector.on('collect', async i => {
            if (i.user.id !== message.author.id) return i.reply({ content: "Vous ne pouvez pas utiliser cette interaction", ephemeral: true })
    
            switch(i.values[0]){
                case "prefix":
                    const row = new Discord.ActionRowBuilder().addComponents(
                        new Discord.TextInputBuilder()
                        .setCustomId(`new-prefix`)
                        .setMinLength(1)
                        .setMaxLength(5)
                        .setLabel("Nouveau Prefix")
                        .setStyle(Discord.TextInputStyle.Short)
                        .setRequired(true)
                    )
            
                    const modal = new Discord.ModalBuilder()
                        .setCustomId(`nprefix`)
                        .setTitle("Modification du prefix")
                        .setComponents(row)
            
                    i.showModal(modal)
                    break

                case "nprefix":
                    await i.deferReply({ ephemeral: true })

                    const prefix = interaction.fields.getTextInputValue("new-prefix")
            
                    c.db.prefix = prefix
                    c.save()
            
                    i.editReply({ content: `${yes} 〃 Le prefix est maintenant \`${prefix}\`` })            
                    break

                case "rtoken":                    
                client.config.SenjuUsers.splice(client.config.SenjuUsers.indexOf(c.token), 1) 
                    fs.writeFileSync("./config.json", JSON.stringify(client.config, null, 2))
        
                    fetch(`http://localhost:${client.port}/close/${c.token}`, {
                        method: 'POST',
                        headers: {
                            Authorization: client.auth,
                            'Content-Type': 'application/json'
                        }
                    })
                                        
                    i.reply({ content: `${yes} 〃 Le jeton a été supprimé`, ephemeral: true })
                    break

                    case "token":
                    const row2 = new Discord.ActionRowBuilder().addComponents(
                        new Discord.TextInputBuilder()
                        .setCustomId(`new-token`)
                        .setMinLength(1)
                        .setLabel("Token à ajouter")
                        .setStyle(Discord.TextInputStyle.Short)
                        .setRequired(true)
                    )
                
                    const modal2 = new Discord.ModalBuilder()
                        .setCustomId(`ntoken`)
                        .setTitle("Le token")
                        .setComponents(row2)
                
                    i.showModal(modal2)
                    break

                case "ntoken":
                    await i.deferReply({ ephemeral: true })

                    const token = interaction.fields.getTextInputValue("new-token")
            
                    if (client.config.SenjuUsers.includes(token)) return i.editReply({content: `${cross} 〃 Le jeton est déjà connecté`})
                        if (fs.existsSync(`./db/${Buffer.from(token.split(".")[0], "base64").toString("utf-8")}.json`)) db = require(`../../../db/${Buffer.from(token.split(".")[0], "base64").toString("utf-8")}.json`)


                    const res  = await fetch('https://discord.com/api/v10/users/@me', { headers: { authorization: token } }).catch(() => false);
                    if (!res.ok) return i.editReply({ content: `${cross} 〃 Le jeton fourni est invalide` });

                    fetch(`http://localhost:${client.port}/connect/${token}`, {
                        method: "POST",
                        headers: {
                            Authorization: client.auth,
                            'Content-Type': 'application/json'
                        }
                    }).then(r => r.json());

                    client.config.SenjuUsers.push(token)
                    fs.writeFileSync("./config.json", JSON.stringify(client.config, null, 2), () => false)
            
                    i.editReply({content: `${yes} 〃 Le jeton est maintenant connecté`})
                    break
            }  
        })
    },
    async executeSlash(client, interaction) {
        const user = interaction.options.getUser('user');
        if (!user) return interaction.reply({ content: `${cross} 〃 Veuillez entrer utilisateur valide`, ephemeral: true })
    
            const clients = await fetch(`http://localhost:${client.port}/getClients`, {
                method: "GET",
                headers: {
                    Authorization: client.auth,
                    'Content-Type': 'application/json'
                }
            }).then(r => r.json());
            
        const c = clients.find(c => c.user.id === user.id)
        if (!c) return interaction.reply({ content: `${cross}〃 Aucun utilisateur de connecté à la machine avec cet ID`, ephemeral: true })
        
        const embed = new Discord.EmbedBuilder()
            .setTitle(`**__Machine Information de ${c.user.username}__**`)
            .setColor(0xFF0000)
            .setDescription(`› ***Préfix*** : \`${c.db.prefix}\`
                › ***Twitch*** : [${c.db.twitch.split("twitch.tv/")[1]}](<${c.db.twitch}>)
                › ***Nitro Sniper*** : ${c.db.nitrosniper ? `${yes}` : `${cross}`}
                › ***Anti Groupe*** : ${c.db.antigroup.status ? `${yes}` : `${cross}`}
                › ***Dangerous Mode*** : ${client.config.danger.includes(c.user.id) ? `${yes}` : `${cross}`}`.replaceAll("                ", ""))
            
                const row = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId(`menu`)
                        .setPlaceholder("Make a selection")
                        .setMaxValues(1)
                        .addOptions([
                            {
                                label: "Prefix",
                                emoji: "❓",
                                value: "prefix",
                                description: 'Updates the machine\'s prefix',
                            },
                            {
                                label: "Add a jeton",
                                emoji: "➕",
                                value: "token",
                                description: 'Adds another jeton to the machine',
                            },
                            {
                                label: "Disconnect a jeton",
                                emoji: "➕",
                                value: "rtoken",
                                description: 'Adds another jeton to the machine',
                            }
                        ])
                )
    
        const msg = await interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
        const collector = msg.createMessageComponentCollector({ time: 1000 * 60 * 10 });
        collector.on('end', () => msg.edit({ components: [] }).catch(() => false))
    
        collector.on('collect', async i => {
            if (i.user.id !== interaction.user.id) return i.reply({ content: "Vous ne pouvez pas utiliser cette interaction", ephemeral: true })
            switch(i.values[0]){
                case "prefix":
                    const row = new Discord.ActionRowBuilder().addComponents(
                        new Discord.TextInputBuilder()
                        .setCustomId(`new-prefix`)
                        .setMinLength(1)
                        .setMaxLength(5)
                        .setLabel("Nouveau Prefix")
                        .setStyle(Discord.TextInputStyle.Short)
                        .setRequired(true)
                    )
                
                    const modal = new Discord.ModalBuilder()
                        .setCustomId(`nprefix`)
                        .setTitle("Modification du prefix")
                        .setComponents(row)
            
                    i.showModal(modal)
                    const reponse = await i.awaitModalSubmit({ time: 1000 * 60 * 5})
                    const prefix = reponse.fields.getTextInputValue("new-prefix")
                
                    c.db.prefix = prefix
                    c.save()
                
                    reponse.reply({ content: `${yes} 〃 Le prefix est maintenant \`${prefix}\``, ephemeral: true })            
                    break
    
                case "rtoken":                    
                client.config.SenjuUsers.splice(client.config.SenjuUsers.indexOf(c.token), 1) 
                    fs.writeFileSync("./config.json", JSON.stringify(client.config, null, 2))
        
                    fetch(`http://localhost:${client.port}/close/${c.token}`, {
                        method: 'POST',
                        headers: {
                            Authorization: client.auth,
                            'Content-Type': 'application/json'
                        }
                    })
                        
                    i.reply({ content: `${yes} 〃 Le jeton a été supprimé`, ephemeral: true })
                    break
    
                    case "token":
                    const row2 = new Discord.ActionRowBuilder().addComponents(
                        new Discord.TextInputBuilder()
                        .setCustomId(`new-token`)
                        .setMinLength(1)
                        .setLabel("Token à ajouter")
                        .setStyle(Discord.TextInputStyle.Short)
                        .setRequired(true)
                    )
                    
                    const modal2 = new Discord.ModalBuilder()
                        .setCustomId(`ntoken`)
                        .setTitle("Le token")
                        .setComponents(row2)
                    
                    i.showModal(modal2)

                    const reponse2 = await i.awaitModalSubmit({ time: 1000 * 60 * 5})
                    await reponse2.deferReply({ ephemeral: true })
                    const token = reponse2.fields.getTextInputValue("new-token")

                    if (client.config.SenjuUsers.includes(token)) return reponse2.editReply({content: `${cross} 〃 Le jeton est déjà connecté`})
                    if (fs.existsSync(`./db/${Buffer.from(token.split(".")[0], "base64").toString("utf-8")}.json`)) db = require(`../../../db/${Buffer.from(token.split(".")[0], "base64").toString("utf-8")}.json`)
            
                    const res  = await fetch('https://discord.com/api/v10/users/@me', { headers: { authorization: token } }).catch(() => false);
                    if (!res.ok) return reponse2.editReply({ content: `${cross} 〃 Le jeton fourni est invalide` });
    
            
                    fetch(`http://localhost:${client.port}/connect/${token}`, {
                        method: "POST",
                        headers: {
                            Authorization: client.auth,
                            'Content-Type': 'application/json'
                        }
                    }).then(r => r.json());
                    
                    client.config.SenjuUsers.push(token)
                    fs.writeFileSync("./config.json", JSON.stringify(client.config, null, 2), () => false)
                        
                    reponse2.editReply({content: `${yes} 〃 Le jeton est maintenant connecté`})
                    break
            }  
        })
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