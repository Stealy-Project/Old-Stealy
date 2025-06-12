module.exports = {
    name: "deepfry",
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
        
        try {
            message.edit(client.language(`*Veuillez patienter pendant que je frit l'image.*`, `*Please wait while the image is being deepfried.*`));
            let response = await fetch(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${encodeURIComponent(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096`)}`);
            let data = await response.json();
            if (data.success) {
                message.edit(client.language(`*[${user.username} est frit](${data.message}) *`, `*[${user.username} is deepfried](${data.message}) *`));
            } else {
                message.edit(client.language(`Erreur lors de la génération de l'image`, `Error generating the image`));
            }
        } catch (err) {
            message.edit(client.language(`Erreur API`, `API Error`));
        }
    }
};
