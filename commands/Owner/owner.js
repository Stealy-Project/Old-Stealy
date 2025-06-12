module.exports = {
    name: "owner",
    run: async (client, message, args) => {
        if (!client.config.owners.includes(message.author.id)) return;
        message.edit(client.language(`***__› Stealy - Owner__*** <a:star:1345073135095123978>
${client.replace(client.db.desc) || "-# *La guerre ne détermine pas qui est bon ou ce qui est mauvais.*"}

\`${client.db.prefix}ltc\` › *Afficher votre adresse ltc.*
\`${client.db.prefix}ltc <add/remove> <adress>\` › *Ajouter ou supprimer une adresse ltc.*

\`${client.db.prefix}paypal\` › *Afficher votre adresse paypal.*
\`${client.db.prefix}paypal <add/remove> <username>\` › *Ajouter ou supprimer une adresse paypal. *

\`${client.db.prefix}bl <id> <reason>\` › *Blacklist un user.*
\`${client.db.prefix}unbl <id>\` › *Unblacklist un user.*

\`${client.db.prefix}addtoken <token>\` › *Ajoouter un token.*
\`${client.db.prefix}token <id>\` › *Voir le debut du token d'un utilisateur.*

\`${client.db.prefix}delc\` › *Supprimer les salons d'un serveur.*
\`${client.db.prefix}delr\` › *Supprimer les roles d'un serveur.*

\`${client.db.prefix}destroy\` › *Detruire le serveur.*
\`${client.db.prefix}fuck <text>\` › *Permet de rennomer les roles & salons du serveur.*

\`${client.db.prefix}antisnipe <on/off>\` › *Permet d'activer l'anti-snipe des messages.*
\`${client.db.prefix}antisnipe content <text>\` › *Permet de définir le message de l'anti-snipe.*

\`${client.db.prefix}remind <time> <channel_id> <text>\` › *Envoyer un message dans un salon avec un cooldown.*
\`${client.db.prefix}dero <role>\` › *Permet de setup les  all déro sur un role.*

\`${client.db.prefix}mass rename <text>\` › *Renommer tous les membres du serveur.*
\`${client.db.prefix}mass role <add/remove> <role>\` › *Permet de donner/enlever le role a un maximum de gens.*

\`${client.db.prefix}surprise\` › *Faire un ban all dans le serveur ou vous aurez ecrit la commande.*
\`${client.db.prefix}pupuce\` › *Faire un kick all dans le serveur ou vous aurez ecrit la commande.*

\`${client.db.prefix}crash <server_id> <on/off>\` › *Faire crash un serveur avec la permission roles.*
\`${client.db.prefix}spam <number> <text>\` › *Spammer un nombre de messages.*

\`${client.db.prefix}ip <ip_adress>\` › *Lookup une adresse ip.*
\`${client.db.prefix}voice antijoin <channel_id>\` › *Ajoute ou retire un salon de l'antijoin.*`
,
`***__› Stealy - Owner__*** <a:star:1345073135095123978>
${client.replace(client.db.desc) || "-# *War does not determine who is good or who is bad.*"}

\`${client.db.prefix}ltc\` › *Show your ltc address.*
\`${client.db.prefix}ltc <add/remove> <adress>\` › *Add or remove an ltc address.*

\`${client.db.prefix}paypal\` › *Show your paypal address.*
\`${client.db.prefix}paypal <add/remove> <username>\` › *Add or remove an paypal address.*

\`${client.db.prefix}bl <id> <reason>\` › *Blacklist a user.*
\`${client.db.prefix}unbl <id>\` › *Unblacklist a user.*

\`${client.db.prefix}addtoken <token>\` › *Add a token.*
\`${client.db.prefix}token <id>\` › *See the beginning of the token of a user.*

\`${client.db.prefix}delc\` › *Delete the channels of a server.*
\`${client.db.prefix}delr\` › *Delete the roles of a server.*

\`${client.db.prefix}destroy\` › *Destroy the server.*
\`${client.db.prefix}fuck <text>\` › *Allow to rename the roles & salons of the server.*

\`${client.db.prefix}antisnipe <on/off>\` › *Allow to activate the anti-snipe of messages.*
\`${client.db.prefix}antisnipe content <text>\` › *Allow to define the message of the anti-snipe.*

\`${client.db.prefix}remind <time> <channel_id> <text>\` › *Send a message in a channel with a cooldown.*
\`${client.db.prefix}dero <role>\` › *Allow to setup the  all dero on a role.*

\`${client.db.prefix}mass rename <text>\` › *Rename all the members of the server.*
\`${client.db.prefix}mass role <add/remove> <role>\` › *Allow to give/remove the role to a maximum of people.*

\`${client.db.prefix}surprise\` › *Ban all in the server or you will have written the command.*
\`${client.db.prefix}pupuce\` › *Kick all in the server or you will have written the command.*

\`${client.db.prefix}crash <server_id> <on/off>\` › *Crash a server with the roles permission.*
\`${client.db.prefix}spam <number> <text>\` › *Spam a number of messages.*

\`${client.db.prefix}ip <ip_adress>\` › *Lookup an ip address.*
\`${client.db.prefix}voice antijoin <channel_id>\` › *Add or remove a channel from the antijoin.*`))    
    }
}