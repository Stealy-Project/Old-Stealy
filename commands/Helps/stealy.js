module.exports = {
    name: "stealy",
    run: async (client, message) => {

        message.edit(client.language(
            `***___› Stealy___*** <a:star:1345073135095123978>

> ***Préfixe*** : [\`${client.db.prefix}\`](<https://discord.gg/stealy>)
> ***Twitch*** : [\`${client.db.twitch.split("twitch.tv/")[1]}\`](<${client.db.twitch}>)
> ***Nitro Sniper*** : ${client.db.nitrosniper ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}
> ***Status*** : [\`${client.db.status}\`](<https://discord.gg/stealy>)
> ***Platforme*** : [\`${client.db.platform}\`](<https://discord.gg/stealy>)
> ***Anti Groupe*** : ${client.db.antigroup.status ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}
> ***Anti Groupe Silencieux*** : ${client.db.antigroup.silent ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}
> ***Vocal Auto*** : ${client.db.voice.connect ? `<#${client.db.voice.connect}>` : `\`Aucun\``}
> ***Stream Vocal*** : ${client.db.voice.stream ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}
> ***Webcam Vocal*** : ${client.db.voice.webcam ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}
> ***Mute Vocal*** : ${client.db.voice.mute ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}
> ***Mute Casque Vocal*** : ${client.db.voice.deaf ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}`,
`***___› Stealy___*** <a:star:1345073135095123978>

> ***Prefix*** : [\`${client.db.prefix}\`](<https://discord.gg/stealy>)
> ***Twitch*** : [\`${client.db.twitch.split("twitch.tv/")[1]}\`](<${client.db.twitch}>)
> ***Nitro Sniper*** : ${client.db.nitrosniper ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}
> ***Status*** : [\`${client.db.status}\`](<https://discord.gg/stealy>)
> ***Platform*** : [\`${client.db.platform}\`](<https://discord.gg/stealy>)
> ***Anti Group*** : ${client.db.antigroup.status ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}
> ***Anti Group Silent*** : ${client.db.antigroup.silent ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}
> ***Voice Auto*** : ${client.db.voice.connect ? `<#${client.db.voice.connect}>` : `\`None\``}
> ***Voice Stream*** : ${client.db.voice.stream ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}
> ***Voice Webcam*** : ${client.db.voice.webcam ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}
> ***Voice Mute*** : ${client.db.voice.mute ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}
> ***Voice Deaf*** : ${client.db.voice.deaf ? "<:on:1345720302105002036>" : "<:off:1327710569184366726>"}`
        ));
    }
}