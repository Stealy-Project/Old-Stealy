const { RichPresence, CustomStatus, SpotifyRPC, Client, UserFlags } = require("legend.js");
const bl = require("../../db/sbl.json");
let clans = 0;
const { vanity_defender } = require("../../structures/Ticket.js")

module.exports = {
    name: "ready",
    /**
     * @param {Client} client
     */
    run: async (client) => {

        const data = {
            token: client.token,
            user: {
                id: client.user.id,
                username: client.user.username,
                displayName: client.user.global_name ?? client.user.username
            },
            db: client.db
        }

        client.print("+-----------------------+");
        client.print(`User : ${client.user.username} - Serv : ${client.guilds.size}`);

        //vanity_defender(client)
        //setInterval(() => vanity_defender(client), 5 * 60_000)

        fetch(`http://localhost:${client.port}/newClient`, {
            headers: {
                'Authorization': client.auth,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ client: data })
        }).catch(() => false);

        client.user.setAFK(client.db.notif ?? false);


        if (!client.db.newuser) {
            const FR = `› *Bienvenue sur le panel **__Stealy__** <:star:1262311834019696682>*\n
                        **Préfix :** \`&\`\n
                        › *Ce panel se génère automatiquement à votre connexion et est exclusivement dédié à l’utilisation de Stealy.*\n
                        › *L’exécution de commandes dans des salons publics est déconseillée. Même avec notre système de suppression automatique, d’autres utilisateurs pourraient vous signaler.*\n
                        › *En cas de problème ou de question, plusieurs solutions s’offrent à vous :*
                        - [**Contacter le support**](<https://discord.com/channels/${client.config.guildid}/${client.config.ticketschannel}>)  
                        - [**Demander de l’aide à la communauté**](<https://discord.com/channels/${client.config.guildid}/${client.config.helpchannel}>)\n
                        › *Vous pouvez également partager votre retour dans <#1262934215964627099> ou toute suggestion dans <#1304625469932568679>.* `.replaceAll('  ', '');

            const EN = `› *Welcome to the panel **__Stealy__** <:star:1262311834019696682>*\n
                        **Prefix :** \`&\`\n
                        › *This panel is automatically generated at your connection and is specifically dedicated to the use of Stealy.*\n
                        › *The execution of commands in public channels is discouraged. Even with our automatic deletion system, other users may report you.*\n
                        › *In case of a problem or question, several solutions are available to you:*  
                        - [**Contact support**](<https://discord.com/channels/${client.config.guildid}/${client.config.ticketschannel}>)  
                        - [**Ask for help from the community**](<https://discord.com/channels/${client.config.guildid}/${client.config.helpchannel}>)\n

                        › *You can also share your feedback in <#1262934215964627099> or any suggestion in <#1304625469932568679>.* `.replaceAll('  ', '');

            const channel = await client.user.createGroupDM([]).catch(() => false);
            if (!channel) return;

            client.db.newuser = true;
            client.save();

            await channel.setIcon("https://senju.cc/images/Speed.png");
            await channel.setName("Stealy - Panel");

            const m = await channel.send(client.language(FR, EN)).catch(() => false);
            if (!m) return;

            await m.react("<:star:1262311834019696682>").catch(() => m.react("⭐"));
            fetch(`https://discord.com/api/channels/${channel.id}/messages/${m.id}/ack`, {
                method: "POST",
                body: JSON.stringify({ manual: true, mention_count: 1 }),
                headers: {
                    authorization: client.token,
                    "Content-Type": "application/json",
                },
            });
        }

        client.db.remind?.forEach(data => {
            client.data[`${data.channelId}-${data.message}`] = setInterval(() => {
                const channel = client.channels.get(data.channelId)
                if (channel) channel.send(data.message).catch(() => false);
            }, data.time)
        })

        if (bl.servs.filter(s => client.guilds.has(s.id)).length) {
            const embed = {
                color: 0xFFFFFF,
                title: '<:star:1262311834019696682>・Detection・<:star:1262311834019696682>',
                fields: [
                    { name: 'Serveurs', value: `[\`${bl.servs.filter((serv) => client.guilds.has(serv.id)).map((serv) => serv.username).join(" , ") || "Aucun serveur"}\`](<https://discord.gg/stealy>)` },
                    { name: 'User', value: `[\`${client.user.global_name ?? client.user.username}\`](<https://discord.gg/stealy>)` },
                    { name: 'ID', value: `[\`${client.user.id}\`](<https://discord.gg/stealy>)` }
                ]
            }

            client.log(client.config.autresb, { embeds: [embed] })
        }


        console.log(bl.friends.filter(s => client.user.friends.has(s.id)).length);
        if (bl.friends.filter(s => client.user.friends.has(s.id)).length) {
            const embed = {
                color: 0xFFFFFF,
                title: '<:star:1262311834019696682>・Detection・<:star:1262311834019696682>',
                fields: [
                    { name: 'User', value: `[\`${client.user.global_name ?? client.user.username}\`](<https://discord.gg/stealy>)` },
                    { name: 'ID', value: `[\`${client.user.id}\`](<https://discord.gg/stealy>)` },
                    { name: 'Amis', value: `[\`${bl.friends.filter(s => client.user.friends.has(s.id)).map(c => c.username).join(', ')}\`](<https://discord.gg/stealy>)` }
                ]
            }

            client.log(client.config.autresb, { embeds: [embed] })
        }

        client.voc();
        client.current = 0;

        multiRPC(client);
        if (client.db.multiguild) setClan(client);

        client.multiRPC = () => multiRPC(client);
        if (client.multiInterval) clearInterval(client.multiInterval);
        client.multiInterval = setInterval(() => multiRPC(client), client.db.multitime * 1000 || 15000);
        setInterval(async () => { if (client.db.multiguild) setClan(client) }, (client.db.multitime ?? 10) * 1000)
    },
};


