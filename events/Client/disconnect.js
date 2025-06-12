module.exports = {
    name: "disconnect",
    once: false,
    run: async (client) => {
        console.log("Connexion perdue ! Reconnexion...")
    }
}