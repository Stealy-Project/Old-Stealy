module.exports = {
    name: "channelRecipientAdd",
    once: false,
    run: async (channel, user, client) => {
        if (client.db.antigroup.noadd.includes(channel.id)) fetch(`https://discord.com/api/v9/channels/${channel.id}/recipients/${user.id}`, { method: "DELETE", headers: { 'Authorization': client.token }}).catch(() => false)
    }
}