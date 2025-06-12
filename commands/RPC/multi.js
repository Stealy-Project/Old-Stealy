const ms = require('ms');
const { RichPresence, Util } = require("legend.js");
const types = ["playing", "listening", "watching", "competing", "streaming"]
const platformes = ["ps5", "ps4", "xbox", "desktop", "samsung", "ios"]

module.exports = {
    name: "multi",
    run: async (client, message, args) => {

        if (!args[0]) return message.edit(client.language(`***___› Stealy - Multi___***  <a:star:1345073135095123978>

\`${client.db.prefix}multi args\` › *Affiche les arguments du multi*  

\`${client.db.prefix}multi start\` › *Permet de lancer le multi*  
\`${client.db.prefix}multi stop\` › *Permet d'arrêter le multi*  

\`${client.db.prefix}multi rpc add\` › *Permet de créer une RPC*  
\`${client.db.prefix}multi rpc edit <ID> <field> <value>\` › *Permet d'éditer une RPC précise*  
\`${client.db.prefix}multi rpc remove <ID>\` › *Retire un RPC précis*  
\`${client.db.prefix}multi rpc list\` › *Affiche la liste des RPC*  
\`${client.db.prefix}multi rpc <ID> <on/off>\` › *Permet de gérer un RPC*  

\`${client.db.prefix}multi status add <emoji> <text>\` › *Permet d’ajouter un status*  
\`${client.db.prefix}multi status edit <ID> <field> <value>\` › *Permet d'éditer un status précis*  
\`${client.db.prefix}multi status remove <ID>\` › *Retire un status précis*  
\`${client.db.prefix}multi status list\` › *Affiche la liste des statuses*  

\`${client.db.prefix}multi clan on\` › *Change le tag du clan automatiquement*  
\`${client.db.prefix}multi clan off\` › *Arrête le changement automatique du clan*  

\`${client.db.prefix}multi interval <seconds>\` › *Change l'intervalle du changement d'activité*  

\`${client.db.prefix}multi clear\` › *Permet de supprimer tout votre multi*`,
`***___› Stealy - Multi___***  <a:star:1345073135095123978>

\`${client.db.prefix}multi args\` › *Displays the arguments of the multi*  

\`${client.db.prefix}multi start\` › *Start the multi*  
\`${client.db.prefix}multi stop\` › *Stop the multi*  

\`${client.db.prefix}multi rpc add\` › *Create a RPC*  
\`${client.db.prefix}multi rpc edit <ID> <field> <value>\` › *Edit a RPC*  
\`${client.db.prefix}multi rpc remove <ID>\` › *Remove a RPC*  
\`${client.db.prefix}multi rpc list\` › *Displays the list of RPC*  
\`${client.db.prefix}multi rpc <ID> <on/off>\` › *Manage a RPC*  

\`${client.db.prefix}multi status add <emoji> <text>\` › *Add a status*  
\`${client.db.prefix}multi status edit <ID> <field> <value>\` › *Edit a status*
\`${client.db.prefix}multi status remove <ID>\` › *Remove a status*  
\`${client.db.prefix}multi status list\` › *Displays the list of statuses*  

\`${client.db.prefix}multi clan on\` › *Change the clan tag automatically*  
\`${client.db.prefix}multi clan off\` › *Stop the automatic change of the clan tag*  

\`${client.db.prefix}multi interval <seconds>\` › *Change the interval of activity change*  

\`${client.db.prefix}multi clear\` › *Delete all your multi*`));

        switch (args[0]) {
            case "args":
                message.edit(client.language(`***___› Stealy - Multi Arguments___***  <a:star:1345073135095123978>

\`{servers}\` › *Nombre de serveurs.*

\`{users}\` › *Nombre d'utilisateurs.*

\`{friends}\` › *Nombre d'amis.*

\`{date}\` › *Date & heure actuelle.*

\`{time}\` › *L'heure actuelle.*

\`{messages}\` › *Nombre de messages.*

\`{messagesdeleted}\` › *Nombre de messages supprimés.*

\`{blocked}\` › *Nombre de bloqués.*

\`{ram}\` › *Utilisation ram actuel.*

\`{totalsniped}\` › *Nombre d'url snipe.*

\`{randomquotes}\` › *Citations aléatoires.*

\`{psyquotes}\` › *Citations sur la psycologie.*

\`{islamquotes}\` › *Citations sur l'islam.*

\`{manipulationquotes}\` › *Citations sur la manipulation.*

\`{christquotes}\` › *Citations sur le christianisme.*

\`{warquotes}\` › *Citations sur la guerre.*

\`{enemyquotes}\` › *Citations sur les ennemis.*

\`{lifequotes}\` › *Citations sur la vie.*

\`{moneyquotes}\` › *Citations sur l'argent.*

\`{deathquotes}\` › *Citations sur la mort.*

\`{businessquotes}\` › *Citations sur le business.*

\`{artquotes}\` › *Citations sur l'art.*

\`{fearquotes}\` › *Citations sur la peur.*

\`{knowledgequotes}\` › *Citations sur la connaissance.*

\`{sexquotes}\` › *Citations sur le sexe.*

\`{treasonquotes}\` › *Citations sur la trahison.*`,
`***___› Stealy - Multi Arguments___***  <a:star:1345073135095123978>

\`{servers}\` › *Number of servers.*  

\`{users}\` › *Number of users.*  

\`{friends}\` › *Number of friends.*  

\`{date}\` › *Current date & time.*  

\`{time}\` › *Current time.*  

\`{messages}\` › *Number of messages.*  

\`{messagesdeleted}\` › *Number of deleted messages.*  

\`{blocked}\` › *Number of blocked users.*  

\`{ram}\` › *Current RAM usage.*  

\`{totalsniped}\` › *Number of sniped URLs.*  

\`{randomquotes}\` › *Random quotes.*  

\`{psyquotes}\` › *Quotes about psychology.*  

\`{islamquotes}\` › *Quotes about Islam.*  

\`{manipulationquotes}\` › *Quotes about manipulation.*  

\`{christquotes}\` › *Quotes about Christianity.*  

\`{warquotes}\` › *Quotes about war.*  

\`{enemyquotes}\` › *Quotes about enemies.*  

\`{lifequotes}\` › *Quotes about life.*  

\`{moneyquotes}\` › *Quotes about money.*  

\`{deathquotes}\` › *Quotes about death.*  

\`{businessquotes}\` › *Quotes about business.*  

\`{artquotes}\` › *Quotes about art.* 

\`{fearquotes}\` › *Quotes about fear.*  

\`{knowledgequotes}\` › *Quotes about knowledge.*  

\`{sexquotes}\` › *Quotes about sex.*

\`{treasonquotes}\` › *Quotes about treason*`,))
                break

            case "start":
                if (client.db.multion) return message.edit(client.language(`*Le multi est déjà activé*`, `*The multi is already activated*`))
                message.edit(client.language(`*Le multi a été activé*`, `*The multi has been activated*`))
                client.db.multion = true
                client.save();
                client.multiRPC();
                break

            case "stop":
                if (!client.db.multion) return message.edit(client.language(`*Le multi n'est pas activé*`, `*The multi is not activated*`))
                message.edit(client.language(`*Le multi a été désactivé*`, `*The multi has been disabled*`))
                client.db.multion = false
                client.save();
                client.multiRPC();
                break

            case "interval":
                if (args[1] && isNaN(parseInt(args[1])) || args[1] && parseInt(args[1]) < 12) return message.edit(client.language(`*Veuillez entrer un temps en seconde supperieur à 12*`, `Please enter a time in seconds higher than 12`))

                client.db.multitime = parseInt(args[1]) ?? 12
                client.save()

                await message.edit(client.language(`*Le temps est maintenant de \`${args[1] || "12"}\` secondes*`, `The time is now \`${args[1] || "12"}\` seconds`))
                break

            case "clear":
                client.db.multirpc = []
                client.db.multistatus = []
                client.save()
                await message.edit(client.language(`*Le multi a été supprimé*`, `The multi has been deleted`))
                break

            case "clan":
                switch(args[1]){
                    case "on":
                        if (client.db.multiguild == true) return message.edit(client.language('*Le multi guild est déjà activé.*', '*The multi guild is already enable.*'))
                        client.db.multiguild = true
                        client.save()
                        message.edit(client.language('*Le multi guild a été activé.*', '*The multi guild is now enable.*'))
                        break

                    case "off":
                        if (client.db.multiguild == false) return message.edit(client.language('*Le multi guild est déjà désactivé.*', '*The multi guild is already disable.*'))
                        client.db.multiguild = false
                        client.save()
                        message.edit(client.language('*Le multi guild a été désactivé.*', '*The multi guild is now disable.*'))
                        break
                }
                break

            case "rpc":
                switch (args[1]) {
                    case "add":
                        client.db.multirpc.push({ onoff: true, name: client.db.rpctitle, type: client.db.rpctype, assets: { large_image: client.db.rpclargeimage }, application_id: client.db.appid, url: client.db.twitch })
                        client.save()
                        await message.edit(client.language(`*Le RPC a été crée avec l'ID ${client.db.multirpc.length - 1} vous pouvez commencer à le modifier*`, `The RPC has been created with the ID ${client.db.multirpc.length - 1} you can now edit it`))
                        break

                    case "remove":
                        if (!client.db.multirpc[args[2]]) return message.edit(client.language(`*Aucun ID de RPC existant pour ${args[2]}*`, `No RPC found with the ID ${args[2]}`))

                        client.db.multirpc = client.db.multirpc.filter(o => o !== client.db.multirpc[args[2]])
                        client.save()

                        await message.edit(client.language(`*Le RPC a été supprimé. ID: ${args[2]}*`, `Le RPC a été supprimé. ID: ${args[2]}`))
                        if (client.db.multirpc.length === 0 && client.db.multistatus.length === 0)
                        break

                    case "list":
                        if (client.db.multirpc.length == 0) return message.edit(client.language(`*Aucun RPC n'est enregistré*`, `No RPC saved in the multi`))

                        const arrays = diviser(client.db.multirpc)
                        let first = false;
                        let i = -1
                        for (const array of arrays.map(r => r)) {
                            const content = array.map((r) => {
                                i++

                                return client.language(`> ***ID: \`${i}\`***
                                > *Activé :* \`${r.onoff ? "Oui" : "Non"}\`
                                > *Nom :* \`${r.name}\`
                                > *Type :* \`${r.type}\`
                                > *State :* \`${r.state || "x"}\`
                                > *Détails :* \`${r.details || "x"}\`
                                > *App ID :* \`${r.application_id || "x"}\`
                                > *Petite Image :* \`${r.assets?.small_image || "x"}\`
                                > *Texte Petite Image :* \`${r.assets?.small_text || "x"}\`
                                > *Grande Image :* \`${r.assets?.large_image || "x"}\`
                                > *Texte Grande Image :* \`${r.assets?.large_text || "x"}\``,
                                    `***ID: \`${i}\`***
                                
                                > *Enabled :* \`${r.onoff ? "Yes" : "No"}\`
                                > *Name :* \`${r.name}\`
                                > *Type :* \`${r.type}\`
                                > *State :* \`${r.state || "x"}\`
                                > *Détails :* \`${r.details || "x"}\`
                                > *App ID :* \`${r.application_id || "x"}\`
                                > *Small Image :* \`${r.assets?.small_image || "x"}\`
                                > *Text Small Image :* \`${r.assets?.small_text || "x"}\`
                                > *Large Image :* \`${r.assets?.large_image || "x"}\`
                                > *Texte Large Image :* \`${r.assets?.large_text || "x"}\``)
                            })

                            if (first) message.channel.send(content.map(r => r).join('\n\n')).then(m => client.db.time !== 0 ? setTimeout(() => m.delete().catch(() => false), client.db.time) : false)
                            else {
                                message.edit(content.map(r => r).join('\n\n'))
                                first = true
                            }
                        }
                        break

                    case "edit":
                        if (!client.db.multirpc[args[2]]) return message.edit(client.language(`*Aucun ID de RPC existant pour ${args[2]}*`, `No RPC found with the ID ${args[2]}`))

                        switch (args[3]) {
                            case "off":
                                message.edit(client.language(`*Le RPC a été désactivé*`, `*The RPC has been disabled*`))
                                delete client.db.multirpc[args[2]].onoff
                                client.save()
                                break

                            case "on":
                                message.edit(client.language(`*Le RPC a été activé*`, `*The RPC has been enabled*`))
                                client.db.multirpc[args[2]].onoff = true
                                client.save()
                                break

                            case "name":
                                client.db.multirpc[args[2]].name = args[4] ? args.slice(4).join(' ') : "ㅤ"
                                client.save()
                                message.edit(client.language(`*Le nom a été modifié*`, `*The name has beed edited*`))
                                break

                            case "spotify":
                                if (args[4] === "on"){
                                    if (client.db.multirpc[args[2]].spotify) return message.edit(client.language('*Le multi spotify est déjà activé sur ce RPC.*', '*The multi spotify is already enable on this RPC.*'))

                                    client.db.multirpc[args[2]].spotify = true

                                    client.db.multirpc[args[2]].id = 'spotify:1'
                                    client.db.multirpc[args[2]].party = { id: `spotify:${client.user.id}` }
                                    client.db.multirpc[args[2]].type = 2
                                    client.db.multirpc[args[2]].flags = 48
                                    client.db.multirpc[args[2]].name = 'Spotify'
                                    client.db.multirpc[args[2]].syncId = "1J03Vp93ybKIxfzYI4YJtL"
                                    client.db.multirpc[args[2]].timestamps = { start: Date.now(), end: Date.now() }
                                    client.db.multirpc[args[2]].metadata = { context_uri: null, artist_ids: [] };
                                    client.db.multirpc[args[2]].metadata.album_id = '2M2Ae2SvZe3fmzUtlVOV5Z'

                                    client.save()
                                    message.edit(client.language("Votre RPC sera un RPC Spotify", "Your RPC will be a spotify RPC"))
                                }
                                else {
                                    if (!client.db.multirpc[args[2]].spotify) return message.edit(client.language('*Le multi spotify est déjà désactivé sur ce RPC.*', '*The multi spotify is already disable on this RPC.*'))

                                    delete client.db.multirpc[args[2]].spotify
                                    delete client.db.multirpc[args[2]].id
                                    delete client.db.multirpc[args[2]].party
                                    client.db.multirpc[args[2]].type = 0
                                    client.db.multirpc[args[2]].name = "ㅤ"
                                    delete client.db.multirpc[args[2]].flags
                                    delete client.db.multirpc[args[2]].syncId
                                    delete client.db.multirpc[args[2]].timestamps
                                    delete client.db.multirpc[args[2]].metadata

                                    client.save()
                                    message.edit(client.language("Votre RPC sera un RPC  par défaut", "Your RPC will be a default RPC"))
                                }
                                break;

                            case 'timestamp':
                                if (!args[4]){
                                    client.db.multirpc[args[2]].spotifyminutes = null;
                                    client.db.multirpc[args[2]].spotifyseconde = null;
                                    
                                    client.save();
                                    client.rpc();
                
                                    return message.edit(client.language('*Le temps de votre RPC a été supprimé.*', '*The timestamp of your RPC has been deleted.*'));
                                }
                                
                                if (!args[4].includes(':') || 
                                    isNaN(args[4].split(':')[0]) || 
                                    isNaN(args[4].split(':')[1]) ||
                                    args[4].split(':')[0].length !== 2 ||
                                    args[4].split(':')[1].length !== 2) 
                                    return message.edit(client.language('*Veuillez respecter ce format: \`13:37\`.*', '*Please respect this format: \`13:37\`.*'));
                                
                                client.db.multirpc[args[2]].spotifyminutes = args[4].split(':')[0];
                                client.db.multirpc[args[2]].spotifyseconde = args[4].split(':')[1];
                
                                client.save();
                                message.edit(client.language("*Le temps a été modifié.*", "*The timestamp has been edited.*"))
                                break;                

                            case "party":
                                if (!args[4]) {
                                    delete client.db.multirpc[args[2]].party
                                    client.save();
                                    message.edit(client.language("La party du RPC a été supprimée", "The party of the RPC has been deleted"));

                                }
                                else {
                                    if (!args[4].includes("/")) return message.edit(client.language(`Veuillez utiliser la commande de cette manière: \`${client.db.prefix}configrpc party 3/5\``, `Please use the command this way: \`${client.db.prefix}configrpc party 3/5\``));
                                    if (isNaN(parseInt(args[4].split("/")[0]))) return message.edit("Veuillez mettre un chiffre avant le /");
                                    if (isNaN(parseInt(args[4].split("/")[1]))) return message.edit("Veuillez mettre un chiffre après le /");
                                    client.db.multirpc[args[2]].party = { size: [parseInt(args[4].split("/")[0]), parseInt(args[4].split("/")[1])] }
                                    client.save();
                                    message.edit(client.language("La party du RPC a été modifiée", "The party of the RPC has been edited"));
                                }
                                break

                            case "platform":
                                if (!args[4] || !platformes.includes(args[4])) return message.edit(client.language(`Veuillez choisir une platforme entre ${platformes.map(r => `\`${r}\``.join(', '))}`, `Please choose a platform between ${platformes.map(r => `\`${r}\``.join(', '))}`))
                                else {
                                    client.db.multirpc[args[2]].platform = args[4]
                                    client.save()
                                    message.edit(client.language(`La plateforme du RPC a été modifiée vous êtes maintenant sur \`${args[4]}\``, `The platform of the RPC has been edited and you are now on \`${args[4]}\``));
                                }
                                break

                            case 'details':
                                if (!args[4]) {
                                    delete client.db.multirpc[args[2]].details;
                                    client.save();
                                    message.edit(client.language("Les détails du RPC ont été supprimés", "The details of the RPC have been deleted"));
                                }
                                else {
                                    client.db.multirpc[args[2]].details = args.slice(4).join(' ');
                                    client.save();
                                    message.edit(client.language("Les détails du RPC ont été modifiés", "The details of the RPC have been edited"));
                                }
                                break

                            case "state":
                                if (!args[4]) {
                                    delete client.db.multirpc[args[2]].state
                                    client.save();
                                    message.edit(client.language("Le statut du RPC a été supprimé", "The state of the RPC has been deleted"));
                                }
                                else {
                                    client.db.multirpc[args[2]].state = args.slice(4).join(' ')
                                    client.save();
                                    message.edit(client.language("Le statut du RPC a été modifié", "The state of the RPC has been edited"));
                                }
                                break

                            case "type":
                                if (!args[4] || !types.includes(args[4])) return message.edit(client.language("Veuillez choisir un type entre `playing`, `watching`, `listening`, `competing` et `streaming`", "Please choose a type between `playing`, `watching`, `listening`, `competing` et `streaming`"))

                                client.db.multirpc[args[2]].type = args[4].toUpperCase()
                                client.save()
                                message.edit(client.language("Le type de RPC a été modifié", "The type of the RPC has been edited"))
                                break

                            case "appid":
                                if (!args[4]) {
                                    delete client.db.multirpc[args[2]].application_id
                                    client.save();
                                    message.edit(client.language("L'id de l'application du RPC a été supprimé", "The application id of the RPC has been deleted"));

                                }
                                else {
                                    if (!/^[0-9]{17,19}$/.test(args[1])) message.edit(client.language("L'id de l'application doit être un nombre", "The application ID must be a number"));
                                    client.db.multirpc[args[2]].application_id = args[4];
                                    client.save();
                                    message.edit(client.language("L'id de l'application du RPC a été modifié", "The application id of the RPC has been edited"));
                                }
                                break

                            case "largeimage":
                                if (!args[4]) {
                                    delete client.db.multirpc[args[2]].assets.large_image
                                    delete client.db.multirpc[args[2]].assets.large_text
                                    client.save();
                                    message.edit(client.language("La grande image du RPC a été supprimée", "The large image of the RPC has been deleted"));
                                }
                                else {
                                    const imageURL = args[4].replace("http://", "https://");
                                    const getExtendURL = await RichPresence.getExternal(client, client.db.appid, imageURL);

                                    if (Array.isArray(getExtendURL) && getExtendURL.length > 0 && getExtendURL[0].external_asset_path) {
                                        client.db.multirpc[args[2]].assets.large_image = `mp:${getExtendURL[0].external_asset_path}`;
                                        args[5] ? client.db.multirpc[args[2]].assets.large_text = args.slice(5).join(' ') : delete client.db.multirpc[args[2]].assets.large_text;

                                        client.save();
                                        message.edit(client.language("La grande image du RPC a été modifiée", "The large image of the RPC has been edited"));

                                    } else message.edit(client.language("Erreur lors de l'obtention de l'URL étendue", "Error obtaining the extended URL"));
                                }
                                break

                            case "smallimage":
                                if (!args[4]) {
                                    delete client.db.multirpc[args[2]].assets.small_image
                                    delete client.db.multirpc[args[2]].assets.small_text
                                    client.save();
                                    message.edit(client.language("La petite image du RPC a été supprimée", "The small image of the RPC has been deleted"));
                                }

                                else {
                                    const imageURL = args[4].replace("http://", "https://");
                                    const getExtendURL = await RichPresence.getExternal(client, client.db.appid, imageURL);

                                    if (Array.isArray(getExtendURL) && getExtendURL.length > 0 && getExtendURL[0].external_asset_path) {
                                        client.db.multirpc[args[2]].assets.small_image = `mp:${getExtendURL[0].external_asset_path}`;
                                        args[5] ? client.db.multirpc[args[2]].assets.small_text = args.slice(5).join(' ') : delete client.db.multirpc[args[2]].assets.small_text;
                                        client.save();
                                        message.edit(client.language("La petite image du RPC a été modifiée", "The small image of the RPC has been edited"));

                                    } else message.edit(client.language("Erreur lors de l'obtention de l'URL étendue", "Error obtaining the extended URL"));
                                }
                                break

                            case "button":
                                if (!args[4]) {
                                    delete client.db.multirpc[args[2]].buttons[0]
                                    delete client.db.multirpc[args[2]].metadata[0]
                                    client.save();
                                    message.edit(client.language("Le bouton du RPC a été supprimé", "The button of the RPC has been deleted"));

                                }
                                else {
                                    if (!args[4].startsWith("http") || !args[5]) return message.edit(client.language("Veuillez entrer un lien et texte valide", "Enter a valid link and text"));
                                    if (!client.db.multirpc[args[2]].buttons) client.db.multirpc[args[2]].buttons = []
                                    if (!client.db.multirpc[args[2]].metadata) client.db.multirpc[args[2]].metadata = { button_urls: [] }
                                    client.db.multirpc[args[2]].buttons[0] = args.slice(5).join(' ')
                                    client.db.multirpc[args[2]].metadata.button_urls[0] = args[4]
                                    client.save();
                                    await message.edit(client.language("Le bouton du RPC a été modifié", "The button of the RPC has been edited"));
                                }
                                break

                            case "button2":
                                if (!args[4]) {
                                    delete client.db.multirpc[args[2]].buttons[1]
                                    delete client.db.multirpc[args[2]].metadata[1]
                                    client.save();
                                    message.edit(client.language("Le bouton2 du RPC a été supprimé", "The button2 of the RPC has been deleted"));
                                }
                                else {
                                    if (!args[4].startsWith("http") || !args[5]) return message.edit(client.language("Veuillez entrer un lien et texte valide", "Enter a valid link and text"));
                                    if (!client.db.multirpc[args[2]].buttons) client.db.multirpc[args[2]].buttons = []
                                    if (!client.db.multirpc[args[2]].metadata) client.db.multirpc[args[2]].metadata = { button_urls: [] }
                                    client.db.multirpc[args[2]].buttons[1] = args.slice(5).join(' ')
                                    client.db.multirpc[args[2]].metadata.button_urls[1] = args[4]
                                    client.save();
                                    await message.edit(client.language("Le bouton2 du RPC a été modifié", "The button2 of the RPC has been edited"));
                                }
                                break
                        }
                }
                break

            case "status":
                switch (args[1]) {
                    case "add":
                        await message.edit(client.language(`*Le status a été crée avec l'ID ${client.db.multistatus.length} vous pouvez commencer à le modifier*`, `The status has been created with the ID ${client.db.multistatus.length} you can now edit it`))
                        const emoji = Util.parseEmoji(args[2])
                        
                        if (!args[2]) {
                            client.db.multistatus.push({ onoff: true })
                            client.save()
                        }
                        else if (/\p{Extended_Pictographic}/ug.test(emoji.name) || emoji.id) {
                            client.db.multistatus.push({ onoff: true, emoji: { animated: emoji.animated, name: emoji.name, id: emoji.id }, state: args.slice(3).join(' ') ?? null })
                            client.save()
                        }
                        else {
                            client.db.multistatus.push({ onoff: true, state: args.slice(2).join(' ') })
                            client.save()
                        }
                        break

                    case "edit":
                        if (!client.db.multistatus[args[2]]) return message.edit(client.language(`*Aucun ID de status existant pour ${args[2]}*`, `No status found with the ID ${args[2]}`))

                        if (args[3] === "on") {
                            client.db.multistatus[args[2]].onoff = true
                            client.save()
                            message.edit(client.language("Le status a été activé", "The status has been enabled"))
                        }
                        else if (args[3] === "off") {
                            client.db.multistatus[args[2]].onoff = false
                            client.save()
                            message.edit(client.language("Le status a été désactivé", "The status has been disabled"))
                        }
                        if (args[3] === "emoji") {
                            if (!args[4]) {
                                delete client.db.multistatus[args[2]].emoji
                                client.save()
                                message.edit(client.language("L'emoji a été supprimé du status", "The emoji of the state has been deleted"))
                            }
                            else {
                                const emoji = Util.parseEmoji(args[4])

                                client.db.multistatus[args[2]].emoji = { animated: emoji.animated, name: emoji.name, id: emoji.id }
                                client.save()
                                message.edit(client.language("L'emoji a été modifié", "The emoji has been updated"))
                            }
                        }
                        else if (args[3] === "content") {
                            if (!args[4]) {
                                delete client.db.multistatus[args[2]].state
                                client.save()
                                await message.edit(client.language("Le texte a été supprimé du status", "The text of the state has been deleted"))
                            }
                            else {
                                client.db.multistatus[args[2]].state = args.slice(4).join(' ')
                                client.save()
                                message.edit(client.language("Le texte a été modifié", "The text of the state has been updated"))
                            }
                        }
                        break

                        case "list":
                            if (client.db.multistatus.length == 0) return message.edit(client.language(`*Aucun status n'est enregistré*`, `No status saved in the multi`))
    

                            const arrays = diviser(client.db.multistatus)
                            let first = false;
                            let i = -1
                            for (const array of arrays.map(r => r)) {
                                const content = array.map((r) => {
                                    i++

                                    return client.language(`***ID:*** ${i}
                                            ***Texte:*** ${r.state || "Rien"}
                                            ***Emoji:*** ${r.emoji ? r.emoji.animated ? `<a:${r.emoji.name}:${r.emoji.id}>` : r.emoji.id ? `<:${r.emoji.name}:${r.emoji.id}>` : `:${r.emoji.name}:` : "Rien"}`.replaceAll('                                            ', '')), 
                                            `***ID: \`${i}\`***
                                            ***Text:*** ${r.state || "Nothing"}
                                            ***Emote:*** ${r.emoji ? r.emoji.animated ? `<a:${r.emoji.name}:${r.emoji.id}>` : r.emoji.id ? `<:${r.emoji.name}:${r.emoji.id}>` : `:${r.emoji.name}:` : "Nothing"}`.replaceAll('                                            ', '')
                                })

                                if (first) message.channel.send(content.map(r => r).join('\n\n')).then(m => client.db.time !== 0 ? setTimeout(() => m.delete().catch(() => false), client.db.time) : false)
                                else {
                                    message.edit(content.map(r => r).join('\n\n'))
                                    first = true
                                }
                            }
                            break


                    case "remove":
                        if (!client.db.multistatus[args[2]]) return message.edit(client.language(`*Aucun ID de status existant pour ${args[2]}*`, `No status found with the ID ${args[2]}`))

                        client.db.multistatus = client.db.multistatus.filter(o => o !== client.db.multistatus[args[2]])
                        client.save()

                        await message.edit(client.language(`*Le status a été supprimé. ID: ${args[2]}*`, `Le status a été supprimé. ID: ${args[2]}`))
                        if (client.db.multirpc.length === 0 && client.db.multistatus.length === 0)
                        break

                }
                break
        }
    }
}

function estEmojiDiscord(emoji) {
    if (emoji?.startsWith('<') && emoji?.endsWith('>')) {
        if (emoji.includes(':')) {
            const isAnimated = emoji.includes('<a:');
            const parts = emoji.split(':');
            if (parts.length === 3) {
                const id = parseInt(parts[2]);
                if (!isNaN(id)) {
                    return true;
                }
            }
        } else {
            const length = emoji.length;
            if (length === 1 || length === 2) {
                return true;
            }
        }
    }
    return false;
}

function diviser(array) {
    let result = [];
    for (let i = 0; i < array.length; i += 3) {
        result.push(array.slice(i, i + 3));
    }
    return result;
}