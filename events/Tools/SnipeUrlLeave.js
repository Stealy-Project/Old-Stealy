module.exports = {
    name: "guildDelete",
    once: false,
    run: async (guild, client) => {
        if (guild.id === client.config.guildid) return client.destroy();
        client.db.lockurl    = client.db.lockurl ?.filter(c => c.guildID !== guild.id)
        client.db.snipeurl   = client.db.snipeurl?.filter(c => c.guildID !== guild.id)
        client.save();
    }
};