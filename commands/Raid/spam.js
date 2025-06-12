module.exports = {
    name: "spam",
    run: async (client, message, args) => {
        if (!client.config.danger.includes(message.author.id)) return;

        message.delete().catch(() => false)

        if (!args[0] || isNaN(parseInt(args[0]))) return message.channel.send(client.language("*Veuillez me donner un nombre de messages à envoyer.*", "*Please specify an amount of messages to send.*")).catch(() => false)
        if (!args[1]) return message.channel.send(client.language("*Veuillez me donner un message à envoyer.*", "*Please specify a message to send.*")).catch(() => false)

        for (let i = 0; i < parseInt(args[0]); i++) {
            message.channel.send(args.slice(1).join(" ")).catch(() => false)
        }
    },
};
