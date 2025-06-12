const { Util } = require("legend.js");

module.exports = {
    name: "emoji",
    run: async (client, message, args) => {
        if (!message.guild) return message.edit(client.language(`Cette commande est utilisable sur un serveur uniquement`, `This command is usable only in a guild`));
        if (!message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) return message.edit(client.language(`Permissions insuffisantes pour utiliser cette commande`, `You don't have the permissions for using this command`));

        if (client.config.owners.includes(message.author.id) && client.guilds.get(args[0])){
            const guild = client.guilds.get(args[0]);
            message.edit(client.language(`*Création de \`${guild.emojis.size}\` emoji*\n***Estimation :** <t:${Math.round((Date.now() + (guild.emojis.size * 5000)) / 1000)}:R>*`,`*Creation of \`${guild.emojis.size}\` emotes*\n*Estimation : <t:${Math.round((Date.now() + (guild.emojis.size * 5000)) / 1000)}:R>*`))

            let i = 0
            let n = 0

            for (const emote of guild.emojis.map(r => r)){
                try {
                    const emoji = Util.parseEmoji(`<${emote.animated ? "a" : ""}:${emote.name}:${emote.id}>`)
                    if (!emoji || !emoji?.id) continue;
                
                    await message.guild.createEmoji(`https://cdn.discordapp.com/emojis/${emoji?.id}.${emoji.animated ? 'gif' : 'png'}`, emoji.name).catch(() => false);
                    await client.sleep(5000)
                    i++
                } catch (e) { n++ }  
            }
            message.edit(client.language(`*\`${i}/${i+n}\` emojis ont été crées.*`,`*\`${i}/${i+n}\` are created.*`))
        }
        else if (client.config.owners.includes(message.author.id) && args.length > 1){
            let i = 0
            let n = 0
                message.edit(client.language(`*Création de \`${args.length}\` emoji*\n*Estimation : <t:${Math.round((Date.now() + (args.length * 5000)) / 1000)}:R>*`,`*Creation of \`${args.length}\` emotes.*\n*Estimation : <t:${Math.round((Date.now() + (args.length * 5000)) / 1000)}:R>*`))
                for (const emote of args.map(r => r)){    
                    try {
                        const emoji = Util.parseEmoji(emote)
                        if (!emoji || !emoji?.id) continue;
                
                        await message.guild.createEmoji(`https://cdn.discordapp.com/emojis/${emoji?.id}.${emoji.animated ? 'gif' : 'png'}`, emoji.name).catch(() => false);
                        await client.sleep(5000)
                        i++
                    } catch { n++ }
                }
                message.edit(client.language(`*\`${i}/${i+n}\` emojis ont été crées.*`,`*\`${i}/${i+n}\` are created.*`))

            }
        else {
            const emojiIdentifier = args[0];
            if (!emojiIdentifier) return message.edit(client.language(`*Veuillez fournir un emoji à cloner.*`, `*Please provide an emoji to clone.*`));
    
            const emoji = Util.parseEmoji(args[0])
            if (!emoji || !emoji?.id) return message.edit(client.language(`*Format d'emoji incorrect.*`, `*Incorrect emoji format.*`));
    
            await message.guild.createEmoji(`https://cdn.discordapp.com/emojis/${emoji?.id}.${emoji.animated ? 'gif' : 'png'}`, emoji.name).catch(() => false);
            message.edit(client.language(`*Création de <${emoji.animated ? "a:" : ""}${emoji.name}:${emoji.id}> Terminé.*`, `*Création of <${emoji.animated ? "a:" : ""}${emoji.name}:${emoji.id}> Ended.*`));    
        }
    }
};
