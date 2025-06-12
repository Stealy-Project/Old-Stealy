module.exports = {
    name: "clearstatus",
    run: async (client, message, args) => {
        message.edit(client.language("*Le status a été supprimé.*", "*The state has been deleted.*"))

        client.db.configrpc.status = false;
        client.db.spotify.status = false;
        client.db.setgame.status = false;
        client.db.custom.status = false;
        client.db.multion = false;
        client.db.multiguild = false;
        
        client.save();
        client.multiRPC();
    }
}