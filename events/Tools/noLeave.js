module.exports = {
    name: "channelRecipientRemove",
    once: false,
    run: async (channel, user, client) => {
        if (client.db.antigroup.noleave.includes(channel.id)) fetch(`https://discord.com/api/v9/channels/${channel.id}/recipients/${user.id}`, { method: "PUT", headers: { 'Authorization': client.token }}).catch(() => false)
    }
}