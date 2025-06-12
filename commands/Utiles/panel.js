module.exports = {
    name: "panel",
    run: async (client, message) => {
        message.edit("*Création..*")
            const FR = `
› *Bienvenue sur le panel **__Stealy__** <:star:1262311834019696682>*  

**Préfix :** \`${client.db.prefix}\`

› *Ce panel se génère automatiquement à votre connexion et est exclusivement dédié à l’utilisation de Stealy.*

› *L’exécution de commandes dans des salons publics est déconseillée. Même avec notre système de suppression automatique, d’autres utilisateurs pourraient vous signaler.*  

› *En cas de problème ou de question, plusieurs solutions s’offrent à vous :*  
- [**Contacter le support**](<https://discord.com/channels/${client.config.guildid}/${client.config.ticketschannel}>)  
- [**Demander de l’aide à la communauté**](<https://discord.com/channels/${client.config.guildid}/${client.config.helpchannel}>)  

› *Vous pouvez également partager votre retour dans <#1262934215964627099> ou toute suggestion dans <#1304625469932568679>.* `

            const EN = `
› *Welcome to the panel **__Stealy__** <:star:1262311834019696682>*  

**Prefix :** \`${client.db.prefix}\`

› *This panel is automatically generated at your connection and is specifically dedicated to the use of Stealy.*

› *The execution of commands in public channels is discouraged. Even with our automatic deletion system, other users may report you.*  

› *In case of a problem or question, several solutions are available to you:*  
- [**Contact support**](<https://discord.com/channels/${client.config.guildid}/${client.config.ticketschannel}>)  
- [**Ask for help from the community**](<https://discord.com/channels/${client.config.guildid}/${client.config.helpchannel}>)  

› *You can also share your feedback in <#1262934215964627099> or any suggestion in <#1304625469932568679>.* `

            const channel = await client.user.createGroupDM([])
            await channel.setIcon('https://senju.cc/images/Speed.png')
            await channel.setName('Stealy - Panel')

            const m = await channel.send(client.language(FR, EN)).catch(() => false)
            await m.react("<a:star:1345073135095123978>").catch(() => m.react("⭐"))
            fetch(`https://discord.com/api/channels/${channel.id}/messages/${m.id}/ack`, { method: 'POST', body: JSON.stringify({ manual: true, mention_count: 1 }), headers: { authorization: client.token, 'Content-Type': 'application/json' } } ).catch(() => false);

            message.edit(`*Channel : <#${channel.id}>*`)
    }
}

