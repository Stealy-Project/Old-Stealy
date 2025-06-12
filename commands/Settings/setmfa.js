module.exports = {
    name: "setmfa",
    run: async (client, message, args) => {
        if (!["key", "psw"].includes(args[0])) message.edit(client.language(`Argument invalide utilisez \`key / psw\` pour définir votre methode.`, `Invalid argument use key or psw to define your method.`));
    
        switch (args[0]) {
            case "key":
                if (!args[1]) return message.edit(client.language(`*Veuillez entrer une clé d'A2F valide.*`, `*Please enter a valid MFA key.*`))
                client.db.mfa.type = "totp"
                client.db.mfa.key = args[1]
                client.save()
                message.edit(client.language(`*Votre clé d'A2F a été Mise à jour.*`, `*Your MFA key has been updated.**`));
                break;

            case "psw":
                if (!args[1]) return message.edit(client.language(`*Veuillez entrer un mot de passe valide.*`, `*Please enter a valid password.*`))
                client.db.mfa.type = "password"
                client.db.mfa.key = args[1]
                client.save()
                message.edit(client.language(`*Votre mot de passe a été mis a jour*`, `*Your password has been updated.*`));
                break;
        }
    }
}