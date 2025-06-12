const langues = [ "fr", "en" ]

module.exports = {
    name: "setlang",
    run: async (client, message, args) => {    
        switch(args[0]){
            default: return message.edit(client.language(`*Veuillez écrire \`en\` ou \`fr\` après la commande.*`, `*Write \`en\` or \`fr\` after the command.*`))
        
            case "en":
                client.db.langue = "en"
                client.save()
                message.edit(client.language("*Le language du bot a été mis sur `english`.*", "*The language of the bot has been set to `english`.*"))
                break

            case "fr":
                client.db.langue = "fr"
                client.save()
                message.edit(client.language("*Le language du bot a été mis sur `français`*", "*The language of the bot has been set to `français`*"))
                break
        }
    }
}