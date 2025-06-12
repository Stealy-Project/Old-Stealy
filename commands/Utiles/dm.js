const { Client, Message } = require("legend.js");
module.exports = {
    name: "dm",
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        if (!client.db.dm) client.db.dm = { wl: [] };

        switch (args[0]) {
            default: message.edit(client.language(`***__› Stealy - Dm__*** <a:star:1345073135095123978>

\`${client.db.prefix}dm lock\` › *Permet de lock vos dms que personne puisse vous dm sauf vos amis.*
\`${client.db.prefix}dm unlock\` › *Permet de unlock vos dms que tout le monde puisse vous dm.*

\`${client.db.prefix}dm <wl/unwl> <server_id>\` › *Ajoute/Retire un serveur a la wl.*
\`${client.db.prefix}dm list\` › *Affiche les serveurs wl.*`,
                `***__› Stealy - Dm__*** <a:star:1345073135095123978>

\`${client.db.prefix}dm lock\` › *Allows you to lock your dms so only your friends can dm you.*
\`${client.db.prefix}dm unlock\` › *Allows you to unlock your dms so everyone can dm you.*

\`${client.db.prefix}dm <wl/unwl> <server_id>\` › *Add/Remove a server to the wl.*
\`${client.db.prefix}dm list\` › *Displays the servers wl.*`));
                break;

                case "lock":
                    message.edit(client.language(`Je vais lock vos dm pour \`${client.guilds.size}\` serveurs.`,`I will lock your dm for \`${client.guilds.size}\` servers.`
                    ));
                
                    (async () => {
                        for (const guild of client.guilds.values()) {
                            if (guild.id === client.config.guildid || client.db.dm.wl.includes(guild.id)) return;
                            await guild.allowDMs(false).catch(() => false);
                            await new Promise(resolve => setTimeout(resolve, 2000));
                        }
                    })();
                    break;
                
                case "unlock":
                    message.edit(client.language(`Je vais unlock vos dm pour \`${client.guilds.size}\` serveurs.`,`I will unlock your dm for \`${client.guilds.size}\` servers.`));
                
                    (async () => {
                        for (const guild of client.guilds.values()) {
                            if (guild.id === client.config.guildid || client.db.dm.wl.includes(guild.id)) return;
                            await guild.allowDMs(true).catch(() => false);
                            await new Promise(resolve => setTimeout(resolve, 2000));
                        }
                    })();
                    break;                


            case "wl":
                let fdp = client.guilds.get(args[1]);
                if (!fdp) return message.edit(client.language(`*Le serveur \`${args[1]}\` introuvable.*`, `*Server not found for \`${args[1]}\`.*`));
                if (fdp.id === client.config.guildid || client.db.dm.wl.includes(fdp.id)) return message.edit(client.language(`*Le serveur ${fdp.name} est deja dans la wl.*`, `*The server ${fdp.name} is already in the wl.*`));

                client.db.dm.wl.push(fdp.id);
                client.save();

                message.edit(client.language(`*Le serveur ${fdp.name} a bien ete ajouté a la wl.*`, `*The server ${fdp.name} has been added to the wl.*`));
                break;

            case "unwl":
                let fdp2 = client.guilds.get(args[1]);
                if (!fdp2) return message.edit(client.language(`*Serveur \`${args[1]}\` introuvable.*`, `*Server not found for \`${args[1]}\`.*`));
                if (fdp2.id === client.config.guildid || !client.db.dm.wl.includes(fdp2.id)) return message.edit(client.language(`*Le serveur ${fdp2.name} n'est pas dans la wl.*`, `*The server ${fdp2.name} is not in the wl.*`));

                client.db.dm.wl = client.db.dm.wl.filter(o => o !== fdp2.id);
                client.save();

                message.edit(client.language(`*Le serveur ${fdp2.name} a bien été retiré de la wl.*`, `*The server ${fdp2.name} has been removed from the wl.*`));
                break;

            case "list":
                if (client.db.dm.wl.length <= 0) return message.edit(client.language(`*Aucun utilisateur dans la wl.*`, `*No users in the wl.*`));

                let wl = client.db.dm.wl.map(o => `${client.guilds.get(o).name} › \`${o}\``).join("\n");
                message.edit(client.language(`*Liste des serveurs dans la wl :\n\n${wl}.*`, `*List of servers in the wl :\n\n${wl}.*`));
                break;

        }
    }
}