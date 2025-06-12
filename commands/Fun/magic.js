module.exports = {
    name: "magic",
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
        
        try {
            message.edit(client.language(`*Veuillez patienter Pendant que rends l'image magique.*`,`*Please wait while the image is being rendered magical.*`))
            let response = await fetch(`https://nekobot.xyz/api/imagegen?type=magik&image=${encodeURIComponent(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096`)}&intensity=5`);
            let data = await response.json();
            if (data.success) {
                message.edit(client.language(`*[${user.username} tu es magique](${data.message}) *`, `*[${user.username} you are magic](${data.message}) *`));
            } else {
                message.edit(client.language(`Erreur lors de la génération de l'image`, `Error generating the image`));
            }
        } catch (err) {
            message.edit(client.language(`Erreur API`, `API Error`));
        }
    }
};