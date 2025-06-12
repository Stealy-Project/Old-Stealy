module.exports = {
    name: "ping",
    run: async (client, message, args) => {
        const t = Date.now()
        await message.edit('***Pinging...***');
        message.edit(`*Rest : \`${Math.ceil(Date.now() - t)}ms.\`*\n*WS : \`${Math.round(client.ping)}ms.\`*`)
    }
};