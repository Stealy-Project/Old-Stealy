module.exports = {
    name: "savechat",
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || client.channels.get(args[0]) || message.channel;
        if (!channel) return message.edit(client.language("*Aucun salon de trouvé.*", "*No channel found.*"));

        message.delete().catch(() => false);

        let number = parseInt(args[1]) || Infinity;

        async function fetchAll() {
            let messages = [];
            let lastID;
            while (true) { 
                const fetchedMessages = await channel.fetchMessages({
                    limit: 100,
                    ...(lastID && { before: lastID }),
                });
                if (fetchedMessages.size === 0) {
                    messages = messages.filter(msg => !msg.author?.bot);
                    return messages;
                }
                messages = messages.concat(Array.from(fetchedMessages.values()));
                lastID = fetchedMessages.lastKey();
            }
        }

        const allMessages = await fetchAll().then(a => a.reverse());
        const results = allMessages.slice(allMessages.length - number, allMessages.length)
            .map(msg => `Author : ${msg.author.username}\nContent : ${msg.content}\nDate : ${formatDateWithTime(msg.createdTimestamp)}\nAttachments : ${msg.attachments.size > 0 ? msg.attachments.first().url : "None"}\n-\n`)
            .join('\n');

        message.channel.send('', {
            files: [{
                attachment: Buffer.from(results, 'utf-8'),
                name: `savechat-${channel.id}.txt`
            }]
        });
    }
};

function formatDateWithTime(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
