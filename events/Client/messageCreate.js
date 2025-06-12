const fs = require('node:fs')

module.exports = {
    name: "message",
    once: false,
    run: async (message, client) => {

        if (message.author?.id === client.user.id) client.db.messagecount = client.db.messagecount+1
        
        if (message.author?.id !== client.user.id) return;
        if (message.guild?.id === client.config.guildid) return;
        if (message.content === `<@${client.user.id}>`) message.edit(`***› Prefix Stealy :*** *\`${client.db.prefix}\`*`)

        const dirs = [
            `./backups`, 
            `./backups/${client.user.id}`, 
            `./backups/${client.user.id}/serveurs`, 
            `./backups/${client.user.id}/emojis`
        ]
    
        if (!fs.existsSync(`./db/${client.user.id}.json`)) return fs.writeFileSync(`./db/${client.user.id}.json`, fs.readFileSync("./db/exemple.json"))
            
        dirs.forEach(d => {
            if (!fs.existsSync(d)) fs.mkdirSync(d)
        })
    
        const prefix = client.db.prefix || "&"
        if (!message.content.startsWith(prefix)) return;
    
        const args = message.content.slice(prefix.length).trim().split(/ +/g);            
        const commandFile = client.commands.get(args.shift().toLowerCase())
        
        if (commandFile){
            commandFile.run(client, message, args)
            if (client.db.time !== 0) setTimeout(() => message.delete().catch(() => false), client.db.time)
        }
    }
}