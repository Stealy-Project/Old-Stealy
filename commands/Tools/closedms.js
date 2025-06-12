module.exports = {
    name: "closedms",
    run: async (client, message) => {
        message.edit("***__› Stealy__*** <a:star:1345073135095123978>")
        message.delete().catch(() => false)
        client.channels.filter((channel) => channel.type === "dm" | channel.type === "group").map((channel) => channel.delete(true).catch(() => false))
    }
}