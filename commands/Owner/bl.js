const fs = require('node:fs');
const blacklist = require('../../db/blacklist.json');

module.exports = {
    name: "bl",
    run: async (client, message, args) => {
        if (!client.config.owners.includes(message.author.id)) return;

        if (args[0] === "list"){
            const arrays = diviser(blacklist)
            let first = false;
            let _ = 0;
            
            for (const array of arrays.map(r => r)) {
                const content = array.map((r, i) => { _++; return `\`${_}\` - <@${r.id}> (\`${r.id}\`) | \`${r.reason ?? "Aucune raison"}\`` });
    
                if (first) message.channel.send(content.map(r => r).join('\n')).then(m => client.db.time !== 0 ? setTimeout(() => m.delete().catch(() => false), client.db.time) : false)
                else {
                    message.edit(client.language(`*Liste des utilisateurs blacklistés :*\n\n${content.map(r => r).join('\n')}`, `List of blacklisted users :\n\n${content.map(r => r).join('\n')}`))
                    first = true
                }
            }    
        }
        else {
            const user = message.mentions.users.first() || client.users.get(args[0]) || await client.fetchUser(args[0] ?? 1).catch(() => false);
            if (!args[0] || !user) return message.edit(client.language(`*Veuillez mentionner un utilisateur.*`,`* *Please ping a user.*`))

            if (blacklist.find(o => o.id === user.id)) return message.edit(client.language(`*${user.username} est déjà blacklist.*`,`*${user.username} is already blacklist.*`))
            if (client.config.owners.includes(user.id)) return message.edit(client.language(`*Vous ne pouvez pas blacklist un owner.*`, `*You cannot blacklist an owner.*`))
                
            blacklist.push({ id: user.id, date: Date.now(), author: client.user.id, reason: args.slice(1).join(' ') || null })
            fs.writeFileSync("./db/blacklist.json", JSON.stringify(blacklist, null, 4))

            client.guilds
                .filter( g => g.me.permissions.has("BAN_MEMBERS"))
                .forEach(g => g.ban(user, { reason: `${args[1] ? args.slice(1).join(' ') : "Stealy - Blacklist"}` }).catch(() => false))

            const clients = await fetch(`http://localhost:${client.port}/getClients`, {
                method: "GET",
                headers: {
                    Authorization: client.auth,
                    'Content-Type': 'application/json'
                }
            }).then(r => r.json());
            
            const c = clients.find(c => c.user?.id === user.id)
            if (c){
                client.config.SenjuUsers.splice(client.config.SenjuUsers.indexOf(c.token), 1) 
                fs.writeFileSync("./config.json", JSON.stringify(client.config, null, 2))
        
                fetch(`http://localhost:${client.port}/close/${c.token}`, {
                    method: 'POST',
                    headers: {
                        Authorization: client.auth,
                        'Content-Type': 'application/json'
                    }
                })
            }

            message.edit(client.language(`*${user.username} a été blacklist${args[1] ? ` pour \`${args.slice(1).join(' ')}\`` : ""}.*`,`*${user.username} is blacklist${args[1] ? ` for \`${args.slice(1).join(' ')}\`` : ""}.*`))   
        }    
    }
}


function diviser(array) {
    let result = [];
    for (let i = 0; i < array.length; i += 30) {
        result.push(array.slice(i, i + 30));
    }
    return result;
}