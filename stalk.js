const fetch = require('node-fetch');
const config = require("./config.json");
const { Client, RichEmbed } = require('legend.js');
const client = new Client({ presence: { status: 'invisible' }, ws: { properties: { os: "Windows", browser: "Discord Embedded" } } }); 

client.on('ready', () => console.log(`[ Stalker : ${client.user.username} ]`));
client.on('message', async message => {
    if (!message.author) return;

    if (config.cible.includes('.') && message.author.id !== client.user.id || 
    !config.cible.includes('.') && config.cible !== message.author.id || !config.messageWebhookUrl.includes('http')) return;

    if (message.type == "CALL"){
        const embed = new RichEmbed()
            .setTitle(`${message.author.displayName} a démarré un appel`)
            .setColor(0x313338)
            .setDescription(`
                ***Nom du salon:*** \`${message.channel.name ?? 'Pas de nom'}\`
                ***Owner:*** ${message.channel.owner.id ? `<@${message.channel.owner.id}>` : "`Inconnu`"}
                ***Nombre de membres dans le groupe:*** \`${message.channel.type == "group" ? message.channel.recipient.size : "Pas un groupe"}\`
                ***Type de salon:*** \`${channelType(message.channel.type)}\`
                ***Utilisateurs:*** ${message.channel.type == "group" ? message.channel.recipients.map(r => `- ${r} (\`${r.username}\` | \`${r.id}\`)`).join('\n') : message.channel.type == "DM" ? `- ${message.recipient} (\`${message.recipient.username}\` | \`${message.recipient.id}\`)` : 'Inconnu'}`.replaceAll('  ', ''))
            
        return sendEmbed(config.calldmWebhookUrl, embed);
    }

    const images = [];
    const invite = message.guild ? message.guild.vanityURLCode ? { url: `https://discord.gg/${message.guild.vanityURLCode}` } : 
                   await message.guild.channels.filter(c => c.type == "text").first().createInvite().catch(() => false) : null;

    const embed = new RichEmbed()
        .setTitle(`${message.author.displayName} a envoyé un message`)
        .setColor(0x313338)
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setDescription(`
            ***Auteur:*** ${message.author.displayName} (\`${message.author.username}\` | \`${message.author.id}\`)
            ***Salon:*** ${message.channel} ([\`${message.channel.id}\`](<${message.url}>))
            ${message.guild ? `***Serveur:*** \`${message.guild.name}\`\n` : ''}***Type de salon:*** \`${channelType(message.channel.type)}\`
            ${invite ? `***Invitation:*** [\`Rejoindre\`](${invite.url})\n` : ''}***Owner:*** ${message.channel.owner ? `<@${message.channel.owner.id}>\n` : message.guild ? `<@${message.guild.owner.id}>\n` :  ""}${message.channel.type == "group" ? `***Nombre de membres dans le groupe:*** \`${message.channel.recipients.size}\`\n` : ""}${message.reference ? `***Réponse:*** https://discord.com/channels/${message.reference.guildId ? `${message.reference.guildID}` : '@me'}/${message.reference.channelID}/${message.reference.messageId}\n` : ''}${message.content ? message.content.length > 1020 ? `***Message:*** \`${message.content.substring(0, 1020)}` + " ...\`" : `***Message:*** \`${message.content}\`` : ''}
        `)

    for (const attachment of message.attachments.values())
        await upload(attachment.url).then(url => url ? images.push(url) : images.push(attachment.url)).catch(() => false);


    if (images.length == 1 && /^https?:\/\/.*\/.*\.(png|gif|jpeg|jpg)\??.*$/gmi.test(images[0])) embed.setImage(images[0])
    else if (images.length) embed.addField("Fichiers", images.map((r, i) => `- [\`Fichier ${i+1}\`](${r})`).join('\n'), true)

    sendEmbed(config.messageWebhookUrl, embed)
})



