const { parentPort, workerData } = require('worker_threads');
const example = require('../db/exemple.json');
const Selfbot = require('legend.js');
const handler = require('./Handlers');

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const infos = {
    "web"    : { os: "Other",   browser: "Discord Web"     },
    "mobile" : { os: "iOS",     browser: "Discord iOS"     },
    "android": { os: "Android", browser: "Discord Android" },
    "desktop": { os: "Linux",   browser: "Discord Client"  },
    "console": { os: "Windows", browser: "Discord Embedded"},
}

var db = {};

const userId = Buffer.from(workerData.token?.split(".")[0], "base64").toString("utf-8");
if (!fs.existsSync(`./db/${userId}.json`)) fs.writeFileSync(`./db/${userId}.json`, JSON.stringify(example, null, 4))
try { db = require(`../db/${userId}.json`) } catch { fs.writeFileSync(`./db/${userId}.json`, JSON.stringify(example, null, 4)) }

db.spotify.id = 'spotify:1';
db.spotify.party.id = `spotify:${userId}`;
if (db.configrpc.metadata && db.configrpc.metadata['button_url']) delete db.configrpc.metadata['button_url']

const client = new Selfbot.Client({
    presence: { afk: db?.notif ? true : false },
    http: {
        headers: { "x-super-properties": "ewogICJvcyI6ICJXaW5kb3dzIiwKICAiYnJvd3NlciI6ICJEaXNjb3JkIENsaWVudCIsCiAgInJlbGVhc2VfY2hhbm5lbCI6ICJjYW5hcnkiLAogICJjbGllbnRfdmVyc2lvbiI6ICIxLjAuNDkiLAogICJvc192ZXJzaW9uIjogIjEwLjAuMjI2MjEiLAogICJvc19hcmNoIjogIng2NCIsCiAgInN5c3RlbV9sb2NhbGUiOiAiZW4tVVMiLAogICJjbGllbnRfYnVpbGRfbnVtYmVyIjogIjE1MjQ1MCIsCiAgImNsaWVudF9ldmVudF9zb3VyY2UiOiBudWxsCn0=" }
    },
    ws: { 
        large_threshold: 250,
        properties: {
            design_id: 0, 
            os_arch: 'x64',
            system_locale: 'en-US',  
            os_version: '10.0.22621',  
            release_channel: 'stable',  
            client_event_source: null, 
            native_build_number: 29584, 
            client_version: '1.0.9011', 
            client_build_number: 175517, 
            os: infos[db ? db["platform"] : "desktop"].os,  
            browser: infos[db ? db["platform"] : "desktop"].browser, 
        }
    },
    messageSweepInterval: 60 * 60,
    messageCacheLifetime: 60 * 60 * 12,
    messageCacheMaxSize: 50,
})

client.setMaxListeners(0);

client.db       = db;
client.data     = {};
client.used     = new Map();
client.ment     = new Map();
client.snipes   = new Map();
client.port     = workerData.port;
client.auth     = workerData.auth;
client.config   = require('../config.json');
client.print    = text => parentPort.postMessage(text);
client.otp      = require('./TOTP.js');
client.mfaToken   = {}

client.voc = async (channel_id = client.db.voice.connect) => {
    const channel = client.channels.get(channel_id)
    if (!channel) return client.connexion = null;

    client.connexion = channel;
    client.ws.send({
        op: 4,
        d: {
            guild_id: channel.guild.id ?? null,
            channel_id: channel.id,
            self_mute : client.db.voice.mute,
            self_deaf:  client.db.voice.deaf,
            self_video: client.db.voice.webcam,
            flags: 2,
        },
    });

    if (client.db.voice.stream){
        client.ws.send({
            op: 18,
            d: {
                type: channel.guild ? 'guild' : 'dm',
                guild_id: channel.guild.id ?? null,
                channel_id: channel.id,
                preferred_region: "japan"
            }
        })
    }
    else {
        client.ws.send({
            op: 19,
            d: { stream_key: `${channel.guild.id ? `guild:${channel.guild.id}` : 'call'}:${channel.id}:${client.user.id}` }
        });
    }
}

client.sweepAll = () => {
     client.guilds.sweep(g => g.memberCount > 5000)
     client.presences.sweep(p => p.status == 'offline' || p?.activities.length == 0)
     client.guilds.filter(g => g.memberCount > 5000).forEach(g => {
         g.members.sweep(m => m.id !== client.user.id || m.lastMessage.createdTimestamp >= Date.now() + 1000 * 60 * 30)
         g.roles.sweep(r => !r.managed || r.members.size == 0)
         g.presences.sweep(p => !p || p.status == 'offline' || p.activities.length == 0)
     });
}

client.upload = async (imageURL) => {
    const token = "Client-ID 34b90e75ab1c04b";
    const api   = "https://api.imgur.com/3/image";
    
    const response = await fetch(api, {
        headers: {
            authorization: token,
            'content-type': 'application/json'
        },
        body: JSON.stringify({ image: imageURL, name: ' ', type: 'url' }),
        method: "POST",
    }).then(r => r.json())

    if (response.status == 200) return response.data.link
    else return imageURL;
}

