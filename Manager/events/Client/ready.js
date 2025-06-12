const colors = require('gradient-string');
const { REST } = require('@discordjs/rest');
const { Routes, Client } = require('discord.js');
const fs = require('node:fs');
const commands = [];
let i = 0;

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
    */
    run : async client => {

        console.log(colors.cristal("+-----------------------+\n"))
        console.log(colors.cristal(`> [BOT] ${client.user.username} [1] [${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}]\n`))        
        for (const folder of fs.readdirSync(`./Manager/commands`).map(r => r)){
            const files = fs.readdirSync(`./Manager/commands/${folder}`).filter(f => f.endsWith(".js"))
            for (const file of files){
                const f = require(`../../commands/${folder}/${file}`)
                if (f.data) commands.push(f.data)
            }
        }

        const rest = new REST({ version: '10' }).setToken(client.token);
        rest.put(Routes.applicationCommands(client.user.id), { body: commands })

        setInterval(() => {
            const channel = client.channels.cache.get('1263246961839181968')
            if (channel) channel.setName(`・Users : ${channel.guild.members.cache.filter(m => m.roles.cache.has(client.config.wlrole)).size}/${channel.guild.memberCount}`)

            const status = [
                `〃${client.config.SenjuUsers.length} Clients`,
                `〃stealy.cc`
            ];

            client.user.setActivity({ name: status[i], type: 1, url: "https://twitch.tv/senju_cc" })
            i++
            
            if (i >= status.length) i = 0
        }, 1000 * 60);
    }
}