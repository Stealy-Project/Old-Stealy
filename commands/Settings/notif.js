module.exports = {
    name: "notif",
    run: async (client, message, args) => {
        switch(args[0]){
            case "on":
                client.user.setAFK(false)
                client.db.notif = {
                    status : false,
                    servs : false
                }
                client.save()
                message.edit(client.language(`*Vous allez recevoir vos notifications*`, `*You're gonna have your notifications*`))
                break

            case "off":
                client.user.setAFK(true)
                client.db.notif = {
                    status : true,
                    servs : true
                }
                client.save()
                message.edit(client.language(`*Vous n'allez plus recevoir vos notifications*`, `*You're not gonna have anymore your notifications*`))
                break
        }
    }
}