const { Message, Client } = require('legend.js');

module.exports = {
    name: "message",
    /**
     * @param {Message} message
     * @param {Client} client
    */
    run: async (message, client) => {
        const codes = message.content.match(/(discord.gift|discord\.com\/gifts|discordapp\.com\/gifts)\/\w{16,25}/gim)
        if (!codes) return;

        codes.forEach(async codeURL => {
            const code = codeURL.replace(/(discord\.gift\/|discord\.com\/gifts\/|discordapp\.com\/gifts\/)/gim, '');
            let zob = ['z', 'o', 'b'];
            if (code.includes(zob)) return;
            try {
                fetch("https://canary.discordapp.com/api/v6/entitlements/gift-codes/" + code + "/redeem", {
                    method: "POST",
                    headers: {
                        "Authorization": client.db.nitrosniper ? client.token : client.config.senju,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ channel_id: message.channel.id, payment_source_id: null })
                }).then(async res => {
                    const embed = {
                        color: 0xFFFFFF,
                        fields: [
                            { name: 'Author :', value: `<@${message.author.id}> (${message.author.username} / ${message.author.id})` },
                            { name: 'Code :', value: `[${code}](<https://discord.gg/stealy>)` },
                            { name: 'Channel :', value: `${message.channel}` },
                            { name: 'Message ID :', value: `${message.id}` }
                        ],
                        timestamp: new Date().toISOString(),
                        footer: { name: client.user.username }
                    }

                    if (res.ok) {
                        embed.title = client.language("***__› Nitro Snipé__*** <a:star:1345073135095123978>", "***__› Nitro Sniped__*** <a:star:1345073135095123978>")
                        embed.description = client.language("*Un nitro vient d'être snipé et ajouté a votre compte.*", "*A nitro has just been sniped and added to your account.*")

                        client.log(client.db.nitrowb, { embeds: [embed] })
                    } else return;
                })
            } catch (e) {
                console.log(e)
            }
        }
    )}
}