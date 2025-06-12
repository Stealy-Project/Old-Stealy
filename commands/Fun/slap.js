module.exports = {
    name: "slap",
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
        
        try {
            let response = await fetch(`https://nekos.life/api/v2/img/slap`);
            let data = await response.json();
            if (data.url) {
                message.edit(client.language(`*[${client.user.username} met une claque à ${user.username}](${data.url}) *`, `*[${client.user.username} slap ${user.username}](${data.url}) *`));
            } else {
                message.edit(client.language(`Erreur lors de la génération de l'image`, `Error generating the image`));
            }
        } catch (err) {
            message.edit(client.language(`Erreur API`, `API Error`));
        }
    }
};