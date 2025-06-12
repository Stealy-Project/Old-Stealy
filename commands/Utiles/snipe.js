module.exports = {
    name: "snipe",
    run: async (client, message, args) => {
        let msg = client.snipes.get(message.channel.id)?.reverse();
        if (!msg) return message.edit(client.language("*Aucun message d'enregistré.*", "*No message saved.*"));

        let number = parseInt(args[0]) || 1;
        if (isNaN(number) || number < 1) number = 1 

        const snipe = msg[number - 1];
        if (!snipe) message.edit(client.language(`*Aucun message Trouvé.*`, `*No message found.*`));

        message.edit(client.language(`> ***Auteur :*** ${snipe.author}
> ***Message :*** ${snipe.content}
> ***Image :*** ${snipe.image ? `[\`Lien de l'image\`](${snipe.image})` : "\`Aucune Image\`"}
> ***Date :*** <t:${parseInt(snipe.date / 1000, 10)}:R>
> ***Page :*** \`${number}/${client.snipes.get(message.channel.id).length}\``,
`> ***Author :*** ${snipe.author}
> ***Content :*** ${snipe.content}
> ***Image :*** ${snipe.image ? `[\`Image link\`](${snipe.image})` : "\`No Image\`"}
> ***Date :*** <t:${parseInt(snipe.date / 1000, 10)}:R>
> ***Page :*** \`${number}/${client.snipes.get(message.channel.id).length}\``));
    }
}