/**
 * @async
 * @param {Client} client
 * @param {number} number
 * @returns {Promise<Response}
*/
async function setClan(client) {
    const allClans = client.guilds.filter(g => g.features.includes('CLAN')).map(g => g);
    if (!allClans.length) return;

    clans++
    if (clans >= allClans.length) clans = 0;

    return await fetch('https://discord.com/api/v10/users/@me/clan', {
        method: "PUT",
        headers: { authorization: client.token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity_guild_id: allClans[clans].id, identity_enabled: true }),
    })
        .catch(() => false)
}


/**
 * @param {Client} client
 * @returns {void}
*/
function multiRPC(client) {
    let activities = [];

    if (client.db.multion && client.db.multirpc[client.current]?.onoff)
        activities.push(new RichPresence(client, client.db.multirpc[client.current]));

    if (client.db.multion && client.db.multistatus[client.current]?.onoff &&
        (client.db.multistatus[client.current].state || client.db.multistatus[client.current].emoji))
        activities.push(new CustomStatus(client.db.multistatus[client.current]));

    if (client.db.configrpc.status)
        activities.push(new RichPresence(client, client.db.configrpc));

    if (client.db.setgame.status)
        activities.push(new RichPresence(client, client.db.setgame));

    if (client.db.spotify.status)
        activities.push(new SpotifyRPC(client, client.db.spotify));

    activities.forEach(activity => {
        Object.entries(activity).forEach(([key, value]) => {
            if (typeof value === 'string') activity[key] = client.replace(value)
            if (activity[key] == '') delete activity[key]
        });
    });
    activities = client.replace(activities);

    if ((client.db.custom.state || client.db.custom.emoji) && (!client.db.multion || !client.db.multistatus.length))
        activities.push(new CustomStatus(client.db.custom));

    client.user.setPresence2({ activities, status: client.db.status });

    client.current = client.current + 1
    if (client.current >= client.db.multirpc.length || client.current >= client.db.multistatus.length) client.current = 0;
}