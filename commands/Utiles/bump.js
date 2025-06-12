module.exports = {
    name: "bump",
    run: async (client, message, args) => {

        if (!args[0]) return message.edit(client.language(`*Merci de fournir l'identifiant du salon de bump.*\n*\`${client.db.prefix}bump 1218937458016780412 + ${client.db.prefix}bump on/off\`*`, `*Please provide the bump channel ID.*\n*\`${client.db.prefix}bump 1218937458016780412 + ${client.db.prefix}bump on/off\`*`));
        
        if (args[0] === "on") {
            
            client.db.autobump = true;
            client.save();
            message.edit(client.language("*L'autobump est maintenant activé.*", "*Autobump is now enabled.*"));
        } 
        
        else if (args[0] === "off") {

            client.db.autobump = false;
            client.save();
            message.edit(client.language("*L'autobump est maintenant désactivé.*", "*Autobump is now disabled.*"));
        }
        else {
            if (!args[0]){
                client.db.bumpchannel = null;
                client.save();
        
                message.edit(client.language(`*Le salon de bump a été supprimé.*`, `*The bump channel has been deleted.*`));

            }
            else {
                const channel = message.mentions.channels.first() || message.guild.channels.get(args[0])
                if (!channel) return message.edit(client.language("*L'identifiant du salon n'est pas valide.*", "*The channel ID is not valid.*"));
                    
                client.db.bumpchannel = args[0];
                client.save();
        
                message.edit(client.language(`*Le salon de bump a été défini dans ${channel}.*`, `*The bump channel has been set to ${channel}.*`));
            }
        }
    }
};