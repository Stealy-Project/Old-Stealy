module.exports = {
    name: "leave",

    run: async (client, message, args) => {

        switch (args[0]) {
            default: message.edit(client.language(`***__› Stealy - Profil__*** <a:star:1345073135095123978>

\`${client.db.prefix}leave <server/all> <server_id>\` › *Permet de quitter un / tout serveur.*
\`${client.db.prefix}leave <group/all> <channel_id>\` › *Permet de quitter un / tout groupes.*
\`${client.db.prefix}leave <server/group> list\` › *Permet d'afficher la liste des serveurs / groupes de la wl.*`,
`***__› Stealy - Profil__*** <a:star:1345073135095123978>

\`${client.db.prefix}leave <server/all> <server_id>\` › *Allows you to leave one / all server.*
\`${client.db.prefix}leave <group/all> <channel_id>\` › *Allows you to leave one / all group.*
\`${client.db.prefix}leave <server/group> list\` › *Allows you to display the list of servers / groups in the wl.*`))

            case "server":
                if (args[1] === "all") {
                    message.edit(`***__› Stealy - Profil__*** <a:star:1345073135095123978>`)
                    message.delete().catch(() => false)

                    for (const guild of client.guilds.map(g => g)) {
                        if (guild.ownerId === client.user.id || guild.id === client.config.guildid || client.db.leave.servs.includes(guild.id)) return
                        guild.leave().catch(() => false)
                        client.sleep(10000)
                    }
                } else if (args[1] === "wl") {
                    if (client.db.leave.servs.includes(args[2])) message.edit(client.language(`*Ce serveur est deja dans la wl.*`, `*This server is already in the wl.*`))

                    message.edit(client.language(`*Le serveur \`${client.guilds.get(args[2]).name || args[2]}\` a bien ete ajouté a la wl.*`, `*The server \`${client.guilds.get(args[2]).name || args[2]}\` has been added to the wl.*`))
                    client.db.leave.servs.push(args[2])
                    client.save()
                } else if (args[1] === "unwl") {
                    if (!client.db.leave.servs.includes(args[2])) message.edit(client.language(`*Ce serveur n'est pas dans la wl.*`, `*This server is not in the wl.*`))

                    message.edit(client.language(`*Le serveur \`${client.guilds.get(args[2]).name || args[2]}\` a bien ete retiré de la wl.*`, `*The server \`${client.guilds.get(args[2]).name || args[2]}\` has been removed from the wl.*`))
                    client.db.leave.servs = client.db.leave.servs.filter(id => id !== args[2])
                    client.save()
                } else if (args[1] === "list") {
                    if (client.db.leave.servs.length === 0) return message.edit(client.language(`*La wl est vide.*`, `*The wl is empty.*`))

                    message.edit(client.language(`*Voici la liste des serveurs whitelistés :*\n\n${client.db.leave.servs.map(id => `\`${client.guilds.get(id).name || id}\``).join("\n")}`, `*The list of whitelisted servers :*\n\n${client.db.leave.servs.map(id => `\`${client.guilds.get(id).name || id}\``).join("\n")}`))
                } else {
                    const guild = client.guilds.get(args[1]) || message.guild

                    if (guild.id === client.config.guildid) message.edit(client.language('*Si vous quittez le serveur de stealy vous serez automatiquement déconnectés.*', '*If you leave the Stealy server you will be automatically disconnected.*'))
                    if (guild.ownerId === client.user.id) message.edit(client.language('*Vous ne pouvez pas quitter votre serveur.*', '*Vous ne pouvez pas quitter votre serveur.*'))

                    if (!guild) message.edit(client.language(`*Aucun serveur de trouvé pour \`${args[1] || "rien"}\`*`, `*No guild found for \`${args[1] || "rien"}\`*`))

                    message.edit(`<a:star:1345073135095123978> __**Stealy**__ <a:star:1345073135095123978>`)
                    await message.delete().catch(() => false)
                    message.guild.leave().catch(() => false)
                }
                break;

            case "group":
                if (args[1] === "all") {
                    message.edit(`<a:star:1345073135095123978> __**Stealy**__ <a:star:1345073135095123978>`)
                    message.delete().catch(() => false)

                    for (const groups of client.channel.type === "group") {
                        if (client.db.leave.groups.includes(groups.id)) return
                        channel.delete(client.db.antigroup.silent).catch(() => false)
                        client.sleep(7000)
                    }
                } else if (args[1] === "wl") {
                    let groupes = client.channels.filter((channel) => channel.type === "group").map((channel) => channel.id) || message.channel;

                    if (!groupes) return message.edit(client.language('*Veuillez specifier un groupe a ajouter dans la wl.*', '*Please specify a group to add on the wl.*'))
                    if (groupes.channel.type !== "group") return message.edit(client.language(`*Ce salon n'est pas un groupe.*`, `*This channel is not a group.*`))
                    if (client.db.leave.groups.includes(args[2])) return message.edit(client.language(`*Ce groupe est deja dans la wl.*`, `*This group is already in the wl.*`))

                    message.edit(client.language(`*J'ai ajouté le groupe \`${client.channels.get(args[2]).name || ""}\` à la wl.*`, `*I added the group \`${client.channels.get(args[2]).name}\` to the wl.*`))

                    client.db.leave.groups.push(args[2])
                    client.save()

                } else if (args[1] === "unwl") {
                    let groupes = client.channels.filter((channel) => channel.type === "group").map((channel) => channel.id) || message.channel;

                    if (!groupes) return message.edit(client.language('*Veuillez specifier un groupe a ajouter dans la wl.*', '*Please specify a group to add on the wl.*'))
                    if (client.db.leave.groups.includes(args[2])) return message.edit(client.language(`*Ce groupe n'est pas dans la wl.*`, `*This group is not in the wl.*`))

                    message.edit(client.language(`*J'ai supprimé ${client.channels.get(args[2].name || "")} de la wl.*`, `*I removed ${client.channels.get(args[2].name)} from the wl.*`))

                    client.db.leave.groups = client.db.leave.groups.filter(id => id !== user2.id)
                    client.save()

                } else if (args[1] === "list") {
                    if (client.db.leave.groups.length === 0) return message.edit(client.language(`*La wl est vide.*`, `*The wl is empty.*`))

                    message.edit(client.language(`*Voici la liste des groupes whitelistés :*\n\n${client.db.leave.groups.map(id => `\`${client.channels.get(id).name || id}\``).join("\n")}`, `*The list of whitelisted groups :*\n\n${client.db.leave.groups.map(id => `\`${client.channels.get(id).name || id}\``).join("\n")}`))
                } else {
                    const groups = client.channels.get(args[1]) || message.channel
                    if (!groups || groups.type !== "group") return message.edit(client.language(`*Aucun group trouvé pour \`${args[1] || "rien"}\`*`, `*No group found for \`${args[1] || "rien"}\`*`))
                    message.edit(`<a:star:1345073135095123978> __**Stealy**__ <a:star:1345073135095123978>`)
                    await message.delete().catch(() => false)
                }
                break;
        }
    }
}