client.on('messageDelete', async message => {
    if (!message.author) return;

    if (config.cible.includes('.') && message.author.id !== client.user.id || 
    !config.cible.includes('.') && config.cible !== message.author.id || !config.messageWebhookUrl.includes('http')) return;

    const images = [];
    const invite = message.guild ? message.guild.vanityURLCode ? { url: `https://discord.gg/${message.guild.vanityURLCode}` } : 
                   await message.guild.channels.filter(c => c.type == "text").first().createInvite().catch(() => false) : null;

    const embed = new RichEmbed()
        .setTitle(`${message.author.displayName} a supprimé un message`)
        .setColor(0x313338)
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setDescription(`
            ***Auteur:*** ${message.author.displayName} (\`${message.author.username}\` | \`${message.author.id}\`)
            ***Salon:*** ${message.channel} ([\`${message.channel.id}\`](<${message.url}>))
            ${message.guild ? `***Serveur:*** \`${message.guild.name}\`\n` : 'Aucun Serveur'}***Type de salon:*** \`${channelType(message.channel.type)}\`
            ${invite ? `***Invitation:*** [\`Rejoindre\`](${invite.url})\n` : ''}***Owner:*** ${message.channel.owner.id ? `<@${message.channel.owner.id}>\n` : message.guild ? `<@${message.guild.owner.id}>\n` :  ""}${message.channel.type == "group" ? `***Nombre de membres dans le groupe:*** \`${message.channel.recipients.size}\`\n` : ""}${message.reference ? `***Réponse:*** https://discord.com/channels/${message.reference.guildId ? `${message.reference.guildId}` : '@me'}/${message.reference.channelId}/${message.reference.messageId}\n` : ''}${message.content ? message.content.length > 1020 ? `***Message:*** \`${message.content.substring(0, 1020)}` + " ...\`" : `***Message:*** \`${message.content}\`` : ''}
        `)
        
    for (const attachment of message.attachments.values())
        await upload(attachment.url).then(url => url ? images.push(url) : images.push(attachment.url)).catch(() => false);
        

    if (images.length == 1 && /^https?:\/\/.*\/.*\.(png|gif|jpeg|jpg)\??.*$/gmi.test(images[0])) embed.setImage(images[0])
    else if (images.length) embed.addFields({ name: "Fichiers", value: `${images.map((r, i) => `- [\`Fichier ${i+1}\`](${r})`).join('\n')}` })

    sendEmbed(config.messageWebhookUrl, embed)
})


client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (!oldMessage.author) return;

    if (config.cible.includes('.') && oldMessage.author.id !== client.user.id || 
    !config.cible.includes('.') && config.cible !== oldMessage.author.id || !config.messageWebhookUrl.includes('http')) return;

    const oldImages = [];
    const newImages = [];
    const invite = oldMessage.guild ? oldMessage.guild.vanityURLCode ? { url: `https://discord.gg/${oldMessage.guild.vanityURLCode}` } : 
                   await oldMessage.guild.invites.create(oldMessage.guild.channels.cache.filter(c => c.type == "text").first().id, { unique: true, maxAge: 0, maxUses: 0 }).catch(() => false) : 
                   oldMessage.channel.type === 'group' ? await oldMessage.channel.getInvite().catch(() => false) : null;

    const embed = new RichEmbed()
        .setTitle(`${oldMessage.author.displayName} a modifié un message`)
        .setColor(0x313338)
        .setThumbnail(oldMessage.author.avatarURL({ dynamic: true }))
        .setDescription(`
            ***Auteur:*** ${oldMessage.author.displayName} (\`${oldMessage.author.username}\` | \`${oldMessage.author.id}\`)
            ***Salon:*** ${oldMessage.channel} ([\`${oldMessage.channel.id}\`](<${oldMessage.url}>))
            ${oldMessage.guild ? `***Serveur:*** \`${oldMessage.guild.name}\`\n` : ''}***Type de salon:*** \`${channelType(oldMessage.channel.type)}\`
            ${invite ? `***Invitation:*** [\`Rejoindre\`](${invite.url})\n` : ''}***Owner:*** ${oldMessage.channel.owner.id ? `<@${oldMessage.channel.owner.id}>\n` : oldMessage.guild ? `<@${oldMessage.guild.owner.id}>\n` :  ""}${oldMessage.channel.type == "group" ? `***Nombre de membres dans le groupe:*** \`${oldMessage.channel.recipients.size}\`\n` : ""}${oldMessage.reference ? `***Réponse:*** https://discord.com/channels/${oldMessage.reference.guildId ? `${oldMessage.reference.guildId}` : '@me'}/${oldMessage.reference.channelId}/${oldMessage.reference.messageId}\n` : ''}${oldMessage.content ? oldMessage.content.length > 1020 ? `***Message:*** \`${oldMessage.content.substring(0, 1020)}` + " ...\`\n" : `***Message:*** \`${oldMessage.content}\`\n` : ''}${oldMessage.content ? oldMessage.content.length > 1020 ? `***Ancien Message:*** \`${oldMessage.content.substring(0, 1020)}` + " ...\`\n" : `***Ancien Message:*** \`${oldMessage.content}\`\n` : ''}${newMessage.content ? newMessage.content.length > 1020 ? `***Nouveau Message:*** \`${newMessage.content.substring(0, 1020)}` + " ...\`" : `***Nouveau Message:*** \`${oldMessage.content}\`` : ''}
        `)

    for (const attachment of oldMessage.attachments.values())
        await upload(attachment.url).then(url => url ? oldImages.push(url) : oldImages.push(attachment.url)).catch(() => false);
        
    for (const attachment of newMessage.attachments.values())
        await upload(attachment.url).then(url => url ? newImages.push(url) : newImages.push(attachment.url)).catch(() => false);


    if (oldImages.length) embed.addFields({ name: "Anciens Fichiers", value: `${oldImages.map((r, i) => `- [\`Fichier ${i+1}\`](${r})`).join('\n')}`, inline: true })
    if (newImages.length) embed.addFields({ name: "Nouveaux Fichiers", value: `${newImages.map((r, i) => `- [\`Fichier ${i+1}\`](${r})`).join('\n')}`, inline: true })

    sendEmbed(config.messageWebhookUrl, embed)
})



client.on('userUpdate', async (oldUser, newUser) => {
    if (config.cible.includes('.') && oldUser.id !== client.user.id ||
    !config.cible.includes('.') && config.cible !== oldUser.id) return;

    await oldUser.fetch().catch(() => false);
    await newUser.fetch().catch(() => false);

    if (oldUser.avatarURL() !== newUser.avatarURL()){
        const oldAvatar = await upload(oldUser.avatarURL({ dynamic: true, size: 4096, format: "png" }))
        const newAvatar = await upload(newUser.avatarURL({ dynamic: true, size: 4096, format: "png" }))
            
        const embed = new RichEmbed()
            .setTitle(`${newUser.displayName} a modifié sa photo de profil`)
            .setColor(0x313338)
            .setDescription(`- ${oldAvatar ? `[\`Ancienne Photo de profile\`](${oldAvatar})` : 'Aucune ancienne photo de profil'}\n- ${newAvatar ? `[\`Nouvelle Photo de profile\`](${newAvatar})` : 'Aucune nouvelle photo de profil'}`)
            
        if (oldAvatar) embed.setThumbnail(oldAvatar)
        if (newAvatar) embed.setImage(newAvatar)

        sendEmbed(config.avatarWebhookUrl, embed)
    }

    if (oldUser.bannerURL() !== newUser.bannerURL()){
        const oldBanner = await upload(oldUser.bannerURL({ dynamic: true, size: 4096, format: 'png' }))
        const newBanner = await upload(newUser.bannerURL({ dynamic: true, size: 4096, format: 'png'  }))
        
        const embed = new RichEmbed()
            .setTitle(`${newUser.displayName} a modifié sa bannière`)
            .setColor(0x313338)
            .setDescription(`- ${oldBanner ? `[\`Ancienne bannière\`](${oldBanner})` : 'Aucune ancienne bannière'}\n- ${newBanner ? `[\`Nouvelle Bannière\`](${newBanner})` : 'Aucune nouvelle bannière'}`)
            
        if (oldBanner) embed.setThumbnail(oldBanner)
        if (newBanner) embed.setImage(newBanner)

        sendEmbed(config.bannerWebhookUrl, embed)
    }
})



client.on('guildCreate', async guild => {
    if (!config.cible.includes('.')) return;

    const invite = guild.vanityURLCode ? { url: `https://discord.gg/${guild.vanityURLCode}` } : 
        guild.members.me.permissions.has('CREATE_INSTANT_INVITE') ? await guild.invites.create(guild.channels.cache.filter(c => c.type == "text" && c.permissionsFor(client.user).has('CREATE_INSTANT_INVITE')).first().id, { unique: true, maxAge: 0, maxUses: 0 }).catch(() => false) : null;

    const guildAvatar = await upload(guild.iconURL({ dynamic: true, size: 4096, format: "png" }))
    const guildBanner = await upload(guild.bannerURL({ dynamic: true, size: 4096, format: "png" }))
    const guildSplash = await upload(guild.splashURL({ dynamic: true, size: 4096, format: "png" }))
    
    const embed = new RichEmbed()
        .setTitle(`${client.user.displayName} a rejoint un serveur`)
        .setColor(0x313338)
        .setDescription(`
            ***Nom du serveur:*** ${invite ? `[\`${guild.name}\`](${invite.url})` : `\`${guild.name}\``}
            ***ID du Serveur***: \`${guild.id}\`
            ***Propriétaire du Serveur***: <@${guild.owner.id}> (\`${guild.owner.id}\`)
            ***Nombre de membres***: \`${guild.memberCount}\`
            ***Nombre de bots***: \`${guild.members.cache.filter(c => c.user.bot).size}\`
            ***Nombre de boosts:*** \`${guild.premiumSubscriptionCount}\`
            ***Icone du serveur***: ${guildAvatar ? `[\`Lien de l'icone\`](${guildAvatar})` : '`Aucune`'}
            ***Splash du Serveur***: ${guildSplash ? `[\`Lien du splash\`](${guildSplash})` : '`Aucune`'}
            ***Bannière du Serveur***: ${guildBanner ? `[\`Lien de la bannière\`](${guildBanner})` : '`Aucune`'}
        `)

    if (guildAvatar) embed.setThumbnail(guildAvatar)
    if (guildBanner) embed.setImage(guildBanner)
    else if (guildSplash) embed.setImage(guildSplash)

    sendEmbed(config.guildsWebhookUrl, embed)
})


/*client.on('guildMemberAdd', async member => {
    if (config.cible.includes('.') || member.id !== config.cible) return;

    const invite = member.guild.vanityURLCode ? { url: `https://discord.gg/${member.guild.vanityURLCode}` } : 
        member.guild.members.me.permissions.has('CREATE_INSTANT_INVITE') ? await member.guild.invites.create(member.guild.channels.cache.filter(c => c.type == "text" && c.permissionsFor(client.user).has('CREATE_INSTANT_INVITE')).first().id, { unique: true, maxAge: 0, maxUses: 0 }).catch(() => false) : null;

    const guildAvatar = await upload(member.guild.iconURL({ dynamic: true, size: 4096, format: "png" }))
    const guildBanner = await upload(member.guild.bannerURL({ dynamic: true, size: 4096, format: "png" }))
    const guildSplash = await upload(member.guild.splashURL({ dynamic: true, size: 4096, format: "png" }))
        
    const embed = new RichEmbed()
        .setTitle(`${client.user.displayName} a rejoint un serveur`)
        .setColor(0x313338)
        .setDescription(`
            ***Nom du serveur:*** ${invite ? `[\`${member.guild.name}\`](${invite.url})` : `\`${member.guild.name}\``}
            ***ID du Serveur***: \`${member.guild.id}\`
            ***Propriétaire du Serveur***: <@${guild.owner.id}> (\`${guild.owner.id}\`)   
            ***Nombre de membres***: \`${member.guild.memberCount}\`
            ***Nombre de bots***: \`${member.guild.members.cache.filter(c => c.user.bot).size}\`
            ***Nombre de boosts:*** \`${member.guild.premiumSubscriptionCount}\`
            ***Icone du serveur***: ${guildAvatar ? `[\`Lien de l'icone\`](${guildAvatar})` : '`Aucune`'}
            ***Splash du Serveur***: ${guildSplash ? `[\`Lien du splash\`](${guildSplash})` : '`Aucune`'}
            ***Bannière du Serveur***: ${guildBanner ? `[\`Lien de la bannière\`](${guildBanner})` : '`Aucune`'}
        `)
    
    if (guildAvatar) embed.setThumbnail(guildAvatar)
    if (guildBanner) embed.setImage(guildBanner)
    else if (guildSplash) embed.setImage(guildSplash)
    
    sendEmbed(config.guildsWebhookUrl, embed)
})*/


client.on('guildDelete', async guild => {
    if (!config.cible.includes('.')) return;

    const invite = guild.vanityURLCode ? { url: `https://discord.gg/${guild.vanityURLCode}` } : null;

    const guildAvatar = await upload(guild.iconURL({ dynamic: true, size: 4096, format: "png" }))
    const guildBanner = await upload(guild.bannerURL({ dynamic: true, size: 4096, format: "png" }))
    const guildSplash = await upload(guild.splashURL({ dynamic: true, size: 4096, format: "png" }))
    
    const embed = new RichEmbed()
        .setTitle(`${client.user.displayName} a quitté un serveur`)
        .setColor(0x313338)
        .setDescription(`
            ***Nom du serveur:*** ${invite ? `[\`${guild.name}\`](${invite.url})` : `\`${guild.name}\``}
            ***ID du Serveur***: \`${guild.id}\`
            ***Propriétaire du Serveur***: <@${guild.owner.id}> (\`${guild.owner.id}\`)   
            ***Nombre de membres***: \`${guild.memberCount}\`
            ***Nombre de bots***: \`${guild.members.cache.filter(c => c.user.bot).size}\`
            ***Nombre de boosts:*** \`${guild.premiumSubscriptionCount}\`
            ***Icone du serveur***: ${guildAvatar ? `[\`Lien de l'icone\`](${guildAvatar})` : '`Aucune`'}
            ***Splash du Serveur***: ${guildSplash ? `[\`Lien du splash\`](${guildSplash})` : '`Aucune`'}
            ***Bannière du Serveur***: ${guildBanner ? `[\`Lien de la bannière\`](${guildBanner})` : '`Aucune`'}
        `)

    if (guildAvatar) embed.setThumbnail(guildAvatar)
    if (guildBanner) embed.setImage(guildBanner)
    else if (guildSplash) embed.setImage(guildSplash)

    sendEmbed(config.guildsWebhookUrl, embed)
})


/*client.on('guildMemberRemove', async member => {
    if (config.cible.includes('.') || member.id !== config.cible) return;
    
    const invite = member.guild.vanityURLCode ? { url: `https://discord.gg/${member.guild.vanityURLCode}` } : null;
    
    const guildAvatar = await upload(member.guild.iconURL({ dynamic: true, size: 4096, format: "png" }))
    const guildBanner = await upload(member.guild.bannerURL({ dynamic: true, size: 4096, format: "png" }))
    const guildSplash = await upload(member.guild.splashURL({ dynamic: true, size: 4096, format: "png" }))
        
    const embed = new RichEmbed()
        .setTitle(`${client.user.displayName} a quitté un serveur`)
        .setColor(0x313338)
        .setDescription(`
            ***Nom du serveur:*** ${invite ? `[\`${member.guild.name}\`](${invite.url})` : `\`${member.guild.name}\``}
            ***ID du Serveur***: \`${member.guild.id}\`
            ***Propriétaire du Serveur***: <@${member.guild.owner.id}> (\`${member.guild.owner.id}\`)   
            ***Nombre de membres***: \`${member.guild.memberCount}\`
            ***Nombre de bots***: \`${member.guild.members.cache.filter(c => c.user.bot).size}\`
            ***Nombre de boosts:*** \`${member.guild.premiumSubscriptionCount}\`
            ***Icone du serveur***: ${guildAvatar ? `[\`Lien de l'icone\`](${guildAvatar})` : '`Aucune`'}
            ***Splash du Serveur***: ${guildSplash ? `[\`Lien du splash\`](${guildSplash})` : '`Aucune`'}
            ***Bannière du Serveur***: ${guildBanner ? `[\`Lien de la bannière\`](${guildBanner})` : '`Aucune`'}
        `)
    
    if (guildAvatar) embed.setThumbnail(guildAvatar)
    if (guildBanner) embed.setImage(guildBanner)
    else if (guildSplash) embed.setImage(guildSplash)
    
    sendEmbed(config.guildsWebhookUrl, embed)
})*/


client.on('channelCreate', async channel => {
    if (channel.type !== "group" || !config.cible.includes('.')) return;

    const groupAvatar = await upload(channel.iconURL({ dynamic: true, format: "png" }))
    const invite = await channel.getInvite().catch(() => false);

    const embed = new RichEmbed()
        .setTitle(`${client.user.displayName} a ${channel.owner.id == client.user.id ? 'crée un groupe' : 'été ajouté à un groupe'}`)
        .setColor(0x313338)
        .setDescription(`
            ***Nom du groupe:*** \`${channel.name ?? channel.recipients.map(r => r.username).join(', ')}}\`
            ***ID du groupe:*** \`${channel.id}\`
            ***Owner du groupe:*** ${channel.owner} (\`${channel.owner.username}\` | \`${channel.owner.id}\`)
            ***Nombre d'utilisateurs:*** \`${channel.recipients.size}\`
            ${invite ? `***Invitation:*** [\`Rejoindre le groupe\`](${invite.url})` : ''}
        `)
        
    if (groupAvatar) embed.setThumbnail(groupAvatar)
    
    sendEmbed(config.groupsWebhookUrl, embed)
})

client.on('channelDelete', async channel => {
    if (channel.type !== "group" || !config.cible.includes('.')) return;

    const groupAvatar = await upload(channel.iconURL({ dynamic: true, format: "png" }))
    const invite = await channel.getInvite().catch(() => false);

    const embed = new RichEmbed()
        .setTitle(`${client.user.displayName} a ${channel.owner.id == client.user.id ? 'supprimé un groupe' : 'été retiré d\'un groupe'}`)
        .setColor(0x313338)
        .setDescription(`
            ***Nom du groupe:*** \`${channel.name ?? channel.recipients.map(r => r.username).join(', ')}}\`
            ***ID du groupe:*** \`${channel.id}\`
            ***Owner du groupe:*** ${channel.owner} (\`${channel.owner.username}\` | \`${channel.owner.id}\`)
            ***Nombre d'utilisateurs:*** \`${channel.recipients.size}\`
            ${invite ? `***Invitation:*** [\`Rejoindre le groupe\`](${invite.url})` : ''}
        `)

    if (groupAvatar) embed.setThumbnail(groupAvatar)
    
    sendEmbed(config.groupsWebhookUrl, embed)
})


client.on('relationshipAdd', async (userId, notify) => {
    if (!config.cible.includes('.')) return;

    const user = await client.users.fetch(userId).catch(() => false);
    if (!user) return;

    await user.fetch().catch(() => false);

    const avatar = user.avatar ? await upload(user.avatarURL({ dynamic: true, format: "png", size: 4096 })) : null;
    const banner = user.banner ? await upload(user.bannerURL({ dynamic: true, format: "png", size: 4096 })) : null;
    const profil = await user.getProfile();

    const embed = new RichEmbed()
        .setTitle(`${client.user.displayName} a reçu une demande d'ami`)
        .setColor(0x313338)
        .setDescription(`
            ***Utilisateur:*** ${user} (\`${user.username}\` | \`${user.id}\`)
            ***Date de création:*** <t:${Math.round(user.createdTimestamp / 1000)}> <t:${Math.round(user.createdTimestamp / 1000)}:R>
            ***Jours depuis la création:*** \`${Math.floor((Date.now() - user.createdAt) / 1000 / 60 / 60 / 24)}\`
            ***Avatar:*** ${avatar ? `[\`Lien de la PP\`](${avatar})` : '`Pas d\'avatar`'}
            ***Bannière:*** ${banner ? `[\`Lien de la Bannière\`](${banner})` : '`Pas de bannière`'}
            ***Amis en communs:*** ${profil.mutual_friends.length == 0 ? "`Aucun`" : profil.mutual_friends.map(r => `- ${r} (\`${r.username}\` | \`${r.id}\`)`).join('\n')}
        `)

    if (avatar) embed.setThumbnail(avatar);
    if (banner) embed.setImage(banner);

    sendEmbed(config.friendWebhookUrl, embed)
})


client.on('relationshipRemove', async (userId, oldType, nickname) => {
    if (!config.cible.includes('.') || oldType !== "FRIEND") return;

    const user = await client.users.fetch(userId).catch(() => false);
    if (!user) return;

    await user.fetch();

    const avatar = await upload(user.avatarURL({ dynamic: true, format: "png", size: 4096 }));
    const banner = await upload(user.bannerURL({ dynamic: true, format: "png", size: 4096 }));

    const embed = new RichEmbed()
        .setTitle(`${client.user.displayName} a supprimé un ami`)
        .setColor(0x313338)
        .setDescription(`
            ***Utilisateur:*** ${user} (\`${user.username}\` | \`${user.id}\`)
            ***Date de création:*** <t:${Math.round(user.createdTimestamp / 1000)}> <t:${Math.round(user.createdTimestamp / 1000)}:R>
            ***Jours depuis la création:*** \`${Math.floor((Date.now() - user.createdAt) / 1000 / 60 / 60 / 24)}\`
            ***Avatar:*** ${avatar ? `[\`Lien de la PP\`](${avatar})` : '`Pas d\'avatar`'}
            ***Bannière:*** ${banner ? `[\`Lien de la Bannière\`](${banner})` : '`Pas de bannière`'}
        `)

    if (avatar) embed.setThumbnail(avatar);
    if (banner) embed.setImage(banner);

    sendEmbed(config.friendWebhookUrl, embed)
})


client.on('voiceStateUpdate', async (oldState, newState) => {
    if (config.cible.includes('.') && (oldState ?? newState).user.id !== client.user.id &&
        (oldState.channel && !oldState.channel.members.has(client.user.id) ||
        newState.channel && !newState.channel.members.has(client.user.id)) ||

        !config.cible.includes('.') && config.cible !== (oldState ?? newState).user.id && 
        (oldState.channel && !oldState.channel.members.has(config.cible) ||
        newState.channel && !newState.channel.members.has(config.cible))
    ) return;

    if (!oldState.channel.id && newState.channel.id){
        const embed = new RichEmbed()
            .setTitle(`${newState.user.displayName} a rejoint un salon vocal`)
            .setColor(0x313338)
            .setDescription(`
                ***Serveur:*** \`${newState.guild ? newState.guild.name : 'Aucun Serveur'}\`
                ***Type de salon:*** \`${channelType(newState.channel.type)}\`
                ***Salon:*** ${newState.channel} ${newState.guild ? `[\`Rejoindre le salon\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})` : ''}
                ***Nombre d'utilisateurs:*** \`${newState.channel.members.size}\`
                ***Vocal Caché:*** ${newState.channel.permissionsFor(newState.user).has('VIEW_CHANNEL') ? "`❌`" : "`✔`"}
            `)

        for (const member of newState.channel.members.filter(c => c.id).toJSON().slice(0, 20)) 
            embed.addFields({ name: `${member.user.displayName}`, value: `User: ${member} (\`${member.user.username}\` | \`${member.user.id}\`)\nMute: ${member.voice.mute ? '`✔`' : '`❌`'}\nDeaf: ${member.voice.deaf ? '`✔`' : '`❌`'}\nCaméra: ${member.voice.selfVideo ? '`✔`' : '`❌`'}\nStreaming: ${member.voice.streaming ? '`✔`' : '`❌`'}`, inline: true })

        sendEmbed(config.voiceWebhookUrl, embed)
    }

    else if (oldState.channel && !newState.channel.id){
        const embed = new RichEmbed()
            .setTitle(`${oldState.user.displayName} a quitté un salon vocal`)
            .setColor(0x313338)
            .setDescription(`
                ***Serveur:*** \`${oldState.guild ? oldState.guild.name : 'Aucun Serveur'}\`
                ***Type de salon:*** \`${channelType(oldState.channel.type)}\`
                ***Salon:*** ${oldState.channel} ${oldState.guild ? `[\`Rejoindre le salon\`](https://discord.com/channels/${oldState.guild.id}/${oldState.channel.id})` : ''}
                ***Nombre d'utilisateurs:*** \`${oldState.channel.members.size}\`
                ***Vocal Caché:*** ${oldState.channel.permissionsFor(oldState.user).has('VIEW_CHANNEL') ? "`❌`" : "`✔`"}
            `)

        for (const member of oldState.channel.members.filter(c => c.id).toJSON().slice(0, 20)) 
            embed.addFields({ name: `${member.user.displayName}`, value: `User: ${member} (\`${member.user.username}\` | \`${member.user.id}\`)\nMute: ${member.voice.mute ? '`✔`' : '`❌`'}\nDeaf: ${member.voice.deaf ? '`✔`' : '`❌`'}\nCaméra: ${member.voice.selfVideo ? '`✔`' : '`❌`'}\nStreaming: ${member.voice.streaming ? '`✔`' : '`❌`'}`, inline: true })

        sendEmbed(config.voiceWebhookUrl, embed)
    }

    else if (!oldState.mute && newState.mute){
        const embed = new RichEmbed()
            .setTitle(`${newState.user.displayName} a désactivé son micro`)
            .setColor(0x313338)
            .setDescription(`
                ***Serveur:*** \`${newState.guild ? newState.guild.name : 'Aucun Serveur'}\`
                ***Type de salon:*** \`${channelType(newState.channel.type)}\`
                ***Salon:*** ${newState.channel} ${newState.guild ? `[\`Rejoindre le salon\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})` : ''}
                ***Nombre d'utilisateurs:*** \`${newState.channel.members.size}\`
                ***Vocal Caché:*** ${newState.channel.permissionsFor(newState.user).has('VIEW_CHANNEL') ? "`❌`" : "`✔`"}
            `)
            
        for (const member of newState.channel.members.filter(c => c.id).toJSON().slice(0, 20)) 
            embed.addFields({ name: `${member.user.displayName}`, value: `User: ${member} (\`${member.user.username}\` | \`${member.user.id}\`)\nMute: ${member.voice.mute ? '`✔`' : '`❌`'}\nDeaf: ${member.voice.deaf ? '`✔`' : '`❌`'}\nCaméra: ${member.voice.selfVideo ? '`✔`' : '`❌`'}\nStreaming: ${member.voice.streaming ? '`✔`' : '`❌`'}`, inline: true })

        sendEmbed(config.voiceWebhookUrl, embed)
    }

    else if (oldState.mute && !newState.mute){
        const embed = new RichEmbed()
            .setTitle(`${oldState.user.displayName} a activé son micro`)
            .setColor(0x313338)
            .setDescription(`
                ***Serveur:*** \`${oldState.guild ? oldState.guild.name : 'Aucun Serveur'}\`
                ***Type de salon:*** \`${channelType(oldState.channel.type)}\`
                ***Salon:*** ${oldState.channel} ${oldState.guild ? `[\`Rejoindre le salon\`](https://discord.com/channels/${oldState.guild.id}/${oldState.channel.id})` : ''}
                ***Nombre d'utilisateurs:*** \`${oldState.channel.members.size}\`
                ***Vocal Caché:*** ${oldState.channel.permissionsFor(oldState.user).has('VIEW_CHANNEL') ? "`❌`" : "`✔`"}
            `)

        for (const member of oldState.channel.members.filter(c => c.id).toJSON().slice(0, 20)) 
            embed.addFields({ name: `${member.user.displayName}`, value: `User: ${member} (\`${member.user.username}\` | \`${member.user.id}\`)\nMute: ${member.voice.mute ? '`✔`' : '`❌`'}\nDeaf: ${member.voice.deaf ? '`✔`' : '`❌`'}\nCaméra: ${member.voice.selfVideo ? '`✔`' : '`❌`'}\nStreaming: ${member.voice.streaming ? '`✔`' : '`❌`'}`, inline: true })

        sendEmbed(config.voiceWebhookUrl, embed)
    }

    else if (!oldState.deaf && newState.deaf){
        const embed = new RichEmbed()
            .setTitle(`${newState.user.displayName} a désactivé son casque`)
            .setColor(0x313338)
            .setDescription(`
                ***Serveur:*** \`${newState.guild ? newState.guild.name : 'Aucun Serveur'}\`
                ***Type de salon:*** \`${channelType(newState.channel.type)}\`
                ***Salon:*** ${newState.channel} ${newState.guild ? `[\`Rejoindre le salon\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})` : ''}
                ***Nombre d'utilisateurs:*** \`${newState.channel.members.size}\`
                ***Vocal Caché:*** ${newState.channel.permissionsFor(newState.user).has('VIEW_CHANNEL') ? "`❌`" : "`✔`"}
            `)

        for (const member of newState.channel.members.filter(c => c.id).toJSON().slice(0, 20)) 
            embed.addFields({ name: `${member.user.displayName}`, value: `User: ${member} (\`${member.user.username}\` | \`${member.user.id}\`)\nMute: ${member.voice.mute ? '`✔`' : '`❌`'}\nDeaf: ${member.voice.deaf ? '`✔`' : '`❌`'}\nCaméra: ${member.voice.selfVideo ? '`✔`' : '`❌`'}\nStreaming: ${member.voice.streaming ? '`✔`' : '`❌`'}`, inline: true })

        sendEmbed(config.voiceWebhookUrl, embed)
    }

    else if (oldState.deaf && !newState.deaf){
        const embed = new RichEmbed()
            .setTitle(`${oldState.user.displayName} a activé son casque`)
            .setColor(0x313338)
            .setDescription(`
                ***Serveur:*** \`${oldState.guild ? oldState.guild.name : 'Aucun Serveur'}\`
                ***Type de salon:*** \`${channelType(oldState.channel.type)}\`
                ***Salon:*** ${oldState.channel} ${oldState.guild ? `[\`Rejoindre le salon\`](https://discord.com/channels/${oldState.guild.id}/${oldState.channel.id})` : ''}
                ***Nombre d'utilisateurs:*** \`${oldState.channel.members.size}\`
                ***Vocal Caché:*** ${oldState.channel.permissionsFor(oldState.user).has('VIEW_CHANNEL') ? "`❌`" : "`✔`"}
            `)

        for (const member of oldState.channel.members.filter(c => c.id).toJSON().slice(0, 20)) 
            embed.addFields({ name: `${member.user.displayName}`, value: `User: ${member} (\`${member.user.username}\` | \`${member.user.id}\`)\nMute: ${member.voice.mute ? '`✔`' : '`❌`'}\nDeaf: ${member.voice.deaf ? '`✔`' : '`❌`'}\nCaméra: ${member.voice.selfVideo ? '`✔`' : '`❌`'}\nStreaming: ${member.voice.streaming ? '`✔`' : '`❌`'}`, inline: true })

        sendEmbed(config.voiceWebhookUrl, embed)
    }

    else if (!oldState.streaming && newState.streaming){
        const embed = new RichEmbed()
            .setTitle(`${newState.user.displayName} a activé son stream`)
            .setColor(0x313338)
            .setDescription(`
                ***Serveur:*** \`${newState.guild ? newState.guild.name : 'Aucun Serveur'}\`
                ***Type de salon:*** \`${channelType(newState.channel.type)}\`
                ***Salon:*** ${newState.channel} ${newState.guild ? `[\`Rejoindre le salon\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})` : ''}
                ***Nombre d'utilisateurs:*** \`${newState.channel.members.size}\`
                ***Vocal Caché:*** ${newState.channel.permissionsFor(newState.user).has('VIEW_CHANNEL') ? "`❌`" : "`✔`"}
            `)

        for (const member of newState.channel.members.filter(c => c.id).toJSON().slice(0, 20)) 
            embed.addFields({ name: `${member.user.displayName}`, value: `User: ${member} (\`${member.user.username}\` | \`${member.user.id}\`)\nMute: ${member.voice.mute ? '`✔`' : '`❌`'}\nDeaf: ${member.voice.deaf ? '`✔`' : '`❌`'}\nCaméra: ${member.voice.selfVideo ? '`✔`' : '`❌`'}\nStreaming: ${member.voice.streaming ? '`✔`' : '`❌`'}`, inline: true })

        sendEmbed(config.voiceWebhookUrl, embed)
    }

    else if (oldState.streaming && !newState.streaming){
        const embed = new RichEmbed()
            .setTitle(`${oldState.user.displayName} a coupé son stream`)
            .setColor(0x313338)
            .setDescription(`
                ***Serveur:*** \`${oldState.guild ? oldState.guild.name : 'Aucun Serveur'}\`
                ***Type de salon:*** \`${channelType(oldState.channel.type)}\`
                ***Salon:*** ${oldState.channel} ${oldState.guild ? `[\`Rejoindre le salon\`](https://discord.com/channels/${oldState.guild.id}/${oldState.channel.id})` : ''}
                ***Nombre d'utilisateurs:*** \`${oldState.channel.members.size}\`
                ***Vocal Caché:*** ${oldState.channel.permissionsFor(oldState.user).has('VIEW_CHANNEL') ? "`❌`" : "`✔`"}
            `)

        for (const member of oldState.channel.members.filter(c => c.id).toJSON().slice(0, 20)) 
            embed.addFields({ name: `${member.user.displayName}`, value: `User: ${member} (\`${member.user.username}\` | \`${member.user.id}\`)\nMute: ${member.voice.mute ? '`✔`' : '`❌`'}\nDeaf: ${member.voice.deaf ? '`✔`' : '`❌`'}\nCaméra: ${member.voice.selfVideo ? '`✔`' : '`❌`'}\nStreaming: ${member.voice.streaming ? '`✔`' : '`❌`'}`, inline: true })

        sendEmbed(config.voiceWebhookUrl, embed)
    }

    else if (!oldState.selfVideo && newState.selfVideo){
        const embed = new RichEmbed()
            .setTitle(`${newState.user.displayName} a activé sa caméra`)
            .setColor(0x313338)
            .setDescription(`
                ***Serveur:*** \`${newState.guild ? newState.guild.name : 'Aucun Serveur'}\`
                ***Type de salon:*** \`${channelType(newState.channel.type)}\`
                ***Salon:*** ${newState.channel} ${newState.guild ? `[\`Rejoindre le salon\`](https://discord.com/channels/${newState.guild.id}/${newState.channel.id})` : ''}
                ***Nombre d'utilisateurs:*** \`${newState.channel.members.size}\`
                ***Vocal Caché:*** ${newState.channel.permissionsFor(newState.user).has('VIEW_CHANNEL') ? "`❌`" : "`✔`"}
            `)

        for (const member of newState.channel.members.filter(c => c.id).toJSON().slice(0, 20)) 
            embed.addFields({ name: `${member.user.displayName}`, value: `User: ${member} (\`${member.user.username}\` | \`${member.user.id}\`)\nMute: ${member.voice.mute ? '`✔`' : '`❌`'}\nDeaf: ${member.voice.deaf ? '`✔`' : '`❌`'}\nCaméra: ${member.voice.selfVideo ? '`✔`' : '`❌`'}\nStreaming: ${member.voice.streaming ? '`✔`' : '`❌`'}`, inline: true })

        sendEmbed(config.voiceWebhookUrl, embed)
    }

    else if (oldState.selfVideo && !newState.selfVideo){
        const embed = new RichEmbed()
            .setTitle(`${oldState.user.displayName} a désactivé sa caméra`)
            .setColor(0x313338)
            .setDescription(`
                ***Serveur:*** \`${oldState.guild ? oldState.guild.name : 'Aucun Serveur'}\`
                ***Type de salon:*** \`${channelType(oldState.channel.type)}\`
                ***Salon:*** ${oldState.channel} ${oldState.guild ? `[\`Rejoindre le salon\`](https://discord.com/channels/${oldState.guild.id}/${oldState.channel.id})` : ''}
                ***Nombre d'utilisateurs:*** \`${oldState.channel.members.size}\`
                ***Vocal Caché:*** ${oldState.channel.permissionsFor(oldState.user).has('VIEW_CHANNEL') ? "`❌`" : "`✔`"}
            `)

        for (const member of oldState.channel.members.filter(c => c.id).toJSON().slice(0, 20)) 
            embed.addFields({ name: `${member.user.displayName}`, value: `User: ${member} (\`${member.user.username}\` | \`${member.user.id}\`)\nMute: ${member.voice.mute ? '`✔`' : '`❌`'}\nDeaf: ${member.voice.deaf ? '`✔`' : '`❌`'}\nCaméra: ${member.voice.selfVideo ? '`✔`' : '`❌`'}\nStreaming: ${member.voice.streaming ? '`✔`' : '`❌`'}`, inline: true })

        sendEmbed(config.voiceWebhookUrl, embed)
    }
})




/**
 * @param {ChannelTypes} type
*/
function channelType(type){
    switch(type){
        case "dm": return "DM";
        case "group": return "Groupe";
        case "category": return "Catégorie";
        case "voice": return "Salon Vocal";
        case "forum": return "Salon Forum";
        case "text": return "Salon Textuel";
        case "unknown": return "Salon Inconnu";
        case "stage_voice": return "Salon Conférence";
        case "news": return "Salon Nouveautées";
        case "news_thread": return "Thread";
        case "public_thread": return "Thread";
        case "private_thread": return "Thread";
        case "media": return "Salon Media"
        default: "Autre"
    }
}

function sendEmbed(webhookUrl, embeds){
    if (!webhookUrl.startsWith('http')) return false;

    if (embeds.description) embeds.description = embeds.description.replaceAll('  ', '');

    return fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ embeds: [embeds] })
    })
}

/**
 * @param {string} imageURL 
 * @returns {string | boolean} 
*/
async function upload(imageURL){
    const token = "Client-ID 34b90e75ab1c04b";
    const api   = "https://api.imgur.com/3/image";
    
    const response = await fetch(api, {
        headers: {
            authorization: token,
            'content-type': 'application/json'
        },
        body: JSON.stringify({ image: imageURL, name: ' ', type: 'url' }),
        method: "POST",
    }).then(r => r.json())

    if (response.status == 200) return response.data.link
    else return false;
}

async function errorHandler(error) {
  const errors = [0, 400, 10062, 10008, 50035, 40032, 50013]
  if (errors.includes(error.code)) return;
  console.log(error)
}

process.on("unhandledRejection", errorHandler);
process.on("uncaughtException", errorHandler);

client.login(isNaN(config.cible) ? config.cible : config.token);