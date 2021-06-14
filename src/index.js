const Discord = require("discord.js");
const fs = require("fs");
require('dotenv').config();

const client = new Discord.Client();
const { database } = require('./services/db');
const {setup} = require('./services/setup');

// ---- COMMANDS SECTION ---- //
// TODO - MOVE TO OTHER FILE  //
const commands = {}
const files = fs.readdirSync("./src/commands")
const jsFiles = files.filter(file => file.endsWith('.js'))
jsFiles.forEach(commandFile => {
    const imported = require(`./commands/${commandFile}`)
    if (imported.command && imported.fn) {
        commands[imported.command] = imported
    }
})
// ---- COMMANDS SECTION ---- //


client.on("ready", async () => {

    let logChannel = client.channels.cache.find(i => i.id === process.env.CHANNEL_ID);

    let token = await database.check('jwt_token');

    let firstTimeAlive = await database.check('setup');

    if(!token) {
      logChannel.send('No JWT token set, please set one to continue.')
    }

    if(!firstTimeAlive && token) {
      logChannel.send("Running first time setup. Please wait :)")
      setup(logChannel)
    }

    console.log("Ready.")
});


client.on("message", async (message) => {
  if(message.author.bot) {
    return;
  }
  
  if(message.content.startsWith(process.env.PREFIX)) {
    const cmd = message.content.split(' ')[1];

    // Return on unknown commands
    if (commands[cmd] === undefined) {
      console.log('Unable to find command', cmd)
      return
    }

    // Handle command
    await commands[cmd].fn(message);
  }
});

client.login(process.env.TOKEN);