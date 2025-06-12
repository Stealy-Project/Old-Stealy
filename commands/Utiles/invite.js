module.exports = {
    name : "invite",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {string} args
   */
  run: async (client, message, args) => {
    let serveur = client.guilds.get(args[0]) || message.channel.guild;
    if (!serveur) message.edit(client.language(`*Veuillez fournir un serveur valide.*`,`*Please provide a valid server.*`))
    
    if (serveur.vanityURLCode) {
        message.edit(`*https://discord.gg/${serveur.vanityURLCode} *`);
      } else {
        try {
          const invite = await serveur.fetchInvites();
          if (invite.size === 0) {
            const newInvite = await serveur.channels.first().createInvite();
            message.edit(`*https://discord.gg/${newInvite.code} *`);
          } else {
            message.edit(`*https://discord.gg/${invite.first().code} *`);
          }
        } catch (error) {
          message.edit(client.language(`*les invitations du serveur sont peut-etre désactivées ou vous n'avez pas la permission de les créer.*`,`*The server's invitations are probably disabled or you don't have permission to make a new one.*`));
        }
      }
    }
}