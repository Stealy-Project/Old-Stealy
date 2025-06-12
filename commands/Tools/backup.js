const backup = require('discord-backup');
const discord = require("legend.js");
const path = require('node:path');
const fs = require("node:fs");
const d = {}

module.exports = {
    name: "backup",
    /**
     * @param {discord.Client} client
     * @param {discord.Message} message
     * @param {string[]} args
    */
    run: async (client, message, args) => {   
        backup.setStorageFolder(path.join(__dirname, `../../backups/${client.user.id}/serveurs`));

        if (!args[0]) return message.edit(client.language(`***__› Stealy__*** <a:star:1345073135095123978>

\`${client.db.prefix}backup c <id serveur>\` › *Création de la backup du serveur voulu.*
\`${client.db.prefix}backup load <id backup>\` › *Charge la backup voulu sur le serveur ou vous êtes.*

\`${client.db.prefix}backup info <id backup>\` › *Vous donne les infos sur la backup.*
\`${client.db.prefix}backup emoji <id serveur>\` › *Création de la backup emojis du serveur voulu.*

\`${client.db.prefix}backup delete <id backup>\` › *Supprime la backup voulue.*
\`${client.db.prefix}backup list\` › *Affiche la liste de vos backups.*
\`${client.db.prefix}backup clear\` › *Clear toutes vos backups.*`,
`***__› Stealy__*** <a:star:1345073135095123978>

\`${client.db.prefix}backup c <id serveur>\` › *Create the backup of the desired server.*
\`${client.db.prefix}backup load <id backup>\` › *Charge the backup you want on the server or you are on.*

\`${client.db.prefix}backup info <id backup>\` › *Displays information about the backup.*
\`${client.db.prefix}backup emoji <id serveur>\` › *Create the backup emojis of the desired server.*

\`${client.db.prefix}backup delete <id backup>\` › *Delete the backup you want.*
\`${client.db.prefix}backup list\` › *Displays the list of your backups.*
\`${client.db.prefix}backup clear\` › *Clear all your backups.*`))
    

    else if (args[0] === "create" || args[0] === "c"){
        const guild = client.guilds.get(args[1]) || message.guild
        if (!guild) return message.edit(client.language(`*Veuillez utiliser cette commande sur un serveur.*`, `*Please use this command on a guild.*`))
        
        const backupID = makeid(8)
        await message.edit(client.language(`*La backup du serveur ${guild.name} est en cours de création...*`, `*The backup of the guild ${guild.name} is under creation..*`), client.language(`*La backup du serveur ${guild.name} est en cours de création avec l'ID \`${backupID}\`.*`, `*The backup of the guild ${guild.name} is under creation with the ID \`${backupID}\`.*`))

        const backupData = await backup.create(guild, { backupID, maxMessagesPerChannel: 0, doNotBackup: ['emojis', 'bans'], saveImages: 'base64' })
        message.edit(client.language(`*La backup du serveur ${guild.name} a été crée.*\n*\`${client.db.prefix}backup load ${backupData.id}\` *`, `*The backup of the guild ${guild.name} is done.*\n*\`${client.db.prefix}backup load ${backupData.id}\` *`))
    }

    else if (args[0] === "emoji"){
        const guild = client.guilds.get(args[1]) || message.guild
        if (!guild) return message.edit(client.language(`*Veuillez utiliser cette commande dans un serveur*`,`*Please use this command in a server.*`))

        const backupid = makeid(8)
        const er = new Array()
        
        guild.emojis.forEach(e => er.push(`"${e.toString()}"`))
        
        const data = {
            emojis: er,
            name: guild.name,
            id: guild.id,
            code: backupid,
            size: guild.emojis.size,
            createdTimestamp: Date.now()
        }
        
        fs.writeFileSync(`./backups/${client.user.id}/emojis/${backupid}.json`, JSON.stringify(data, null, 4))            
        message.edit(client.language(`*Création de la backup des emotes terminée.*\n*\`${client.db.prefix}backup load ${backupid}\` *`,`*Backup of emojis completed.*\n*\`${client.db.prefix}backup load ${backupid}\`*`))
    }

    else if (args[0] === "load"){
        if (fs.existsSync(`./backups/${client.user.id}/emojis/${args[1]}.json`)){
            if (!message.guild) return message.edit(client.language(`*Veuillez refaire cette commande dans un serveur.*`,`*Please execute this command within a server.*`))
            if (!message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) return message.edit(client.language(`*Vous n'avez pas les permissions nécessaire pour executer cette commande*`,`*You do not have the necessary permissions to execute this command.*`))
            
            const data = require(`../../backups/${client.user.id}/emojis/${args[1]}.json`)
            message.edit(client.language(`*Chargement de : \`${data.size}\` emotes !*`,`*Load of : \`${data.size}\` emotes !*`))
                
            for (const emote of data.emojis.map(r => r)){
                let emoji = discord.Util.parseEmoji(emote);
                if (emoji?.id) message.guild.createEmoji(`https://cdn.discordapp.com/emojis/${emoji?.id}.${emoji.animated ? 'gif' : 'png'}`, emoji.name).catch(() => false)
            }
        }

        else if (fs.existsSync(`./backups/${client.user.id}/serveurs/${args[1]}.json`)){
            if (!message.guild) return message.edit(client.language(`*Veuillez utiliser cette commande sur un serveur.*`, `*Please use this command on a guild.*`))
            if (!message.guild.me.permissions.has("ADMINISTRATOR")) return message.edit(client.language(`*Vous n'avez pas la permission nécessaire pour executer cette commande.*`, `*You didn't got the required permission to execute this command.*`))
    
            if (d[client.user.id] && !client.config.owners.includes(message.author.id)) return message.edit(client.language(`*Veuillez utiliser la commande dans <t:${Math.round(d[client.user.id] / 1000)}:R>.*`, `*Please use this command util <t:${Math.round(d[client.user.id] / 1000)}:R>.*`))

            d[client.user.id] = Date.now() + 1000 * 60 * 20
            setTimeout(() => delete d[client.user.id], 1000 * 60 * 20)

            await message.edit(client.language(`*Suppression des rôles en cours...*`, `Deleting current roles...`));

            for (const role of message.guild.roles.values()){
                try {
                    await role.delete()
                    await new Promise(r => setTimeout(r, 500))    
                } catch { false }
            }
            backup.load(args[1], message.guild).catch(() => false);
        }
        return message.edit(client.language(`*Aucun id de backup trouvé pour \`${args[1] || "rien"}\`.*`, `*No backup id found for \`${args[1] || "rien"}\`.*`))
    }

    else if (args[0] === "info"){
        if (fs.existsSync(`./backups/${client.user.id}/serveurs/${args[1]}.json`)){
            const backupData = require(`../../backups/${client.user.id}/serveurs/${args[1]}.json`)

            message.edit(client.language(`***__› Stealy - Backup__*** <a:star:1345073135095123978>

> \`Serveur\` › *${backupData.name}*
> \`Serveur ID\` › *${backupData?.id}*
> \`Icon du Serveur\` › *${backupData.icon ?? `[\`Lien de l'image\`](${backupData.iconURL})` ?? `\`Aucune\``} *
> \`Bannière du serveur\` › *${backupData.banner ?? `[\`Lien de l'image\`](${backupData.bannerURL})` ?? `\`Aucune\``} *
> \`Bannière d'Invitation\`
-# ➜ ***${backupData.splash ?? backupData.splashURL ?? 'Aucune'} ***
> \`Taille du fichier\`
-# ➜ ***${Number((backupData.size / 1024).toFixed(2))}kb***
> \`Créé\`
-# ➜ ***<t:${Math.round(backupData.createdTimestamp / 1000)}:R>***`.replaceAll("      ", ""),
    
    `<:star:1262311834019696682> __**Stealy - Backup**__ <:star:1262311834019696682>

> \`Server\`
-# ➜ ***${backupData.name}***
> \`Server ID\`
-# ➜ ***${backupData?.id}***
> \`Server's Icon\`
-# ➜ ***${backupData.icon ?? backupData.iconURL ?? "Nothing"} ***
> \`Server's Banner\`
-# ➜ ***${backupData.banner ?? backupData.bannerURL ?? "Nothing"} ***
> \`Server's Splash\`
-# ➜ ***${backupData.splash ?? backupData.splashURL ?? 'Nothing'} ***
> \`File Size\`
-# ➜ ***${Number((backupData.size / 1024).toFixed(2))}kb***
> \`Created\`
-# ➜ ***<t:${Math.round(backupData.createdTimestamp / 1000)}:R>***`))
        }
        else if (fs.existsSync(`./backups/${client.user.id}/emojis/${args[1]}.json`)){
            const backupData = require(`../../backups/${client.user.id}/emojis/${args[1]}.json`)
            const size = fs.statSync(`./backups/${client.user.id}/emojis/${args[1]}.json`)

            message.edit(client.language(`<:star:1262311834019696682> __**Stealy - Backup**__ <:star:1262311834019696682>
> \`Serveur\`
-# ➜ ***${backupData.name}***
> \`Serveur ID\`
-# ➜ ***${backupData?.id}***
> \`Nombre d'emojis\`
-# ➜ ***${backupData.size}***
> \`Taille du fichier\`
-# ➜ ***${Number((size / 1024).toFixed(2))}kb***
> \`Créé\`
-# ➜ ***<t:${Math.round(backupData.createdTimestamp / 1000)}:R>***`.replaceAll("      ", ""),
                    
                    `<:star:1262311834019696682> __**Stealy - Backup**__ <:star:1262311834019696682>
> \`Server\`
-# ➜ ***${backupData.name}***
> \`Server ID\`
-# ➜ ***${backupData?.id}***
> \`Emoji's Size\`
-# ➜ ***${backupData.size}***
> \`File Size\`
-# ➜ ***${Number((size / 1024).toFixed(2))}kb***
> \`Created\`
-# ➜ ***<t:${Math.round(backupData.createdTimestamp / 1000)}:R>***`))                
        }
        else return message.edit(client.language(`*Aucun id de backup trouvé pour \`${args[1] || "rien"}\`.*`, `*No backup id found for \`${args[1] || "rien"}\`.*`))
    }

    else if (args[0] === "list" || args[0] === "l"){
        const backups = fs.readdirSync(`./backups/${client.user.id}/serveurs`).map((f) => f.split('.')[0])
        const emojis = fs.readdirSync(`./backups/${client.user.id}/emojis`).map((f) => f.split('.')[0])

        let backupServeurs = [];
        let backupEmojis = [];

        for (let i = 0; i < backups.length; i++) {
            const fetchingBackup = require(`../../backups/${client.user.id}/serveurs/${backups[i]}.json`)
            backupServeurs.push(fetchingBackup)
        }

        for (let i = 0; i < emojis.length; i++) {
            const fetchingBackup = require(`../../backups/${client.user.id}/emojis/${emojis[i]}.json`)
            backupEmojis.push(fetchingBackup)
        }
            
        const Serveurs = (await Promise.all(backupServeurs.sort(function (a, b) {
            return a.name.localeCompare(b.name)
        }).map((e) => `> \`${e.name}\`
-# ➜ \`${e.id}\``))).join('\n')

        const Emojis = (await Promise.all(backupEmojis.sort(function (a, b) {
            return a.name.localeCompare(b.name)
        }).map((e) => `> \`${e.name}\`
-# ➜ \`${e.code}\``))).join('\n')

        return message.edit(client.language(`\n***Servs***\n${Serveurs.length === 0 ? "Aucun" : Serveurs}\n\n***Emotes***\n${Emojis.length === 0 ? "Aucune" : Emojis}`,`\n***Servers***\n${Serveurs.length === 0 ? "None" : Serveurs}\n\n***Emotes***\n${Emojis.length === 0 ? "None" : Emojis}`))
    }

    else if (args[0] === "delete"){
        if (fs.existsSync(`./backups/${client.user.id}/serveurs/${args[1]}.json`)){
            fs.unlink(`./backups/${client.user.id}/serveurs/${args[1]}.json`, async err => {
                if (err) return message.edit(client.language(`*Aucune backup de trouvée avec cet ID.*`, '*No backup found with this ID.*'))
                else return message.edit(client.language('*La backup a été supprimée.*', '*The backup has been deleted.*'))
            })
        }
        else if (fs.existsSync(`./backups/${client.user.id}/emojis/${args[1]}.json`)){
            fs.unlink(`./backups/${client.user.id}/emojis/${args[1]}.json`, async err => {
                if (err) return message.edit(client.language(`*Aucune backup de trouvée avec cet ID.*`, '*No backup found with this ID.*'))
                else return message.edit(client.language('*La backup a été supprimée.*', '*The backup has been deleted.*'))
            })
        }
        else return message.edit(client.language(`*Aucun id de backup trouvé pour \`${args[1] || "rien"}\`.*`, `*No backup id found for \`${args[1] || "rien"}\`.*`))
    }

    else if (args[0] === "emoji" && args[1] === "clear"){
        const backups = fs.readdirSync(`./backups/${client.user.id}/emotes`)
        if (backups.length === 0) return message.edit(client.language(`*Vous n'avez aucune backup.*`, `*You didn't have any backup.*`))
            
        message.edit(client.language(`*Voulez vous vraiment supprimer toutes vos backups d'emojis ?*\n*Annulation: <t:${Math.round((Date.now() + 1000 * 60) / 1000)}:R> *`, `*Do you really want to delete all your backups*\n*Canceling: <t:${Math.round((Date.now() + 1000 * 60) / 1000)}:R> *`))

        const c = await message.channel.awaitMessages(m => m.author?.id === client.user?.id, { time: 1000 * 60, max: 1 }).catch(() => false)
        if (c?.first().content !== `${client.db.prefix}confirm` && c?.first().content !== `${client.db.prefix}confirmer`) return;
        
        backups.forEach(b => fs.unlink(`./backups/${client.user.id}/emojis/${b}`))
        message.edit(client.language(`*Vos backups ont été supprimées.*`, `*Your backup has been deleted.*`))
    }

    else if (args[0] === "clear"){
        const backups = fs.readdirSync(`./backups/${client.user.id}/serveurs`)
        if (backups.length === 0) return message.edit(client.language(`*Vous n'avez aucune backup.*`, `*You didn't have any backup.*`))
                
        message.edit(client.language(`*Voulez vous vraiment supprimer toutes vos backups de serveurs ?*\n*Annulation: <t:${Math.round((Date.now() + 1000 * 60) / 1000)}:R> *`, `*Do you really want to delete all your backups\n*Canceling: <t:${Math.round((Date.now() + 1000 * 60) / 1000)}:R> *`))
            const c = await message.channel.awaitMessages(m => m.author.id === client.user.id, { time: 1000 * 60, max: 1 }).catch(() => false)
        if (c?.first().content !== `oui` && c?.first().content !== `yes`) return message.delete();
            
        c.first().delete()
        
        backups.forEach(b => fs.unlinkSync(`./backups/${client.user.id}/serveurs/${b}`))
        message.edit(client.language(`*Vos backups ont été supprimées*`, `*Your backup has been deleted*`))
    }
}}

function makeid(length){
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
      result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
      );
  }
  return result;
}