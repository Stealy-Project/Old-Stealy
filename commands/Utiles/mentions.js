module.exports = {
    name: "mentions",
    run: async (client, message, args) => {
        
        const messages = []
        const msg = client.ment.get(message.channel.id)
        if (!msg) return message.edit(client.language("Aucun message d'enregistré", "No message saved"))

        let number = parseInt(args[0]) || 1
        if (isNaN(number) || number > 5 || number < 1) number = 1

        for (let i = 0; i < number; i++){
            if (!msg[i]) return;

            messages.push(client.language(`> ***Auteur :*** ${msg[i].author}
> ***Message :** ${msg[i].content}
> ***Image :** ${msg[i].image ? `[\`Lien de l'image\`](${msg[i].image})` : "\`Aucune Image\`"}
> ***Date :** <t:${parseInt(msg[i].date / 1000, 10)}:R>`,
`> ***Author :*** ${msg[i].author}
> ***Content :*** ${msg[i].content}
> ***Image :*** ${msg[i].image ? `[\`Lien de l'image\`](${msg[i].image})` : "\`Aucune Image\`"}
> ***Date :*** <t:${parseInt(msg[i].date / 1000, 10)}:R>`))
        }

        message.edit(messages.map(r => r).join('\n\n'))
    }
}