const { Client, Message } = require("legend.js");

module.exports = {
    name: "paypal",
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
            if (!args[1]) return message.edit(client.language(`*Vous devez donner un lien paypal.*`, `*You must give an paypal link.*`));
            if (client.db.paypal === args[1]) return message.edit(client.language(`*Ce lien paypal existe deja.*`, `*This paypal link already exists.*`));
            client.db.paypal = args[1]
            client.save();
            message.edit(client.language(`*Adresse ajoutée.*`, `*Address added.*`));
        } else if (args[0] == "remove") {
            if (!args[1]) return message.edit(client.language(`*Vous devez fournir un lien paypal.*`, `*You must give a paypal link.*`));
            if (!client.db.paypal === args[1]) return message.edit(client.language(`*Ce lien paypal n'existe pas.*`, `*This paypal link does not exist.*`));
            client.db.paypal = null
            client.save();
            message.edit(client.language(`*Lien paypal supprimé.*`, `*Paypal link deleted.*`));
        } else {
            if (!client.db.paypal) return message.edit(client.language(`*Vous devez d'abord ajouter un lien paypal.*`, `*You must first add an paypal link.*`));
            message.edit(client.language(`*Paypal : [\`${client.db.paypal}\`](https://paypal.me/${client.db.paypal}) *`, `*Paypal : [\`${client.db.paypal}\`](https://paypal.me/${client.db.paypal}] *`));
        }
    }
}