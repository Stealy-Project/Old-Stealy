module.exports = {
    name: "antigroup",
    run: async (client, message, args) => {
        
        switch (args[0]) {
            default : return message.edit(client.language("*Argument invalide.*", "*Invalid argument.*"));
            case "silent":
                if (args[1] === "on") {
                    client.db.antigroup.status = true
                    client.db.antigroup.silent = true
                    client.save()
                    message.edit(client.language("*Tu vas quitter le groupe sans envoyer de signal.*", "*You're gonna leave the group without sending any message.*"))
                }
                if (args[1] === "off") {
                    client.db.antigroup.status = false
                    client.db.antigroup.silent = false
                    client.save()
                    message.edit(client.language("*Tu ne quitteras pas le groupe discrètement.*", "*You're gonna leave the group and sending the discord message.*"))
                }
                break;

            case "on":
                client.db.antigroup.status = true
                client.db.antigroup.textes = args[1] ? args.slice(1).join(' ') : null
                client.save()
                message.edit(client.language(`*L'anti groupes a été activé ${args[1] ? `avec comme texte suivant :\n\`${args.slice(1).join(' ')}\`` : `sans texte`}*`, `*The anti groups has been activated ${args[1] ? `with the following text:*\n\`${args.slice(1).join(' ')}\`` : "without text"}.*`))
                break;

            case "off":
                client.db.antigroup.status = false
                client.db.antigroup.textes = false
                client.save()
                message.edit(client.language("*L'anti groupes a été désactivé.*", "*The anti groups has been desactivated.*"))
                break;

            case 'wl':
                if (args[1] === "list") {
                    message.edit(client.language(`Voici la liste des utilisateurs whitelist\n${client.db.antigroup.whitelist.length == 0 ? "Aucun utilisateur" : client.db.antigroup.whitelist.map((r, i) => `\`${i + 1}\`・<@${r}> (\`${r}\`)`).join('\n')}`, `There is the anti group whitelist\n${client.db.antigroup.whitelist.length == 0 ? `\`No user\`` : client.db.antigroup.whitelist.map((r, i) => `\`${i + 1}\`・<@${r}> (\`${r}\`)`).join('\n')}`))
                } else {
                    const user = message.mentions.users.first() || client.users.get(args[1]) || await client.fetchUser(args[1] ?? 1).catch(() => false);
                    if (!user || !args[1]) return message.edit(client.language('*Aucun utilisateur de trouvé.*', '*No user found.*'))
                    if (client.db.antigroup.whitelist.includes(user.id)) return message.edit(client.language(`*${user.username} est déjà whitelist.*`, `*${user.username} is already whitelist.*`))

                    client.db.antigroup.whitelist.push(user.id)
                    client.save()
                    message.edit(client.language(`*${user.username} est maintenant whitelist.*`, `*${user.username} is now whitelist.*`))
                }
                break;

            case 'unwl':
                const user2 = message.mentions.users.first() || client.users.get(args[1]) || await client.fetchUser(args[1] ?? 1).catch(() => false);
                if (!user2 || !args[1]) return message.edit(client.language('*Aucun utilisateur de trouvé.*', '*No user found.*'))
                if (!client.db.antigroup.whitelist.includes(user2.id)) return message.edit(client.language(`*${user2.username} n'est pas whitelist.*`, `*${user2.username} is not whitelist.*`))

                client.db.antigroup.whitelist = client.db.antigroup.whitelist.filter(id => id !== user2.id)
                client.save()
                message.edit(client.language(`*${user2.username} n'est plus whitelist.*`, `*${user2.username} has been removed from the whitelist.*`))
                break;
        }
    }
}