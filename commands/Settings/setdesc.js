module.exports = {
    name: "setdesc",
    run: async (client, message, args) => {
        if (!args[0]){
            client.db.desc = null
            client.save()
            return message.edit(client.language(`*La description a été supprimée.*`, `*The description has been deleted.*`))
        }
        else {
            client.db.desc = args.join(' ')
            client.save()
            return message.edit(client.language(`*La description a été modifiée.*`, `*The description has been edited.*`))
        }
    }
}