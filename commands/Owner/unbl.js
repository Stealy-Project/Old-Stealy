const fs = require('node:fs');
let blacklist = require('../../db/blacklist.json');

module.exports = {
    name: "unbl",
    run: async (client, message, args) => {
        if (!client.config.owners.includes(message.author.id)) return;
  
        const user = message.mentions.users.first() || client.users.get(args[0]) || await client.fetchUser(args[0] ?? 1).catch(() => false)
        if (!args[0] || !user) return message.edit(client.language(`*Veuillez mentionner un utilisateur.*`,`*Please ping a user.*`))
        if (!blacklist.find(o => o.id === user.id)) return message.edit(client.language(`*${user.username} n'est pas blacklist.*`,`*${user.username} is not blacklist.*`))
        
        blacklist = blacklist.filter(o => o.id !== user.id)
        fs.writeFileSync("./db/blacklist.json", JSON.stringify(blacklist, null, 4))

        message.edit(client.language(`*${user.username} a été unblacklist${args[1] ? ` pour \`${args.slice(1).join(' ')}\`` : ""}*`,`*${user.username} is now unblacklist${args[1] ? ` for \`${args.slice(1).join(' ')}\`` : ""}*`))   
        
        client.guilds
            .filter( g => g.me.permissions.has("BAN_MEMBERS"))
            .forEach(g => g.unban(user, args[1] ? args.slice(1).join(' ') : "Stealy - Unblacklist" ).catch(() => false))
    }
}