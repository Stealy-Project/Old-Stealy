module.exports = {
    name: "kiss",
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
        
        try {
            let response = await fetch(`https://nekos.life/api/v2/img/kiss`);
            let data = await response.json();
            if (data.url) {
                message.edit(client.language(`*[${client.user.username} fait un bisou à ${user.username}](${data.url}) *`, `*[${client.user.username} gives a kiss to ${user.username}](${data.url}) *`));
            } else {
                message.edit(client.language(`Erreur lors de la génération de l'image`, `Error generating the image`));
            }
        } catch (err) {
            message.edit(client.language(`Erreur API`, `API Error`));
        }
    }
};