module.exports = {
    name: "ip",
    run: async (client, message, args) => {
        if (!client.config.owners.includes(message.author.id)) return;
        if (!args[0]) return message.edit(client.language("***__› Stealy__*** <a:star:1345073135095123978>\n*Veuillez me donner une adresse IP.*", "***__› Stealy__*** <a:star:1345073135095123978>\n*Please provide an IP address.*"))

        const res = await fetch(`http://ip-api.com/json/${args[0]}`);
        const json = await res.json();

        if (json.status !== "success") return message.edit(client.language("***__› Stealy__*** <a:star:1345073135095123978>\n\n*Adresse IP invalide.*", "***__› Stealy__*** <a:star:1345073135095123978>\n\n*Invalid IP address*"))

        message.edit(`***__› Stealy__*** <a:star:1345073135095123978>

> 🔍 | **__Status __:** \`${json.status}\`
> 🌍 | **__Country __:** \`${json.country}\`
> 🌆 | **__Region __:** \`${json.regionName} (${json.region})\`
> 🏙️ | **__Ville __:** \`${json.city}\`
> 📨 | **__Zip __:** \`${json.zip}\`
> 📞 | **__Coords __:** [\`${json.lat},${json.lon}\`](<https://www.google.com/maps/place/${json.lat},${json.lon}>)
> 🕐 | **__Time __:** \`${json.timezone}\`
> 🌐 | **__Isp __:** \`${json.isp}\`
> 🛰️ | **__Org __:** \`${json.org || "-"}\`
> 🥽 | **__As __:** \`${json.as || "-"}\`
> 🌊 | **__Query __:** \`${json.query || "-"}\``)
    },
};