module.exports = {
    name: "restart",
    run: async (client, message, args) => {
        await message.edit(client.language(`*Redémarrage terminé <t:${Math.round((Date.now() + 30000) / 1000)}:R>.*`, `*Restart finish ${Math.round((Date.now() + 30000) / 1000)}.*`))
        
        await fetch(`http://localhost:${client.port}/restart/${client.token}`, {
            method: 'POST',
            headers: {
                Authorization: client.auth,
                'Content-Type': 'application/json'
            }
        })
    }
}