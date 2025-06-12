const Discord = require("legend.js");

module.exports = {
    name: "rpc",
    /**
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {string} args
    */
    run: async (client, message, args) => {

        switch (args[0]) {
            default: return message.edit(client.language(`***__› Stealy - RPC__*** <a:star:1345073135095123978>

\`${client.db.prefix}rpc reset\` › *Permet de reset la RPC.*

\`${client.db.prefix}rpc platform <desktop/ps4/ps5/xbox/samsung/ios>\` › *Permet de changer la plateform du RPC.*
\`${client.db.prefix}rpc name <text>\` › *Permet de changer le nom du RPC.*
\`${client.db.prefix}rpc details <text>\` › *Permet de changer les détails du RPC.*
\`${client.db.prefix}rpc state <text>\` › *Permet de changer l'état de la RPC.*
\`${client.db.prefix}rpc type <PLAYING, WATCHING, STREAMING, LISTENING, COMPETING>\` › *Permet de changer le type de RPC.*
\`${client.db.prefix}rpc largeimage <image link> <text>\` › *Permet de changer la grande image de la RPC.*
\`${client.db.prefix}rpc smallimage <image link> <text>\` › *Permet de changer la petite image de la RPC.*
\`${client.db.prefix}rpc appid <application_id>\` › *Permet de changer l'id d'application de la RPC.*
\`${client.db.prefix}rpc time <on/off>\` › *Permet d'activer ou désactiver le temps du RPC.*
\`${client.db.prefix}rpc button <link> <text>\` › *Permet d'ajouter un bouton sur la RPC.*
\`${client.db.prefix}rpc button2 <link> <text>\` › *Permet d'ajouter un 2ème bouton sur la RPC.*
\`${client.db.prefix}rpc party <17/17>\` › *Vous permets de mettre un nombre de joueurs dans la RPC.*`,
                `***__› Stealy - RPC__*** <a:star:1345073135095123978>

\`${client.db.prefix}rpc reset\` › *To reset the RPC.*

\`${client.db.prefix}rpc platform <desktop/ps4/ps5/xbox/samsung/ios>\` › *To Change the RPC platform.*
\`${client.db.prefix}rpc name <text>\` › *To change the name of the RPC.*
\`${client.db.prefix}rpc details <text>\` › *To change the details of the RPC.*
\`${client.db.prefix}rpc state <text>\` › *To change the state of the RPC.*
\`${client.db.prefix}rpc type <PLAYING, WATCHING, STREAMING, LISTENING, COMPETING>\` › *To change the type of the RPC.*
\`${client.db.prefix}rpc largeimage <image link> <text>\` › *To change the large image of the RPC.*
\`${client.db.prefix}rpc smallimage <image link> <text>\` › *To change the small image of the RPC.*
\`${client.db.prefix}rpc appid <application_id>\` › *To change the application id of the RPC.*
\`${client.db.prefix}rpc time <on/off>\` › *To activate or deactivate the time of the RPC.*
\`${client.db.prefix}rpc button <link> <text>\` › *To add a button on the RPC.*
\`${client.db.prefix}rpc button2 <link> <text>\` › *To add a 2nd button on the RPC.*
\`${client.db.prefix}rpc party <17/17>\` › *You can put a number of players in the RPC.*`));

            case "party":
                if (!args[1]) {
                    message.edit(client.language("*La party du RPC a été supprimée.*", "*The party of the RPC has been deleted.*"));
                    delete client.db.configrpc.party;

                    client.save();
                    client.multiRPC();
                }
                else {
                    if (!args[1].includes("/")) return message.edit(client.language(`*Veuillez utiliser la commande de cette manière: \`${client.db.prefix}rpc party 3/5\`.*`, `*Please use the command this way: \`${client.db.prefix}rpc party 3/5\`.*`));
                    if (isNaN(parseInt(args[1].split("/")[0]))) return message.edit("*Veuillez mettre un chiffre avant le \`/\`.*");
                    if (isNaN(parseInt(args[1].split("/")[1]))) return message.edit("*Veuillez mettre un chiffre après le \`/\`.*");
                    if (args[1].split('/')[0] < args[1].split('/')[1]) return message.edit(client.language('*Le premier numéro doit ête supperieur au deuxième.*', '*The first number must be higher than the second.*'));

                    client.db.configrpc.party = { size: [args[1].split('/')[0], args[1].split('/')[1]] };

                    client.save();
                    client.multiRPC();
                    message.edit(client.language("*La party du RPC a été modifiée.*", "*The party of the RPC has been edited.*"));
                }
                break

            case "reset":
                client.db.configrpc.status = true
                client.db.configrpc.name = "⚡"
                client.db.configrpc.type = 5
                client.db.configrpc.details = "Stealy"
                client.db.configrpc.platform = "desktop"
                client.db.configrpc.application_id = "1339555215782707282"
                client.db.configrpc.assets = { "large_image": "external/0vzPagpFBgV6IBZUi_2rLz4FmuSOc2hOFUc7AHsrV_w/https/i.postimg.cc/0jpGhQF0/Speed.png" }
                client.db.configrpc.buttons = []
                client.db.configrpc.metadata = {}
                client.db.setgame.status = false
                client.db.multion = false

                client.save();
                client.multiRPC();
                message.edit(client.language("*La RPC a été reset.*", "*The RPC has been reset.*"));
                break;

            case "platform":
                if (!["ps5", "ps4", "xbox", "desktop", "samsung", "ios"].includes(args[1])) return message.edit(client.language("*Veuillez choisir une platforme entre `ps5`, `ps4`, `xbox`, `desktop`, `samsung`, `ios`.*", "*Please choose a platform between `ps5`, `ps4`, `xbox`, `desktop`, `samsung`, `ios`.*"))
                else {
                    client.db.configrpc.platform = args[1]
                    client.save()
                    message.edit(client.language(`*La plateforme du RPC a été modifiée vous êtes maintenant sur \`${args[1]}\`.*`, `*The platform of the RPC has been edited and you are now on \`${args[1]}\`.*`));
                }
                break;

            case "name":
                client.db.configrpc.name = args.slice(1).join(' ') || "ㅤ";

                client.save();
                client.multiRPC();
                message.edit(client.language("*Le nom du RPC a été modifié.*", "*The name of the RPC has been edited.*"));
                break;

            case 'details':
                if (!args[1]) {
                    message.edit(client.language("*Les détails du RPC ont été supprimés.*", "*The details of the RPC have been deleted.*"));
                    delete client.db.configrpc.details;

                    client.save();
                    client.multiRPC();
                }
                else {
                    message.edit(client.language("*Les détails du RPC ont été modifiés.*", "*The details of the RPC have been edited.*"));
                    client.db.configrpc.details = args.slice(1).join(' ');

                    client.save();
                    client.multiRPC();
                }
                break;

            case "state":
                if (!args[1]) {
                    message.edit(client.language("*Le statut du RPC a été supprimé.*", "*The state of the RPC has been deleted.*"));
                    delete client.db.configrpc.state;

                    client.save();
                    client.multiRPC();
                }
                else {
                    message.edit(client.language("*Le statut du RPC a été modifié*", "*The state of the RPC has been edited.*"));
                    client.db.configrpc.state = args.slice(1).join(' ');

                    client.save();
                    client.multiRPC();
                }
                break;

            case "type":
                if (!args[1] || !["playing", "listening", "watching", "competing", "streaming"].includes(args[1])) return message.edit(client.language("*Veuillez choisir un type entre `playing`, `watching`, `listening`, `competing` et `streaming`.*", "*Please choose a type between `playing`, `watching`, `listening`, `competing` et `streaming`.*"))

                message.edit(client.language("*Le type de RPC a été modifié.*", "*The type of the RPC has been edited.*"))
                client.db.configrpc.type = setType(args[1].toLowerCase());

                client.save()
                client.multiRPC();
                break;

            case "appid":
                if (!args[1]) {
                    message.edit(client.language(`*L'application id a été remis par défaut.*`, `*The application id has been reset to default.*`))
                    client.db.configrpc.application_id = "1339555215782707282";
                    
                    client.save();
                    client.multiRPC();
                } else {
                    if (!/^[0-9]{17,19}$/.test(args[1])) message.edit(client.language("*L'id de l'application doit être un nombre.*", "*The application ID must be a number.*"));
                    message.edit(client.language("*L'id de l'application du RPC a été modifié.*", "*The application id of the RPC has been edited.*"));
                    client.db.configrpc.application_id = args[1];

                    client.save();
                    client.multiRPC();
                }
                break;

            case "largeimage":
                if (!args[1]) {
                    message.edit(client.language("*La grande image du RPC a été supprimée.*", "*The large image of the RPC has been deleted.*"));
                    delete client.db.assets.large_image;
                    client.save();
                    client.multiRPC();
                }
                else {
                    const getExtendURL = await Discord.RichPresence.getExternal(client, client.db.configrpc.application_id, args[1].replace("http://", "https://"));

                    if (Array.isArray(getExtendURL) && getExtendURL.length > 0 && getExtendURL[0].external_asset_path) {
                        if (!client.db.configrpc.assets) client.db.configrpc.assets = {};

                        client.db.configrpc.assets['large_image'] = 'mp:' + getExtendURL[0].external_asset_path
                        if (args[2]) client.db.configrpc.assets['large_text'] = args.slice(2).join(' ');
                        else delete client.db.configrpc.assets['large_text'];

                        client.save();
                        client.multiRPC();
                        message.edit(client.language("*La grande image du RPC a été modifiée.*", "*The large image of the RPC has been edited.*"));
                    }
                    else message.edit(client.language("*Erreur lors de l'obtention de l'URL étendue.*", "*Error obtaining the extended URL.*"));
                }
                break;

            case "smallimage":
                if (!args[1]) {
                    message.edit(client.language("*La petite image du RPC a été supprimée.*", "*The small image of the RPC has been deleted.*"));
                    delete client.db.configrpc.assets.large_image;

                    client.save();
                    client.multiRPC();
                }

                else {
                    const getExtendURL = await Discord.RichPresence.getExternal(client, client.db.configrpc.application_id, args[1].replace("http://", "https://"));
                    if (Array.isArray(getExtendURL) && getExtendURL.length > 0 && getExtendURL[0].external_asset_path) {
                        if (!client.db.configrpc.assets) client.db.configrpc.assets = {};
                        client.db.configrpc.assets['small_image'] = 'mp:' + getExtendURL[0].external_asset_path;

                        if (args[2]) client.db.configrpc.assets['small_text'] = args.slice(2).join(' ');
                        else delete client.db.configrpc.assets['small_text'];

                        client.save();
                        client.multiRPC();
                        message.edit(client.language("*La petite image du RPC a été modifiée.*", "*The small image of the RPC has been edited.*"));
                    }
                    else message.edit(client.language("*Erreur lors de l'obtention de l'URL étendue.*", "*Error obtaining the extended URL.*"));
                }
                break;

            case "button":
                if (!args[1]) {
                    message.edit(client.language("*Le bouton du RPC a été supprimé.*", "*The button of the RPC has been deleted.*"));
                    if (client.db.configrpc.metadata['button_urls']) delete client.db.configrpc.metadata.button_urls[0]
                    if (client.db.configrpc.buttons) delete client.db.configrpc.buttons[0]

                    if (client.db.configrpc.metadata.button_urls.filter(c => !c)) delete client.db.configrpc.metadata.button_urls;
                    if (client.db.configrpc.buttons.filter(c => !c)) delete client.db.configrpc.buttons;
                    
                    client.save();
                    client.multiRPC();
                }
                else {
                    if (!URL.canParse(args[1]) || !args[2]) return message.edit(client.language("*Veuillez entrer un lien et texte valide.*", "*Enter a valid link and text.*"));
                    message.edit(client.language("*Le bouton du RPC a été modifié.*", "*The button of the RPC has been edited.*"));

                    if (!client.db.configrpc.buttons) client.db.configrpc.buttons = [args.slice(2).join(' ')];
                    else client.db.configrpc.buttons[0] = args.slice(2).join(' ');

                    if (!client.db.configrpc.metadata['button_urls']) client.db.configrpc.metadata['button_urls'] = [args[1]]
                    else client.db.configrpc.metadata['button_urls'][0] = args[1]

                    client.save();
                    client.multiRPC();
                }
                break;

            case "button2":
                if (!args[1]) {
                    message.edit(client.language("*Le bouton du RPC a été supprimé.*", "*The button of the RPC has been deleted.*"));
                    if (client.db.configrpc.metadata['button_urls']) delete client.db.configrpc.metadata.button_urls[0]
                    if (client.db.configrpc.buttons) delete client.db.configrpc.buttons[0]

                    if (client.db.configrpc.metadata.button_urls.filter(c => !c)) delete client.db.configrpc.metadata.button_urls;
                    if (client.db.configrpc.buttons.filter(c => !c)) delete client.db.configrpc.buttons;

                    client.save();
                    client.multiRPC();
                }
                else {
                    if (!URL.canParse(args[1]) || !args[2]) return message.edit(client.language("*Veuillez entrer un lien et texte valide.*", "*Enter a valid link and text.*"));
                    message.edit(client.language("*Le bouton du RPC a été modifié.*", "*The button of the RPC has been edited.*"));

                    if (!client.db.configrpc.buttons) client.db.configrpc.buttons = [undefined, args.slice(2).join(' ')];
                    else client.db.configrpc.buttons[1] = args.slice(2).join(' ');

                    if (!client.db.configrpc.metadata['button_urls']) client.db.configrpc.metadata['button_urls'] = [args[1]]
                    else client.db.configrpc.metadata['button_urls'][1] = args[1];

                    client.save();
                    client.multiRPC();
                }
                break;

            case "time":
                if (args[0] === "on") {
                    message.edit(client.language("*Le temps du RPC a été activée.*", "*The time of the RPC has been activated.*"));
                    delete client.db.configrpc.timestamps;

                    client.save();
                    client.multiRPC();
                }
                else if (args[0] === "off") {
                    message.edit(client.language("*Le temps du RPC a été désactivée.*", "*The time of the RPC has been disabled.*"));
                    client.db.configrpc.timestamps = { start: Date.now() };

                    client.save();
                    client.multiRPC();
                }
                break;

            case "on":
                message.edit(client.language("*La rpc a été activé.*", "*The rpx has been enabled.*"));
                client.db.configrpc.status = true;

                client.save();
                client.multiRPC();
                break

            case "off":
                message.edit(client.language("*La rpc a été désactivé.*", "*The rpx has been disabled.*"));
                client.db.configrpc.status = false;

                client.save();
                client.multiRPC();
                break;
        }
    }
};

/**
  * @param {string} type
  * @returns {number}
*/
function setType(type) {
    switch (type) {
        default: return 0;
        case 'playing': return 0;
        case 'streaming': return 1;
        case 'listening': return 2;
        case 'watching': return 3;
        case 'competing': return 5;
    }
}