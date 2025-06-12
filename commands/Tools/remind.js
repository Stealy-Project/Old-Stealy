module.exports = {
    name: "remind",
    run: async (client, message, args) => {
        if (!['add', 'delete', 'list'].includes(args[0]))
            return message.edit(client.language("*Veuillez spécifier une sous-commande : `add`, `delete` ou `list`.*", "*Please use once of this arguments : `add`, `delete` or `list`.*"));

        if (!client.db.remind) client.db.remind = [];

        switch (args[0]) {
            case "add" :
                if (client.db.remind.length == 1 && !client.config.danger.includes(message.author.id)) return message.edit(client.language(`*Vous ne pouvez avoir qu'un seul remind.*`, `*You can only have one remind.*`));
                if (!args[1] || isNaN(ms(args[1]))) return message.edit(client.language(`*Utilisez un temps valide comme \`20m , 1h , 2d\`.*`,`*Please use a time format such as \`20m , 1h , 2d\`.*`));
                if (ms(args[1]) < 30 * 1000) return message.edit(client.language('*Le temps doit être supérieur à 30 secondes.*', '*The time must be higher than 30 seconds.*'));

                const channel = message.mentions.channels.first() || client.channels.get(args[2]);
                if (!channel) return message.edit(client.language(`*Aucun salon de trouvé pour \`${args[2] ?? 'rien'}\`.*`, `*No channel found for \`${args[2] ?? 'nothing'}\`.*`))

                if (!args[3]) return message.edit(client.language(`*Format invalide : \`${client.db.prefix}remind add <number> <channel> <message>\`*`,`Invalid Format : \`${client.db.prefix}remind add <number> <channel> <message>\``));

                client.db.remind.push({
                    channelId: channel.id,
                    message: args.slice(3).join(' '),
                    time: ms(args[1])
                });
                
                message.edit(client.language(`*Remind activé avec l'id : \`${client.db.remind.length}\`.*`,`*Remind activated with id : \`${client.db.remind.length}\`.*`));
				client.data[`${channel.id}-${args.slice(3).join(' ')}`] = setInterval(() => channel.send(`${args.slice(3).join(' ')}`), ms(args[1]))
                break;

            case "delete" : 
                const id = parseInt(args[1]);

                if (isNaN(args[1])) return message.edit(client.language(`*Veuillez spécifier l'ID du remind à supprimer.*`,`*Please specify the remind ID to be deleted.*`));
                if (args[1] <= 0 || args[1] > client.db.remind.length) return message.edit(client.language(`*.*`, ``))
                const data = client.db.remind[args[1]-1];

				clearInterval(client.data[`${data.channelId}-${data.message}`]);
                client.db.remind = client.db.remind.filter(r => r !== data);
                client.save();

                message.edit(client.language(`*Rappel avec l'ID \`${id}\` supprimé avec succès.*`,`Remind with id \`${id}\` successfully deleted.`));
                break;

            case "list" : 
                if (client.db.remind === 0) return message.reply("Vous n'avez aucun rappel en cours.");
                
                client.send(message, client.db.remind.map((r, i) => client.language(
                    `> *ID :* \`${i+1}\`\n` +
                    `> *Canal :* <#${r.channelId}>\n` +
                    `> *Message :* \`${r.message}\`\n` +
                    `> *Temps :* \`${ms2(r.time)}\``,
                    
                    `> *ID :* \`${i+1}\`\n` +
                    `> *Channel :* <#${r.channelId}>\n` +
                    `> *Message :* \`${r.message}\`\n` +
                    `> *Time :* \`${ms2(r.time)}\``
                )).join('\n'))
                
                break;
        }
    }
}




/**
 * Convertit du temps en millisecondes.
 * @param {number} ms - Le temps à convertir.
 * @returns {number | string} - Le temps converti ou un false si l'unité est invalide.
 */
function ms(temps) {
    const match = temps.match(/(\d+)([smhdwy])/);
    if (!match) return null;
    
    const value = parseInt(match[1]);
    const unit = match[2];
    
    switch (unit) {
        case 's': return value * 1000;
        case 'm': return value * 60 * 1000;
        case 'h': return value * 60 * 60 * 1000;
        case 'd': return value * 24 * 60 * 60 * 1000;
        case 'w': return value * 7 * 24 * 60 * 60 * 1000;
        case 'y': return value * 365 * 24 * 60 * 60 * 1000;
        default: return null;
    }
};

/**
 * Convertit des millisecondes en secondes, minutes, heures, jours ou semaines.
 * @param {number} ms - Le temps en millisecondes à convertir.
 * @returns {number | boolean} - Le temps converti ou un false si l'unité est invalide.
 */
function ms2(ms) {
    const units = [
        { name: "weeks", value: 1000 * 60 * 60 * 24 * 7 },
        { name: "days", value: 1000 * 60 * 60 * 24 },
        { name: "hours", value: 1000 * 60 * 60 },
        { name: "minutes", value: 1000 * 60 },
        { name: "seconds", value: 1000 },
    ];

    for (const unit of units) {
        if (ms >= unit.value && ms % unit.value === 0) {
            return `${ms / unit.value}${unit.name[0]}`;
        }
    }
    return `${ms}ms`;
}