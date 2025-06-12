const { Client } = require("legend.js");
const os = require('node:os');

module.exports = {
    name: "stats",
    /**
     * @param {Client} client
    */
    run: async (client, message, args) => {

        message.edit(client.language(
            `***__› Stealy - Stats__*** <a:star:1345073135095123978>

> ***Tag*** : \`${client.user.username}\`
> ***Serveurs*** : \`${client.guilds.size}\`
> ***Users*** : \`${client.config.SenjuUsers.length}\`

> ***Amis*** : \`${client.user.friends.size}\`
> ***Bloqués*** : \`${client.user.blocked.size}\`
> ***Clans*** : \`${client.guilds.filter(g => g.features.includes('CLAN')).size}\`

> ***Version Module*** : \`${process.version}\`
> ***Uptime*** : \`${uptime(client)}\`
> ***Utilisation Mémoire*** : \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\`
            
> ***Nitro*** : \`${client.user.premium ? "Oui" : "Non"}\`
> ***Numéro de Téléphone Vérifié*** : \`${client.user.mobile ? "Oui" : "Non"}\`
> ***A2F*** : \`${client.user.mfaEnabled ? "Oui" : "Non"}\`
            
> ***Messages*** : \`${client.db.messagecount}\`
> ***Messages Supprimés*** : \`${client.db.deletecount}\`
> ***Urls Snipées*** : \`${client.db.snipecount}\``,
            
            `***__› Stealy - Stats__*** <a:star:1345073135095123978>

> ***Tag*** : \`${client.user.username}\`
> ***Servers*** : \`${client.guilds.size}\`
> ***Users*** : \`${client.config.SenjuUsers.length}\`

> ***Friends*** : \`${client.user.friends.size}\`
> ***Blocked*** : \`${client.user.blocked.size}\`
> ***Clans*** : \`${client.guilds.filter(g => g.features.includes('CLAN')).size}\`

> ***Version Module*** : \`${process.version}\`
> ***Uptime*** : \`${uptime(client)}\`
> ***Memory Usage*** : \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\`
         
> ***Nitro*** : \`${client.user.premium ? "Yes" : "No"}\`
> ***Verified Phone Number*** : \`${client.user.mobile ? "Yes" : "No"}\`
> ***2FA*** : \`${client.user.mfaEnabled ? "Yes" : "No"}\`
            
> ***Messages*** : \`${client.db.messagecount}\`
> ***Deleted Messages*** : \`${client.db.deletecount}\`
> ***Sniped Urls*** : \`${client.db.snipecount}\``
        ));
    }
};


function uptime(client){
    let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        
    return `${days}j ${hours}h ${minutes}m ${seconds}s`
}