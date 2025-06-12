module.exports = {
    name: "settings",
    run: async (client, message) => {

        message.edit(client.language(`***___› Stealy - Settings___*** <a:star:1345073135095123978>

\`${client.db.prefix}restart\` › *Redémarre stealy*
\`${client.db.prefix}notif <on/off>\` › *Gérer les notifications*

\`${client.db.prefix}setprefix <prefix>\` › *Défini un nouveau préfix*
\`${client.db.prefix}twitchurl <text>\` › *Défini le pseudo twitch*

\`${client.db.prefix}nitrosniper <on/off>\` › *Activer / désactiver le sniper nitro*
\`${client.db.prefix}autologs\` › *Vous mets des logs*

\`${client.db.prefix}spoof <mobile/desktop/console/web/android>\` › *Spoof la plateforme de Stealy*
\`${client.db.prefix}setlang <fr/en>\` › *Changer la langue du bot*`,
`***___› Stealy - Settings___*** <a:star:1345073135095123978>

\`${client.db.prefix}restart\` › *Restart Stealy*
\`${client.db.prefix}notif <on/off>\` › *Manage notifications*

\`${client.db.prefix}setprefix <prefix>\` › *Define a new prefix*
\`${client.db.prefix}twitchurl <text>\` › *Define the twitch username*

\`${client.db.prefix}nitrosniper <on/off>\` › *Activate / deactivate nitro sniper*
\`${client.db.prefix}setlang <fr/en>\` › *Change the language of the bot*

\`${client.db.prefix}rpcsettings\` › *RPC settings*
\`${client.db.prefix}settings\` › *Current settings*

\`${client.db.prefix}autologs\` › *Put logs on a server*
\`${client.db.prefix}spoof <mobile/desktop/console/web/android>\` › *Spoof the platform of Stealy*`))
    }
}