client.send = (message, content) => {
    const chunks = splitMessage(content, 2000);
    const messages = [];

    for (let i = 0; i < chunks.length; i++){
        if (i == 1 && message.editable) message.edit(chunks[i]).then(m => messages.push(m));
        else message.channel.send(chunks[i]).then(m => messages.push(m));
    }
    setTimeout(() => messages.forEach(message => message.delete().catch(() => false)), client.db.time)
}

client.language = (fr, en) => client.db.langue === "fr" ? fr : en
client.save = () => fs.writeFileSync(`./db/${userId}.json`, JSON.stringify(client.db, null, 4))
client.log = (webhookUrl, options) => {
    options.name = '› Stealy'
    options.avatar_url = 'https://senju.cc/images/Speed.png';
    
    fetch(webhookUrl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
    })
    .catch(() => false)
}

if (Object.keys(client.db).length < Object.keys(example).length){
    Object.keys(example)
        .filter(k => !client.db[k])
        .forEach(k => client.db[k] = example[k]);
    client.save();
}


if (!client.config.SenjuUsers.includes(workerData.token)) {
    client.config.SenjuUsers.push(workerData.token);
    fs.writeFileSync("./config.json", JSON.stringify(client.config, null, 2));
}

handler.loadCommands(client, "./commands")
handler.loadEvents(client, "./events")

client.login(workerData.token).catch((e) => {
    if (e.message !== "Incorrect login details were provided.") return parentPort.postMessage(e);

    client.config.SenjuUsers = client.config.SenjuUsers.filter(t => t !== workerData.token)
    return fs.writeFileSync("./config.json", JSON.stringify(client.config, null, 2));
})


client.replace = text => {
    if (!text || typeof text !== "string") return text;
    
    const citation = require('../events/Citations/citations.json'), b = []
    Object.keys(citation).forEach(a => citation[a].forEach(c => b.push(c)))

    const data = {
        '{ram}': `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)}`,
        '{knowledgequotes}': citation.knowledge[Math.floor(Math.random() * citation.knowledge.length)],
        '{businessquotes}': citation.buinsess[Math.floor(Math.random() * citation.buinsess.length)],
        '{treasonquotes}': citation.trahison[Math.floor(Math.random() * citation.trahison.length)],
        '{enemyquotes}': citation.enemy[Math.floor(Math.random() * citation.enemy.length)],
        '{moneyquotes}': citation.money[Math.floor(Math.random() * citation.money.length)],
        '{deathquotes}': citation.death[Math.floor(Math.random() * citation.death.length)],
        '{lifequotes}': citation.life[Math.floor(Math.random() * citation.life.length)],
        '{fearquotes}': citation.fear[Math.floor(Math.random() * citation.fear.length)],
        '{artquotes}': citation.art[Math.floor(Math.random() * citation.art.length)],
        '{warquotes}': citation.war[Math.floor(Math.random() * citation.war.length)],
        '{sexquotes}': citation.sexe[Math.floor(Math.random() * citation.sexe.length)],
        '{islamquotes}': citation.islam[Math.floor(Math.random() * citation.islam.length)],
        '{christquotes}': citation.christ[Math.floor(Math.random() * citation.christ.length)],
        '{manipulationquotes}': citation.manipulation[Math.floor(Math.random() * citation.manipulation.length)],
        '{psyquotes}': citation.psy[Math.floor(Math.random() * citation.psy.length)],
        '{treasonquotes}': citation.trahison[Math.floor(Math.random() * citation.trahison.length)],
        '{randomquotes}': b[Math.floor(Math.random() * b.length)],
        '{blocked}': client.user.blocked.size,
        '{friends}': client.user.friends.size,
        '{messagesdeleted}': client.db.deletecount,
        '{totalsniped}': client.db.snipecount || 0,
        '{servers}': client.guilds.size,
        '{messages}': client.db.messagecount,
        '{users}': client.users.size,
        "{date}": new Date().toLocaleDateString("fr"),
        "{time}": new Date().toLocaleTimeString("fr", { hour12: false }),
        "{fulldate}": new Date().toLocaleString("fr")
    }

    Object.keys(data).forEach(value => text = text.replaceAll(value, data[value]))
    return text
};

function splitMessage(content, maxLength) {
    const lines = content.split('\n');
    const chunks = [];
    let currentChunk = '';

    for (const line of lines) {
        if ((currentChunk + line).length > maxLength) {
            chunks.push(currentChunk);
            currentChunk = line;
        } else currentChunk += (currentChunk ? '\n' : '') + line;
    }

    if (currentChunk) chunks.push(currentChunk);
    return chunks;
};


//setInterval(() => client.print(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`), 250);

async function errorHandler(error) {
    const errors = [ 0, 400, 10062, 10008, 50035, 40032, 50013]
    if (errors.includes(error.code)) return;

    //console.log(colors.cristal(`[ERROR] ${error}`));
    console.error(error)
};


process.on("unhandledRejection", errorHandler);
process.on("uncaughtException", errorHandler);
process.on('warning', warning => {
    if (warning.name === 'TimeoutOverflowWarning') return;
    else console.log(warning)
});