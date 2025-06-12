const auth    = [...Array(18)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
const port    = Math.floor(Math.random() * (65535 - 1024 + 1)) + 1024;
const handler = require('./structures/Handlers');
const { Worker } = require('worker_threads');
const colors  = require('gradient-string');
const config  = require('./config.json');
const Discord = require('discord.js');
const express = require('express');
const fs      = require('node:fs');
const os      = require('node:os');
const app     = express();
const workers = {};
let clients = [];

cross = '<:no:1319225868895260705>',
logs  = '<:plane:1271357981120008275>',
yes   = '<:yes:1202596415273041931>';

global.danger  = config.danger;
global.config  = config;
global.cross   = cross;
global.logs    = logs;
global.yes     = yes;

// Partie Bot
const botclient  = new Discord.Client({ intents: Object.keys(Discord.GatewayIntentBits),  partials: [Discord.Partials.Channel, Discord.Partials.Message] });
botclient.login(config.bottoken).catch(() => false)
botclient.config = config;
botclient.port   = port;
botclient.auth   = auth;

handler.loadCommands(botclient, "./Manager/commands");
handler.loadEvents(botclient, "./Manager/events");

// Partie Selfbot
[...new Set(config.SenjuUsers)].forEach(token => loadSelfbot(token));
backup(`./backups/configs/config-${Date.now()}.json`)
setInterval(async () => await backup(`./backups/configs/config-${Date.now()}.json`), 1000 * 60 * 30);

// Api
app.use(express.json());
app.use(checkAuthorization);

app.post('/newClient', (req, res) => {
    if (!req.body.client) return res.status(400).json({ error: 'Veuillez entrer un client valide' });

    clients.push(req.body.client);
    return res.status(200).send({ message: 'ok' });
});

app.post('/close/:token', (req, res) => {
    closeThread(req.params.token);
    res.status(200).send({ message: 'ok' });
});

app.post('/connect/:token', (req, res) => {
    loadSelfbot(req.params.token);
    res.status(200).send({ message: 'ok' });
});

app.post('/restart/:token', (req, res) => {
    restartThread(req.params.token);
    res.status(200).send({ message: 'ok' });
});

app.get('/allWorkers', (req, res) => res.status(200).json(workers));
app.get('/getClients', (req, res) => res.status(200).json(clients));
app.get('/', (req, res) => res.status(200).json({ message: "Bienvenue sur l'API de Stealy" }));
//app.listen(port, () => console.log(colors.cristal(`> L'API a démarrée`)));
app.listen(port, "127.0.0.1", () => console.log(colors.cristal(`> L'Api a démarrée`)));

// Functions
function closeThread(token) {
    clients = clients.filter(c => c.token !== token);
    const worker = workers[token];
    if (worker) {
        worker.terminate();
        delete workers[token];
        return true;
    } 
    else return false;
}

function restartThread(token) {
    closeThread(token);
    loadSelfbot(token);
    return true;
}

function loadSelfbot(token){
    const worker = new Worker('./structures/Client.js', { workerData: { token, port, auth } });

    workers[token] = worker;
    worker.on('message', (message) => console.log(colors.cristal(`[${Buffer.from(token.split('.')[0], "base64").toString('utf-8')}] ${typeof message !== "object" ? message : ''}`)));
    worker.on('message', (message) => typeof message == 'object' ? console.log(message) : null);
    worker.on('exit', e => e.code == 0 ? restartThread(token) : false);
    worker.on('messageerror', e => console.log(colors.cristal(`[${Buffer.from(token.split('.')[0], "base64").toString('utf-8')}] ${e}`)));
    worker.on('error', errorWorker);

    function errorWorker(error){
        const errors = [ 40002 ];
        if (!errors.includes(error.code)) return console.error(colors.cristal(`[${Buffer.from(token.split('.')[0], "base64").toString('utf-8')}]`), console.log(error))
        else closeThread(token)
    }
}

function checkAuthorization(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader || authHeader !== auth) return res.status(403).send();

    next();
}

async function backup(path){
    if (!fs.existsSync(`./backups/configs`)) await fs.promises.mkdir(`./backups/configs`)
    fs.writeFileSync(path, JSON.stringify(config, null, 2))
    return true;
}


async function errorHandler(error) {
    const errors = [ 0, 400, 10062, 10008, 50035, 40032, 50013,4002]
    if (errors.includes(error.code)) return;

    console.error(error)
};

process.on("unhandledRejection", errorHandler);
process.on("uncaughtException", errorHandler);
process.on('warning', () => false);