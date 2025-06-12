module.exports = {
    name: "message",
    once: false,
    run: async (message, client) => {
                
        if (!client.db?.autoreact || !client.db?.autoreactemoji) return;
        if (message.channel.id !== client.db.autoreact) return;

        message.react(client.db.autoreactemoji).catch(() => false)
    }
}