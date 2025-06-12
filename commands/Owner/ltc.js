const { Client, Message } = require("legend.js");

module.exports = {
    name: "ltc",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {string[]} args 
     * @returns 
     */
    run: async (client, message, args) => {
        if (!client.config.owners.includes(message.author.id)) return;
        
        if (args[0] == "add") {
            if (!args[1]) return message.edit(client.language(`*Vous devez donner une adresse LTC.*`, `*You must give an ltc adress.*`));
            if (client.db.ltc === args[1]) return message.edit(client.language(`*Cette adresse LTC existe deja.*`, `*This ltc address already exists.*`));
            client.db.ltc = args[1]
            client.save();
            message.edit(client.language(`*Adresse ajoutée.*`, `*Address added.*`));
        } else if (args[0] == "remove") {
            if (!args[1]) return message.edit(client.language(`*Vous devez fournir une adresse LTC.*`, `*You must give a LTC address.*`));
            if (!client.db.ltc === args[1]) return message.edit(client.language(`*cette adresse LTC n'existe pas.*`, `*This LTC address does not exist.*`));
            client.db.ltc = null
            client.save();
            message.edit(client.language(`*Adresse ltc Supprimée.*`, `*Ltc address deleted.*`));
        } else {
            if (!client.db.ltc) return message.edit(client.language(`*Vous devez d'abord ajouter une adresse LTC.*`, `*You must first add an LTC address.*`));
            message.edit(client.language(`*LTC : \`${client.db.ltc}\` *`, `*LTC : \`${client.db.ltc}\` *`));
        }
    }
}