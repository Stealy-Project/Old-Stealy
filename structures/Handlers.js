const fs = require("node:fs");
const colors = require("gradient-string");
const Selfbot = require("legend.js");

function loadCommands(client, dir) {
  client.commands = new Selfbot.Collection();
  fs.readdirSync(dir).forEach((dirs) => {
    const commands = fs
      .readdirSync(`${dir}/${dirs}/`)
      .filter((files) => files.endsWith(".js"));

    for (const file of commands) {
      const getFileName = require(`../${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.name, getFileName);
      //client.print ? client.print(`> commande charger ${getFileName.name} [${dirs}]`) :
      //console.log(colors.cristal(`> commande charger ${getFileName.name} [${dirs}]`))
    }
  });
}

function loadEvents(client, dir) {
  fs.readdirSync(dir).forEach((dirs) => {
    const events = fs
      .readdirSync(`${dir}/${dirs}`)
      .filter((files) => files.endsWith(".js"));

    for (const event of events) {
      const evt = require(`../${dir}/${dirs}/${event}`);
      if (evt.once) {
        client.once(evt.name, (...args) => evt.run(...args, client));
      } else if (evt.ws) {
        client.ws.on(evt.name, (...args) => evt.run(...args, client));
      } else {
        client.on(evt.name, (...args) => evt.run(...args, client));
      }
    //   client.print ? client.print(`> event charger ${evt.name}`) :
    //   console.log(colors.cristal(`> event charger ${evt.name}`))
    }
  });
}

module.exports = { loadCommands, loadEvents };
