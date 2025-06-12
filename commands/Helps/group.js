const { Client, Message } = require('legend.js');

module.exports = {
    name: "group",
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message) => {
        message.edit(client.language(`***___› Stealy - Groupes___*** <a:star:1345073135095123978>

\`${client.db.prefix}antigroup <on/off> [texte]\` › *Activer ou désactiver l'anti-groupes.*
\`${client.db.prefix}antigroup silent <on/off>\` › *Activer ou désactiver l'anti-groupes silencieux.*
        
\`${client.db.prefix}antigroup wl <user>\` › *Autorise un utilisateur à vous ajouter dans un groupe.*
\`${client.db.prefix}antigroup unwl <user>\` › *Retire un utilisateur whitelist de l'anti-groupes.*
        
\`${client.db.prefix}antigroup wl list\` › *Liste les utilisateurs whitelist.*
\`${client.db.prefix}noadd <on/off>\` › *Activer / Désactiver la permission d'ajouter des utilisateur à votre groupe.*
\`${client.db.prefix}noleave <on/off>\` ›  *Re-ajoute les utilisateurs qui quittent le groupe (amis uniquement).*`,
`***___› Stealy - Groups___*** <a:star:1345073135095123978>
        
\`${client.db.prefix}antigroup <on/off> <text>\` › *Enable or Disable anti-group.*
\`${client.db.prefix}antigroup silent <on/off>\` › *Enable or Disable silent anti-group.*
        
\`${client.db.prefix}antigroup wl <user>\` › *Allow a user to add you to a group.*
\`${client.db.prefix}antigroup unwl <user>\` › *Remove a user whitelist from the anti-group.*
        
\`${client.db.prefix}antigroup wl list\` › *List whitelisted users.*
\`${client.db.prefix}noadd <on/off>\` › *Enable or disable the permission to add a user to your group.*
\`${client.db.prefix}noleave <on/off>\` ›  *Re-add users who leave the group (friends only).*`));
    }
}