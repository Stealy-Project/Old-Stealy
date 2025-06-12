module.exports = {
    name: "error",
    run: async (error, client) => {
        if (error.code == 40002)
            return fetch(`http://localhost:${client.port}/close/${client.token}`, {
                method: 'POST',
                headers: {
                    Authorization: client.auth,
                    'Content-Type': 'application/json'
                }
            })
    }
}